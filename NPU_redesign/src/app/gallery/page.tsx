import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";

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
        lead="Снимки опубликованы на npu-nn.ru. Их можно отфильтровать, увеличить и листать стрелками клавиатуры."
      />
      <div className="wrap py-12">
        <Gallery />
      </div>
    </>
  );
}
