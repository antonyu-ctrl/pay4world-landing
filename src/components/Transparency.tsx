"use client";

import Section from "@/components/Section";
import { useContent } from "@/lib/ConfigContext";
import type { TransparencyContent } from "@/lib/siteConfig";

export default function Transparency({ contentOverride }: { contentOverride?: TransparencyContent }) {
  const config = useContent();
  const c = contentOverride ?? config.transparency;

  return (
    <Section id="transparency" eyebrow={c.eyebrow} title={c.title} desc={c.description}>
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <ul className="space-y-2 text-sm text-brand-slate">
          {c.bullets.map((b, i) => (
            <li key={i}>• {b}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
