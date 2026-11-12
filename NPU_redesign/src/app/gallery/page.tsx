import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { StudioPhotos } from "@/components/StudioPublic";
import { VideoShelf } from "@/components/VideoShelf";

export const metadata: Metadata = {
  title: "Фотогалерея",
  description: "Фотографии Нижегородского училища-интерната с официального сайта: категории и полноэкранный просмотр.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Галерея"
        title="Фотографии училища"
        lead="Снимки опубликованы на npu-nn.ru. Под ними — ролики, которые смотрятся во встроенном плеере."
      />
      <div className="wrap space-y-14 py-12">
        <Gallery />
      </div>
    </>
  );
}
