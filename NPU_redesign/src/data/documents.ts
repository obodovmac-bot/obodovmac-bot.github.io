export type DocItem = {
  title: string;
  group: string;
  note: string;
  href: string;
  external?: boolean;
};

export const documents: DocItem[] = [
  {
    title: "Основные сведения",
    group: "Сведения об организации",
    note: "Реквизиты, лицензия и адрес. На официальной странице есть выписки из реестров.",
    href: "https://npu-nn.ru/stati/osnovnye-svedenija.html",
    external: true,
  },
  {
    title: "Структура и органы управления",
    group: "Сведения об организации",
    note: "Подразделения училища и положения о них.",
    href: "https://npu-nn.ru/stati/struktura-i-organy-upravlenija.html",
    external: true,
  },
  {
    title: "Документы",
    group: "Сведения об организации",
    note: "Устав и локальные акты публикуются на официальном сайте.",
    href: "https://npu-nn.ru/stati/dokumenty.html",
    external: true,
  },
  {
    title: "Образование",
    group: "Сведения об организации",
    note: "Программы, сроки, язык, форма обучения и численность.",
    href: "https://npu-nn.ru/stati/obrazovanie.html",
    external: true,
  },
  {
    title: "Образовательные стандарты",
    group: "Сведения об организации",
    note: "Стандарты и требования к программам.",
    href: "https://npu-nn.ru/stati/obrazovatelnye-standarty.html",
    external: true,
  },
  {
    title: "Руководство",
    group: "Сведения об организации",
    note: "Актуальный список руководителей. В этой версии фамилии директора нет: открытые источники расходятся.",
    href: "https://npu-nn.ru/stati/rukovodstvo.html",
    external: true,
  },
  {
    title: "Педагогический состав",
    group: "Сведения об организации",
    note: "Персональные сведения педагогов размещены на официальной странице и здесь не копируются.",
    href: "https://npu-nn.ru/stati/rukovodstvo-pedagogicheskii-sostav.html",
    external: true,
  },
  {
    title: "Стипендии и меры поддержки",
    group: "Студентам",
    note: "На сайте опубликовано положение о стипендиальном обеспечении 2021 года.",
    href: "https://npu-nn.ru/stati/stipendii-i-inye-vidy-materialnoi-podderzhki.html",
    external: true,
  },
  {
    title: "Вакантные места для приёма и перевода",
    group: "Абитуриентам",
    note: "Сведения по состоянию, указанному на официальной странице.",
    href: "https://npu-nn.ru/stati/vakantnye-mesta-dlja-priyoma-perevoda-byudzhet.html",
    external: true,
  },
  {
    title: "Правила приёма и образцы заявлений",
    group: "Абитуриентам",
    note: "Раздел «Абитуриенту»: правила, приёмная комиссия, день открытых дверей, виртуальная экскурсия.",
    href: "https://npu-nn.ru/stati/abiturientu",
    external: true,
  },
  {
    title: "Расписание на I полугодие 2025–2026",
    group: "Студентам",
    note: "Файл расписания опубликован на странице «Студенту».",
    href: "https://npu-nn.ru/stati/studentu.html",
    external: true,
  },
  {
    title: "Библиотека и электронные ресурсы",
    group: "Студентам",
    note: "Раздел электронных образовательных ресурсов и библиотеки.",
    href: "https://npu-nn.ru/stati/biblioteka",
    external: true,
  },
  {
    title: "Отчёт о самообследовании за 2024 год",
    group: "Сведения об организации",
    note: "Отчёт по состоянию на 1 апреля 2025 года. Из него взята часть цифр этой версии сайта.",
    href: "https://npu-nn.ru/doki/%D0%9E%D1%82%D1%87%D0%B5%D1%82%20%D0%BE%20%D1%81%D0%B0%D0%BC%D0%BE%D0%BE%D0%B1%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B8%20%D0%B7%D0%B0%202024%D0%B3..pdf",
    external: true,
  },
  {
    title: "Доступная среда",
    group: "Доступная среда",
    note: "Паспорт доступности, памятка и фотографии объектов.",
    href: "https://npu-nn.ru/stati/dostupnaja-sreda.html",
    external: true,
  },
  {
    title: "Материально-техническое обеспечение",
    group: "Доступная среда",
    note: "Кабинеты, библиотека, спорт, питание и специальные средства.",
    href: "https://npu-nn.ru/stati/materialno-tehnicheskoe-obespechenie-i-osnaschennost-obrazovatelnogo-processa.html",
    external: true,
  },
  {
    title: "Центр содействия трудоустройству выпускников",
    group: "Карьера",
    note: "Положение, партнёры и сведения о трудоустройстве.",
    href: "https://npu-nn.ru/stati/trudoustroistvo-vypusknikov.html",
    external: true,
  },
];
