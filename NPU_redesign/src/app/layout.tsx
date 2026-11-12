import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { PreferencesProvider } from "@/context/preferences";
import { SiteFrame } from "@/components/SiteFrame";
import { school } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const boot = `(function(){try{var p=JSON.parse(localStorage.getItem("npu-prefs-v1")||"null");if(!p)return;var r=document.documentElement;["font","contrast","spacing","theme","motion"].forEach(function(key){if(p[key])r.dataset[key]=p[key];});}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: `${school.shortName} — ${school.abbreviation}`,
    template: `%s — ${school.shortName}`,
  },
  description:
    "Модернизированная версия сайта Нижегородского училища-интерната: поступление, учеба, доступная среда, карьера и новости. Сведения взяты с официального сайта.",
  openGraph: {
    title: school.shortName,
    description: school.legalName,
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <PreferencesProvider>
          <SiteFrame>{children}</SiteFrame>
        </PreferencesProvider>
      </body>
    </html>
  );
}
