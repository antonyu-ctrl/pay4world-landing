"use client";

import Hero from "@/components/Hero";
import SceneSection from "@/components/SceneSection";
import ContactScene from "@/components/ContactScene";
import Footer from "@/components/Footer";
import { SCENE_LAYOUT, SCENE_SECTION_ORDER } from "@/lib/sceneSections";
import type { ContentConfig, SceneSectionContent } from "@/lib/siteConfig";

type Props = {
  sectionKey: keyof ContentConfig;
  config: ContentConfig;
};

const SCENE_KEYS = new Set<string>(SCENE_SECTION_ORDER);

export default function SectionPreview({ sectionKey, config }: Props) {
  return (
    <div
      className="origin-top-left"
      style={{ transform: "scale(0.85)", transformOrigin: "top left", width: "117.6%" }}
    >
      {sectionKey === "hero" && (
        <Hero contentOverride={config.hero} previewMode />
      )}

      {SCENE_KEYS.has(sectionKey) && (() => {
        const layout = SCENE_LAYOUT[sectionKey as keyof typeof SCENE_LAYOUT];
        const section = config[sectionKey] as SceneSectionContent;
        if (!layout || !section) return null;
        return (
          <SceneSection
            id={layout.sectionId}
            index={0}
            eyebrow={section.eyebrow}
            title={section.title}
            desc={section.description}
            details={section.details}
            align={layout.align}
            mediaSrc={layout.mediaSrc}
            detailsId={layout.detailsId}
          />
        );
      })()}

      {sectionKey === "contact" && (
        <ContactScene contentOverride={config.contact} />
      )}
      {sectionKey === "footer" && (
        <Footer contentOverride={config.footer} />
      )}
    </div>
  );
}
