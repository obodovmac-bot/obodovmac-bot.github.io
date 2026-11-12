export type SchoolEvent = {
  id: string;
  date: string;
  title: string;
  place: string;
  category: string;
  href?: string;
};

export const events: SchoolEvent[] = [
  {
    id: "tennis",
    date: "2026-10-28",
    title: "Первенство училища по настольному теннису",
    place: "Училище",
    category: "Спорт",
    href: "/news/pozdravlyaem-pobediteley",
  },
  {
    id: "aid",
    date: "2026-10-16",
    title: "Завершение сбора гуманитарной помощи",
    place: "Училище",
    category: "Волонтёрство",
    href: "/news/my-sdelali-eto-vmeste",
  },
  {
    id: "forum",
    date: "2026-10-05",
    title: "Участие в форуме лидеров «СО-общество»",
    place: "По сообщению училища",
    category: "Студенческая жизнь",
    href: "/news/forum-so-obshchestvo",
  },
  {
    id: "freshman",
    date: "2026-09-24",
    title: "День первокурсника",
    place: "Училище",
    category: "Студенческая жизнь",
    href: "/news/den-pervokursnika",
  },
  {
    id: "eco",
    date: "2026-09-22",
    title: "Уборка территории у мемориального камня",
    place: "Территория училища",
    category: "Волонтёрство",
    href: "/news/nashi-ekovolontyory",
  },
  {
    id: "graduation",
    date: "2026-06-30",
    title: "Выпускной вечер: 25 выпускников",
    place: "Училище",
    category: "Выпуск",
    href: "/news/vypusk-2026",
  },
  {
    id: "defense",
    date: "2026-06-25",
    title: "Защита выпускных работ группы 18, профессия «Делопроизводитель»",
    place: "Училище",
    category: "Выпуск",
    href: "/news/zashchita-deloproizvoditelej",
  },
  {
    id: "memory",
    date: "2026-06-22",
    title: "День памяти и скорби",
    place: "Памятная дата",
    category: "Памятные даты",
    href: "/news/den-pamyati-i-skorbi",
  },
  {
    id: "pushkin",
    date: "2026-06-17",
    title: "Выход в мир искусства по Пушкинской карте",
    place: "По сообщению училища",
    category: "Культура",
    href: "/news/pushkinskaya-karta",
  },
  {
    id: "childhood",
    date: "2026-06-03",
    title: "День детства",
    place: "Училище",
    category: "Студенческая жизнь",
    href: "/news/den-detstva",
  },
];
