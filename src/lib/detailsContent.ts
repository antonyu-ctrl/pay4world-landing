export type DetailsId =
  | "problem"
  | "how"
  | "product"
  | "transparency"
  | "partners"
  | "impact"
  | "roadmap";

export const DETAILS_CONTENT: Record<
  DetailsId,
  { title: string; summary: string; heroImageSrc?: string }
> = {
  problem: {
    title: "Problem",
    summary: "Problem 상세 콘텐츠가 들어갈 예정입니다.",
    heroImageSrc: "/assets/sections/problem.png",
  },
  how: {
    title: "Solution",
    summary: "Solution 상세 콘텐츠가 들어갈 예정입니다.",
    heroImageSrc: "/assets/sections/solution.png",
  },
  product: {
    title: "Product",
    summary: "Product 상세 콘텐츠가 들어갈 예정입니다.",
    heroImageSrc: "/assets/sections/product.png",
  },
  transparency: {
    title: "Transparency",
    summary: "Transparency 상세 콘텐츠가 들어갈 예정입니다.",
    heroImageSrc: "/assets/sections/transparency.png",
  },
  partners: {
    title: "B2B·NPO",
    summary: "Partners/B2B·NPO 상세 콘텐츠가 들어갈 예정입니다.",
    heroImageSrc: "/assets/sections/partners.png",
  },
  impact: {
    title: "Impact",
    summary: "Impact 상세 콘텐츠가 들어갈 예정입니다.",
    heroImageSrc: "/assets/sections/impact.png",
  },
  roadmap: {
    title: "Roadmap",
    summary: "Roadmap 상세 콘텐츠가 들어갈 예정입니다.",
    heroImageSrc: "/assets/sections/backoffice.png",
  },
};