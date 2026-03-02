"use client";

import Section from "@/components/Section";
import { useContent } from "@/lib/ConfigContext";
import type { RoadmapContent } from "@/lib/siteConfig";

export default function Roadmap({ contentOverride }: { contentOverride?: RoadmapContent }) {
  const config = useContent();
  const c = contentOverride ?? config.roadmap;

  return (
    <Section id="roadmap" eyebrow={c.eyebrow} title={c.title} desc={c.description}>
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <ol className="space-y-3 text-sm text-brand-slate">
          {c.phases.map((p, i) => (
            <li key={i}>
              <span className="font-semibold text-brand-ink">{p.label}</span> {p.description}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
