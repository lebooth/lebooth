"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import EyesBook from "./EyesBook";
import ScrollProgress from "./ScrollProgress";

type Theme = "night" | "day";
const STORAGE_KEY = "lebooth-theme";

/**
 * Home page chrome: announcement bar, hero header with the day/night toggle,
 * and the compact nav that slides in once the hero is behind you.
 * Page sections are passed in as children and stay server-rendered.
 */
export default function HomeShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("night");
  const [theming, setTheming] = useState(false);
  const [navShown, setNavShown] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "day" || saved === "night") setTheme(saved);
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const hero = document.getElementById("top");
      const trigger = hero ? hero.offsetTop + hero.offsetHeight * 0.75 : 520;
      setNavShown(window.scrollY > trigger);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggleTheme = () => {
    const next: Theme = theme === "night" ? "day" : "night";
    window.clearTimeout(timer.current);
    setTheme(next);
    setTheming(true);
    window.localStorage.setItem(STORAGE_KEY, next);
    timer.current = window.setTimeout(() => setTheming(false), 2800);
  };

  return (
    <div className="page" data-theme={theme} data-theming={theming ? "1" : "0"}>
      <a href="#main" className="skip">Skip to content</a>

      <div className="bar">
        <Image src="/images/logo-mark.png" alt="" width={12} height={12} />
        <span>NOW BOOKING 2026 &amp; 2027 WEDDINGS ✳︎ CUSTOM BUILDS SHIPPING NATIONWIDE</span>
      </div>

      <ScrollProgress />

      <header className="hero-header">
        <div className="side">
          <a href="#top" aria-label="Le Booth, back to top">
            <Image src="/images/logo-mark.png" alt="" width={32} height={32} className="mark twitch" priority />
          </a>
        </div>
        <nav className="nav" aria-label="Main">
          <Link href="/quote">GET A QUOTE</Link>
          <Link href="/about">ABOUT US</Link>
          <a href="#services">SERVICES</a>
          <a href="#gallery">GALLERY</a>
        </nav>
        <div className="side end">
          <button
            type="button"
            className="sun-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === "day"}
            aria-label={theme === "day" ? "Switch to night mode" : "Switch to day mode"}
            title="Day / night"
          >
            <span className="sun-horizon" aria-hidden="true">
              <span className="sun-disc" />
            </span>
          </button>
          <EyesBook />
        </div>
      </header>

      <div className={`stickynav${navShown ? " is-shown" : ""}`} inert={!navShown} aria-label="Section navigation">
        <a href="#top" className="stickynav-brand" aria-label="Le Booth, back to top">
          <Image src="/images/logo-mark.png" alt="" width={21} height={21} className="mark" />
          <span className="stickynav-word" aria-hidden="true">LE BOOTH</span>
        </a>
        <div className="stickynav-links">
          <span className="stickynav-links stickynav-sections">
            <a href="#rentals">RENTALS</a>
            <a href="#custom">CUSTOM</a>
            <a href="#profit">VENUES</a>
            <a href="#gallery">GALLERY</a>
            <Link href="/about">ABOUT</Link>
          </span>
          <Link href="/quote" className="btn btn-xs">BOOK</Link>
        </div>
      </div>

      {children}
    </div>
  );
}
