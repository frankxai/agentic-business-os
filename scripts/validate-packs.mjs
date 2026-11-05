import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const packsRoot = path.join(root, "packs");
const registry = JSON.parse(fs.readFileSync(path.join(packsRoot, "registry.json"), "utf8"));
const errors = [];
const ids = new Set();

for (const entry of registry.packs ?? []) {
  if (ids.has(entry.id)) errors.push(`duplicate registry id: ${entry.id}`);
  ids.add(entry.id);
  const folder = path.join(packsRoot, entry.id);
  const manifestPath = path.join(folder, "manifest.json");
  const skillPath = path.join(folder, "SKILL.md");
  if (!fs.existsSync(manifestPath)) {
    errors.push(`${entry.id}: manifest.json missing`);
    continue;
  }
  if (!fs.existsSync(skillPath)) {
    errors.push(`${entry.id}: SKILL.md missing`);
    continue;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (manifest.id !== entry.id) errors.push(`${entry.id}: manifest id mismatch`);
  if (manifest.version !== entry.version) errors.push(`${entry.id}: registry/manifest version mismatch`);
  if (manifest.entrypoint !== "SKILL.md") errors.push(`${entry.id}: entrypoint must be SKILL.md`);
  const skill = fs.readFileSync(skillPath, "utf8");
  if (!/^---\r?\nname:\s*[^\r\n]+\r?\ndescription:\s*[^\r\n]+\r?\n---/m.test(skill)) {
    errors.push(`${entry.id}: invalid name/description frontmatter`);
  }
  if (/\[TODO|TODO:/i.test(skill)) errors.push(`${entry.id}: unresolved TODO in SKILL.md`);
  for (const match of skill.matchAll(/\]\((references\/[^)#]+)(?:#[^)]+)?\)/g)) {
    if (!fs.existsSync(path.join(folder, match[1]))) errors.push(`${entry.id}: missing ${match[1]}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Pack registry valid: ${registry.packs.length} packs`);
