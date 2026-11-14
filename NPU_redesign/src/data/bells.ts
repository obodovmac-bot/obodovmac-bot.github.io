export type BellRow = {
  label: string;
  monday: string;
  week: string;
};

export const bellSchedule = {
  title: "Расписание звонков",
  image: "/media/bells-schedule.jpg",
  sourceNote:
    "Лист со стенда. В углу видна строка об утверждении приказом, но она обрезана: читается только «№ 217у от 2…».",
  rows: [
    { label: "0 урок", monday: "Классный час, 8.00–8.45", week: "8.00–8.45" },
    { label: "1 урок", monday: "9.00–9.45", week: "9.00–9.45" },
    { label: "2 урок", monday: "9.55–10.40", week: "9.55–10.40" },
    { label: "3 урок", monday: "10.50–11.35", week: "10.50–11.35" },
    { label: "Обед 1 смена", monday: "11.35–11.55", week: "11.35–11.55" },
    { label: "4 урок", monday: "11.55–12.40", week: "11.55–12.40" },
    { label: "Обед 2 смена", monday: "12.40–13.00", week: "12.40–13.00" },
    { label: "5 урок", monday: "13.00–13.45", week: "13.00–13.45" },
    { label: "6 урок", monday: "13.55–14.40", week: "13.55–14.40" },
  ] satisfies BellRow[],
};
