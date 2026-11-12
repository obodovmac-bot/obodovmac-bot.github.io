import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { StudioPhotos } from "@/components/StudioPublic";
import { VideoShelf } from "@/components/VideoShelf";

export const metadata: Metadata = {
  title: "Галерея",
  description: "Фотографии и видео Нижегородского училища-интерната.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Галерея"
        title="Галерея"
        lead="Снимки опубликованы на npu-nn.ru. Под ними — ролики во встроенном плеере."
      />
      <div className="wrap space-y-14 py-12">
        <Gallery />
        <StudioPhotos />
        <section>
          <SectionTitle title="Видео" text="Пуск, перемотка, громкость и полный экран работают в плеере сайта." />
          <VideoShelf />
        </section>
      </div>
    </>
  );
}
