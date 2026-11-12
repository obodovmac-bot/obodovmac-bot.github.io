import type { MetadataRoute } from "next";
import { news } from "@/data/news";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const paths = ["", "/about", "/applicants", "/students", "/news", "/accessibility", "/career", "/contacts", "/gallery", "/documents", "/rehabilitation", "/search"];
  return [
    ...paths.map((path) => ({ url: `${base}${path || "/"}`, lastModified: new Date("2026-11-10") })),
    ...news.map((item) => ({ url: `${base}/news/${item.slug}`, lastModified: new Date(item.date) })),
  ];
}
