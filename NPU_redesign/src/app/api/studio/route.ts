import { ticketIsAccepted, type StudioPost } from "@/lib/studio-model";
import { loadPosts, removePost, savePost, StudioStoreError } from "@/lib/studio-store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(job: () => Promise<T>) {
  const run = queue.then(job, job);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function clip(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function storeFile(dataUrl: string, id: string) {
  const match = /^data:(image|video)\/([a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl);
  if (!match) return null;
  const subtype = match[2].toLowerCase().split("+")[0].replace("jpeg", "jpg").replace("quicktime", "mov");
  const ext = subtype.replace(/[^a-z0-9]/g, "").slice(0, 8) || "bin";
  const name = `${id}.${ext}`;
  return { name, bytes: Buffer.from(match[3].replace(/\s/g, ""), "base64") };
}

function localMedia(value: string) {
  return value.startsWith("/studio/") || value.startsWith("/media/") || value.startsWith("/api/studio/media/");
}

async function normalize(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const id = clip(raw.id, 40).replace(/[^a-zA-Z0-9_-]/g, "") || `${Date.now()}`;
  const kind = raw.kind;
  const title = clip(raw.title, 180);
  const text = clip(raw.text, 2000);
  const note = clip(raw.note, 2000);
  const caption = clip(raw.caption, 500);
  const date = clip(raw.date, 20);
  let image = typeof raw.image === "string" ? raw.image : "";
  let src = typeof raw.src === "string" ? raw.src : "";
  const files: { name: string; bytes: Buffer }[] = [];

  if (image.startsWith("data:")) {
    const saved = storeFile(image, id);
    if (!saved || saved.bytes.length > 1_500_000) return null;
    files.push(saved);
    image = `/studio/${saved.name}`;
  }
  if (src.startsWith("data:")) {
    const saved = storeFile(src, `${id}-v`);
    if (!saved || saved.bytes.length > 1_500_000) return null;
    files.push(saved);
    src = `/studio/${saved.name}`;
  }

  let post: StudioPost | null = null;
  if (kind === "schedule" && date && image && localMedia(image)) {
    post = { id, kind, date, title: title || "Расписание", note, image };
  } else if (kind === "bells" && title && image && localMedia(image)) {
    post = { id, kind, title, note, image };
  } else if (kind === "photo" && title && image && localMedia(image)) {
    post = { id, kind, title, caption, image };
  } else if (kind === "video" && title && date && src && localMedia(src)) {
    post = { id, kind, title, date, text, src };
  } else if (kind === "news" && title && date && text) {
    post = { id, kind, title, date, text };
  } else if (kind === "material" && title) {
    post = { id, kind, title, note };
  }
  return post ? { post, files } : null;
}

function accepted(request: Request, pass: string) {
  return ticketIsAccepted(pass || request.headers.get("x-studio-pass") || "");
}

function failed(error: unknown, fallback: string) {
  const message = error instanceof StudioStoreError ? error.message : fallback;
  return Response.json({ error: message }, { status: 500 });
}

export async function GET() {
  const posts = await loadPosts();
  return Response.json({ posts });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Запись не прочиталась." }, { status: 400 });
  }
  const envelope = body && typeof body === "object" ? (body as { pass?: unknown; post?: unknown }) : {};
  const pass = typeof envelope.pass === "string" ? envelope.pass : "";
  const payload = envelope.post ?? body;
  if (!accepted(request, pass)) return Response.json({ error: "Редакция не открыта." }, { status: 401 });
  try {
    const saved = await enqueue(async () => {
      const draft = await normalize(payload);
      if (!draft) return null;
      return savePost(draft.post, draft.files);
    });
    if (!saved) return Response.json({ error: "Запись не собралась. Проверьте поля и файл до 1,4 МБ." }, { status: 400 });
    return Response.json({ post: saved });
  } catch (error) {
    return failed(error, "Сервер не сохранил запись.");
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const pass = url.searchParams.get("pass") ?? "";
  if (!accepted(request, pass)) return Response.json({ error: "Редакция не открыта." }, { status: 401 });
  const id = url.searchParams.get("id") ?? "";
  if (!/^[a-zA-Z0-9_-]{1,40}$/.test(id)) {
    return Response.json({ error: "Запись не найдена." }, { status: 400 });
  }
  try {
    await enqueue(() => removePost(id));
    return Response.json({ ok: true });
  } catch (error) {
    return failed(error, "Сервер не убрал запись.");
  }
}
