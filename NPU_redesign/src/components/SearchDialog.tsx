"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { usePreferences } from "@/context/preferences";
import { searchSite } from "@/lib/search";

export function SearchDialog() {
  const { searchOpen, setSearchOpen } = usePreferences();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useMemo(() => searchSite(query).slice(0, 8), [query]);

  useEffect(() => {
    if (!searchOpen) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (value.length < 2) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/45 p-4" onClick={() => setSearchOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        className="card mx-auto mt-12 max-w-2xl p-4 sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id="search-title" className="text-lg font-semibold">Поиск по сайту</h2>
          <button type="button" className="btn btn-secondary" onClick={() => setSearchOpen(false)}>
            <X aria-hidden size={16} />
            Закрыть
          </button>
        </div>
        <form className="mt-4 flex gap-2" onSubmit={submit}>
          <label className="sr-only" htmlFor="site-search">Запрос</label>
          <input
            id="site-search"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="field"
            placeholder="Например: общежитие, делопроизводитель, новости"
          />
          <button className="btn btn-primary" type="submit">
            <Search aria-hidden size={16} />
            Найти
          </button>
        </form>
        <p className="mt-2 text-xs text-muted">Ищет страницы, новости, программы, документы и вопросы. Минимум 2 символа.</p>
        <ul className="mt-4 divide-y divide-line" aria-live="polite">
          {query.trim().length >= 2 && results.length === 0 ? (
            <li className="py-3 text-sm text-muted">Ничего не найдено. Попробуйте другое слово или откройте раздел «Документы».</li>
          ) : null}
          {results.map((item) => (
            <li key={`${item.kind}-${item.title}`} className="py-3">
              <Link
                href={item.href}
                className="block"
                onClick={(event) => {
                  event.preventDefault();
                  setSearchOpen(false);
                  router.push(item.href);
                }}
              >
                <span className="text-xs font-bold text-accent">{item.kind}</span>
                <span className="mt-1 block font-semibold text-ink">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
