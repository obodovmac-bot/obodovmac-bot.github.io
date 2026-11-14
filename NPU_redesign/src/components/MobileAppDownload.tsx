"use client";

import { useEffect, useState } from "react";

function runningInApp() {
  const cap = (window as Window & {
    Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string };
  }).Capacitor;
  if (cap?.isNativePlatform?.()) return true;
  const platform = cap?.getPlatform?.();
  return Boolean(platform && platform !== "web");
}

export function MobileAppDownload() {
  const [web, setWeb] = useState(false);

  useEffect(() => {
    setWeb(!runningInApp());
  }, []);

  if (!web) return null;

  return (
    <section className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-xl text-sm text-muted">
        Приложение для Android открывает этот же сайт. После публикации обновлений они появляются в приложении. Телефону нужен интернет.
      </p>
      <a className="btn btn-primary shrink-0" href="/npu-site.apk" download="npu-site.apk">
        Скачать мобильную версию
      </a>
    </section>
  );
}
