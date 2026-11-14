export type StudioRole = "teacher" | "staff";

export type StudioPost =
  | { id: string; kind: "schedule"; date: string; title: string; note: string; image: string }
  | { id: string; kind: "bells"; title: string; note: string; image: string }
  | { id: string; kind: "photo"; title: string; caption: string; image: string }
  | { id: string; kind: "video"; title: string; date: string; text: string; src: string }
  | { id: string; kind: "news"; title: string; date: string; text: string }
  | { id: string; kind: "material"; title: string; note: string };

const tickets = new Set(["ПРЕП-13-ВДОХНОВЛЯЯ", "СОТР-13-ВДОХНОВЛЯЯ"]);

export function expectedPass(role: StudioRole, day: string, motto: string) {
  const code = role === "teacher" ? "ПРЕП" : "СОТР";
  return `${code}-${day.trim()}-${motto.trim().toLocaleUpperCase("ru-RU")}`;
}

export function passIsValid(role: StudioRole, day: string, motto: string) {
  return tickets.has(expectedPass(role, day, motto));
}

export function ticketIsAccepted(pass: string) {
  return tickets.has(pass);
}

export function roleFromPass(pass: string | null): StudioRole | null {
  if (pass === "ПРЕП-13-ВДОХНОВЛЯЯ") return "teacher";
  if (pass === "СОТР-13-ВДОХНОВЛЯЯ") return "staff";
  return null;
}
