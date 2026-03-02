// src/lib/siteConfig.ts — Central site configuration schema, types, and defaults

// ─── Animation Config ───────────────────────────────────────────────

export type AnimationConfig = {
  colors: {
    mint: string;
    mintSoft: string;
    ink: string;
    line: string;
    bgTop: string;
    bgBottom: string;
  };
  seed: { x: number; y: number };
  nodes: {
    total: number;
    baseCount: number;
    reducedTotal: number;
    reducedBaseCount: number;
    rMin: number;
    rJitter: number;
    seedR: number;
    bornEarlyAt: number;
    bornLateBaseAt: number;
    bornLateJitter: number;
    appearDurationMs: number;
  };
  timeline: {
    introEnd: number;
    propagateEnd: number;
    weaveEnd: number;
    secondaryEnd: number;
    propagateBase: number;
    propagateStep: number;
    propagateWindow: number;
  };
  edges: {
    baseAlpha: number;
    bornFadeMs: number;
    highlightMul: number;
    highlightMinToDrawMint: number;
    widthBase: number;
    widthMint: number;
    mintHiAlphaMul: number;
  };
  glow: {
    seedAlpha: number;
    litAlphaMul: number;
    radiusMul: number;
    depthFalloff: number;
  };
  pulse: {
    durationMs: number;
    fromMul: number;
    toMul: number;
    alpha: number;
    width: number;
  };
  ambient: {
    litDecayPerFrame: number;
    randomPulseChance: number;
    randomPulsePickFrom: number;
  };
  weave: {
    maxLenMul: number;
    seedK: number;
    nodeK: number;
    triangulateChance: number;
  };
  depth: {
    perspectiveDist: number;
    opacityMin: number;
    opacityMax: number;
  };
  parallax: {
    strength: number;
    lerpSpeed: number;
  };
  drift: {
    amplitudeX: number;
    amplitudeY: number;
    speed: number;
  };
};

// ─── Content Config ─────────────────────────────────────────────────

export type CardItem = { title: string; description: string };
export type StatItem = { label: string; value: string };

export type HeroContent = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: StatItem[];
};

export type SectionContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ProblemContent = SectionContent & { cards: CardItem[] };
export type SolutionContent = SectionContent & { steps: string[] };
export type ProductContent = SectionContent & { features: CardItem[] };
export type TransparencyContent = SectionContent & { bullets: string[] };
export type PartnersContent = SectionContent & { cards: CardItem[] };
export type ImpactContent = SectionContent & { metrics: CardItem[] };
export type RoadmapContent = SectionContent & { phases: { label: string; description: string }[] };

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  noticeTitle: string;
  noticeText: string;
  formName: string;
  formEmail: string;
  formOrg: string;
  formMessage: string;
  submitLabel: string;
  formFooter: string;
};

export type FooterContent = {
  companyName: string;
  copyright: string;
};

export type ContentConfig = {
  hero: HeroContent;
  problem: ProblemContent;
  solution: SolutionContent;
  product: ProductContent;
  transparency: TransparencyContent;
  partners: PartnersContent;
  impact: ImpactContent;
  roadmap: RoadmapContent;
  contact: ContactContent;
  footer: FooterContent;
};

export type DualAnimationConfig = {
  desktop: AnimationConfig;
  mobile: AnimationConfig;
};

export type SiteConfig = {
  animation: DualAnimationConfig;
  content: ContentConfig;
};

// ─── Defaults (current TECH_BOLD values + hardcoded text) ───────────

export const DEFAULT_ANIMATION: AnimationConfig = {
  colors: {
    mint: "#30D5C8",
    mintSoft: "#BFF8EE",
    ink: "#0B1220",
    line: "#D8E2EA",
    bgTop: "rgba(221,255,247,1)",
    bgBottom: "rgba(255,255,255,1)",
  },
  seed: { x: 0.62, y: 0.42 },
  nodes: {
    total: 86,
    baseCount: 34,
    reducedTotal: 60,
    reducedBaseCount: 26,
    rMin: 2.4,
    rJitter: 1.2,
    seedR: 5,
    bornEarlyAt: 200,
    bornLateBaseAt: 1200,
    bornLateJitter: 3200,
    appearDurationMs: 500,
  },
  timeline: {
    introEnd: 600,
    propagateEnd: 2800,
    weaveEnd: 4400,
    secondaryEnd: 5600,
    propagateBase: 900,
    propagateStep: 160,
    propagateWindow: 40,
  },
  edges: {
    baseAlpha: 0.72,
    bornFadeMs: 420,
    highlightMul: 0.34,
    highlightMinToDrawMint: 0.06,
    widthBase: 1.25,
    widthMint: 1.75,
    mintHiAlphaMul: 0.4,
  },
  glow: {
    seedAlpha: 0.82,
    litAlphaMul: 0.56,
    radiusMul: 6.2,
    depthFalloff: 0.6,
  },
  pulse: {
    durationMs: 560,
    fromMul: 2,
    toMul: 22,
    alpha: 0.62,
    width: 1.5,
  },
  ambient: {
    litDecayPerFrame: 0.0032,
    randomPulseChance: 0.0045,
    randomPulsePickFrom: 52,
  },
  weave: {
    maxLenMul: 0.34,
    seedK: 3,
    nodeK: 4,
    triangulateChance: 0.16,
  },
  depth: {
    perspectiveDist: 2.2,
    opacityMin: 0.35,
    opacityMax: 1.0,
  },
  parallax: {
    strength: 0.03,
    lerpSpeed: 0.06,
  },
  drift: {
    amplitudeX: 1.0,
    amplitudeY: 0.8,
    speed: 0.0004,
  },
};

export const DEFAULT_CONTENT: ContentConfig = {
  hero: {
    badge: "위치기반 소셜 × 기부 네트워크",
    titleLine1: "한 사람의 기부가,",
    titleLine2: "세상을 연결합니다",
    description:
      "한 번의 시작이 주변으로 번지고, 연결될수록 더 큰 임팩트가 만들어져요. Pay4World는 기부가 '혼자'가 아니라 '네트워크'가 되도록 설계됐습니다.",
    ctaPrimary: "시작 노드 켜기",
    ctaSecondary: "작동 원리 보기",
    stats: [
      { label: "시작", value: "한 사람" },
      { label: "확산", value: "주변 참여" },
      { label: "연결", value: "거미줄 네트워크" },
    ],
  },
  problem: {
    eyebrow: "Problem",
    title: "기부가 '한 번'에서 멈추는 이유",
    description:
      "좋은 마음은 있어도, 기부는 습관이 되기 어렵습니다. Pay4World는 '참여 → 연결 → 반복'이 자연스럽게 이어지도록 UX를 설계합니다.",
    cards: [
      { title: "단발성", description: "일회성 캠페인 중심이라 관계/지속이 약해요." },
      { title: "동기 부족", description: "성과를 체감하기 어렵고 재미가 부족해요." },
      { title: "확산 한계", description: "공유는 되지만 실제 참여 전환이 낮아요." },
      { title: "신뢰", description: "투명성과 스토리 연결이 끊기기 쉬워요." },
    ],
  },
  solution: {
    eyebrow: "Solution",
    title: "한 사람의 시작 → 주변 확산 → 거미줄 연결",
    description:
      "Hero에서 보이는 그대로, Pay4World는 '시작 노드'가 '다음 노드'를 부르는 구조를 만듭니다. 참여가 관계가 되고, 관계가 지속을 만듭니다.",
    steps: [
      "내 위치 기반으로 '근처'에서 시작",
      "참여가 공유되고, 주변이 반응",
      "연결이 쌓이며 네트워크가 성장",
      "배지/미션으로 반복 참여가 자연스러움",
    ],
  },
  product: {
    eyebrow: "Product",
    title: "참여를 '게임처럼' 이어주는 기능",
    description:
      "과한 장식 대신, 행동을 바꾸는 장치만 남깁니다. 작은 참여가 계속되도록 설계된 핵심 기능을 제공합니다.",
    features: [
      { title: "배지/스트릭", description: "작은 성취를 시각화해 지속성을 만듭니다." },
      { title: "미션/챌린지", description: "참여 진입장벽을 낮추고 행동을 유도합니다." },
      { title: "피드/확산", description: "내 시작이 주변 참여로 이어지도록 설계합니다." },
      { title: "개인화", description: "내 관심/위치 기반으로 다음 행동을 제안합니다." },
    ],
  },
  transparency: {
    eyebrow: "Trust",
    title: "투명성은 기본, '스토리 연결'이 핵심",
    description:
      "기부는 숫자만으로 유지되지 않습니다. 결과가 연결되고 공유되어 다음 참여로 이어지는 흐름을 만듭니다.",
    bullets: [
      "기부 Journey: 시작부터 결과까지 한 흐름으로",
      "인증/리포트: 신뢰할 수 있는 근거 제공",
      "임팩트 요약: 내가 만든 변화가 한눈에 보이게",
    ],
  },
  partners: {
    eyebrow: "B2B · NPO",
    title: "기업/기관과 함께 더 크게 확산",
    description:
      "캠페인, CSR, 지역 연계까지. Pay4World의 네트워크 구조는 파트너와 연결될수록 확장됩니다.",
    cards: [
      { title: "기업 CSR", description: "참여율을 높이는 게임화 캠페인" },
      { title: "NPO", description: "스토리·결과가 연결되는 후원 경험" },
      { title: "지역", description: "위치 기반으로 가까운 곳에서 시작" },
      { title: "SaaS", description: "운영 도구/대시보드로 확장" },
    ],
  },
  impact: {
    eyebrow: "Impact",
    title: "연결될수록 커지는 임팩트",
    description:
      "SROI 같은 정량 지표뿐 아니라, '첫 기부자'와 '반복 기부'가 늘어나는 구조를 만듭니다.",
    metrics: [
      { title: "첫 기부자", description: "처음 참여가 쉽게" },
      { title: "기부 빈도", description: "반복 참여가 자연스럽게" },
      { title: "확산", description: "연결이 다음 참여를 유도" },
    ],
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "작게 시작해서, 기능과 파트너를 확장",
    description:
      "MVP → 지역/캠페인 확장 → 파트너 도구(SaaS)까지 단계적으로 성장합니다.",
    phases: [
      { label: "Phase 1", description: "시작 노드·확산 UX 고도화" },
      { label: "Phase 2", description: "캠페인/챌린지 + 파트너 협업" },
      { label: "Phase 3", description: "대시보드·리포트·SaaS 패키지" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "데모/제휴 문의",
    description: "파트너십, 시범 운영, 투자/협업 등 무엇이든 편하게 연락 주세요.",
    noticeTitle: "안내",
    noticeText:
      "현재는 데모 폼입니다. 실제 전송은 폼 서비스/백엔드 연동으로 붙일 수 있어요.",
    formName: "이름",
    formEmail: "이메일",
    formOrg: "회사/조직",
    formMessage: "문의 내용",
    submitLabel: "제출하기",
    formFooter:
      "* 데모용 UI입니다. 실제 전송은 백엔드/폼 서비스 연동이 필요합니다.",
  },
  footer: {
    companyName: "Pay4World",
    copyright: "© {year} Pay4World. All rights reserved.",
  },
};

export const DEFAULT_MOBILE_ANIMATION: AnimationConfig = {
  ...DEFAULT_ANIMATION,
  seed: { x: 0.62, y: 0.42 },
  nodes: {
    ...DEFAULT_ANIMATION.nodes,
    total: 40,
    baseCount: 16,
    reducedTotal: 30,
    reducedBaseCount: 12,
  },
  parallax: {
    strength: 0,
    lerpSpeed: 0.06,
  },
  drift: {
    amplitudeX: 0.6,
    amplitudeY: 0.5,
    speed: 0.0004,
  },
  glow: {
    ...DEFAULT_ANIMATION.glow,
    radiusMul: 4.5,
  },
};

export const DEFAULT_CONFIG: SiteConfig = {
  animation: {
    desktop: DEFAULT_ANIMATION,
    mobile: DEFAULT_MOBILE_ANIMATION,
  },
  content: DEFAULT_CONTENT,
};

// ─── Migration helper ────────────────────────────────────────────────

/** Detect and migrate legacy flat animation config to dual format */
export function migrateConfig(raw: Record<string, unknown>): Record<string, unknown> {
  if (raw.animation && typeof raw.animation === "object") {
    const anim = raw.animation as Record<string, unknown>;
    // Legacy detection: if "animation" has "colors" directly, it's the old flat format
    if ("colors" in anim && !("desktop" in anim)) {
      return {
        ...raw,
        animation: {
          desktop: anim,
          mobile: anim,
        },
      };
    }
  }
  return raw;
}

// ─── Runtime config loader ──────────────────────────────────────────

let cachedConfig: SiteConfig | null = null;

/** Fetch config from API (client-side) with fallback to defaults */
export async function fetchConfig(): Promise<SiteConfig> {
  if (cachedConfig) return cachedConfig;
  try {
    const res = await fetch("/api/config", { cache: "no-store" });
    if (res.ok) {
      const data = migrateConfig(await res.json());
      cachedConfig = deepMerge(DEFAULT_CONFIG, data) as SiteConfig;
      return cachedConfig;
    }
  } catch {
    // fallback
  }
  return DEFAULT_CONFIG;
}

/** Invalidate cached config (call after save) */
export function invalidateConfigCache() {
  cachedConfig = null;
}

/** Deep merge helper — merges source into target, keeping target's shape */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Record<string, unknown>
): T {
  const result = { ...target };
  for (const key of Object.keys(target)) {
    if (key in source) {
      const tVal = target[key];
      const sVal = source[key];
      if (
        tVal &&
        sVal &&
        typeof tVal === "object" &&
        typeof sVal === "object" &&
        !Array.isArray(tVal)
      ) {
        (result as Record<string, unknown>)[key] = deepMerge(
          tVal as Record<string, unknown>,
          sVal as Record<string, unknown>
        );
      } else {
        (result as Record<string, unknown>)[key] = sVal;
      }
    }
  }
  return result;
}
