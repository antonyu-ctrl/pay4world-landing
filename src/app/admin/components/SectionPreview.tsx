"use client";

import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Product from "@/components/Product";
import Transparency from "@/components/Transparency";
import Partners from "@/components/Partners";
import Impact from "@/components/Impact";
import Roadmap from "@/components/Roadmap";
import ContactScene from "@/components/ContactScene";
import Footer from "@/components/Footer";
import type { ContentConfig } from "@/lib/siteConfig";

type Props = {
  sectionKey: keyof ContentConfig;
  config: ContentConfig;
};

export default function SectionPreview({ sectionKey, config }: Props) {
  // Wrap in a scaled container to approximate page appearance
  return (
    <div className="origin-top-left" style={{ transform: "scale(0.85)", transformOrigin: "top left", width: "117.6%" }}>
      {sectionKey === "hero" && (
        <div className="relative h-[500px] overflow-hidden">
          <Hero contentOverride={config.hero} />
        </div>
      )}
      {sectionKey === "problem" && (
        <Problem contentOverride={config.problem} />
      )}
      {sectionKey === "solution" && (
        <Solution contentOverride={config.solution} />
      )}
      {sectionKey === "product" && (
        <Product contentOverride={config.product} />
      )}
      {sectionKey === "transparency" && (
        <Transparency contentOverride={config.transparency} />
      )}
      {sectionKey === "partners" && (
        <Partners contentOverride={config.partners} />
      )}
      {sectionKey === "impact" && (
        <Impact contentOverride={config.impact} />
      )}
      {sectionKey === "roadmap" && (
        <Roadmap contentOverride={config.roadmap} />
      )}
      {sectionKey === "contact" && (
        <ContactScene contentOverride={config.contact} />
      )}
      {sectionKey === "footer" && (
        <Footer contentOverride={config.footer} />
      )}
    </div>
  );
}
