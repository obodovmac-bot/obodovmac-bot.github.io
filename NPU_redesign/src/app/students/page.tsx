import type { Metadata } from "next";
import { EventCalendar } from "@/components/EventCalendar";
import { FAQ } from "@/components/FAQ";
import { LessonSchedule } from "@/components/LessonSchedule";
import { MobileAppDownload } from "@/components/MobileAppDownload";
import { StudioMaterials } from "@/components/StudioPublic";
import { NewsCard } from "@/components/NewsCard";
import { OfficialLink } from "@/components/OfficialLink";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { studentFaq } from "@/data/faq";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "Студентам",
  description: "Расписание, библиотека, новости студенческой жизни, мероприятия и документы Нижегородского училища-интерната.",
};

const materials = [
  { title: "Расписание на I полугодие 2025–2026", href: "https://npu-nn.ru/stati/studentu.html", note: "Официальный файл. Сетка звонков здесь не дублируется." },
  { title: "Психологические рекомендации к ГИА", href: "https://npu-nn.ru/stati/studentu.html", note: "Материал указан на странице «Студенту»." },
  { title: "Страница психолога", href: "https://npu-nn.ru/stati/stranica-psihologa.html", note: "Отдельный раздел официального сайта." },
  { title: "Библиотека и электронные ресурсы", href: "https://npu-nn.ru/stati/biblioteka", note: "Каталог и ресурсы для самостоятельной работы." },
  { title: "Стипендии и поддержка", href: "https://npu-nn.ru/stati/stipendii-i-inye-vidy-materialnoi-podderzhki.html", note: "Положение о стипендиальном обеспечении 2021 года." },
];

export default function StudentsPage() {
  const studentNews = news.filter((item) => ["Студенческая жизнь", "Спорт", "Культура", "Волонтёрство"].includes(item.category)).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Студентам"
        title="Учёба, события и документы"
        lead="Учебные файлы, новости и календарь собраны здесь. Листы расписания по дням стоят внизу страницы: каждый день публикуется отдельно."
      />
      <div className="wrap space-y-14 py-12">
        <section>
          <SectionTitle title="Учебные материалы и полезная информация" />
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {materials.map((item) => (
              <li key={item.title} className="card p-5">
                <OfficialLink href={item.href}>{item.title}</OfficialLink>
                <p className="mt-2 text-sm text-muted">{item.note}</p>
              </li>
            ))}
          </ul>
          <StudioMaterials />
        </section>

        <section>
          <SectionTitle title="Новости студенческой жизни" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {studentNews.map((item) => <NewsCard key={item.slug} item={item} />)}
          </div>
        </section>

        <section>
          <SectionTitle title="Календарь мероприятий" text="Даты взяты из опубликованных новостей. Если у события нет подтверждённой даты, оно в календарь не попадает." />
          <div className="mt-6"><EventCalendar /></div>
        </section>

        <section>
          <SectionTitle title="Электронная библиотека" text="Библиотека обслуживает читателей на абонементе и в читальном зале, ведёт электронный каталог, выставки и библиотечные уроки." />
          <dl className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              ["5939", "экземпляров в фонде"],
              ["2091", "учебных изданий"],
              ["3067", "художественных"],
              ["2061", "посещение за учебный год"],
            ].map(([value, label]) => (
              <div key={label} className="card p-4">
                <dt className="text-2xl font-semibold">{value}</dt>
                <dd className="mt-1 text-sm text-muted">{label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted">Цифры — из отчёта о самообследовании, раздел библиотечно-информационного обеспечения. Поступления за 2024 год: 70 экземпляров, подписка — 5 изданий, выдано 3854 экземпляра.</p>
        </section>

        <section id="voprosy">
          <SectionTitle title="Вопросы студентов" />
          <div className="mt-6"><FAQ items={studentFaq} /></div>
        </section>

        <section id="raspisanie">
          <SectionTitle
            title="Расписание по дням"
            text="Каждый лист — отдельный день. Сейчас вывешена пятница 13 ноября 2026 года. Следующие дни редакция добавляет в студии публикаций. Файл на полугодие остаётся на официальном сайте."
          />
          <LessonSchedule />
          <p className="mt-4 text-sm">
            <OfficialLink href="https://npu-nn.ru/stati/studentu.html">Открыть страницу с расписанием на официальном сайте</OfficialLink>
          </p>
        </section>

        <MobileAppDownload />
      </div>
    </>
  );
}
