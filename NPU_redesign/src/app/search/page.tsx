import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Поиск",
  description: "Поиск по страницам, новостям, программам, документам и вопросам сайта училища.",
};

export default function SearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Поиск"
        title="Найти раздел или новость"
        lead="Поиск работает по материалам этой версии сайта: страницам, новостям, программам, карточкам документов и ответам на вопросы."
      />
      <div className="wrap py-12">
        <Suspense fallback={<p>Открываем поиск…</p>}>
          <SearchResults />
        </Suspense>
      </div>
    </>
  );
}
