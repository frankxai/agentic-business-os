import { NextRequest, NextResponse } from "next/server";

/**
 * Launch-notify list endpoint — stub.
 *
 * TODO before launch: wire to an email provider (Resend, Buttondown, or
 * Loops). Until then this validates the address and redirects back so the
 * form works end-to-end without storing anything.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.redirect(
      new URL("/products?error=invalid-email", request.url),
      303,
    );
  }

  // Intentionally not persisted yet — no silent data collection before the
  // provider + privacy policy are in place.
  return NextResponse.redirect(
    new URL("/products?subscribed=1", request.url),
    303,
  );
}
