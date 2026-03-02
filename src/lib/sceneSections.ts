export type SceneAlign = "left" | "right";

/** Layout / routing metadata for each scene section (not CMS-editable) */
export type SceneLayout = {
  align: SceneAlign;
  mediaSrc: string;
  detailsId: string;
  sectionId: string; // HTML anchor id
};

/** Ordered list of section keys matching ContentConfig keys */
export const SCENE_SECTION_ORDER = [
  "problem",
  "solution",
  "product",
  "transparency",
  "partners",
  "impact",
  "roadmap",
] as const;

export type SceneSectionKey = (typeof SCENE_SECTION_ORDER)[number];

/** Layout config per section — align, image, routing */
export const SCENE_LAYOUT: Record<SceneSectionKey, SceneLayout> = {
  problem: {
    align: "left",
    mediaSrc: "/assets/sections/problem.png",
    detailsId: "problem",
    sectionId: "problem",
  },
  solution: {
    align: "right",
    mediaSrc: "/assets/sections/solution.png",
    detailsId: "how",
    sectionId: "how",
  },
  product: {
    align: "left",
    mediaSrc: "/assets/sections/product.png",
    detailsId: "product",
    sectionId: "product",
  },
  transparency: {
    align: "right",
    mediaSrc: "/assets/sections/transparency.png",
    detailsId: "transparency",
    sectionId: "transparency",
  },
  partners: {
    align: "left",
    mediaSrc: "/assets/sections/partners.png",
    detailsId: "partners",
    sectionId: "partners",
  },
  impact: {
    align: "right",
    mediaSrc: "/assets/sections/impact.png",
    detailsId: "impact",
    sectionId: "impact",
  },
  roadmap: {
    align: "left",
    mediaSrc: "/assets/sections/backoffice.png",
    detailsId: "roadmap",
    sectionId: "roadmap",
  },
};
