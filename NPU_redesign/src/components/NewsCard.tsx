import Link from "next/link";
import { formatNewsDate, type NewsItem } from "@/data/news";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      {item.image ? (
        <Link href={`/news/${item.slug}`} className="block bg-soft">
          <img src={item.image} alt={item.imageAlt ?? ""} className="h-48 w-full object-cover" />
        </Link>
      ) : (
        <div className="flex h-28 items-end bg-soft px-5 py-4 text-sm font-bold text-navy">{item.category}</div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">
          <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
          <span aria-hidden> · </span>
          {item.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">
          <Link href={`/news/${item.slug}`} className="hover:text-accent">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.excerpt}</p>
        <Link href={`/news/${item.slug}`} className="mt-4 text-sm font-bold text-accent">
          Читать новость
        </Link>
      </div>
    </article>
  );
}
