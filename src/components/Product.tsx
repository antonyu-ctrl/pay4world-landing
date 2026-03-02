"use client";

import Section from "@/components/Section";
import { useContent } from "@/lib/ConfigContext";
import type { ProductContent } from "@/lib/siteConfig";

export default function Product({ contentOverride }: { contentOverride?: ProductContent }) {
  const config = useContent();
  const c = contentOverride ?? config.product;

  return (
    <Section id="product" eyebrow={c.eyebrow} title={c.title} desc={c.description}>
      <div className="grid gap-4 sm:grid-cols-2">
        {c.features.map((feat) => (
          <div key={feat.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-brand-ink">{feat.title}</p>
            <p className="mt-2 text-sm leading-6 text-brand-slate">{feat.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
