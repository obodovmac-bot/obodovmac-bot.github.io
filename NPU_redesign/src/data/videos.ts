export type VideoQuality = {
  id: string;
  label: string;
  src: string;
};

export type SiteVideo = {
  id: string;
  src: string;
  date: string;
  title: string;
  text: string;
  qualities: VideoQuality[];
};

export const videos: SiteVideo[] = [
  {
    id: "media-center-2026-03-07",
    src: "/media/media-center-2026-03-07-480.mp4",
    date: "2026-03-07",
    qualities: [
      { id: "480", label: "480p", src: "/media/media-center-2026-03-07-480.mp4" },
      { id: "360", label: "360p", src: "/media/media-center-2026-03-07-360.mp4" },
    ],
    title: "Студенческий медиацентр Нижегородского училища-интерната: «Информируем, вдохновляя!»",
    text: "Все самое важное и интересное об училище узнаём из первых уст – от самих студентов",
  },
];
