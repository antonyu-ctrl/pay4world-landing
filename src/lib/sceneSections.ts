export type SceneAlign = "left" | "right";

export type SceneSection = {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  details?: string[];
  align: SceneAlign;
  mediaSrc?: string;

  // 상세 페이지 라우팅/CTA
  detailsId?: string; // /details/[id]
  ctaLabel?: string;  // 섹션별 라벨 오버라이드(없으면 UI.cta.defaultLabel 사용)
};

export const SCENE_SECTIONS: SceneSection[] = [
  {
    id: "problem",
    eyebrow: "Problem",
    title: "Why donations stop at ‘once’",
    desc: "Pay4World는 한 번으로 끝나지 않게 만드는 참여 UX를 설계합니다.",
    details: [
      "일회성으로 끝나기 쉬움",
      "동기 유지가 어려움",
      "주변 확산이 제한적",
      "투명성/신뢰 이슈",
    ],
    align: "left",
    mediaSrc: "/assets/sections/problem.png",
    detailsId: "problem",
    // ctaLabel: "Problem 더보기",
  },
  {
    id: "how",
    eyebrow: "Solution",
    title: "Start → Spread → Connect",
    desc: "한 사람의 시작이 주변으로 번지고, 연결이 임팩트를 키우는 구조.",
    details: ["시작 노드 점등", "참여의 확산", "거미줄처럼 연결"],
    align: "right",
    mediaSrc: "/assets/sections/solution.png",
    detailsId: "how",
    // ctaLabel: "Solution 더보기",
  },
  {
    id: "product",
    eyebrow: "Product",
    title: "Participation-first product design",
    desc: "참여를 쉽게, 계속하도록 만드는 인터랙션/피드백을 제공합니다.",
    details: ["진입장벽 최소화", "반복 참여 유도", "확산 트리거 내장"],
    align: "left",
    mediaSrc: "/assets/sections/product.png",
    detailsId: "product",
  },
  {
    id: "transparency",
    eyebrow: "Transparency",
    title: "Trust by design",
    desc: "기부가 ‘보이도록’ 설계해 신뢰를 강화합니다.",
    details: ["활동 가시화", "검증 가능한 흐름", "커뮤니티 기반 신뢰"],
    align: "right",
    mediaSrc: "/assets/sections/transparency.png",
    detailsId: "transparency",
  },
  {
    id: "partners",
    eyebrow: "Partners",
    title: "Partners grow the network",
    desc: "기관/브랜드/커뮤니티와 함께 성장합니다.",
    details: ["파트너 연동", "캠페인 공동 설계", "현장 시범 운영"],
    align: "left",
    mediaSrc: "/assets/sections/partners.png",
    detailsId: "partners",
    // ctaLabel: "B2B·NPO 더보기",
  },
  {
    id: "impact",
    eyebrow: "Impact",
    title: "Compounding impact",
    desc: "연결이 쌓일수록 임팩트는 더 커집니다.",
    details: ["참여의 복리", "네트워크 효과", "지역 기반 확장"],
    align: "right",
    mediaSrc: "/assets/sections/impact.png",
    detailsId: "impact",
  },
  {
    id: "roadmap",
    eyebrow: "Roadmap",
    title: "From pilot to scale",
    desc: "시범 운영 → 확장 가능한 제품화로 나아갑니다.",
    details: ["파일럿", "데이터 기반 개선", "확장/파트너십"],
    align: "left",
    mediaSrc: "/assets/sections/backoffice.png",
    detailsId: "roadmap",
    // ctaLabel: "로드맵 더보기",
  },
];