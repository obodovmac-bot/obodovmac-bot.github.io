"use client";

import { useEffect, useState, type FormEvent } from "react";
import { formatNewsDate } from "@/data/news";
import {
  clearPass,
  expectedPass,
  passIsValid,
  readImageFile,
  savePass,
  storedRole,
  useStudioBoard,
  type StudioPost,
  type StudioRole,
} from "@/lib/studio";

const kinds = [
  ["schedule", "Расписание на день"],
  ["bells", "Расписание звонков"],
  ["photo", "Фотография"],
  ["video", "Видео"],
  ["news", "Новость"],
  ["material", "Материал для учёбы"],
] as const;

export function StudioDesk() {
  const [role, setRole] = useState<StudioRole | null>(null);
  const board = useStudioBoard();

  useEffect(() => {
    setRole(storedRole());
  }, []);

  if (!role) return <StudioDoor onOpen={setRole} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Вы вошли как {role === "teacher" ? "преподаватель" : "сотрудник"}. Публикация появляется на этом сайте у всех посетителей и не уходит на npu-nn.ru.
        </p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            clearPass();
            setRole(null);
          }}
        >
          Закрыть редакцию
        </button>
      </div>
      <PublishForm
        onSave={async (post) => {
          try {
            await board.publish(post);
            return "";
          } catch (error) {
            return error instanceof Error ? error.message : "Не удалось опубликовать.";
          }
        }}
      />
      <section>
        <h2 className="text-xl font-semibold text-ink">Уже в редакции</h2>
        <ul className="mt-4 space-y-3">
          {board.posts.length === 0 ? <li className="text-sm text-muted">Пока только материалы, которые уже стоят на сайте.</li> : null}
          {board.posts.map((item) => (
            <li key={item.id} className="card flex items-start justify-between gap-3 p-4">
              <div>
                <p className="text-xs font-bold text-accent">{labelOf(item.kind)}</p>
                <p className="mt-1 font-semibold text-ink">{titleOf(item)}</p>
              </div>
              <button type="button" className="btn btn-ghost min-h-10 px-3" onClick={() => { board.remove(item.id).catch(() => undefined); }}>
                Убрать
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StudioDoor({ onOpen }: { onOpen: (role: StudioRole) => void }) {
  const [role, setRole] = useState<StudioRole>("teacher");
  const [day, setDay] = useState("");
  const [motto, setMotto] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!passIsValid(role, day, motto)) {
      setError("Талон не сходится. Проверьте код роли, число дня и девиз.");
      return;
    }
    savePass(expectedPass(role, day, motto));
    onOpen(role);
  }

  return (
    <form className="card max-w-xl space-y-4 p-6" onSubmit={submit}>
      <h2 className="text-xl font-semibold text-ink">Талон редакции</h2>
      <p className="text-sm leading-relaxed text-muted">
        Сюда входят сотрудник и преподаватель. Талон собирается из трёх частей: код роли, число первого уже вывешенного дня расписания и девиз медиацентра. Код преподавателя — ПРЕП, код сотрудника — СОТР. Девиз — слово после «Информируем,» в лозунге «Информируем, вдохновляя!».
      </p>
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">Кто входит</legend>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="role" checked={role === "teacher"} onChange={() => setRole("teacher")} />
          Преподаватель
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="role" checked={role === "staff"} onChange={() => setRole("staff")} />
          Сотрудник
        </label>
      </fieldset>
      <label className="grid gap-1 text-sm font-semibold">
        Число первого дня расписания
        <input className="field font-normal" inputMode="numeric" value={day} onChange={(event) => setDay(event.target.value)} required />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Девиз медиацентра
        <input className="field font-normal" value={motto} onChange={(event) => setMotto(event.target.value)} required />
      </label>
      {error ? <p className="text-sm font-semibold text-ink">{error}</p> : null}
      <button type="submit" className="btn btn-primary">Открыть редакцию</button>
    </form>
  );
}

function PublishForm({ onSave }: { onSave: (post: StudioPost) => Promise<string> }) {
  const [kind, setKind] = useState<(typeof kinds)[number][0]>("schedule");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    try {
      const id = `${Date.now()}`;
      let saved = "";
      if (kind === "schedule") {
        if (!file) throw new Error("Прикрепите фотографию листа.");
        const image = await readImageFile(file);
        saved = await onSave({ id, kind, date, title: title || `Расписание на ${formatNewsDate(date)}`, note: text, image });
      } else if (kind === "bells") {
        if (!file) throw new Error("Прикрепите фотографию листа звонков.");
        const image = await readImageFile(file);
        saved = await onSave({ id, kind, title, note: text, image });
      } else if (kind === "photo") {
        if (!file) throw new Error("Прикрепите фотографию.");
        const image = await readImageFile(file);
        saved = await onSave({ id, kind, title, caption: text, image });
      } else if (kind === "video") {
        if (!file) throw new Error("Прикрепите видеофайл.");
        if (file.size > 1_400_000) throw new Error("Такое видео слишком большое для браузерной редакции. Ролик медиацентра уже стоит рядом с фотографиями.");
        const src = await readImageFile(file);
        saved = await onSave({ id, kind, title, date, text, src });
      } else if (kind === "news") {
        saved = await onSave({ id, kind, title, date, text });
      } else {
        saved = await onSave({ id, kind: "material", title, note: text });
      }
      if (!saved) {
        setTitle("");
        setText("");
        setFile(null);
        setMessage("Материал опубликован на сайте.");
      } else {
        setMessage(saved);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось сохранить.");
    }
  }

  return (
    <form className="card space-y-4 p-6" onSubmit={submit}>
      <h2 className="text-xl font-semibold text-ink">Новая публикация</h2>
      <label className="grid gap-1 text-sm font-semibold">
        Что публикуем
        <select className="field font-normal" value={kind} onChange={(event) => setKind(event.target.value as (typeof kinds)[number][0])}>
          {kinds.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Заголовок
        <input className="field font-normal" value={title} onChange={(event) => setTitle(event.target.value)} required={kind !== "schedule"} />
      </label>
      {kind === "schedule" || kind === "video" || kind === "news" ? (
        <label className="grid gap-1 text-sm font-semibold">
          Дата
          <input className="field font-normal" type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </label>
      ) : null}
      <label className="grid gap-1 text-sm font-semibold">
        Текст
        <textarea className="field min-h-28 font-normal" value={text} onChange={(event) => setText(event.target.value)} />
      </label>
      {kind === "schedule" || kind === "bells" || kind === "photo" || kind === "video" ? (
        <div className="grid gap-2">
          <label className="inline-flex w-fit cursor-pointer items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink">
            Прикрепите файл
            <input
              className="sr-only"
              type="file"
              accept={kind === "video" ? "video/*" : "image/*"}
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <p className="text-sm text-muted">
            До 1,4 МБ. {file ? file.name : "Файл ещё не выбран."}
          </p>
        </div>
      ) : null}
      {message ? <p className="text-sm text-ink">{message}</p> : null}
      <button type="submit" className="btn btn-primary">Опубликовать</button>
    </form>
  );
}

function labelOf(kind: StudioPost["kind"]) {
  return kinds.find(([value]) => value === kind)?.[1] ?? kind;
}

function titleOf(item: StudioPost) {
  if (item.kind === "material") return item.title;
  return item.title;
}
