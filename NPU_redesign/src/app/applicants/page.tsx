import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { OfficialLink } from "@/components/OfficialLink";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { applicantFaq } from "@/data/faq";
import { extraProgram, programs } from "@/data/programs";
import { school } from "@/data/site";

export const metadata: Metadata = {
  title: "Абитуриентам",
  description: "Правила поступления, профессии, документы, сроки и контакты приёмной комиссии Нижегородского училища-интерната.",
};

export default function ApplicantsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Абитуриентам"
        title="Как устроено поступление"
        lead="Здесь собраны программы, сроки и известные условия приёма. Бланки заявлений и полный текст правил остаются на официальном сайте: их нельзя заменять кратким пересказом."
      />
      <div className="wrap space-y-14 py-12">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["Форма", "Очная"],
            ["Основа", "Бюджет областного финансирования"],
            ["Язык", "Русский"],
          ].map(([title, value]) => (
            <article key={title} className="card p-5">
              <p className="text-sm font-bold text-accent">{title}</p>
              <p className="mt-2 text-lg font-semibold">{value}</p>
            </article>
          ))}
        </section>

        <section id="programmy">
          <SectionTitle title="Профессии и специальности" text="Сведения со страницы «Образование». Срок на базе 11 классов указан только там, где он опубликован." />
          <div className="mt-6 grid gap-4">
            {programs.map((program) => (
              <article key={program.id} className="card p-5 sm:p-6">
                <p className="text-sm font-bold text-accent">{program.code}</p>
                <h3 className="mt-1 text-xl font-semibold">{program.title}</h3>
                <p className="mt-2 text-sm text-muted">{program.level}</p>
                <p className="mt-3 text-sm leading-relaxed">{program.summary}</p>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {program.terms.map((term) => (
                    <div key={term.base} className="rounded-xl bg-soft p-3">
                      <dt className="text-sm font-semibold">{term.duration}</dt>
                      <dd className="text-sm text-muted">{term.base}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs text-muted">Аккредитация: {program.accreditation}. Форма: {program.form}.</p>
              </article>
            ))}
            <article className="rounded-2xl border border-dashed border-line p-5">
              <h3 className="font-semibold">{extraProgram.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{extraProgram.note}</p>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Правила и документы</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              По отчёту о самообследовании на обучение принимаются граждане, в том числе люди с инвалидностью. Бесплатное среднее профессиональное образование доступно, если этот уровень получается впервые. Подробный перечень заявлений, справок и медицинских документов опубликован в правилах приёма.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><OfficialLink href="https://npu-nn.ru/stati/abiturientu">Раздел «Абитуриенту»: правила, образцы заявлений, приёмная комиссия</OfficialLink></li>
              <li><OfficialLink href="https://npu-nn.ru/stati/vakantnye-mesta-dlja-priyoma-perevoda-byudzhet.html">Вакантные места для приёма и перевода</OfficialLink></li>
            </ul>
          </div>
          <div className="card p-5">
            <h2 className="text-xl font-semibold">Сроки, которые уже опубликованы</h2>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              <li>Контрольные цифры приёма на 2025–2026 учебный год в отчёте: 51 место, 4 группы. Из них 41 место по программам подготовки рабочих и служащих и 10 мест по специальности 54.02.02.</li>
              <li>Таблица отчёта распознана не полностью. Перед консультацией сверьте PDF.</li>
              <li>Дата дня открытых дверей в открытом тексте не указана. Анонс нужно смотреть в разделе «Абитуриенту».</li>
            </ul>
          </div>
        </section>

        <section id="voprosy">
          <SectionTitle title="Частые вопросы" text="Ответы опираются на опубликованные сведения. Там, где документа не хватает, это сказано прямо." />
          <div className="mt-6"><FAQ items={applicantFaq} /></div>
        </section>

        <section className="card p-6">
          <h2 className="text-2xl font-semibold">Приёмная комиссия</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            Отдельный номер комиссии на сайте не выделен. Для вопросов о приёме используйте общие контакты и уточните, что звонок касается поступления.
          </p>
          <p className="mt-4 font-semibold">{school.phones.join(" · ")}</p>
          <p className="mt-1"><a className="font-semibold text-accent" href={`mailto:${school.email}`}>{school.email}</a></p>
          <p className="mt-1 text-sm text-muted">{school.address}</p>
        </section>
      </div>
    </>
  );
}
