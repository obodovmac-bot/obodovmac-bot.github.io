import type { Metadata } from "next";
import { CareerQuiz } from "@/components/CareerQuiz";
import { OfficialLink } from "@/components/OfficialLink";
import { PageHeader } from "@/components/PageHeader";
import { school } from "@/data/site";

export const metadata: Metadata = {
  title: "Карьера",
  description: "Центр содействия трудоустройству выпускников, партнёры и профориентационный тест Нижегородского училища-интерната.",
};

const directions = [
  "Мониторинг трудоустройства выпускников на основе индивидуального учёта",
  "Информирование студентов и выпускников о рынке труда",
  "Сотрудничество с работодателями",
  "Взаимодействие со службой занятости, общественными, студенческими и молодёжными организациями",
];

const partners = [
  "АО «Гринатом»",
  "ООО «Строительная инженерно-энергетическая компания»",
  "УФМС Ленинского района г. Нижнего Новгорода",
  "Нижегородская областная организация «Всероссийское общество инвалидов»",
  "Благотворительный фонд «Алиса»",
  "НРОО «Инватур»",
  "НРОО инвалидов «Социальная реабилитация»",
  "ГКУНО «УСЗН Ленинского района г. Нижний Новгород»",
  "Центр поддержки семьи «Обнажённые сердца»",
];

export default function CareerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Карьера"
        title="От учёбы к работе"
        lead="В училище работает Центр содействия трудоустройству выпускников. Он помогает сориентироваться, но не гарантирует место работы. Истории выпускников с официальной страницы в выгрузке не содержались и здесь не придуманы."
      />
      <div className="wrap space-y-12 py-12">
        <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="card p-6">
            <p className="text-sm font-bold text-accent">Центр содействия трудоустройству</p>
            <h2 className="mt-2 text-2xl font-semibold">Зотова Елена Михайловна</h2>
            <p className="mt-2 text-sm text-muted">Руководитель центра по сведениям официальной страницы.</p>
            <p className="mt-4 font-semibold">{school.phones[0]}</p>
            <p className="mt-4 text-sm">
              <OfficialLink href="https://npu-nn.ru/stati/trudoustroistvo-vypusknikov.html">Положение, резюме и сведения о трудоустройстве</OfficialLink>
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Чем занимается центр</h2>
            <ul className="mt-4 space-y-2">
              {directions.map((item) => <li key={item} className="rounded-xl bg-soft px-4 py-3 text-sm">{item}</li>)}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Партнёры и работодатели</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            Список опубликован на странице трудоустройства. Работодатели также участвуют в вариативной части программ, предоставляют базы практики и принимают педагогов на стажировки. Наличие организации в списке не означает открытую вакансию.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => <li key={partner} className="card p-4 text-sm font-semibold">{partner}</li>)}
          </ul>
          <p className="mt-3 text-xs text-muted">На странице также указано дополнительное соглашение с ГКУ ЦЗН г. Нижний Новгород. Сведения о трудоустройстве выложены за декабрь 2021, 2022, 2023 и ноябрь 2024 года — цифры нужно смотреть в самих файлах.</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Истории выпускников</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              На карьерном навигаторе официального сайта есть раздел «Истории успеха», но тексты историй в доступную выгрузку не попали. Чтобы не опубликовать вымышленные биографии, карточки выпускников здесь не созданы.
            </p>
            <p className="mt-3 text-sm">
              <OfficialLink href="https://npu-nn.ru/stati/karernyi-navigator">Карьерный навигатор на официальном сайте</OfficialLink>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Из подтверждённого: в 2022 году училище выпустило 41 человека, в 2023 — 39, в 2024 — 35. На выпускном вечере 2026 года проводили 25 человек. Это разные показатели, их не нужно складывать.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Карьерный тест</h2>
            <p className="mt-3 mb-4 text-sm leading-relaxed text-muted">
              Пять вопросов знакомят с тремя действующими программами. Результат информационный.
            </p>
            <CareerQuiz />
          </div>
        </section>
      </div>
    </>
  );
}
