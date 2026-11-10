"use client";

import { FormEvent, useEffect, useState } from "react";

type Draft = {
  id: string;
  name: string;
  contact: string;
  topic: string;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "npu-contact-demo";

export function ContactForm() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setDrafts(JSON.parse(raw) as Draft[]);
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const contact = String(form.get("contact") ?? "").trim();
    const topic = String(form.get("topic") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (name.length < 2 || contact.length < 5 || message.length < 10) {
      setError("Проверьте имя, телефон или почту и текст сообщения: его должно быть достаточно, чтобы понять вопрос.");
      setNotice("");
      return;
    }
    const next: Draft = {
      id: crypto.randomUUID(),
      name,
      contact,
      topic,
      message,
      createdAt: new Date().toISOString(),
    };
    const saved = [next, ...drafts].slice(0, 8);
    setDrafts(saved);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    setError("");
    setNotice("Черновик сохранён только в этом браузере. В училище он не отправлен. Позвоните или напишите на почту, если нужен ответ.");
    event.currentTarget.reset();
  }

  function clearDrafts() {
    setDrafts([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="card p-5 sm:p-6">
      <h2 className="text-xl font-semibold">Форма обратной связи</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Это демонстрационная форма. Сервер приёма сообщений не подключён, поэтому отправка не считается обращением в училище.
      </p>
      <form className="mt-5 grid gap-4" onSubmit={onSubmit} noValidate>
        <label className="grid gap-1 text-sm font-semibold">
          Имя
          <input className="field font-normal" name="name" autoComplete="name" required />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Телефон или электронная почта
          <input className="field font-normal" name="contact" autoComplete="email" required />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Тема
          <select className="field font-normal" name="topic" defaultValue="Поступление">
            <option>Поступление</option>
            <option>Учёба</option>
            <option>Доступная среда</option>
            <option>Трудоустройство</option>
            <option>Другое</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Сообщение
          <textarea className="field min-h-32 font-normal" name="message" required />
        </label>
        {error ? <p className="text-sm font-semibold text-ink" role="alert">{error}</p> : null}
        {notice ? <p className="text-sm font-semibold text-good" role="status">{notice}</p> : null}
        <button className="btn btn-primary w-fit" type="submit">Сохранить черновик</button>
      </form>
      {drafts.length ? (
        <div className="mt-6 border-t border-line pt-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold">Черновики в браузере</h3>
            <button type="button" className="btn btn-secondary" onClick={clearDrafts}>Очистить</button>
          </div>
          <ul className="mt-3 space-y-3">
            {drafts.map((draft) => (
              <li key={draft.id} className="rounded-xl bg-bg p-3 text-sm">
                <p className="font-semibold">{draft.topic}: {draft.name}</p>
                <p className="text-muted">{draft.contact}</p>
                <p className="mt-1">{draft.message}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
