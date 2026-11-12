"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { gallery, galleryCategories, type GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/cn";

export function Gallery({ preview = false }: { preview?: boolean }) {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("Все");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(() => {
    const filtered = category === "Все" ? gallery : gallery.filter((item) => item.category === category);
    return preview ? filtered.slice(0, 4) : filtered;
  }, [category, preview]);

  const current = active === null ? null : items[active];

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((index) => (index === null ? index : (index + 1) % items.length));
      if (event.key === "ArrowLeft")
        setActive((index) => (index === null ? index : (index - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
    };
  }, [active, items.length]);

  return (
    <div>
      {preview ? null : (
        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Категории фотографий">
          {galleryCategories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-semibold",
                category === item ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-ink",
              )}
              onClick={() => {
                setCategory(item);
                setActive(null);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className="card h-full w-full overflow-hidden text-left"
              onClick={() => setActive(index)}
            >
              <span className="relative block">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-48 w-full object-cover"
                  style={{ objectPosition: item.position ?? "center" }}
                />
                <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-hero/80 px-2 py-1 text-xs font-semibold text-on-hero">
                  <ZoomIn aria-hidden size={14} />
                  Увеличить
                </span>
              </span>
              <span className="block p-4">
                <span className="text-xs font-bold text-accent">{item.category}</span>
                <span className="mt-1 block font-semibold text-ink">{item.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <Lightbox
          item={current}
          index={active ?? 0}
          total={items.length}
          onClose={() => setActive(null)}
          onPrev={() => setActive((index) => (index === null ? 0 : (index - 1 + items.length) % items.length))}
          onNext={() => setActive((index) => (index === null ? 0 : (index + 1) % items.length))}
        />
      ) : null}
    </div>
  );
}

function Lightbox({
  item,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label={item.title}>
      <button type="button" className="btn btn-hero absolute top-4 right-4" onClick={onClose}>
        <X aria-hidden size={18} />
        Закрыть
      </button>
      <button type="button" className="btn btn-hero absolute top-1/2 left-3 -translate-y-1/2" onClick={onPrev} aria-label="Предыдущая фотография">
        <ChevronLeft aria-hidden size={22} />
      </button>
      <figure className="max-h-[88vh] max-w-5xl">
        <img src={item.src} alt={item.alt} className="max-h-[72vh] w-auto rounded-xl object-contain" />
        <figcaption className="mt-3 text-center text-sm text-white">
          <span className="font-semibold">{item.title}</span>
          <span className="mt-1 block text-white/85">{item.caption}</span>
          <span className="mt-1 block">
            {index + 1} из {total}. Стрелки переключают фотографии, Escape закрывает просмотр.
          </span>
        </figcaption>
      </figure>
      <button type="button" className="btn btn-hero absolute top-1/2 right-3 -translate-y-1/2" onClick={onNext} aria-label="Следующая фотография">
        <ChevronRight aria-hidden size={22} />
      </button>
    </div>
  );
}
