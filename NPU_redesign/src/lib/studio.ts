"use client";

import { useEffect, useState } from "react";

export type StudioRole = "teacher" | "staff";

export type StudioPost =
  | { id: string; kind: "schedule"; date: string; title: string; note: string; image: string }
  | { id: string; kind: "bells"; title: string; note: string; image: string }
  | { id: string; kind: "photo"; title: string; caption: string; image: string }
  | { id: string; kind: "video"; title: string; date: string; text: string; src: string }
  | { id: string; kind: "news"; title: string; date: string; text: string }
  | { id: string; kind: "material"; title: string; note: string };

const BOARD_KEY = "npu-studio-board-v1";
const PASS_KEY = "npu-studio-pass-v1";

export function expectedPass(role: StudioRole, day: string, motto: string) {
  const code = role === "teacher" ? "ПРЕП" : "СОТР";
  return `${code}-${day.trim()}-${motto.trim().toLocaleUpperCase("ru-RU")}`;
}

export function passIsValid(role: StudioRole, day: string, motto: string) {
  const pass = expectedPass(role, day, motto);
  return pass === "ПРЕП-13-ВДОХНОВЛЯЯ" || pass === "СОТР-13-ВДОХНОВЛЯЯ";
}

export function readBoard(): StudioPost[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(BOARD_KEY) || "[]") as unknown;
    return Array.isArray(parsed) ? (parsed as StudioPost[]) : [];
  } catch {
    return [];
  }
}

function writeBoard(posts: StudioPost[]) {
  localStorage.setItem(BOARD_KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event("npu-studio"));
}

export function savePass(role: StudioRole) {
  sessionStorage.setItem(PASS_KEY, role);
}

export function clearPass() {
  sessionStorage.removeItem(PASS_KEY);
}

export function storedRole(): StudioRole | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(PASS_KEY);
  return value === "teacher" || value === "staff" ? value : null;
}

export function useStudioBoard() {
  const [posts, setPosts] = useState<StudioPost[]>([]);

  useEffect(() => {
    const sync = () => setPosts(readBoard());
    sync();
    window.addEventListener("npu-studio", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("npu-studio", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function publish(post: StudioPost) {
    writeBoard([post, ...readBoard()]);
  }

  function remove(id: string) {
    writeBoard(readBoard().filter((item) => item.id !== id));
  }

  return { posts, publish, remove };
}

export function readImageFile(file: File) {
  const limit = 1_400_000;
  if (file.size > limit) {
    return Promise.reject(new Error("Файл больше 1,4 МБ. Сожмите его и прикрепите снова."));
  }
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Файл не прочитался."));
    reader.readAsDataURL(file);
  });
}
