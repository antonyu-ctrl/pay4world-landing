"use client";

import Section from "@/components/Section";
import { useContent } from "@/lib/ConfigContext";
import type { SolutionContent } from "@/lib/siteConfig";

export default function Solution({ contentOverride }: { contentOverride?: SolutionContent }) {
  const config = useContent();
  const c = contentOverride ?? config.solution;

  return (
    <Section id="how" eyebrow={c.eyebrow} title={c.title} desc={c.description}>
      <div className="rounded-3xl border border-slate-200 bg-brand-bgTint p-6">
        <ol className="space-y-3 text-sm text-brand-slate">
          {c.steps.map((step, i) => (
            <li key={i}>
              <span className="font-semibold text-brand-ink">{i + 1}.</span> {step}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
