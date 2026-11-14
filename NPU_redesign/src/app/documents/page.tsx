import type { Metadata } from "next";
import { OfficialLink } from "@/components/OfficialLink";
import { PageHeader } from "@/components/PageHeader";
import { documents } from "@/data/documents";

export const metadata: Metadata = {
  title: "Документы и сведения",
  description: "Сведения об образовательной организации и ссылки на официальные документы Нижегородского училища-интерната.",
};

export default function DocumentsPage() {
  const groups = Array.from(new Set(documents.map((item) => item.group)));
  return (
    <>
      <PageHeader
        eyebrow="Сведения"
        title="Документы и обязательная информация"
        lead="Файлы устава, лицензий и положений остаются на официальном сайте. Здесь — понятный каталог со ссылками, чтобы ничего не подменить устаревшей копией."
      />
      <div className="wrap space-y-10 py-12">
        {groups.map((group) => (
          <section key={group}>
            <h2 className="text-2xl font-semibold">{group}</h2>
            <ul className="mt-4 grid gap-3">
              {documents.filter((item) => item.group === group).map((item) => (
                <li key={item.title} className="card p-5">
                  {item.external ? <OfficialLink href={item.href}>{item.title}</OfficialLink> : null}
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
