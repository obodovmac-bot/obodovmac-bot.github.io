import type { Metadata } from "next";
import { OfficialLink } from "@/components/OfficialLink";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Доступная среда",
  description: "Условия доступности помещений, обучения и поддержки студентов Нижегородского училища-интерната.",
};

const features = [
  { title: "Мнемосхемы", text: "Холл 1 этажа, лестница 2 этажа и холл 3 этажа." },
  { title: "Бегущая строка", text: "Размещена в холле первого этажа." },
  { title: "Шрифт Брайля", text: "Дублирующие таблички установлены на кабинетах." },
  { title: "Индукционная система", text: "Портативная информационная система для слабослышащих." },
  { title: "Пандус у входа", text: "Виден на официальном изображении здания. Отдельный паспорт доступности объекта опубликован на сайте." },
  { title: "Санузлы общежития", text: "На жилом этаже есть адаптированные санузлы." },
];

const support = [
  "Адаптированные основные профессиональные образовательные программы",
  "Консультации врачей и специалистов для маршрута по ИПРА",
  "Реабилитационное и медицинское отделения с лицензией",
  "Сурдоперевод для глухих и слабослышащих студентов",
  "Педагог-психолог, социальный педагог, специалист по социальной работе, инструктор ЛФК",
  "Индукционная система в кабинетах, включая библиотеку № 310",
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Доступная среда"
        title="Условия, в которых можно учиться"
        lead="Доступная среда на сайте училища описана как возможность свободно передвигаться и получать важную информацию. Ниже — то, что прямо опубликовано, без дополнений «для красоты»."
      />
      <div className="wrap space-y-12 py-12">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="text-2xl font-semibold">Категории обучающихся</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {["Студенты с нарушением опорно-двигательного аппарата", "Студенты, передвигающиеся на кресле-коляске", "Студенты с нарушением слуха"].map((item) => (
                <li key={item} className="rounded-xl bg-soft px-4 py-3">{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Это категории, которые названы на странице «Доступная среда». Другие нозологии в том фрагменте не перечислены, поэтому здесь они не добавляются.
            </p>
          </div>
          <figure>
            <img src="/media/banner.jpg" alt="Вход в здание училища с пандусом на официальном изображении" className="h-72 w-full rounded-2xl object-cover" style={{ objectPosition: "86% center" }} />
            <figcaption className="mt-2 text-sm text-muted">Фрагмент официального изображения здания. Отдельные фотографии мнемосхем и табличек Брайля опубликованы на исходной странице и в эту галерею не подменялись.</figcaption>
          </figure>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Доступная инфраструктура</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => (
              <li key={item.title} className="card p-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <OfficialLink href="https://npu-nn.ru/stati/dostupnaja-sreda.html">Паспорт доступности, памятка и фотографии объектов</OfficialLink>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Условия обучения и поддержка</h2>
          <ul className="mt-4 grid gap-3">
            {support.map((item) => <li key={item} className="rounded-xl border border-line bg-surface px-4 py-3 text-sm">{item}</li>)}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Индукционная система указана для кабинетов № 117, 201, 205–214, 302 и 310 (библиотека). В здании также есть тревожная кнопка, пожарная и охранная сигнализация, ПАК «Стрелец-Мониторинг» и видеонаблюдение.
          </p>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-semibold">Эта версия сайта тоже учитывает доступность</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Кнопка «Версия для слабовидящих» меняет размер шрифта, контраст, интервалы и анимации на всех страницах. По сайту можно идти с клавиатуры: у активных элементов есть заметный фокус, у изображений — подписи, у форм — связанные поля.
          </p>
        </section>
      </div>
    </>
  );
}
