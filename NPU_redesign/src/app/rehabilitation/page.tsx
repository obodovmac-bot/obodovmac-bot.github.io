import type { Metadata } from "next";
import { OfficialLink } from "@/components/OfficialLink";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Реабилитация",
  description: "Медицинская и социальная реабилитация студентов Нижегородского училища-интерната.",
};

const steps = [
  {
    title: "Поступление и маршрут",
    text: "Специалисты проводят консультации, чтобы определить внутриучрежденческий реабилитационный маршрут и выполнить рекомендации ИПРА.",
  },
  {
    title: "Учёба по адаптированной программе",
    text: "Образовательные программы среднего профессионального образования адаптированы с учётом психофизического развития, возможностей и, при необходимости, коррекции нарушений.",
  },
  {
    title: "Сопровождение во время обучения",
    text: "Рядом работают медицинское и реабилитационное отделения, психолог, социальный педагог, сурдопереводчик и инструктор ЛФК.",
  },
  {
    title: "Подготовка к самостоятельной жизни",
    text: "Цель, сформулированная в отчёте, — профессиональные и социальные навыки для дальнейшей работы и жизни в обществе. Это цель сопровождения, а не гарантия трудоустройства.",
  },
];

export default function RehabilitationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Реабилитация"
        title="Учёба не отделена от поддержки"
        lead="Реабилитация — отдельный раздел исходного сайта и часть предмета деятельности училища. Медицинская деятельность лицензирована."
      />
      <div className="wrap space-y-10 py-12">
        <ol className="grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step.title} className="card p-5">
              <p className="text-sm font-bold text-accent">0{index + 1}</p>
              <h2 className="mt-2 text-lg font-semibold">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <section className="grid gap-4 lg:grid-cols-2">
          <article className="card p-5 text-sm leading-relaxed">
            <h2 className="text-lg font-semibold">Медицинское отделение</h2>
            <p className="mt-2 text-muted">Лицензия № ЛО-52-01-004863 от 4 июня 2015 года. В отчёте указаны доврачебная, амбулаторно-поликлиническая и специализированная помощь в пределах приложения к лицензии. В училище есть медицинский кабинет.</p>
          </article>
          <article className="card p-5 text-sm leading-relaxed">
            <h2 className="text-lg font-semibold">Сурдоперевод</h2>
            <p className="mt-2 text-muted">Для глухих и слабослышащих предоставляются услуги сурдоперевода. Одна сотрудница прошла подготовку переводчика русского жестового языка в Университете управления «ТИСБИ» в Казани. Должность сурдопереводчика предусмотрена штатным расписанием.</p>
          </article>
        </section>
        <p className="text-sm">
          <OfficialLink href="https://npu-nn.ru/stati/reabilitacija.html">Раздел «Реабилитация» на официальном сайте</OfficialLink>
        </p>
      </div>
    </>
  );
}
