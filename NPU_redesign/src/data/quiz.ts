export type ProgramId = "operator" | "art" | "clerk";

export type QuizOption = {
  id: string;
  label: string;
  scores: Partial<Record<ProgramId, number>>;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "work",
    prompt: "Какая работа кажется ближе?",
    options: [
      { id: "docs", label: "Письма, архив, журналы и аккуратные документы", scores: { clerk: 2 } },
      { id: "make", label: "Рисунок, орнамент и вещи, сделанные руками", scores: { art: 2 } },
      { id: "digital", label: "Компьютер, файлы, сайты и цифровые ресурсы", scores: { operator: 2 } },
    ],
  },
  {
    id: "place",
    prompt: "Где комфортнее проводить учебный день?",
    options: [
      { id: "office", label: "В учебной канцелярии, с папками и образцами документов", scores: { clerk: 2 } },
      { id: "workshop", label: "В мастерской, среди красок, дерева и эскизов", scores: { art: 2 } },
      { id: "lab", label: "За компьютером в кабинете информатики", scores: { operator: 2 } },
    ],
  },
  {
    id: "task",
    prompt: "Какое задание хочется разобрать?",
    options: [
      { id: "letter", label: "Оформить ответ на обращение гражданина", scores: { clerk: 2 } },
      { id: "sketch", label: "Сделать эскиз росписи или композиции", scores: { art: 2 } },
      { id: "table", label: "Навести порядок в папке файлов и таблице", scores: { operator: 2 } },
    ],
  },
  {
    id: "time",
    prompt: "Какой срок обучения сейчас удобнее?",
    options: [
      { id: "short", label: "Около двух лет или меньше", scores: { clerk: 1, operator: 1 } },
      { id: "long", label: "Готов учиться почти четыре года, если профессия творческая", scores: { art: 2 } },
      { id: "either", label: "Срок не главный, важнее содержание", scores: { clerk: 1, operator: 1, art: 1 } },
    ],
  },
  {
    id: "result",
    prompt: "Какой результат больше радует?",
    options: [
      { id: "order", label: "Когда в документах всё находится с первого раза", scores: { clerk: 2 } },
      { id: "object", label: "Когда готовую вещь можно показать людям", scores: { art: 2 } },
      { id: "help", label: "Когда информация или техника начинают работать понятнее", scores: { operator: 2 } },
    ],
  },
];
