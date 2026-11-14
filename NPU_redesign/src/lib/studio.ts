"use client";

import { useEffect, useState } from "react";
import {
  expectedPass,
  passIsValid,
  roleFromPass,
  ticketIsAccepted,
  type StudioPost,
  type StudioRole,
} from "@/lib/studio-model";

export type { StudioPost, StudioRole };
export { expectedPass, passIsValid, ticketIsAccepted };

const PASS_KEY = "npu-studio-pass-v1";

export function savePass(pass: string) {
  sessionStorage.setItem(PASS_KEY, pass);
}

export function clearPass() {
  sessionStorage.removeItem(PASS_KEY);
}

export function storedPass() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(PASS_KEY) ?? "";
}

export function storedRole(): StudioRole | null {
  return roleFromPass(storedPass() || null);
}

async function loadBoard() {
  const response = await fetch("/api/studio", { cache: "no-store" });
  if (!response.ok) return [] as StudioPost[];
  const data = (await response.json()) as { posts?: StudioPost[] };
  return Array.isArray(data.posts) ? data.posts : [];
}

export function useStudioBoard() {
  const [posts, setPosts] = useState<StudioPost[]>([]);

  useEffect(() => {
    let stop = false;
    const sync = () => {
      loadBoard().then((next) => {
        if (!stop) setPosts(next);
      });
    };
    sync();
    const timer = window.setInterval(sync, 12000);
    window.addEventListener("npu-studio", sync);
    return () => {
      stop = true;
      window.clearInterval(timer);
      window.removeEventListener("npu-studio", sync);
    };
  }, []);

  async function publish(post: StudioPost) {
    const response = await fetch("/api/studio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pass: storedPass(), post }),
    });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    if (response.status === 413) throw new Error("Файл слишком большой. Сожмите его до 1,4 МБ.");
    if (!response.ok) throw new Error(data.error || "Не удалось опубликовать.");
    window.dispatchEvent(new Event("npu-studio"));
  }

  async function remove(id: string) {
    const pass = encodeURIComponent(storedPass());
    const response = await fetch(`/api/studio?id=${encodeURIComponent(id)}&pass=${pass}`, {
      method: "DELETE",
    });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) throw new Error(data.error || "Не удалось убрать запись.");
    window.dispatchEvent(new Event("npu-studio"));
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
