"use client";

import { bellSchedule } from "@/data/bells";
import { useStudioBoard } from "@/lib/studio";

export function BellSchedule() {
  const { posts } = useStudioBoard();
  const extra = posts.filter((item) => item.kind === "bells");

  return (
    <div className="mt-6 space-y-6">
      <article className="card overflow-hidden">
        <img src={bellSchedule.image} alt={bellSchedule.title} className="max-h-[36rem] w-full bg-soft object-contain" />
        <div className="space-y-4 border-t border-line p-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">{bellSchedule.title}</h3>
            <p className="mt-1 text-sm text-muted">{bellSchedule.sourceNote}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-sm">
              <caption className="sr-only">Время уроков и обедов в понедельник и со вторника по субботу</caption>
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="px-3 py-2 font-semibold">№ урока</th>
                  <th className="px-3 py-2 font-semibold">Понедельник</th>
                  <th className="px-3 py-2 font-semibold">Вторник–суббота</th>
                </tr>
              </thead>
              <tbody>
                {bellSchedule.rows.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <th className="px-3 py-2 text-left font-semibold">{row.label}</th>
                    <td className="px-3 py-2">{row.monday}</td>
                    <td className="px-3 py-2">{row.week}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>
      {extra.map((item) => (
        <article key={item.id} className="card overflow-hidden">
          <img src={item.image} alt={item.title} className="max-h-[36rem] w-full bg-soft object-contain" />
          <div className="space-y-2 border-t border-line p-4">
            <p className="text-xs font-bold text-accent">Из редакции</p>
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            {item.note ? <p className="text-sm text-muted">{item.note}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
