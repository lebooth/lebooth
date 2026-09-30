"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent, type PointerEvent } from "react";

export type GalleryItem = { src: string; alt: string; width: number; height: number };

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, scroll: 0 });

  const slide = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.getBoundingClientRect().width + 14 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); slide(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); slide(-1); }
  };

  const onDown = (e: PointerEvent) => {
    const el = rail.current;
    if (!el || e.pointerType === "touch") return;
    drag.current = { down: true, x: e.clientX, scroll: el.scrollLeft };
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  };
  const onMove = (e: PointerEvent) => {
    const el = rail.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.scroll - (e.clientX - drag.current.x);
  };
  const onUp = () => {
    const el = rail.current;
    if (!el || !drag.current.down) return;
    drag.current.down = false;
    el.style.cursor = "grab";
    el.style.scrollSnapType = "x mandatory";
  };

  return (
    <>
      <div className="gallery-head" data-reveal>
        <div className="stack gap-10">
          <span className="eyebrow eyebrow-strong">THE WORK</span>
          <h2 className="h-big">THE BOOTH, UP CLOSE.</h2>
        </div>
        <div className="row gap-14">
          <span className="eyebrow eyebrow-strong">SWIPE OR DRAG</span>
          <div className="row gap-8">
            <button type="button" className="round-btn" onClick={() => slide(-1)} aria-label="Previous photo">←</button>
            <button type="button" className="round-btn solid" onClick={() => slide(1)} aria-label="Next photo">→</button>
          </div>
        </div>
      </div>
      <div
        ref={rail}
        className="gallery-rail"
        data-reveal
        role="region"
        aria-label="Photo gallery, scrollable"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onPointerCancel={onUp}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((it) => (
          <div key={it.src} className="gallery-item" style={{ aspectRatio: `${it.width} / ${it.height}` }}>
            <Image src={it.src} alt={it.alt} fill sizes="(max-width: 700px) 72vw, 360px" className="cover" draggable={false} />
          </div>
        ))}
      </div>
    </>
  );
}
