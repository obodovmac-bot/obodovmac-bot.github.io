"use client";

import { useMemo, useState } from "react";
import { formatNewsDate } from "@/data/news";
import { fridaySchedule, type ScheduleProgram } from "@/data/schedule";
import { useStudioBoard } from "@/lib/studio";
import { cn } from "@/lib/cn";

type Day = {
  id: string;
  date: string;
  title: string;
  note: string;
  image: string;
  programs?: ScheduleProgram[];
};

const builtIn: Day[] = [
  {
    id: "2026-11-13",
    date: "2026-11-13",
    title: fridaySchedule.title,
    note: fridaySchedule.sourceNote,
    image: "/media/schedule-friday-2026-11-13.jpg",
    programs: fridaySchedule.programs,
  },
];

export function LessonSchedule() {
  const { posts } = useStudioBoard();
  const days = useMemo(() => {
    const extra: Day[] = posts
      .filter((item) => item.kind === "schedule")
      .map((item) => ({
        id: item.id,
        date: item.date,
        title: item.title,
        note: item.note,
        image: item.image,
      }));
    return [...builtIn, ...extra].sort((a, b) => b.date.localeCompare(a.date));
  }, [posts]);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const current = days.find((day) => day.id === pickedId) ?? days[0];

  if (!current) return null;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Дни расписания">
        {days.map((day) => (
          <button
            key={day.id}
            type="button"
            role="tab"
            aria-selected={day.id === current.id}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-semibold",
              day.id === current.id ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-ink",
            )}
            onClick={() => setPickedId(day.id)}
          >
            {formatNewsDate(day.date)}
          </button>
        ))}
      </div>
      <article className="card overflow-hidden">
        <img src={current.image} alt={current.title} className="max-h-[36rem] w-full bg-soft object-contain" />
        <div className="space-y-2 border-t border-line p-4">
          <h3 className="text-lg font-semibold text-ink">{current.title}</h3>
          <p className="text-sm text-muted">{current.note}</p>
        </div>
      </article>
      {current.programs ? (
        <details className="card p-4">
          <summary className="cursor-pointer text-sm font-semibold text-ink">Текстовая версия этого листа</summary>
          <div className="mt-4 space-y-6">
            {current.programs.map((program) => (
              <div key={program.title} className="overflow-x-auto">
                <h4 className="text-sm font-semibold text-ink">{program.title}</h4>
                <table className="mt-2 w-full min-w-[36rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="px-2 py-2">Урок</th>
                      {program.groups.map((group) => (
                        <th key={group.id} scope="col" className="px-2 py-2">{group.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fridaySchedule.lessonNumbers.map((number) => (
                      <tr key={number} className="border-b border-line last:border-0">
                        <th scope="row" className="px-2 py-2">{number}</th>
                        {program.groups.map((group) => {
                          const lesson = group.lessons[number];
                          return (
                            <td key={group.id} className="px-2 py-2 align-top">
                              {lesson ? (
                                <>
                                  <span className="block font-semibold">{lesson.subject}</span>
                                  <span className="text-xs text-muted">{lesson.place} · {lesson.teacher}</span>
                                </>
                              ) : (
                                <span className="text-muted">Нет занятия</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
