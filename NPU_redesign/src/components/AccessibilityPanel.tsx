"use client";

import { useEffect, useRef } from "react";
import { Minus, Moon, Pause, Plus, RotateCcw, Sun, Type, X } from "lucide-react";
import { usePreferences, type ContrastMode, type FontStep } from "@/context/preferences";

const fonts: FontStep[] = ["100", "112", "125", "140"];
const fontLabels: Record<FontStep, string> = {
  "100": "Обычный",
  "112": "Крупнее",
  "125": "Большой",
  "140": "Очень большой",
};

export function AccessibilityPanel() {
  const { prefs, update, reset, panelOpen, setPanelOpen } = usePreferences();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!panelOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen, setPanelOpen]);

  if (!panelOpen) return null;

  const fontIndex = fonts.indexOf(prefs.font);

  return (
    <div className="fixed inset-0 z-50 bg-black/45" onClick={() => setPanelOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-title"
        className="absolute top-0 right-0 h-full w-full max-w-md overflow-y-auto border-l border-line bg-surface p-5 shadow-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-accent">Версия для слабовидящих</p>
            <h2 id="a11y-title" className="mt-1 text-2xl font-semibold">Настройки доступности</h2>
          </div>
          <button ref={closeRef} type="button" className="btn btn-secondary" onClick={() => setPanelOpen(false)}>
            <X aria-hidden size={18} />
            Закрыть
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Настройки сохраняются в этом браузере и действуют на всех страницах.
        </p>

        <fieldset className="mt-6">
          <legend className="font-semibold">Размер шрифта</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary" aria-label="Уменьшить шрифт" onClick={() => update({ font: fonts[Math.max(0, fontIndex - 1)] })}>
              <Minus aria-hidden size={16} />
            </button>
            <button type="button" className="btn btn-secondary" aria-label="Увеличить шрифт" onClick={() => update({ font: fonts[Math.min(fonts.length - 1, fontIndex + 1)] })}>
              <Plus aria-hidden size={16} />
              <Type aria-hidden size={16} />
            </button>
            {fonts.map((font) => (
              <button
                key={font}
                type="button"
                aria-pressed={prefs.font === font}
                className={`btn ${prefs.font === font ? "btn-primary" : "btn-secondary"}`}
                onClick={() => update({ font })}
              >
                {fontLabels[font]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-semibold">Контраст</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {([
              ["normal", "Обычный"],
              ["mono", "Чёрно-белый"],
              ["yellow", "Чёрный с жёлтым"],
            ] as Array<[ContrastMode, string]>).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={prefs.contrast === value}
                className={`btn ${prefs.contrast === value ? "btn-primary" : "btn-secondary"}`}
                onClick={() => update({ contrast: value })}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-semibold">Интервалы</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" aria-pressed={prefs.spacing === "normal"} className={`btn ${prefs.spacing === "normal" ? "btn-primary" : "btn-secondary"}`} onClick={() => update({ spacing: "normal" })}>
              Обычные
            </button>
            <button type="button" aria-pressed={prefs.spacing === "wide"} className={`btn ${prefs.spacing === "wide" ? "btn-primary" : "btn-secondary"}`} onClick={() => update({ spacing: "wide" })}>
              Увеличенные
            </button>
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-semibold">Тема</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" aria-pressed={prefs.theme === "light"} className={`btn ${prefs.theme === "light" ? "btn-primary" : "btn-secondary"}`} onClick={() => update({ theme: "light" })}>
              <Sun aria-hidden size={16} /> Светлая
            </button>
            <button type="button" aria-pressed={prefs.theme === "dark"} className={`btn ${prefs.theme === "dark" ? "btn-primary" : "btn-secondary"}`} onClick={() => update({ theme: "dark" })}>
              <Moon aria-hidden size={16} /> Тёмная
            </button>
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-semibold">Анимации</legend>
          <div className="mt-3">
            <button
              type="button"
              aria-pressed={prefs.motion === "off"}
              className={`btn ${prefs.motion === "off" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => update({ motion: prefs.motion === "off" ? "on" : "off" })}
            >
              <Pause aria-hidden size={16} />
              {prefs.motion === "off" ? "Анимации выключены" : "Выключить анимации"}
            </button>
          </div>
        </fieldset>

        <button type="button" className="btn btn-secondary mt-8" onClick={reset}>
          <RotateCcw aria-hidden size={16} />
          Сбросить настройки
        </button>
      </div>
    </div>
  );
}
