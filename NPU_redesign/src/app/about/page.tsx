import type { Metadata } from "next";
import { OfficialLink } from "@/components/OfficialLink";
import { PageHeader } from "@/components/PageHeader";
import { school } from "@/data/site";

export const metadata: Metadata = {
  title: "Об училище",
  description: "История, сведения, структура, педагоги и материально-техническая база Нижегородского училища-интерната.",
};

const units = [
  "Административно-хозяйственная часть",
  "Административно-хозяйственная часть (вспомогательный персонал)",
  "Учебно-производственное отделение",
  "Воспитательное отделение",
  "Реабилитационно-медицинское отделение",
  "Центр содействия трудоустройству выпускников",
];

const rooms = [
  "№ 205 — математика и английский язык",
  "№ 206 — информатика и информационные технологии",
  "№ 207 — охрана труда, экономика, безопасность жизнедеятельности",
  "№ 208 — физика, химия, биология, география, естествознание, астрономия",
  "№ 209 — лаборатория документирования, ДОУ и архивоведение",
  "№ 210 — лаборатория электротехники с основами радиоэлектроники",
  "№ 211 — народные художественные промыслы, мастерская росписи по дереву",
  "№ 212 — мультимедиатехнологии",
  "№ 213 — изобразительные искусства, лаборатория дизайна и композиции",
  "№ 214 — деловая культура, учебная канцелярия",
  "№ 302 — русский язык, литература, история, обществознание, право",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Об училище"
        title="Образование вместе с реабилитацией"
        lead="Училище готовит квалифицированных рабочих, служащих и специалистов среднего звена и одновременно помогает студентам с инвалидностью включиться в работу и жизнь общества."
      />
      <div className="wrap grid gap-10 py-12">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="text-2xl font-semibold">Что известно об истории</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              В открытых сообщениях год основания — 1943-й: училище создавалось для ветеранов, получивших ранения на фронте. С этим годом совпадает адрес электронной почты. На официальном сайте отдельной исторической справки в доступном тексте нет, поэтому до публикации эту формулировку стоит сверить с архивом училища.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Сегодня предмет деятельности, по уставу в изложении отчёта о самообследовании, — образовательные программы среднего профессионального образования вместе с профессиональной, медицинской и социальной реабилитацией. Учредитель — {school.founder}.
            </p>
          </div>
          <img src="/media/eco-2.jpg" alt="Студенты у мемориального камня на территории училища" className="h-72 w-full rounded-2xl object-cover" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Основные сведения</h2>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Полное название", school.legalName],
              ["Адрес", school.address],
              ["ИНН / КПП", `${school.inn} / ${school.kpp}`],
              ["ОГРН", school.ogrn],
              ["Лицензия на образование", "№ 411 от 8 июня 2015 года, серия 520Л01 № 0002258, бессрочная"],
              ["Лицензия на медицину", "№ ЛО-52-01-004863 от 4 июня 2015 года"],
              ["Аккредитация", "Свидетельство № 3027 от 26 декабря 2019 года. На странице программ срок аккредитации указан как бессрочный."],
              ["Финансирование программ", "Бюджетные ассигнования областного бюджета"],
            ].map(([title, value]) => (
              <div key={title} className="card p-4">
                <dt className="text-sm font-bold text-accent">{title}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted">Реквизиты и лицензии приведены по отчёту о самообследовании по состоянию на 1 апреля 2025 года. Актуальные выписки лежат на странице «Основные сведения».</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Руководство и структура</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Подразделения создаются, реорганизуются и ликвидируются решением директора по согласованию с учредителем. ФИО директора в этой версии намеренно не указано: открытые реестры и новости называют разных руководителей, а текст официальной страницы «Руководство» в выгрузке фамилий не содержал.
            </p>
            <p className="mt-3 text-sm">
              <OfficialLink href="https://npu-nn.ru/stati/rukovodstvo.html">Актуальный список руководителей</OfficialLink>
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {units.map((unit) => <li key={unit} className="rounded-xl bg-soft px-4 py-3">{unit}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Преподавательский состав</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              По отчёту, учебный процесс ведут 23 штатных преподавателя и воспитателя. Средний возраст коллектива — 53 года, состав укомплектован на 100%, высшее образование имеют 91%. В 2024 году аттестацию прошли 11 человек. За три года повышение квалификации прошли все сотрудники, в том числе в НИРО, на семинарах, конференциях и стажировках.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Имена педагогов сюда не копируются: это персональные данные, и их нужно брать с официальной страницы, а не из устаревшей выборки.
            </p>
            <p className="mt-3 text-sm">
              <OfficialLink href="https://npu-nn.ru/stati/rukovodstvo-pedagogicheskii-sostav.html">Педагогический состав</OfficialLink>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Материально-техническая база</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <article className="card p-5 text-sm leading-relaxed">
              <h3 className="font-semibold">Здание</h3>
              <p className="mt-2 text-muted">Площадь зданий и сооружений — 3177,7 кв. м. На трёх этажах: 7 кабинетов, 2 лаборатории, 2 мастерские, библиотека с читальным залом, кабинет ЛФК и тренажёрный зал. Есть открытая спортивная площадка.</p>
            </article>
            <article className="card p-5 text-sm leading-relaxed">
              <h3 className="font-semibold">Общежитие</h3>
              <p className="mt-2 text-muted">Третий этаж основного здания, 40 мест. Комнаты на двоих собраны в блоки по две комнаты. Есть зона отдыха, зелёный уголок и адаптированные санузлы.</p>
            </article>
            <article className="card p-5 text-sm leading-relaxed">
              <h3 className="font-semibold">Питание и библиотека</h3>
              <p className="mt-2 text-muted">Столовая на первом этаже рассчитана на 100 мест, предлагается 2- и 5-разовое питание. Фонд библиотеки — 5939 экземпляров, есть электронный каталог.</p>
            </article>
          </div>
          <h3 className="mt-8 text-lg font-semibold">Учебные кабинеты</h3>
          <p className="mt-2 text-sm text-muted">На странице материально-технического обеспечения указаны 11 кабинетов общей площадью 454 кв. м. У всех есть выход в интернет.</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {rooms.map((room) => <li key={room} className="rounded-xl border border-line bg-surface px-4 py-3 text-sm">{room}</li>)}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Фотографии</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <figure>
              <img src="/media/banner.jpg" alt="Официальное изображение здания училища" className="h-64 w-full rounded-2xl object-cover" style={{ objectPosition: "80% center" }} />
              <figcaption className="mt-2 text-sm text-muted">Здание на изображении с главной страницы официального сайта. У входа виден пандус.</figcaption>
            </figure>
            <figure>
              <img src="/media/winners.jpg" alt="Студенты с дипломами на фоне стенда студенческого самоуправления" className="h-64 w-full rounded-2xl object-cover" />
              <figcaption className="mt-2 text-sm text-muted">На фотографии с сайта виден стенд Совета студенческих инициатив. Отчёт также описывает студенческое самоуправление.</figcaption>
            </figure>
          </div>
        </section>
      </div>
    </>
  );
}
