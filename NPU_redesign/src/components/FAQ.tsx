"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/faq";
import { cn } from "@/lib/cn";

export function FAQ({ items, id }: { items: FaqItem[]; id?: string }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div id={id} className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink"
                aria-expanded={open}
                aria-controls={`faq-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                {item.question}
                <ChevronDown aria-hidden className={cn("shrink-0 transition", open && "rotate-180")} size={18} />
              </button>
            </h3>
            {open ? (
              <div id={`faq-${item.id}`} className="px-5 pb-5 text-sm leading-relaxed text-muted">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
