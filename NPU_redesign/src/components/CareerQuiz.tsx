"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { quizQuestions, type ProgramId } from "@/data/quiz";
import { programs } from "@/data/programs";

const labels: Record<ProgramId, string> = {
  operator: "09.01.03 Оператор информационных систем и ресурсов",
  art: "54.02.02 Декоративно-прикладное искусство и народные промыслы",
  clerk: "46.01.03 Делопроизводитель",
};

export function CareerQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const question = quizQuestions[step];
  const scores = useMemo(() => {
    const total: Record<ProgramId, number> = { operator: 0, art: 0, clerk: 0 };
    for (const item of quizQuestions) {
      const selected = item.options.find((option) => option.id === answers[item.id]);
      if (!selected) continue;
      for (const [key, value] of Object.entries(selected.scores)) {
        total[key as ProgramId] += value ?? 0;
      }
    }
    return total;
  }, [answers]);

  function choose(optionId: string) {
    const next = { ...answers, [question.id]: optionId };
    setAnswers(next);
    if (step === quizQuestions.length - 1) setDone(true);
    else setStep(step + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done) {
    const ranked = (Object.keys(scores) as ProgramId[]).sort((a, b) => scores[b] - scores[a]);
    const best = programs.find((program) => program.id === ranked[0]);
    const second = programs.find((program) => program.id === ranked[1]);
    return (
      <div className="card p-5 sm:p-6">
        <p className="text-sm font-bold text-accent">Результат знакомства с направлениями</p>
        <h3 className="mt-2 text-2xl font-semibold">Ближе всего: {best ? labels[best.id] : ""}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Это не рекомендация приёмной комиссии и не обещание поступления или работы. Тест только помогает сопоставить интерес с программами, которые училище реально реализует. Окончательный выбор и условия приёма смотрите в правилах на официальном сайте.
        </p>
        {best ? (
          <div className="mt-5 rounded-xl bg-soft p-4">
            <p className="font-semibold">{best.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{best.summary}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {best.terms.map((term) => (
                <li key={term.base}>{term.base}: {term.duration}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {second && scores[ranked[1]] > 0 ? (
          <p className="mt-4 text-sm text-muted">Также набрал баллы вариант «{second.title}». Имеет смысл прочитать о нём рядом с первым.</p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/applicants#programmy" className="btn btn-primary">Смотреть программы</Link>
          <button type="button" className="btn btn-secondary" onClick={restart}>Пройти ещё раз</button>
        </div>
      </div>
    );
  }

  const progress = Math.round((step / quizQuestions.length) * 100);

  return (
    <div className="card p-5 sm:p-6">
      <p className="text-sm font-bold text-muted">Вопрос {step + 1} из {quizQuestions.length}</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-soft" aria-hidden>
        <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
      </div>
      <h3 className="mt-5 text-xl font-semibold">{question.prompt}</h3>
      <div className="mt-4 grid gap-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="min-h-11 rounded-xl border border-line bg-bg px-4 py-3 text-left font-semibold text-ink hover:border-accent"
            onClick={() => choose(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
