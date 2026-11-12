"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { events } from "@/data/events";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(date);
}

function iso(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function EventCalendar() {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(iso(today));

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    const result: Array<Date | null> = Array.from({ length: startOffset }, () => null);
    for (let day = 1; day <= days; day += 1) result.push(new Date(year, month, day));
    while (result.length % 7 !== 0) result.push(null);
    return result;
  }, [cursor]);

  const selectedEvents = events.filter((event) => event.date === selected);
  const upcoming = events
    .filter((event) => event.date >= iso(today))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <div className="card p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button type="button" className="btn btn-secondary" aria-label="Предыдущий месяц" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
            <ChevronLeft aria-hidden size={18} />
          </button>
          <h3 className="text-lg font-semibold capitalize">{monthLabel(cursor)}</h3>
          <button type="button" className="btn btn-secondary" aria-label="Следующий месяц" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
            <ChevronRight aria-hidden size={18} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-muted">
          {weekdays.map((day) => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((date, index) => {
            if (!date) return <div key={`empty-${index}`} />;
            const value = iso(date);
            const hasEvent = events.some((event) => event.date === value);
            const isSelected = value === selected;
            const isToday = value === iso(today);
            return (
              <button
                key={value}
                type="button"
                onClick={() => setSelected(value)}
                aria-pressed={isSelected}
                aria-label={`${date.getDate()} ${monthLabel(date)}${hasEvent ? ", есть событие" : ""}`}
                className={`min-h-11 rounded-lg text-sm font-semibold ${isSelected ? "bg-accent text-accent-ink" : "bg-bg text-ink"} ${isToday && !isSelected ? "ring-2 ring-accent" : ""}`}
              >
                {date.getDate()}
                {hasEvent ? <span className="mt-0.5 block text-[0.65rem]">•</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-5">
          <h3 className="font-semibold">События выбранного дня</h3>
          {selectedEvents.length ? (
            <ul className="mt-3 space-y-3">
              {selectedEvents.map((event) => (
                <li key={event.id}>
                  <p className="text-sm text-muted">{event.category} · {event.place}</p>
                  {event.href ? (
                    <Link href={event.href} className="font-semibold text-accent">{event.title}</Link>
                  ) : (
                    <p className="font-semibold">{event.title}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">На эту дату в опубликованных новостях событий нет.</p>
          )}
        </div>
        <div className="card p-5">
          <h3 className="font-semibold">Предстоящие</h3>
          {upcoming.length ? (
            <ul className="mt-3 space-y-3">
              {upcoming.map((event) => (
                <li key={event.id}>
                  <p className="text-sm text-muted">{new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(new Date(event.date + "T12:00:00"))}</p>
                  <p className="font-semibold">{event.title}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Среди опубликованных новостей нет событий с датой позже сегодняшнего дня. Календарь показывает уже прошедшие события училища. День открытых дверей анонсируется на официальном сайте, отдельной даты в открытом тексте нет.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
