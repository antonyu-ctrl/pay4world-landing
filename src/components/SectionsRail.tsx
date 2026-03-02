"use client";

import SceneSection from "@/components/SceneSection";
import { useContent } from "@/lib/ConfigContext";
import { SCENE_SECTION_ORDER, SCENE_LAYOUT } from "@/lib/sceneSections";

export default function SectionsRail() {
  const content = useContent();

  return (
    <div>
      {SCENE_SECTION_ORDER.map((key, i) => {
        const section = content[key];
        const layout = SCENE_LAYOUT[key];
        return (
          <SceneSection
            key={key}
            id={layout.sectionId}
            index={i}
            eyebrow={section.eyebrow}
            title={section.title}
            desc={section.description}
            details={section.details}
            align={layout.align}
            mediaSrc={layout.mediaSrc}
            detailsId={layout.detailsId}
          />
        );
      })}
    </div>
  );
}
