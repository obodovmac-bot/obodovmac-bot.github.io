"use client";

import { formatNewsDate } from "@/data/news";
import { videos } from "@/data/videos";
import { useStudioBoard } from "@/lib/studio";
import { VideoPlayer, type VideoQuality } from "@/components/VideoPlayer";

export function VideoShelf() {
  const { posts } = useStudioBoard();
  const extra = posts.filter((item) => item.kind === "video");
  const items: { id: string; src: string; date: string; title: string; text: string; qualities?: VideoQuality[] }[] = [
    ...videos.map((item) => ({ id: item.id, src: item.src, date: item.date, title: item.title, text: item.text, qualities: item.qualities })),
    ...extra.map((item) => ({ id: item.id, src: item.src, date: item.date, title: item.title, text: item.text })),
  ];

  return (
    <div className="mt-6 space-y-6">
      {items.map((item) => (
        <article key={item.id} className="space-y-3">
          <VideoPlayer src={item.src} title={item.title} qualities={item.qualities} />
          <div>
            <p className="text-sm text-muted">
              <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
            </p>
            <h3 className="mt-1 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
