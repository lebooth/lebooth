import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Gallery, { type GalleryItem } from "@/components/Gallery";
import HomeShell from "@/components/HomeShell";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd, homeFaqs } from "@/lib/faqs";
import { businessJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Le Booth | Photo Booth Rentals & Custom Booths in San Diego & Los Angeles" },
  description:
    "Hand-built photo booths for San Diego and Los Angeles weddings and events. Booth rentals with unlimited photo sessions and printed strips, fully custom booth builds, and free venue installs on a revenue share. Est. 2025.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Le Booth | Photo Booth Rentals & Custom Booths in San Diego",
    description:
      "Hand-built photo booths for weddings and events across San Diego and Los Angeles. Rentals, custom builds, and free venue installs on a revenue share.",
    url: "/",
  },
};

/** Flip to false to hide the planner / vendor referral section. */
const SHOW_REFERRAL = true;

const gallery: GalleryItem[] = [
  { src: "/images/g-glow-angle.jpg", alt: "Le Booth photo booth at dusk with its panels lit from inside, string lights overhead", width: 1067, height: 1600 },
  { src: "/images/g-night-blur.jpg", alt: "Long-exposure night shot of the booth glowing warm from within", width: 1280, height: 1600 },
  { src: "/images/g-front-fountain.jpg", alt: "Front view through the open booth toward a courtyard fountain", width: 1076, height: 1600 },
  { src: "/images/g-panel-detail.jpg", alt: "Close-up of the booth light panels, aluminum trim, and camera port", width: 1224, height: 1600 },
];

/** Rental packages, kept short on the cards. No prices on the site: everything routes to the quote form. */
const PACKAGES = [
  {
    name: "The Classic",
    hours: "3 HOURS",
    popular: false,
    summary: "Enclosed booth, unlimited sessions and prints, custom strip artwork. Delivery, setup, and removal included.",
  },
  {
    name: "The Signature",
    hours: "4 HOURS",
    popular: true,
    summary: "The Classic, matched to your event with a custom backdrop, curtain, and sign, plus an online gallery.",
  },
  {
    name: "The Bespoke",
    hours: "6 HOURS",
    popular: false,
    summary: "Designed from scratch around your brand or event, from a full booth wrap to bespoke prints and an online gallery.",
  },
];

const MARQUEE = "WEDDINGS ✳︎ RECEPTIONS ✳︎ CORPORATE ✳︎ BRAND ACTIVATIONS ✳︎ BARS & CLUBS ✳︎ RESTAURANTS ✳︎ SAN DIEGO ✳︎ LOS ANGELES ✳︎";

export default function HomePage() {
  return (
    <HomeShell>
      <JsonLd data={businessJsonLd} />
      <JsonLd data={faqJsonLd(homeFaqs)} />

      <main id="main">
        {/* ---------- hero ---------- */}
        <section id="top" className="hero">
          <Image src="/images/booth-night.jpg" alt="" fill priority sizes="100vw" className="hero-img" />
          <div className="hero-overlay" aria-hidden="true" />
          <h1 className="wordmark">
            <span className="sr-only">Le Booth, hand-built photo booth rentals and custom photo booths in San Diego and Los Angeles</span>
            <span className="wordmark-row" aria-hidden="true">
              <span className="wordmark-word">LE</span>
              <Image src="/images/logo-mark.png" alt="" width={26} height={26} className="mark wordmark-mark" />
              <span className="wordmark-word">BOOTH</span>
            </span>
            <span className="wordmark-city" aria-hidden="true">SAN DIEGO</span>
          </h1>
          <span className="hero-caption">HAND-BUILT IN SAN DIEGO ✳︎ EST. 2025</span>
        </section>

        {/* ---------- intro ---------- */}
        <section id="what" className="wrap sec-lg rule-t">
          <div className="grid g-420 gap-xl items-start" data-reveal>
            <div className="stack gap-26">
              <h2 className="h-intro">
                Not just another booth <span className="h-intro-sub">Not just another event</span>
              </h2>
              <p className="lead lead-lg">
                Le Booth combines modern technology with timeless craftsmanship, creating a photo experience that feels as
                unique as your event. Each booth is hand-built and thoughtfully designed to complement the room it stands
                in, and to give your guests something real to take home.
              </p>
              <div className="btn-row">
                <Link href="/quote" className="btn">GET A QUOTE</Link>
                <a href="#profit" className="btn btn-outline">FOR VENUES</a>
              </div>
            </div>
            <div className="grid g-240 gap-14 items-start">
              <div className="media" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src="/images/guests-portrait.png"
                  alt="Guests photographed inside a Le Booth photo booth"
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                  className="cover"
                />
              </div>
              <AutoVideo src="/media/booth-video.mp4" label="Guests using the Le Booth photo booth" className="media-video" />
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>{MARQUEE}</span>
            <span>{MARQUEE}</span>
            <span>{MARQUEE}</span>
          </div>
        </div>

        {/* ---------- services ---------- */}
        <section id="services" className="wrap" style={{ paddingTop: "clamp(52px, 8vw, 96px)" }}>
          <div className="stack gap-10" style={{ maxWidth: 940 }} data-reveal>
            <span className="eyebrow">WHAT WE DO</span>
            <h2 className="h-sect">
              RENT ONE. BUY ONE. <span className="serif-i">or host one free.</span>
            </h2>
          </div>
        </section>

        <section id="rentals" className="wrap sec-md rule-b">
          <div className="grid g-420 gap-lg items-center" data-reveal>
            <div className="media media-rentals">
              <Image
                src="/images/booth-angle.png"
                alt="Le Booth enclosed photo booth set up outdoors under string lights at golden hour"
                fill
                sizes="(max-width: 900px) 90vw, 410px"
                className="cover"
              />
            </div>
            <div className="stack gap-18">
              <span className="eyebrow">01 ✳︎ WEDDINGS &amp; EVENTS</span>
              <h3 className="h-svc">PHOTO BOOTH RENTALS</h3>
              <p className="lead">
                Most of our nights are weddings, cocktail hour through last dance, and the same booths run company parties,
                birthdays, and brand activations. We deliver, set up, run the booth, and pack out. Unlimited sessions while
                we’re there, prints on the spot, and an online gallery after the event with the Signature and Bespoke.
              </p>
              <div className="grid gap-14 pkg-grid" style={{ paddingTop: 6 }}>
                {PACKAGES.map((p) => (
                  <div className={`card${p.popular ? " invert" : ""}`} key={p.name}>
                    <span className="tag">{p.hours}{p.popular ? " ✳︎ POPULAR" : ""}</span>
                    <span className="pkg-name">{p.name}</span>
                    <span className="small">{p.summary}</span>
                  </div>
                ))}
              </div>
              <Link href="/quote" className="btn btn-md btn-self" style={{ marginTop: 10 }}>CHECK MY DATE</Link>
            </div>
          </div>
        </section>

        <section id="custom" className="wrap sec-md rule-b">
          <div className="grid g-420 gap-lg items-center" data-reveal>
            <div className="stack gap-18">
              <span className="eyebrow">02 ✳︎ FOR OPERATORS &amp; BRANDS</span>
              <h3 className="h-svc">CUSTOM BUILT BOOTHS</h3>
              <p className="lead">
                Built to order, for brands that need an activation piece and venues that want a permanent fixture matched to
                the room. Design, fabrication, software, and setup training.
              </p>
              <ul className="ticks">
                <li>Any finish: powder coat, walnut, mirror, chrome, wrapped vinyl</li>
                <li>Mirrorless camera, studio strobe, dye-sub printer inside</li>
                <li>Your branding on the screen flow and prints</li>
                <li>One-person setup, and a walkthrough on servicing it</li>
              </ul>
              <div className="meta-row">
                <span className="eyebrow">LEAD TIME</span>
                <span className="serif">4–6 weeks</span>
                <span className="note">from approved design to delivery</span>
              </div>
              <Link href="/quote" className="btn btn-md btn-self" style={{ marginTop: 12 }}>START A BUILD</Link>
            </div>
            <div className="media media-custom">
              <Image
                src="/images/g-asterisk.jpg"
                alt="Custom Le Booth photo booth in walnut finish with the Le Booth asterisk mark"
                fill
                sizes="(max-width: 900px) 90vw, 440px"
                className="cover"
              />
            </div>
          </div>
        </section>

        <section id="profit" className="wrap sec bg-deep rule-b">
          <div className="stack gap-40" data-reveal>
            <div className="grid g-420 gap-lg items-end">
              <div className="stack gap-16">
                <span className="eyebrow eyebrow-strong">03 ✳︎ FOR VENUES</span>
                <h3 className="h-big">A BOOTH IN YOUR VENUE, AT NO COST TO YOU.</h3>
              </div>
              <p className="lead lead-18" style={{ maxWidth: "none" }}>
                We install one of our booths in your bar, club, restaurant, or lounge and maintain it. Guests pay per
                session, and you take a cut of every dollar it makes. No equipment cost, no staffing, no upkeep on your end.
              </p>
            </div>
            <div className="steps">
              {[
                ["01", "We walk your space", "A short visit to find the right corner: foot traffic, lighting, power."],
                ["02", "We install it free", "Booth, prints, and branding matched to your room. You pay nothing."],
                ["03", "Guests use it nightly", "Card or tap to start. We restock paper and service it on a schedule."],
                ["04", "You get paid monthly", "Transparent reporting on every session, your split deposited monthly."],
              ].map(([n, t, d]) => (
                <div className="step" key={n}>
                  <span className="num">{n}</span>
                  <span className="strong-16">{t}</span>
                  <span className="small">{d}</span>
                </div>
              ))}
            </div>
            <div className="callout invert">
              <div className="callout-copy">
                <Image src="/images/logo-mark.png" alt="" width={34} height={34} className="mark callout-mark" />
                <span className="serif" style={{ fontSize: 29 }}>Zero upfront. Zero staffing. A new line of revenue.</span>
              </div>
              <Link href="/quote" className="btn">TALK ABOUT MY VENUE</Link>
            </div>
          </div>
        </section>

        {/* ---------- gallery ---------- */}
        <section id="gallery" className="sec-bleed rule-b">
          <Gallery items={gallery} />
        </section>

        {/* ---------- referral ---------- */}
        {SHOW_REFERRAL && (
          <section id="referral" className="wrap sec-sm bg-deep rule-b">
            <div className="stack gap-34" data-reveal>
              <div className="grid g-380 items-end" style={{ gap: 48 }}>
                <div className="stack gap-14">
                  <span className="eyebrow">FOR PLANNERS, DJS &amp; PHOTOGRAPHERS</span>
                  <h2 className="h-mid">SEND US A COUPLE. WE’LL TAKE CARE OF YOU.</h2>
                </div>
                <p className="lead" style={{ maxWidth: "none" }}>
                  If you work weddings and events in Southern California, refer your clients to us and earn on every booking
                  that closes. No exclusivity, no paperwork. You make the intro, we handle the rest.
                </p>
              </div>
              <div className="steps">
                {[
                  ["01", "You make the intro", "Forward an email or drop our name. That’s the whole ask."],
                  ["02", "We quote and book", "Your client gets a real quote within a business day, not a price sheet."],
                  ["03", "You get paid", "A cut of every booking that closes, sent after the event runs."],
                ].map(([n, t, d]) => (
                  <div className="step" key={n} style={{ gap: 9, padding: 26 }}>
                    <span className="num" style={{ fontSize: 32 }}>{n}</span>
                    <span className="strong-16">{t}</span>
                    <span className="small">{d}</span>
                  </div>
                ))}
              </div>
              <div className="callout invert">
                <div className="callout-copy">
                  <Image src="/images/logo-mark.png" alt="" width={34} height={34} className="mark callout-mark" />
                  <span className="serif">Work weddings for a living? Let’s talk.</span>
                </div>
                <Link href="/quote" className="btn">JOIN THE REFERRAL LIST</Link>
              </div>
            </div>
          </section>
        )}

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="wrap sec rule-b">
          <div className="grid g-340 gap-md items-start" data-reveal>
            <div className="stack gap-12">
              <span className="eyebrow">QUESTIONS</span>
              <h2 className="serif" style={{ fontSize: "clamp(32px, 4.6vw, 52px)", lineHeight: 1 }}>Before you ask.</h2>
            </div>
            <Faq items={homeFaqs} defaultOpen={0} />
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="wrap sec" data-theme="day" style={{ background: "var(--bg)" }}>
          <div className="cta-band" data-reveal>
            <div className="cta-copy">
              <span className="eyebrow eyebrow-strong">NEXT STEP</span>
              <h2 className="h-big h-stack">
                {/* Inner span mirrors the approved prototype's markup, which sets where this line breaks */}
                <span>TELL US ABOUT<span style={{ display: "inline", letterSpacing: "-1.3px" }}>{" "}YOUR EVENT.</span></span>
                <span className="sub">Or your venue.</span>
              </h2>
              <p className="lead" style={{ maxWidth: "none" }}>
                A few questions and we’ll send a personalized quote with a booking link, usually within one business day.
              </p>
            </div>
            <div className="stack gap-12" style={{ alignItems: "flex-start" }}>
              <Link href="/quote" className="btn btn-lg btn-dark">GET A QUOTE</Link>
              <Link href="/about" className="link-quiet">OR READ OUR STORY →</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </HomeShell>
  );
}
