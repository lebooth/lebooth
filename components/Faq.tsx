"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/faqs";

export default function Faq({ items, defaultOpen = -1, compact = false }: { items: FaqItem[]; defaultOpen?: number; compact?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();

  return (
    <div className={`faq${compact ? " faq-sm" : ""}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-a${i}`;
        return (
          <div className="faq-item" key={item.q}>
            <h3 className="faq-h">
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-sign" aria-hidden="true">{isOpen ? "–" : "+"}</span>
              </button>
            </h3>
            <div id={panelId} className="faq-a" role="region" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
