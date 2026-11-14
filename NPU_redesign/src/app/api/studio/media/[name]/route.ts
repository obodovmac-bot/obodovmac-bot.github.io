import { mediaType, readMedia } from "@/lib/studio-store";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params;
  const bytes = await readMedia(name);
  if (!bytes) return new Response("Нет файла.", { status: 404 });
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": mediaType(name),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
