import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import OjosStar from "@/components/OjosStar";
import ScrollProgress from "@/components/ScrollProgress";
import SubHeader from "@/components/SubHeader";
import { baseOpenGraph, site } from "@/lib/site";

/*
     site, booths and everything you see here by ojos
     ojos = eyes. keep searching.
*/

export const metadata: Metadata = {
  title: { absolute: "About Le Booth | Hand-Built Photo Booths, San Diego, Est. 2025" },
  description:
    "Le Booth was founded in 2025 by Leonardo Amezcua. Every booth is hand-built in our San Diego shop for weddings and events across San Diego and Los Angeles.",
  alternates: { canonical: "/about" },
  openGraph: {
    ...baseOpenGraph,
    title: "About Le Booth | Hand-Built Photo Booths, San Diego",
    description: "Founded 2025 by Leonardo Amezcua. Hand-built photo booths for San Diego and Los Angeles weddings and events.",
    url: "/about",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    foundingDate: site.founded,
    founder: { "@type": "Person", name: site.founder, alternateName: "ojos" },
    email: site.email,
    telephone: site.phoneE164,
    address: { "@type": "PostalAddress", addressLocality: "San Diego", addressRegion: "CA", addressCountry: "US" },
    areaServed: [
      { "@type": "City", name: "San Diego" },
      { "@type": "City", name: "Los Angeles" },
    ],
  },
};

const HOW_WE_WORK = [
  ["Hand-built", "Every booth is fabricated in our San Diego shop, not ordered from a catalog. Real materials, real finishes, serviceable parts."],
  ["Studio lighting", "Strobe and a diffused key light, so every photo looks like it was shot in a studio."],
  ["Yours, branded", "Print layouts, on-screen flow, and share messages designed around your colors, monogram, or logo, with up to two rounds of revisions."],
  ["On the night", "We deliver, set up, run it, and pack out. Unlimited sessions while we’re there, prints on the spot, and an online gallery after the event with the Signature and Bespoke."],
];

export default function AboutPage() {
  return (
    <div className="page about-theme" data-theme="night">
      <JsonLd data={aboutJsonLd} />
      <a href="#main" className="skip">Skip to content</a>
      <ScrollProgress />
      <SubHeader
        links={[
          { href: "/", label: "HOME" },
          { href: "/#services", label: "SERVICES" },
          { href: "/#gallery", label: "GALLERY" },
          { href: "/quote", label: "GET A QUOTE" },
        ]}
        end={<Link href="/quote" className="btn btn-sm">BOOK</Link>}
      />

      <main id="main">
        <section className="wrap grid g-400 items-center" style={{ gap: "clamp(30px, 4.5vw, 56px)", paddingBlock: "clamp(56px, 8vw, 100px) clamp(52px, 7vw, 90px)" }}>
          <div className="stack gap-20">
            <span className="eyebrow">ABOUT US ✳︎ SAN DIEGO</span>
            <h1 className="about-h1">
              <span className="sr-only">Le Booth, hand-built photo booths in San Diego, </span>Est. 2025
            </h1>
            <p className="about-lead">
              Founded in 2025 by Leonardo Amezcua. Since its founding, Le Booth has been the go-to company for quality photo
              booth needs and events across San Diego, from premium booth rentals to fully custom built booths. Have a
              project in mind? We’d love to help bring it to life.
            </p>
            <div className="btn-row">
              <Link href="/quote" className="btn">START A PROJECT</Link>
              <Link href="/#gallery" className="btn btn-outline">SEE THE WORK</Link>
            </div>
          </div>
          <OjosStar />
        </section>

        <section className="wrap sec-sm rule-t">
          <div className="grid g-340 gap-md items-start" data-reveal>
            <h2 className="h-mid sticky-col" style={{ fontSize: "clamp(28px, 4.4vw, 44px)" }}>HOW WE WORK</h2>
            <div className="panels">
              {HOW_WE_WORK.map(([title, body]) => (
                <div className="panel-cell" key={title}>
                  <span className="serif">{title}</span>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap sec-sm rule-t">
          <div className="grid g-360 items-center" style={{ gap: "clamp(26px, 3.5vw, 40px)" }} data-reveal>
            <div className="founder-photo">
              <Image
                src="/images/founder.webp"
                alt="Leonardo Amezcua, founder of Le Booth, sitting on a log below a waterfall"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                className="cover"
                style={{ objectPosition: "50% 65%" }}
              />
            </div>
            <div className="stack gap-16 founder">
              <span className="eyebrow">THE FOUNDER</span>
              <h3 className="founder-name">Leonardo Amezcua</h3>
              <p className="lead">
                The intention is to live a life that is in the search of exploration and creativity, always building, always
                trying the next idea. Le Booth was born out of that: a way to turn that curiosity into something other people
                could step inside. But the point is what happens there. Every booth is built to hold a memory. That’s how every
                build and every event runs.
              </p>
              <div className="signed">
                <span className="signed-label">SIGNED</span>
                <span className="signed-name">ojos</span>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap sec" data-theme="day" style={{ background: "var(--bg)" }}>
          <div className="cta-band" data-reveal>
            <div className="row gap-20" style={{ flexWrap: "nowrap", maxWidth: "38ch" }}>
              <Image src="/images/logo-mark.png" alt="" width={44} height={44} className="cta-mark" />
              <h2 className="h-cta-serif">Have a project in mind? We’d love to help bring it to life.</h2>
            </div>
            <Link href="/quote" className="btn btn-lg btn-dark">GET A QUOTE</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
