import SceneSection from "@/components/SceneSection";
import { SCENE_SECTIONS } from "@/lib/sceneSections";

export default function SectionsRail() {
  return (
    <>
      {SCENE_SECTIONS.map((s, i) => (
        <SceneSection
          key={s.id}
          id={s.id}
          index={i}
          eyebrow={s.eyebrow}
          title={s.title}
          desc={s.desc}
          details={s.details}
          align={s.align}
          mediaSrc={s.mediaSrc}
        />
      ))}
    </>
  );
}