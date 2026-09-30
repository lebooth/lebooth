import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer({ night = false }: { night?: boolean }) {
  return (
    <footer className="footer" data-theme={night ? "night" : undefined}>
      <span className="row gap-10" style={{ flexWrap: "nowrap" }}>
        <Image src="/images/logo-mark.png" alt="" width={15} height={15} className="mark" style={{ opacity: 0.7 }} />
        <span>LE BOOTH ✳ SAN DIEGO &amp; LOS ANGELES ✳ EST. {site.founded}</span>
      </span>
      <span className="row gap-16">
        <a href={`mailto:${site.email}`}>{site.email.toUpperCase()}</a>
        <a href={site.phoneHref}>{site.phone}</a>
        <span>© {new Date().getFullYear()} LE BOOTH</span>
      </span>
    </footer>
  );
}
