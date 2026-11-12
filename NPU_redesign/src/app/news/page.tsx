import type { Metadata } from "next";
import { NewsExplorer } from "@/components/NewsExplorer";
import { PageHeader } from "@/components/PageHeader";
import { StudioNews } from "@/components/StudioPublic";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости Нижегородского училища-интерната: даты, категории, поиск и отдельные страницы публикаций.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Новости"
        title="Что происходит в училище"
        lead="Лента собрана из публикаций официального сайта. Поиск и категории работают на этой странице, у каждой новости есть отдельный адрес."
      />
      <div className="wrap py-12">
        <NewsExplorer />
      </div>
    </>
  );
}
