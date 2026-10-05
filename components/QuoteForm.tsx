"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { SENT_KEY, type SentHandoff } from "./QuoteSent";

const INTENTS = ["Wedding", "Corporate or brand event", "Private party", "Buy a custom booth", "Profit share in my venue"];

type Fields = { name: string; email: string; phone: string; date: string; place: string; size: string; source: string; notes: string };
const EMPTY: Fields = { name: "", email: "", phone: "", date: "", place: "", size: "", source: "", notes: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function QuoteForm() {
  const [intent, setIntent] = useState(0);
  const [amount, setAmount] = useState(1);
  const [addons, setAddons] = useState<number[]>([]);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const isBuild = intent === 3;
  const isVenue = intent === 4;

  const amountOpts = isBuild || isVenue
    ? ["One booth", "Two booths", "Three or more", "Not sure yet"]
    : ["3 hours", "4 hours", "6+ hours", "Not sure yet"];
  const addonOpts = isBuild
    ? ["Full custom design", "Extra camera", "Extra printer", "On-site training"]
    : isVenue
      ? ["Card payments", "Branded prints", "Weekly restock", "Revenue reporting", "Social sharing"]
      : ["Custom wrap", "Extra hours", "Online gallery", "Props", "Custom signage", "Custom curtains"];

  const dateLabel = isBuild ? "When do you need it delivered?" : isVenue ? "When could we visit?" : "Event date";
  const placeLabel = isVenue ? "Venue name and city" : isBuild ? "Where should it ship?" : "Venue and city";
  const sizeLabel = isVenue ? "Average weekly foot traffic" : isBuild ? "Renting it out or hosting it?" : "Guest count";
  const notesLabel = isVenue
    ? "Tell us about the space: the room, the crowd, the nights."
    : isBuild
      ? "What should it look like, and what’s it for?"
      : "Anything else? Vibe, colors, timeline, must-have photos.";

  const set = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFields((f) => ({ ...f, [key]: value }));
    if (error) setError("");
  };

  const pickIntent = (i: number) => {
    setIntent(i);
    setAddons([]); // add-on options differ per intent
  };

  const toggleAddon = (i: number) =>
    setAddons((a) => (a.includes(i) ? a.filter((x) => x !== i) : [...a, i]));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const name = fields.name.trim();
    const email = fields.email.trim();
    if (!name) {
      setError("Add your name so we know who we’re quoting.");
      nameRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError(email ? "That email doesn’t look right, mind checking it?" : "Add an email so we can send the quote.");
      emailRef.current?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          name,
          email,
          intent: INTENTS[intent],
          amount: amountOpts[amount],
          addons: addons.map((i) => addonOpts[i]),
          company: honeypot,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      setStatus("idle");
      setError("Something went wrong sending that. Try again, or email info@le-booth.com.");
      return;
    }
    // Hand the recap to /quote/thanks, which shows it and fires the Google Ads conversion once.
    // Skipped when the spam trap was filled, so bots never count as leads.
    if (!honeypot) {
      const recap = [INTENTS[intent], amountOpts[amount], addons.length ? `${addons.length} add-on${addons.length === 1 ? "" : "s"}` : null, fields.date.trim() || null]
        .filter(Boolean)
        .join("  ✳︎  ");
      const handoff: SentHandoff = { recap, at: Date.now() };
      try {
        window.sessionStorage.setItem(SENT_KEY, JSON.stringify(handoff));
      } catch {
        // Storage blocked (private mode etc.): the thanks page still shows, just without the recap or conversion.
      }
    }
    // Full page load (not client-side) so the Google tag records a fresh page view of /quote/thanks.
    window.location.assign("/quote/thanks");
  }

  return (
    <form className="panel" data-theme="night" onSubmit={onSubmit} noValidate aria-label="Quote request">
      <div className="stack gap-8" role="group" aria-labelledby="q-step1">
        <span id="q-step1" className="step-label">STEP 01 ✳︎ I’M INTERESTED IN</span>
        <div className="chips chips-lg">
          {INTENTS.map((label, i) => (
            <button key={label} type="button" className="chip" aria-pressed={intent === i} onClick={() => pickIntent(i)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="stack gap-12">
        <span className="step-label">STEP 02 ✳︎ THE DETAILS</span>
        <div className="fields">
          <label className="sr-only" htmlFor="q-name">Full name</label>
          <input id="q-name" ref={nameRef} className="field" value={fields.name} onChange={set("name")} placeholder="Full name (required)" autoComplete="name" required />
          <label className="sr-only" htmlFor="q-email">Email address</label>
          <input id="q-email" ref={emailRef} className="field" value={fields.email} onChange={set("email")} placeholder="Email (required)" type="email" autoComplete="email" required />
        </div>
        <div className="fields">
          <label className="sr-only" htmlFor="q-phone">Phone number</label>
          <input id="q-phone" className="field" value={fields.phone} onChange={set("phone")} placeholder="Phone" type="tel" autoComplete="tel" />
          <label className="sr-only" htmlFor="q-date">{dateLabel}</label>
          <input id="q-date" className="field" value={fields.date} onChange={set("date")} placeholder={dateLabel} />
        </div>
        <div className="fields">
          <label className="sr-only" htmlFor="q-place">{placeLabel}</label>
          <input id="q-place" className="field" value={fields.place} onChange={set("place")} placeholder={placeLabel} />
          <label className="sr-only" htmlFor="q-size">{sizeLabel}</label>
          <input id="q-size" className="field" value={fields.size} onChange={set("size")} placeholder={sizeLabel} />
        </div>
      </div>

      <div className="stack gap-8" role="group" aria-labelledby="q-step3">
        <span id="q-step3" className="step-label">STEP 03 ✳︎ HOW MUCH DO YOU NEED?</span>
        <div className="chips">
          {amountOpts.map((label, i) => (
            <button key={label} type="button" className="chip" aria-pressed={amount === i} onClick={() => setAmount(i)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="stack gap-8" role="group" aria-labelledby="q-step4">
        <span id="q-step4" className="step-label">STEP 04 ✳︎ NICE TO HAVE</span>
        <div className="chips">
          {addonOpts.map((label, i) => (
            <button key={label} type="button" className="chip" aria-pressed={addons.includes(i)} onClick={() => toggleAddon(i)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="stack gap-8">
        <label htmlFor="q-source" className="step-label">STEP 05 ✳︎ WHERE DID YOU HEAR ABOUT US?</label>
        <input id="q-source" className="field" value={fields.source} onChange={set("source")} placeholder="Instagram, Google, a friend, my venue..." />
      </div>

      <div className="stack gap-8">
        <label htmlFor="q-notes" className="step-label">STEP 06 ✳︎ ANYTHING ELSE</label>
        <textarea id="q-notes" className="field" value={fields.notes} onChange={set("notes")} placeholder={notesLabel} rows={4} />
      </div>

      {/* spam trap: hidden from people, bots fill it in */}
      <div className="hp" aria-hidden="true">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      {error && <div className="alert" role="alert">{error}</div>}

      <button type="submit" className="btn btn-send" disabled={status === "sending"}>
        {status === "sending" ? "SENDING…" : "SEND MY DETAILS"}
      </button>
      <span className="fineprint">We’ll reply with a personalized quote and a link to book, no spam, no calls you didn’t ask for.</span>
    </form>
  );
}
