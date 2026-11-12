"use client";

import { formatNewsDate } from "@/data/news";
import { useStudioBoard } from "@/lib/studio";

export function StudioPhotos() {
  const { posts } = useStudioBoard();
  const photos = posts.filter((item) => item.kind === "photo");
  if (photos.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-bold text-accent">Из редакции</h3>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {photos.map((item) => (
          <li key={item.id} className="card overflow-hidden">
            <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" />
            <div className="p-3">
              <p className="font-semibold text-ink">{item.title}</p>
              {item.caption ? <p className="mt-1 text-sm text-muted">{item.caption}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StudioNews() {
  const { posts } = useStudioBoard();
  const items = posts.filter((item) => item.kind === "news");
  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-ink">Из редакции</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item.id} className="card p-5">
            <p className="text-sm text-muted">
              <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
            </p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StudioMaterials() {
  const { posts } = useStudioBoard();
  const items = posts.filter((item) => item.kind === "material");
  if (items.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold text-accent">Из редакции</h3>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.id} className="card p-5">
            <p className="font-semibold text-ink">{item.title}</p>
            {item.note ? <p className="mt-2 text-sm text-muted">{item.note}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
