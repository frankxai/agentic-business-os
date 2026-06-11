#!/usr/bin/env node
/**
 * harness-sync.mjs — open a readable PR on a downstream instance when the
 * upstream harness changes. NEVER auto-merges (HARNESS.md contract).
 *
 * Usage:
 *   GH_TOKEN=<token> node scripts/harness-sync.mjs --repo owner/repo
 *   GH_TOKEN=<token> node scripts/harness-sync.mjs --all          # every repo in downstreams.json
 *   node scripts/harness-sync.mjs --repo owner/repo --dry-run     # print plan, write nothing
 *
 * Mechanics (GitHub Trees API via `gh api` — no local clone of the downstream):
 *   1. Read upstream-managed files from template/.claude/{agents,commands}
 *   2. Fetch the downstream's versions of the same paths
 *   3. Diff; if changes exist, create branch `harness-sync/vX.Y.Z`, commit via
 *      Trees API, open a PR with a human-readable changelog
 *
 * Pattern lineage: FrankX scripts/land-acos-stack-via-trees-api.mjs
 */

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HARNESS_PATHS = [".claude/agents", ".claude/commands"];

function gh(args, input) {
  return execFileSync("gh", args, {
    encoding: "utf8",
    input,
    maxBuffer: 32 * 1024 * 1024,
  });
}

function ghJson(args, input) {
  return JSON.parse(gh(args, input));
}

function upstreamVersion() {
  try {
    return gh(["api", "repos/frankxai/agentic-business-os/releases/latest", "--jq", ".tag_name"]).trim();
  } catch {
    // No release yet — fall back to short SHA of local HEAD if available
    try {
      return "v" + execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim();
    } catch {
      return "v0.0.0-dev";
    }
  }
}

function localHarnessFiles() {
  const files = new Map(); // repo-relative downstream path -> content
  for (const dir of HARNESS_PATHS) {
    const abs = join(ROOT, "template", dir);
    if (!existsSync(abs)) continue;
    for (const name of readdirSync(abs)) {
      if (!name.endsWith(".md")) continue;
      files.set(`${dir}/${name}`, readFileSync(join(abs, name), "utf8"));
    }
  }
  return files;
}

function downstreamFile(repo, path, ref) {
  try {
    const res = ghJson(["api", `repos/${repo}/contents/${path}?ref=${ref}`]);
    return Buffer.from(res.content, "base64").toString("utf8");
  } catch {
    return null; // file doesn't exist downstream
  }
}

function syncRepo(repo, { dryRun }) {
  console.log(`\n=== ${repo} ===`);
  const version = upstreamVersion();
  const repoInfo = ghJson(["api", `repos/${repo}`]);
  const base = repoInfo.default_branch;

  const local = localHarnessFiles();
  const changes = [];
  for (const [path, content] of local) {
    const remote = downstreamFile(repo, path, base);
    // Normalize line endings before comparing — downstreams on Windows may
    // have CRLF-converted copies of identical content.
    const norm = (s) => (s ?? "").replace(/\r\n/g, "\n");
    if (norm(remote) !== norm(content)) {
      changes.push({ path, content, isNew: remote === null });
    }
  }

  if (changes.length === 0) {
    console.log("Up to date — no sync needed.");
    return { repo, status: "clean" };
  }

  console.log(`${changes.length} file(s) differ:`);
  for (const c of changes) console.log(`  ${c.isNew ? "NEW" : "MOD"} ${c.path}`);
  if (dryRun) return { repo, status: "dry-run", changes: changes.length };

  const branch = `harness-sync/${version}`;
  const baseSha = ghJson(["api", `repos/${repo}/git/ref/heads/${base}`]).object.sha;
  const baseCommit = ghJson(["api", `repos/${repo}/git/commits/${baseSha}`]);

  // Create blobs + tree
  const treeEntries = changes.map(({ path, content }) => {
    const blob = ghJson(
      ["api", `repos/${repo}/git/blobs`, "--method", "POST", "--input", "-"],
      JSON.stringify({ content: Buffer.from(content).toString("base64"), encoding: "base64" }),
    );
    return { path, mode: "100644", type: "blob", sha: blob.sha };
  });
  const tree = ghJson(
    ["api", `repos/${repo}/git/trees`, "--method", "POST", "--input", "-"],
    JSON.stringify({ base_tree: baseCommit.tree.sha, tree: treeEntries }),
  );
  const commit = ghJson(
    ["api", `repos/${repo}/git/commits`, "--method", "POST", "--input", "-"],
    JSON.stringify({
      message: `harness: sync to agentic-business-os@${version}`,
      tree: tree.sha,
      parents: [baseSha],
    }),
  );

  // Create or update the branch
  try {
    gh(
      ["api", `repos/${repo}/git/refs`, "--method", "POST", "--input", "-"],
      JSON.stringify({ ref: `refs/heads/${branch}`, sha: commit.sha }),
    );
  } catch {
    gh(
      ["api", `repos/${repo}/git/refs/heads/${branch}`, "--method", "PATCH", "--input", "-"],
      JSON.stringify({ sha: commit.sha, force: true }),
    );
  }

  const body = [
    `## Harness sync — \`agentic-business-os@${version}\``,
    "",
    "Upstream harness improvements for this instance. Per the [HARNESS.md contract](https://github.com/frankxai/agentic-business-os/blob/main/HARNESS.md):",
    "",
    "- **Nothing auto-merges.** Read the diffs, merge or decline — declining is always safe.",
    "- Your brand files (doctrine, voice, design contract, content, memory) are untouched by design.",
    "",
    "### Changed files",
    ...changes.map((c) => `- ${c.isNew ? "🆕" : "✏️"} \`${c.path}\``),
    "",
    `Changelog: https://github.com/frankxai/agentic-business-os/releases/tag/${version}`,
  ].join("\n");

  const pr = ghJson(
    ["api", `repos/${repo}/pulls`, "--method", "POST", "--input", "-"],
    JSON.stringify({
      title: `Harness sync: agentic-business-os@${version}`,
      head: branch,
      base,
      body,
    }),
  );
  console.log(`PR opened: ${pr.html_url}`);
  return { repo, status: "pr-opened", url: pr.html_url };
}

// --- main ---
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const repoFlag = args.indexOf("--repo");
let repos = [];
if (repoFlag !== -1) {
  repos = [args[repoFlag + 1]];
} else if (args.includes("--all")) {
  repos = JSON.parse(readFileSync(join(ROOT, "downstreams.json"), "utf8")).downstreams.map((d) => d.repo);
} else {
  console.error("Usage: harness-sync.mjs --repo owner/repo | --all  [--dry-run]");
  process.exit(1);
}

const results = [];
for (const repo of repos) {
  try {
    results.push(syncRepo(repo, { dryRun }));
  } catch (err) {
    console.error(`FAILED ${repo}: ${err.message}`);
    results.push({ repo, status: "error", error: err.message });
  }
}
console.log("\n" + JSON.stringify(results, null, 2));
if (results.some((r) => r.status === "error")) process.exit(1);
