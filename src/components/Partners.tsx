"use client";

import Section from "@/components/Section";
import { useContent } from "@/lib/ConfigContext";
import type { PartnersContent } from "@/lib/siteConfig";

export default function Partners({ contentOverride }: { contentOverride?: PartnersContent } = {}) {
  const config = useContent();
  const c = contentOverride ?? config.partners;

  return (
    <Section id="partners" eyebrow={c.eyebrow} title={c.title} desc={c.description}>
      <div className="grid gap-4 sm:grid-cols-2">
        {c.cards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-200 bg-brand-bgTint p-5">
            <p className="text-sm font-semibold text-brand-ink">{card.title}</p>
            <p className="mt-2 text-sm leading-6 text-brand-slate">{card.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
