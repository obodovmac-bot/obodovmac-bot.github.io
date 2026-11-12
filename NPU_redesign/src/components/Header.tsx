"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Eye, Menu, Moon, Search, Sun, X } from "lucide-react";
import { moreLinks, nav, school } from "@/data/site";
import { usePreferences } from "@/context/preferences";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const { prefs, update, setPanelOpen, setSearchOpen } = usePreferences();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const systemReduce = useReducedMotion();
  const motionOff = systemReduce || prefs.motion === "off";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const apply = () => {
      document.documentElement.style.setProperty("--site-header-h", `${header.getBoundingClientRect().height}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(header);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!menuOpen) {
      root.classList.remove("menu-open");
      return;
    }
    const saved = window.scrollY;
    root.classList.add("menu-open");
    const blockPage = (event: TouchEvent) => {
      const menu = document.getElementById("mobile-menu");
      if (menu?.contains(event.target as Node)) return;
      event.preventDefault();
    };
    document.addEventListener("touchmove", blockPage, { passive: false });
    return () => {
      root.classList.remove("menu-open");
      document.removeEventListener("touchmove", blockPage);
      window.scrollTo(0, saved);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const links = [...nav, ...moreLinks.filter((item) => item.href !== "/search")];

  return (
    <>
    <header ref={headerRef} className="site-header sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="border-b border-line bg-soft">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
          <p className="text-muted">
            <a className="font-semibold text-ink" href={`tel:${school.phones[0].replace(/[^\d+]/g, "")}`}>{school.phones[0]}</a>
            <span aria-hidden> · </span>
            <a className="font-semibold text-ink" href={`mailto:${school.email}`}>{school.email}</a>
          </p>
          <div className="flex flex-wrap gap-1">
            <button type="button" className="btn btn-ghost min-h-10 px-2" onClick={() => setPanelOpen(true)}>
              <Eye aria-hidden size={16} />
              Версия для слабовидящих
            </button>
            <button
              type="button"
              className="btn btn-ghost min-h-10 px-2"
              aria-pressed={prefs.theme === "dark"}
              onClick={() => update({ theme: prefs.theme === "dark" ? "light" : "dark" })}
            >
              {prefs.theme === "dark" ? <Sun aria-hidden size={16} /> : <Moon aria-hidden size={16} />}
              {prefs.theme === "dark" ? "Светлая тема" : "Тёмная тема"}
            </button>
          </div>
        </div>
      </div>
      <div className="wrap flex items-center gap-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <img src="/media/logo.png" alt="" className="site-logo h-12 w-auto shrink-0" />
          <span className="min-w-0 truncate text-sm font-semibold text-ink sm:text-base">{school.shortName}</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label="Основное меню">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold",
                pathname === item.href ? "bg-soft text-accent" : "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <button type="button" className="btn btn-secondary" onClick={() => setSearchOpen(true)} aria-label="Открыть поиск">
            <Search aria-hidden size={18} />
            <span className="hidden sm:inline">Поиск</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
            Меню
          </button>
        </div>
      </div>
    </header>
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-menu"
            className="site-mobile-menu border-t border-line xl:hidden"
            aria-label="Мобильное меню"
            initial={motionOff ? false : { opacity: 0 }}
            animate={motionOff ? undefined : { opacity: 1 }}
            exit={motionOff ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <ul className="wrap grid gap-1 py-3">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block rounded-lg px-3 py-3 font-semibold text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
