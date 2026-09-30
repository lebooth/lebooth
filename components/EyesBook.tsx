"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/** The BOOK button, with the O's as eyes that follow the cursor (ojos). */
export default function EyesBook() {
  const left = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      const L = left.current;
      const R = right.current;
      if (!L || !R || !L.parentElement || !R.parentElement) return;
      const bl = L.parentElement.getBoundingClientRect();
      const br = R.parentElement.getBoundingClientRect();
      const cx = (bl.left + bl.width / 2 + br.left + br.width / 2) / 2;
      const cy = (bl.top + bl.height / 2 + br.top + br.height / 2) / 2;
      const a = Math.atan2(y - cy, x - cx);
      const d = Math.min(1.5, Math.hypot(x - cx, y - cy) / 26);
      const t = `translate(${(Math.cos(a) * d).toFixed(2)}px, ${(Math.sin(a) * d).toFixed(2)}px)`;
      L.style.transform = t;
      R.style.transform = t;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <Link href="/quote" className="btn btn-sm" aria-label="Book">
      <span aria-hidden="true">B</span>
      <span className="eye" title="ojos" aria-hidden="true">
        <span ref={left} className="pupil" />
      </span>
      <span className="eye" title="ojos" aria-hidden="true">
        <span ref={right} className="pupil" />
      </span>
      <span aria-hidden="true">K</span>
    </Link>
  );
}
