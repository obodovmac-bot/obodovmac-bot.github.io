import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OfficialLink } from "@/components/OfficialLink";
import { formatNewsDate, getNews, news } from "@/data/news";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNews(slug);
  return {
    title: item?.title ?? "Новость",
    description: item?.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();

  return (
    <article className="wrap max-w-3xl py-10">
      <p className="text-sm"><Link href="/news" className="font-semibold text-accent">Все новости</Link></p>
      <p className="mt-4 text-sm text-muted">
        <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
        <span aria-hidden> · </span>
        {item.category}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h1>
      {item.image ? (
        <img src={item.image} alt={item.imageAlt ?? ""} className="mt-6 max-h-[32rem] w-full rounded-2xl object-cover" />
      ) : null}
      <div className="mt-6 space-y-4 text-base leading-relaxed">
        {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {item.limited ? (
        <p className="mt-6 rounded-xl bg-soft p-4 text-sm leading-relaxed">
          Часть текста этой публикации в открытой выгрузке отсутствовала. Полная версия — на официальном сайте.
        </p>
      ) : null}
      <p className="mt-6 text-sm">
        <OfficialLink href={item.sourceUrl}>Открыть оригинал новости</OfficialLink>
      </p>
    </article>
  );
}
