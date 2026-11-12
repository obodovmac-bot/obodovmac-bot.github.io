import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { school } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Адрес, телефоны, почта, карта и демонстрационная форма обратной связи Нижегородского училища-интерната.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контакты"
        title="Как связаться с училищем"
        lead="Телефоны, почта и адрес взяты со страницы «Контакты» официального сайта. Карта открывает поиск этого адреса, а форма ниже не отправляет письмо в училище."
      />
      <div className="wrap grid gap-8 py-12 lg:grid-cols-[.85fr_1.15fr]">
        <section className="space-y-4">
          <article className="card p-5">
            <h2 className="text-sm font-bold text-accent">Адрес</h2>
            <p className="mt-2 font-semibold">{school.address}</p>
            <p className="mt-2 text-sm text-muted">Юридический и фактический адрес в отчёте о самообследовании совпадают.</p>
          </article>
          <article className="card p-5">
            <h2 className="text-sm font-bold text-accent">Телефоны</h2>
            <ul className="mt-2 space-y-1 font-semibold">
              {school.phones.map((phone) => (
                <li key={phone}><a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a></li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-muted">Факс: {school.fax}</p>
          </article>
          <article className="card p-5">
            <h2 className="text-sm font-bold text-accent">Почта</h2>
            <p className="mt-2 font-semibold"><a href={`mailto:${school.email}`}>{school.email}</a></p>
          </article>
          <article className="card overflow-hidden">
            <iframe title="Карта: Нижний Новгород, улица Героя Попова, 12а" src={school.mapEmbed} className="h-72 w-full border-0" loading="lazy" />
            <p className="p-4 text-sm">
              <a className="font-semibold text-accent" href={school.mapUrl}>Открыть адрес в Яндекс Картах</a>
            </p>
          </article>
        </section>
        <ContactForm />
      </div>
    </>
  );
}
