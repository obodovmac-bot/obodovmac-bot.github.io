import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { HomeSlider } from "@/components/HomeSlider";
import { Gallery } from "@/components/Gallery";
import { StudioPhotos } from "@/components/StudioPublic";
import { VideoShelf } from "@/components/VideoShelf";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { SchoolSocials } from "@/components/SchoolSocials";
import { SectionTitle } from "@/components/SectionTitle";
import { news } from "@/data/news";
import { programs } from "@/data/programs";
import { quickLinks, school } from "@/data/site";

const facts = [
  { value: "1943", label: "год основания в открытых публикациях" },
  { value: "115", label: "студентов за счёт областного бюджета" },
  { value: "3", label: "основные программы на странице «Образование»" },
  { value: "40", label: "мест в общежитии на 3-м этаже" },
];

export default function HomePage() {
  return (
    <>
      <HomeSlider />
      <section className="bg-hero text-on-hero">
        <div className="wrap grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_.85fr] lg:py-16">
          <div>
            <p className="text-sm font-bold text-hero-muted">{school.abbreviation} · профессиональное образование и реабилитация</p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight">{school.shortName}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-hero-muted sm:text-lg">{school.welcome}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn btn-hero" href="/applicants">Абитуриентам <ArrowRight aria-hidden size={18} /></Link>
              <Link className="btn btn-hero-quiet" href="/about">О училище</Link>
            </div>
            <SchoolSocials />
          </div>
          <div className="card overflow-hidden bg-surface text-ink">
            <img
              src="/media/eco-2.jpg"
              alt="Студенты у мемориального камня на территории училища"
              className="h-56 w-full object-cover"
            />
            <div className="space-y-3 p-5">
              <p className="flex items-start gap-2 text-sm"><MapPin aria-hidden className="mt-0.5 shrink-0" size={16} />{school.address}</p>
              <p className="flex items-start gap-2 text-sm"><Phone aria-hidden className="mt-0.5 shrink-0" size={16} />{school.phones.join(", ")}</p>
              <p className="text-sm leading-relaxed text-muted">Учредитель — {school.founder}. Обучение очное, вместе с профессиональной, медицинской и социальной реабилитацией.</p>
              <Link href="/contacts" className="text-sm font-bold text-accent">Контакты и карта</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <dl className="wrap grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-3xl font-semibold text-navy">{fact.value}</dt>
              <dd className="mt-1 text-sm text-muted">{fact.label}</dd>
            </div>
          ))}
        </dl>
        <p className="wrap pb-6 text-xs leading-relaxed text-muted">
          115 обучающихся — цифра страницы «Образование». На 1 апреля 2025 года отчёт о самообследовании показывал 97 человек по курсам и ещё 5 в академическом отпуске: это разные даты. Год основания 1943 указан в открытых сообщениях о училище и совпадает с адресом почты; отдельной исторической справки на сайте в доступном тексте нет.
        </p>
      </section>

      <Reveal>
      <section className="wrap py-14">
        <SectionTitle eyebrow="Навигация" title="Популярные разделы" text="Короткие входы в то, за чем обычно приходят на сайт училища." />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="card block h-full p-5 hover:border-accent">
                <span className="text-lg font-semibold">{item.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      </Reveal>

      <section className="bg-surface py-14">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow="Обучение" title="Образовательные направления" text="Три программы со страницы «Образование». Язык обучения — русский, форма — очная, аккредитация указана как бессрочная." />
            <Link href="/applicants#programmy" className="btn btn-secondary">Все условия</Link>
          </div>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {programs.map((program) => (
              <li key={program.id} className="card p-5">
                <p className="text-sm font-bold text-accent">{program.code}</p>
                <h3 className="mt-2 text-lg font-semibold">{program.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {program.terms.map((term) => (
                    <li key={term.base}><span className="font-semibold text-ink">{term.duration}</span> — {term.base.toLowerCase()}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Лента" title="Последние новости" text="Заголовки, даты и тексты взяты с официального сайта. Если полный текст не удалось прочитать, карточка прямо об этом говорит." />
          <Link href="/news" className="btn btn-secondary">Все новости</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((item) => <NewsCard key={item.slug} item={item} />)}
        </div>
      </section>

      <section className="bg-soft py-14">
        <div className="wrap grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <SectionTitle
            eyebrow="Достижения"
            title="Что уже подтверждено публикациями"
            text="Без обещаний трудоустройства и без вымышленных побед. Ниже — цифры из отчёта и новостей."
          />
          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="card p-5">
              <p className="text-3xl font-semibold text-navy">25</p>
              <p className="mt-2 text-sm text-muted">человек проводили на выпускном вечере 2026 года.</p>
            </li>
            <li className="card p-5">
              <p className="text-3xl font-semibold text-navy">21 → 32</p>
              <p className="mt-2 text-sm text-muted">участников регионального этапа «Абилимпикс» с 2022 по 2024 год. Компетенций стало 9 вместо 5.</p>
            </li>
            <li className="card p-5">
              <p className="text-3xl font-semibold text-navy">100%</p>
              <p className="mt-2 text-sm text-muted">укомплектованность педагогического состава. Высшее образование — у 91% из 23 штатных преподавателей и воспитателей.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="wrap py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Галерея" title="Фотографии" text="Кадры с официального сайта можно увеличить. Новые снимки редакция добавляет сюда же." />
          <Link href="/gallery" className="btn btn-secondary">Открыть галерею</Link>
        </div>
        <div className="mt-8">
          <Gallery preview />
          <StudioPhotos />
        </div>
        <div className="mt-14">
          <SectionTitle eyebrow="Видео" title="Ролики училища" text="Плеер сделан для этого сайта: пуск, перемотка, звук и полный экран." />
          <VideoShelf />
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="wrap grid items-start gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Доступная среда"
              title="Учёба устроена с учётом инвалидности и ограничений здоровья"
            />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              На официальных страницах описаны мнемосхемы, бегущая строка, таблички Брайля, портативная индукционная система, адаптированные санузлы общежития и паспорт доступности. Обучение идёт по адаптированным программам, рядом работают медицинское и реабилитационное отделения.
            </p>
            <Link href="/accessibility" className="btn btn-primary mt-5">Подробнее о доступности</Link>
          </div>
          <div className="rounded-xl bg-soft p-5 text-sm leading-relaxed">
            <p className="font-semibold">Категории, названные на странице «Доступная среда»</p>
            <ul className="mt-3 space-y-2 text-muted">
              <li>Студенты с нарушением опорно-двигательного аппарата</li>
              <li>Студенты, передвигающиеся на кресле-коляске</li>
              <li>Студенты с нарушением слуха</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
