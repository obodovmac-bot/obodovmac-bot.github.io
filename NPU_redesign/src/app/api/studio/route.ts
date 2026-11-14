import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { ticketIsAccepted, type StudioPost } from "@/lib/studio-model";

export const dynamic = "force-dynamic";

const boardFile = path.join(process.cwd(), "data", "studio-board.json");
const mediaDir = path.join(process.cwd(), "public", "studio");

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(job: () => Promise<T>) {
  const run = queue.then(job, job);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readPosts() {
  try {
    const raw = await readFile(boardFile, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as StudioPost[]) : [];
  } catch {
    return [] as StudioPost[];
  }
}

async function writePosts(posts: StudioPost[]) {
  await mkdir(path.dirname(boardFile), { recursive: true });
  await writeFile(boardFile, JSON.stringify(posts, null, 2), "utf8");
}

function clip(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function storeFile(dataUrl: string, id: string) {
  const match = /^data:(image|video)\/([a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl);
  if (!match) return "";
  const subtype = match[2].toLowerCase().split("+")[0].replace("jpeg", "jpg").replace("quicktime", "mov");
  const ext = subtype.replace(/[^a-z0-9]/g, "").slice(0, 8) || "bin";
  const name = `${id}.${ext}`;
  return { name, bytes: Buffer.from(match[3].replace(/\s/g, ""), "base64"), publicPath: `/studio/${name}` };
}

function localMedia(value: string) {
  return value.startsWith("/studio/") || value.startsWith("/media/");
}

async function normalize(input: unknown): Promise<StudioPost | null> {
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

  if (image.startsWith("data:")) {
    const saved = storeFile(image, id);
    if (!saved || saved.bytes.length > 1_500_000) return null;
    await mkdir(mediaDir, { recursive: true });
    await writeFile(path.join(mediaDir, saved.name), saved.bytes);
    image = saved.publicPath;
  }
  if (src.startsWith("data:")) {
    const saved = storeFile(src, `${id}-v`);
    if (!saved || saved.bytes.length > 1_500_000) return null;
    await mkdir(mediaDir, { recursive: true });
    await writeFile(path.join(mediaDir, saved.name), saved.bytes);
    src = saved.publicPath;
  }

  if (kind === "schedule" && date && image && localMedia(image)) {
    return { id, kind, date, title: title || "Расписание", note, image };
  }
  if (kind === "bells" && title && image && localMedia(image)) {
    return { id, kind, title, note, image };
  }
  if (kind === "photo" && title && image && localMedia(image)) {
    return { id, kind, title, caption, image };
  }
  if (kind === "video" && title && date && src && localMedia(src)) {
    return { id, kind, title, date, text, src };
  }
  if (kind === "news" && title && date && text) {
    return { id, kind, title, date, text };
  }
  if (kind === "material" && title) {
    return { id, kind, title, note };
  }
  return null;
}

function accepted(request: Request, pass: string) {
  return ticketIsAccepted(pass || request.headers.get("x-studio-pass") || "");
}

export async function GET() {
  const posts = await readPosts();
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
      const post = await normalize(payload);
      if (!post) return null;
      const posts = await readPosts();
      await writePosts([post, ...posts.filter((item) => item.id !== post.id)]);
      return post;
    });
    if (!saved) return Response.json({ error: "Запись не собралась. Проверьте поля и файл до 1,4 МБ." }, { status: 400 });
    return Response.json({ post: saved });
  } catch {
    return Response.json({ error: "Сервер не сохранил запись." }, { status: 500 });
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
  await enqueue(async () => {
    const posts = await readPosts();
    const target = posts.find((item) => item.id === id);
    await writePosts(posts.filter((item) => item.id !== id));
    const media = target && "image" in target ? target.image : target && "src" in target ? target.src : "";
    if (media.startsWith("/studio/")) {
      const name = path.basename(media);
      await unlink(path.join(mediaDir, name)).catch(() => undefined);
    }
  });
  return Response.json({ ok: true });
}
