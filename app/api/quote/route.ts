import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Receives quote requests from /quote.
 * - RESEND_API_KEY set: emails the lead to QUOTE_TO_EMAIL (reply goes straight to the client)
 * - QUOTE_WEBHOOK_URL set: also POSTs the lead as JSON (Zapier, Make, a spreadsheet, etc.)
 * - Neither set: logs the lead to the server console (fine for local dev)
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend it worked.
  if (clip(body.company)) return NextResponse.json({ ok: true });

  const lead = {
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 60),
    intent: clip(body.intent, 80),
    amount: clip(body.amount, 80),
    addons: Array.isArray(body.addons) ? body.addons.map((a) => clip(a, 80)).filter(Boolean).slice(0, 12) : [],
    date: clip(body.date, 120),
    place: clip(body.place, 200),
    size: clip(body.size, 120),
    source: clip(body.source, 200),
    notes: clip(body.notes, 4000),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "Name and a valid email are required." }, { status: 422 });
  }

  const text = [
    `New quote request from ${lead.name}`,
    "",
    `Interested in: ${lead.intent || "-"}`,
    `How much:      ${lead.amount || "-"}`,
    `Nice to have:  ${lead.addons.length ? lead.addons.join(", ") : "-"}`,
    "",
    `Email:  ${lead.email}`,
    `Phone:  ${lead.phone || "-"}`,
    `Date:   ${lead.date || "-"}`,
    `Where:  ${lead.place || "-"}`,
    `Size:   ${lead.size || "-"}`,
    `Heard about us: ${lead.source || "-"}`,
    "",
    "Notes:",
    lead.notes || "-",
    "",
    `Received ${lead.receivedAt}`,
    "Reply to this email to answer them directly, and include your HoneyBook link.",
  ].join("\n");

  const tasks: Promise<void>[] = [];

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.QUOTE_FROM_EMAIL || "Le Booth <quotes@le-booth.com>",
          to: [process.env.QUOTE_TO_EMAIL || "info@le-booth.com"],
          reply_to: lead.email,
          subject: `Quote request: ${lead.intent || "New lead"} · ${lead.name}`,
          text,
        }),
      }).then(async (r) => {
        if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
      })
    );
  }

  const webhook = process.env.QUOTE_WEBHOOK_URL;
  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).then((r) => {
        if (!r.ok) throw new Error(`Webhook ${r.status}`);
      })
    );
  }

  if (!tasks.length) {
    console.info(`[quote] RESEND_API_KEY / QUOTE_WEBHOOK_URL not set, lead only logged:\n${text}`);
    return NextResponse.json({ ok: true });
  }

  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failed.forEach((f) => console.error("[quote] delivery failed:", f.reason));
  if (failed.length === results.length) {
    return NextResponse.json({ ok: false, error: "Could not deliver" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
