import { applicantFaq, studentFaq } from "@/data/faq";
import { documents } from "@/data/documents";
import { news } from "@/data/news";
import { extraProgram, programs } from "@/data/programs";
import { quickLinks, school } from "@/data/site";

export type SearchKind = "Страница" | "Новость" | "Документ" | "Программа" | "Вопрос";

export type SearchRecord = {
  title: string;
  text: string;
  href: string;
  kind: SearchKind;
};

const pages: SearchRecord[] = [
  {
    title: "Главная",
    href: "/",
    kind: "Страница",
    text: `${school.legalName} ${school.address} ${school.email} абитуриентам о училище новости`,
  },
  {
    title: "Об училище",
    href: "/about",
    kind: "Страница",
    text: "история руководство преподаватели материально-техническая база общежитие библиотека лицензия",
  },
  {
    title: "Абитуриентам",
    href: "/applicants",
    kind: "Страница",
    text: "поступление правила документы сроки профессий приёмная комиссия",
  },
  {
    title: "Студентам",
    href: "/students",
    kind: "Страница",
    text: "расписание 13 ноября пятница группы уроки учебные материалы библиотека мероприятия документы",
  },
  {
    title: "Новости",
    href: "/news",
    kind: "Страница",
    text: "новости публикации категории поиск",
  },
  {
    title: "Доступная среда",
    href: "/accessibility",
    kind: "Страница",
    text: "доступность пандус брайль мнемосхема индукционная система инвалидность ОВЗ",
  },
  {
    title: "Карьера",
    href: "/career",
    kind: "Страница",
    text: "трудоустройство центр выпускников партнёры тест навигатор Зотова",
  },
  {
    title: "Контакты",
    href: "/contacts",
    kind: "Страница",
    text: `${school.address} ${school.phones.join(" ")} ${school.email} карта обратная связь`,
  },
  {
    title: "Фотогалерея",
    href: "/gallery",
    kind: "Страница",
    text: "фотографии видео плеер здание праздники волонтерство спорт",
  },
  {
    title: "Редакция",
    href: "/studio",
    kind: "Страница",
    text: "студия публикаций расписание фотографии видео новости преподаватели сотрудники",
  },
  {
    title: "Документы и сведения",
    href: "/documents",
    kind: "Страница",
    text: "сведения об образовательной организации устав лицензия отчёт",
  },
  {
    title: "Реабилитация",
    href: "/rehabilitation",
    kind: "Страница",
    text: "реабилитация медицина ИПРА абилитация сурдоперевод психолог",
  },
  ...quickLinks.map((link) => ({
    title: link.title,
    href: link.href,
    kind: "Страница" as const,
    text: link.text,
  })),
];

export const searchRecords: SearchRecord[] = [
  ...pages,
  ...programs.map((program) => ({
    title: `${program.code} ${program.title}`,
    href: "/applicants#programmy",
    kind: "Программа" as const,
    text: `${program.summary} ${program.terms.map((term) => term.duration).join(" ")} ${program.form}`,
  })),
  {
    title: extraProgram.title,
    href: "/applicants#programmy",
    kind: "Программа",
    text: extraProgram.note,
  },
  ...news.map((item) => ({
    title: item.title,
    href: `/news/${item.slug}`,
    kind: "Новость" as const,
    text: `${item.category} ${item.excerpt} ${item.body.join(" ")}`,
  })),
  ...documents.map((item) => ({
    title: item.title,
    href: item.external ? "/documents" : item.href,
    kind: "Документ" as const,
    text: `${item.group} ${item.note}`,
  })),
  ...[...applicantFaq, ...studentFaq].map((item) => ({
    title: item.question,
    href: item.id === "schedule" || item.id === "library" || item.id === "support" ? "/students#voprosy" : "/applicants#voprosy",
    kind: "Вопрос" as const,
    text: item.answer,
  })),
];

export function searchSite(query: string) {
  const normalized = query.trim().toLowerCase().replaceAll("ё", "е");
  if (normalized.length < 2) return [];
  const parts = normalized.split(/\s+/).filter(Boolean);

  return searchRecords
    .map((record) => {
      const title = record.title.toLowerCase().replaceAll("ё", "е");
      const text = record.text.toLowerCase().replaceAll("ё", "е");
      let score = 0;
      for (const part of parts) {
        if (title.includes(part)) score += 6;
        else if (text.includes(part)) score += 2;
        else return { record, score: 0 };
      }
      return { record, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.record);
}
