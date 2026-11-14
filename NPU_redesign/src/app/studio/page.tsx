import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StudioDesk } from "@/components/StudioDesk";

export const metadata: Metadata = {
  title: "Редакция",
  description: "Редакция сайта Нижегородского училища-интерната: расписания, фотографии, видео, новости и учебные материалы.",
};

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Редакция"
        title="Студия публикаций"
        lead="Сотрудники и преподаватели выкладывают здесь листы расписания, фотографии, видео, новости и материалы для учёбы. Запись видна всем посетителям этого сайта и не уходит на npu-nn.ru."
      />
      <div className="wrap py-12">
        <StudioDesk />
      </div>
    </>
  );
}
