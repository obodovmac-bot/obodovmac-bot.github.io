import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StudioPost } from "@/lib/studio-model";

export class StudioStoreError extends Error {}

const boardFile = path.join(process.cwd(), "data", "studio-board.json");
const mediaDir = path.join(process.cwd(), "public", "studio");
const boardPath = "data/studio-board.json";

type RepoFile = { path: string; bytes: Buffer | null };
type Repo = { owner: string; name: string };

let boardCache: { at: number; posts: StudioPost[] } | null = null;

function token() {
  return process.env.STUDIO_GITHUB_TOKEN?.trim() ?? "";
}

function repo(): Repo | null {
  const explicit = process.env.STUDIO_GITHUB_REPO?.trim();
  if (explicit?.includes("/")) {
    const [owner, name] = explicit.split("/");
    if (owner && name) return { owner, name };
  }
  const owner = process.env.VERCEL_GIT_REPO_OWNER?.trim();
  const name = process.env.VERCEL_GIT_REPO_SLUG?.trim();
  if (owner && name) return { owner, name };
  return null;
}

function branch() {
  return process.env.STUDIO_GITHUB_BRANCH?.trim() || process.env.VERCEL_GIT_COMMIT_REF?.trim() || "main";
}

export function githubOn() {
  return Boolean(token() && repo());
}

function hostedMessage() {
  return "Опубликованный сайт сам файлы не хранит. В Vercel откройте проект, Settings, Environment Variables и добавьте STUDIO_GITHUB_TOKEN: токен GitHub с правом Contents — Read and write для этого репозитория. Затем нажмите Redeploy.";
}

function githubHeaders() {
  return {
    Authorization: `Bearer ${token()}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "npu-site-studio",
  };
}

async function github(pathname: string, init?: RequestInit) {
  const response = await fetch(`https://api.github.com${pathname}`, {
    ...init,
    cache: "no-store",
    headers: { ...githubHeaders(), ...(init?.headers ?? {}) },
  });
  if (response.ok) return response.json() as Promise<Record<string, unknown>>;
  const detail = await response.text();
  console.error("studio github", response.status, pathname, detail.slice(0, 300));
  if (response.status === 401) {
    throw new StudioStoreError("Токен GitHub не подошёл. Проверьте STUDIO_GITHUB_TOKEN в Vercel.");
  }
  if (response.status === 403) {
    throw new StudioStoreError("У токена GitHub нет права записывать этот репозиторий.");
  }
  if (response.status === 404) {
    throw new StudioStoreError("Репозиторий для публикаций не найден. Проверьте, что сайт в Vercel связан с GitHub.");
  }
  throw new StudioStoreError("GitHub не принял публикацию. Повторите через минуту.");
}

function safeName(name: string) {
  return /^[a-zA-Z0-9_-]{1,48}\.[a-z0-9]{1,8}$/.test(name);
}

export function fileNameFromUrl(url: string) {
  const name = url.startsWith("/studio/")
    ? url.slice("/studio/".length)
    : url.startsWith("/api/studio/media/")
      ? url.slice("/api/studio/media/".length)
      : "";
  return safeName(name) ? name : "";
}

function pointAt(post: StudioPost): StudioPost {
  if ("image" in post) {
    const name = fileNameFromUrl(post.image);
    if (name) return { ...post, image: `/api/studio/media/${name}` };
  }
  if ("src" in post) {
    const name = fileNameFromUrl(post.src);
    if (name) return { ...post, src: `/api/studio/media/${name}` };
  }
  return post;
}

async function readDisk(): Promise<StudioPost[]> {
  try {
    const raw = await readFile(boardFile, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as StudioPost[]) : [];
  } catch {
    return [];
  }
}

async function readGithubBoard(): Promise<StudioPost[]> {
  if (boardCache && Date.now() - boardCache.at < 5000) return boardCache.posts;
  const place = repo();
  if (!place) return [];
  const response = await fetch(
    `https://api.github.com/repos/${place.owner}/${place.name}/contents/${boardPath}?ref=${encodeURIComponent(branch())}`,
    { cache: "no-store", headers: githubHeaders() },
  );
  if (response.status === 404) return [];
  if (!response.ok) {
    console.error("studio board read", response.status);
    return readDisk();
  }
  const data = (await response.json()) as { content?: string; encoding?: string };
  if (!data.content || data.encoding !== "base64") return [];
  const parsed = JSON.parse(Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8")) as unknown;
  const posts = Array.isArray(parsed) ? (parsed as StudioPost[]) : [];
  boardCache = { at: Date.now(), posts };
  return posts;
}

export async function loadPosts() {
  if (githubOn()) return readGithubBoard();
  return readDisk();
}

async function commit(changes: RepoFile[]) {
  const place = repo();
  if (!place) throw new StudioStoreError(hostedMessage());
  const refName = branch();
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const ref = await github(`/repos/${place.owner}/${place.name}/git/ref/heads/${refName}`);
    const parent = String((ref.object as { sha?: string } | undefined)?.sha ?? "");
    const current = await github(`/repos/${place.owner}/${place.name}/git/commits/${parent}`);
    const baseTree = String((current.tree as { sha?: string } | undefined)?.sha ?? "");
    const tree = [];
    for (const change of changes) {
      if (!change.bytes) {
        tree.push({ path: change.path, mode: "100644", type: "blob", sha: null });
        continue;
      }
      const blob = await github(`/repos/${place.owner}/${place.name}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content: change.bytes.toString("base64"), encoding: "base64" }),
      });
      tree.push({ path: change.path, mode: "100644", type: "blob", sha: String(blob.sha) });
    }
    const nextTree = await github(`/repos/${place.owner}/${place.name}/git/trees`, {
      method: "POST",
      body: JSON.stringify({ base_tree: baseTree, tree }),
    });
    const nextCommit = await github(`/repos/${place.owner}/${place.name}/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: "Редакция: публикация",
        tree: String(nextTree.sha),
        parents: [parent],
      }),
    });
    const updated = await fetch(`https://api.github.com/repos/${place.owner}/${place.name}/git/refs/heads/${refName}`, {
      method: "PATCH",
      cache: "no-store",
      headers: githubHeaders(),
      body: JSON.stringify({ sha: String(nextCommit.sha) }),
    });
    if (updated.ok) return;
    if (updated.status !== 422) {
      console.error("studio ref", updated.status, (await updated.text()).slice(0, 300));
      throw new StudioStoreError("GitHub не обновил репозиторий.");
    }
  }
  throw new StudioStoreError("Одновременно сохранилась другая запись. Нажмите «Опубликовать» ещё раз.");
}

export async function savePost(post: StudioPost, files: { name: string; bytes: Buffer }[]) {
  if (githubOn()) {
    const stored = pointAt(post);
    const posts = [stored, ...(await readGithubBoard()).filter((item) => item.id !== stored.id)];
    await commit([
      { path: boardPath, bytes: Buffer.from(JSON.stringify(posts, null, 2), "utf8") },
      ...files.filter((file) => safeName(file.name)).map((file) => ({ path: `public/studio/${file.name}`, bytes: file.bytes })),
    ]);
    boardCache = { at: Date.now(), posts };
    return stored;
  }
  try {
    await mkdir(mediaDir, { recursive: true });
    for (const file of files) {
      if (safeName(file.name)) await writeFile(path.join(mediaDir, file.name), file.bytes);
    }
    await mkdir(path.dirname(boardFile), { recursive: true });
    const posts = [post, ...(await readDisk()).filter((item) => item.id !== post.id)];
    await writeFile(boardFile, JSON.stringify(posts, null, 2), "utf8");
    return post;
  } catch (error) {
    console.error("studio disk", error);
    if (process.env.VERCEL) throw new StudioStoreError(hostedMessage());
    throw new StudioStoreError("Сервер не сохранил запись.");
  }
}

export async function removePost(id: string) {
  if (githubOn()) {
    const posts = await readGithubBoard();
    const target = posts.find((item) => item.id === id);
    const next = posts.filter((item) => item.id !== id);
    const media = target && "image" in target ? target.image : target && "src" in target ? target.src : "";
    const name = fileNameFromUrl(media);
    await commit([
      { path: boardPath, bytes: Buffer.from(JSON.stringify(next, null, 2), "utf8") },
      ...(name ? [{ path: `public/studio/${name}`, bytes: null }] : []),
    ]);
    boardCache = { at: Date.now(), posts: next };
    return;
  }
  try {
    const posts = await readDisk();
    const target = posts.find((item) => item.id === id);
    await mkdir(path.dirname(boardFile), { recursive: true });
    await writeFile(boardFile, JSON.stringify(posts.filter((item) => item.id !== id), null, 2), "utf8");
    const media = target && "image" in target ? target.image : target && "src" in target ? target.src : "";
    const name = fileNameFromUrl(media);
    if (name) await unlink(path.join(mediaDir, name)).catch(() => undefined);
  } catch (error) {
    console.error("studio disk delete", error);
    if (process.env.VERCEL) throw new StudioStoreError(hostedMessage());
    throw new StudioStoreError("Сервер не убрал запись.");
  }
}

export async function readMedia(name: string) {
  if (!safeName(name)) return null;
  try {
    return await readFile(path.join(mediaDir, name));
  } catch {
    if (!githubOn()) return null;
  }
  const place = repo();
  if (!place) return null;
  const response = await fetch(
    `https://api.github.com/repos/${place.owner}/${place.name}/contents/public/studio/${name}?ref=${encodeURIComponent(branch())}`,
    { cache: "no-store", headers: githubHeaders() },
  );
  if (!response.ok) return null;
  const data = (await response.json()) as { content?: string; encoding?: string; sha?: string };
  if (data.content && data.encoding === "base64") return Buffer.from(data.content.replace(/\n/g, ""), "base64");
  if (!data.sha) return null;
  const blob = await github(`/repos/${place.owner}/${place.name}/git/blobs/${data.sha}`);
  const content = typeof blob.content === "string" ? blob.content : "";
  return Buffer.from(content.replace(/\n/g, ""), "base64");
}

export function mediaType(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const types: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
  };
  return types[ext] ?? "application/octet-stream";
}
