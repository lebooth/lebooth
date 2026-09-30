"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The big asterisk on the About page. It turns gently as you scroll.
 * Tap it five times and "ojos" appears.
 * Also leaves a note in the live DOM for anyone who opens DevTools.
 */
export default function OjosStar() {
  const [taps, setTaps] = useState(0);
  const rot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.ojos) {
      root.dataset.ojos = "1";
      root.appendChild(document.createComment(" site, booths and everything you see here by ojos. ojos = eyes. keep searching. "));
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = rot.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const p = (window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight;
      el.style.transform = `rotate(${(p * 26).toFixed(2)}deg)`;
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

  const found = taps >= 5;

  return (
    <div className={`ojos-star${found ? " is-found" : ""}`}>
      <button type="button" className="star-btn" onClick={() => setTaps((t) => t + 1)} aria-label="Le Booth asterisk mark">
        <span ref={rot} className="star-rot">
          <Image src="/images/logo-mark.png" alt="" width={440} height={440} className="mark star-img" priority draggable={false} />
        </span>
      </button>
      <span className="ojos-reveal" aria-hidden={!found}>ojos</span>
    </div>
  );
}
