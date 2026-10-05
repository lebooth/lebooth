"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/** sessionStorage handoff from QuoteForm: set right before it navigates here after a successful submit. */
export const SENT_KEY = "lebooth-quote-sent";
export type SentHandoff = { recap: string; at: number };

/** Google Ads "Request Quote" conversion. Fired once, on arrival from a successful submission only. */
const QUOTE_CONVERSION = { send_to: "AW-18490897737/OrMXCKHd-Y8dEMnqkvFE", value: 1.0, currency: "USD" };
const MAX_AGE_MS = 10 * 60 * 1000;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Module-level so React's dev double-run of effects can't read/fire twice. Resets on each full page load.
let handoff: SentHandoff | null | undefined;
let fired = false;

function takeHandoff(): SentHandoff | null {
  if (handoff !== undefined) return handoff;
  try {
    const raw = window.sessionStorage.getItem(SENT_KEY);
    window.sessionStorage.removeItem(SENT_KEY); // a reload or a direct visit never counts again
    const parsed = raw ? (JSON.parse(raw) as SentHandoff) : null;
    handoff = parsed && Date.now() - parsed.at < MAX_AGE_MS ? parsed : null;
  } catch {
    handoff = null;
  }
  return handoff;
}

export default function QuoteSent() {
  const [recap, setRecap] = useState("");

  useEffect(() => {
    const h = takeHandoff();
    if (!h) return;
    setRecap(h.recap);
    if (fired) return;
    fired = true;
    // The Google tag (app/layout.tsx) loads after the page; wait for it, then send the conversion.
    let tries = 0;
    const timer = window.setInterval(() => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", QUOTE_CONVERSION);
        window.clearInterval(timer);
      } else if (++tries > 50) {
        window.clearInterval(timer);
      }
    }, 200);
  }, []);

  return (
    <div className="panel" data-theme="night" role="status">
      <div className="sent">
        <Image src="/images/logo-mark.png" alt="" width={52} height={52} className="mark" />
        <span className="sent-title">Got it, thanks.</span>
        <span className="lead" style={{ fontSize: 16, maxWidth: "44ch" }}>
          We’ll read through your details and email a personalized quote with a link to book, usually within one business day.
        </span>
        {recap && (
          <div className="recap">
            <span className="step-label">WHAT YOU SENT</span>
            <span style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(var(--ink-rgb), 0.8)" }}>{recap}</span>
          </div>
        )}
        <Link href="/" className="btn btn-outline btn-sm btn-self" style={{ marginTop: 8 }}>BACK HOME</Link>
      </div>
    </div>
  );
}
