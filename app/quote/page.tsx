import type { Metadata } from "next";
import Image from "next/image";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import SubHeader from "@/components/SubHeader";
import { quoteFaqs } from "@/lib/faqs";
import { baseOpenGraph, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Get a Quote | Le Booth Photo Booths, San Diego & Los Angeles" },
  description:
    "Tell us about your wedding, event, or venue and we’ll send a personalized photo booth quote with a booking link, usually within one business day.",
  alternates: { canonical: "/quote" },
  openGraph: {
    ...baseOpenGraph,
    title: "Get a Quote | Le Booth",
    description: "Personalized photo booth quotes for San Diego and Los Angeles weddings, events, and venues.",
    url: "/quote",
  },
};

export default function QuotePage() {
  return (
    <div className="page" data-theme="day">
      <a href="#main" className="skip">Skip to content</a>
      <SubHeader
        links={[
          { href: "/", label: "HOME" },
          { href: "/about", label: "ABOUT US" },
          { href: "/#services", label: "SERVICES" },
          { href: "/#gallery", label: "GALLERY" },
        ]}
        end={<span className="subheader-note">SAN DIEGO ✳︎ EST. 2025</span>}
      />

      <main id="main">
        <section className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 80px) clamp(52px, 8vw, 96px)" }}>
          <div className="grid g-400 items-start" style={{ gap: "clamp(30px, 4.5vw, 56px)" }}>
            <div className="stack gap-18 sticky-col">
              <span className="eyebrow eyebrow-strong">GET A QUOTE</span>
              <h1 className="h-quote h-stack">
                <span>TELL US ABOUT</span>
                <span>YOUR EVENT.</span>
                <span className="sub">Or your venue.</span>
              </h1>
              <p className="lead lead-18" style={{ maxWidth: "42ch" }}>
                Answer a few questions and we’ll send a personalized quote with a booking link, usually within one business
                day. No pressure.
              </p>
              <ul className="intro-list">
                <li>Weddings, corporate events, and private parties</li>
                <li>Custom booth builds, shipped nationwide</li>
                <li>Venue installs on a revenue split, no cost to the venue</li>
              </ul>
              <div className="contact-list">
                <a href={`mailto:${site.email}`}>{site.email.toUpperCase()}</a>
                <a href={site.phoneHref}>{site.phone}</a>
                <span>SAN DIEGO &amp; LOS ANGELES</span>
              </div>
              <Image src="/images/logo-mark.png" alt="" width={110} height={110} className="ghost-mark" />
            </div>

            <QuoteForm />
          </div>
        </section>

        <section className="wrap rule-t" style={{ paddingBlock: "clamp(48px, 7vw, 80px)" }}>
          <div className="grid g-320 gap-md items-start" data-reveal>
            <h2 className="serif sticky-col" style={{ fontSize: "clamp(30px, 4.6vw, 46px)", lineHeight: 1 }}>Before you ask.</h2>
            <Faq items={quoteFaqs} compact />
          </div>
        </section>
      </main>

      <Footer night />
    </div>
  );
}
