import Link from "next/link";
import { moreLinks, nav, school } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-hero text-on-hero">
      <div className="wrap grid gap-8 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-sm font-bold text-hero-muted">{school.abbreviation}</p>
          <p className="mt-2 max-w-md text-lg font-semibold">{school.shortName}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-hero-muted">{school.legalName}</p>
          <p className="mt-4 text-sm">{school.address}</p>
          <p className="mt-1 text-sm">
            <a href={`tel:${school.phones[0].replace(/[^\d+]/g, "")}`}>{school.phones[0]}</a>
            <span aria-hidden> · </span>
            <a href={`mailto:${school.email}`}>{school.email}</a>
          </p>
        </div>
        <div>
          <p className="text-sm font-bold">Разделы</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.slice(1).map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold">Ещё</p>
          <ul className="mt-3 space-y-2 text-sm">
            {moreLinks.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
            <li><a href={school.site}>Официальный сайт npu-nn.ru</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="wrap py-4 text-xs leading-relaxed text-hero-muted">
          Демонстрационная модернизация публичной информации училища. Цифры и формулировки сверены с открытыми страницами npu-nn.ru и отчётом о самообследовании по состоянию на 1 апреля 2025 года. Перед официальным использованием проверьте документы на исходном сайте. Форма обратной связи сообщения в училище не отправляет.
        </p>
      </div>
    </footer>
  );
}
