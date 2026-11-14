"use client";

import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SearchDialog } from "@/components/SearchDialog";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#content">К содержанию</a>
      <Header />
      <main id="content">{children}</main>
      <Footer />
      <AccessibilityPanel />
      <SearchDialog />
    </>
  );
}
