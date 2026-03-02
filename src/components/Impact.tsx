"use client";

import Section from "@/components/Section";
import { useContent } from "@/lib/ConfigContext";
import type { ImpactContent } from "@/lib/siteConfig";

export default function Impact({ contentOverride }: { contentOverride?: ImpactContent } = {}) {
  const config = useContent();
  const c = contentOverride ?? config.impact;

  return (
    <Section id="impact" eyebrow={c.eyebrow} title={c.title} desc={c.description}>
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {c.metrics.map((m) => (
            <div key={m.title} className="rounded-2xl border border-slate-200 bg-brand-bgTint p-5">
              <p className="text-sm font-semibold text-brand-ink">{m.title}</p>
              <p className="mt-2 text-sm text-brand-slate">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
