"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type FontStep = "100" | "112" | "125" | "140";
export type ContrastMode = "normal" | "mono" | "yellow";
export type SpacingMode = "normal" | "wide";
export type ThemeMode = "light" | "dark";
export type MotionMode = "on" | "off";

export type Preferences = {
  font: FontStep;
  contrast: ContrastMode;
  spacing: SpacingMode;
  theme: ThemeMode;
  motion: MotionMode;
};

const STORAGE_KEY = "npu-prefs-v1";

export const defaultPreferences: Preferences = {
  font: "100",
  contrast: "normal",
  spacing: "normal",
  theme: "light",
  motion: "on",
};

type PreferencesContextValue = {
  prefs: Preferences;
  ready: boolean;
  update: (patch: Partial<Preferences>) => void;
  reset: () => void;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function applyPreferences(prefs: Preferences) {
  const root = document.documentElement;
  root.dataset.font = prefs.font;
  root.dataset.contrast = prefs.contrast;
  root.dataset.spacing = prefs.spacing;
  root.dataset.theme = prefs.theme;
  root.dataset.motion = prefs.motion;
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(defaultPreferences);
  const [ready, setReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Preferences>;
        const next = { ...defaultPreferences, ...parsed };
        setPrefs(next);
        applyPreferences(next);
      }
    } catch {
      applyPreferences(defaultPreferences);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyPreferences(prefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs, ready]);

  useEffect(() => {
    document.documentElement.style.overflow = panelOpen || searchOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [panelOpen, searchOpen]);

  const value = useMemo(
    () => ({
      prefs,
      ready,
      update: (patch: Partial<Preferences>) => setPrefs((current) => ({ ...current, ...patch })),
      reset: () => setPrefs(defaultPreferences),
      panelOpen,
      setPanelOpen,
      searchOpen,
      setSearchOpen,
    }),
    [panelOpen, prefs, ready, searchOpen],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences должен вызываться внутри PreferencesProvider");
  return value;
}
