"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { searchSite } from "@/lib/search";

export function SearchResults() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const results = useMemo(() => searchSite(query), [query]);

  return (
    <div>
      <label className="grid max-w-xl gap-1 text-sm font-semibold">
        Запрос
        <input className="field font-normal" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {query.trim().length < 2 ? "Введите хотя бы два символа." : `Найдено: ${results.length}`}
      </p>
      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {results.map((item) => (
          <li key={`${item.kind}-${item.href}-${item.title}`}>
            <Link href={item.href} className="block px-5 py-4">
              <span className="text-xs font-bold text-accent">{item.kind}</span>
              <span className="mt-1 block font-semibold">{item.title}</span>
              <span className="mt-1 block text-sm text-muted">{item.text.slice(0, 180)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
