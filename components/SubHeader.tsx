import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type NavLink = { href: string; label: string };

export default function SubHeader({ links, end }: { links: NavLink[]; end: ReactNode }) {
  return (
    <header className="subheader">
      <Link href="/" aria-label="Le Booth home">
        <Image src="/images/logo-mark.png" alt="" width={32} height={32} className="mark" priority />
      </Link>
      <nav className="nav" aria-label="Main">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
      </nav>
      {end}
    </header>
  );
}
