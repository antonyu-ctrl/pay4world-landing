"use client";

import { useContent } from "@/lib/ConfigContext";
import type { FooterContent } from "@/lib/siteConfig";

export default function Footer({
  contentOverride,
}: {
  contentOverride?: FooterContent;
}) {
  const configContent = useContent();
  const ft = contentOverride ?? configContent.footer;

  const copyright = ft.copyright.replace(
    "{year}",
    String(new Date().getFullYear())
  );

  return (
    <footer className="border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-brand-slate sm:px-6 lg:px-8">
        <p className="font-semibold text-brand-ink">{ft.companyName}</p>
        <p className="mt-2">{copyright}</p>
      </div>
    </footer>
  );
}
