"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import { news, type NewsCategory } from "@/data/news";
import { cn } from "@/lib/cn";

const categories: Array<"Все" | NewsCategory> = ["Все", ...Array.from(new Set(news.map((item) => item.category)))];

export function NewsExplorer() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Все");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase().replaceAll("ё", "е");
    return news.filter((item) => {
      const inCategory = category === "Все" || item.category === category;
      const haystack = `${item.title} ${item.excerpt} ${item.body.join(" ")}`.toLowerCase().replaceAll("ё", "е");
      return inCategory && (needle.length < 2 || haystack.includes(needle));
    });
  }, [category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="grid w-full max-w-md gap-1 text-sm font-semibold">
          Поиск по новостям
          <input className="field font-normal" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Например: выпуск или теннис" />
        </label>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Категории новостей">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              className={cn("min-h-11 rounded-full border px-4 text-sm font-semibold", category === item ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface")}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">Найдено: {items.length}</p>
      {items.length ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => <NewsCard key={item.slug} item={item} />)}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">По этому сочетанию категории и запроса новостей нет.</p>
      )}
    </div>
  );
}
