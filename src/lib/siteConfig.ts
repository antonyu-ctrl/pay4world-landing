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

/** Unified type for all 7 scene sections (problem → roadmap) */
export type SceneSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  details: string[];
};

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
  problem: SceneSectionContent;
  solution: SceneSectionContent;
  product: SceneSectionContent;
  transparency: SceneSectionContent;
  partners: SceneSectionContent;
  impact: SceneSectionContent;
  roadmap: SceneSectionContent;
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
    title: "Why donations stop at 'once'",
    description: "Pay4World는 한 번으로 끝나지 않게 만드는 참여 UX를 설계합니다.",
    details: [
      "일회성으로 끝나기 쉬움",
      "동기 유지가 어려움",
      "주변 확산이 제한적",
      "투명성/신뢰 이슈",
    ],
  },
  solution: {
    eyebrow: "Solution",
    title: "Start → Spread → Connect",
    description: "한 사람의 시작이 주변으로 번지고, 연결이 임팩트를 키우는 구조.",
    details: ["시작 노드 점등", "참여의 확산", "거미줄처럼 연결"],
  },
  product: {
    eyebrow: "Product",
    title: "Participation-first product design",
    description: "참여를 쉽게, 계속하도록 만드는 인터랙션/피드백을 제공합니다.",
    details: ["진입장벽 최소화", "반복 참여 유도", "확산 트리거 내장"],
  },
  transparency: {
    eyebrow: "Transparency",
    title: "Trust by design",
    description: "기부가 '보이도록' 설계해 신뢰를 강화합니다.",
    details: ["활동 가시화", "검증 가능한 흐름", "커뮤니티 기반 신뢰"],
  },
  partners: {
    eyebrow: "Partners",
    title: "Partners grow the network",
    description: "기관/브랜드/커뮤니티와 함께 성장합니다.",
    details: ["파트너 연동", "캠페인 공동 설계", "현장 시범 운영"],
  },
  impact: {
    eyebrow: "Impact",
    title: "Compounding impact",
    description: "연결이 쌓일수록 임팩트는 더 커집니다.",
    details: ["참여의 복리", "네트워크 효과", "지역 기반 확장"],
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "From pilot to scale",
    description: "시범 운영 → 확장 가능한 제품화로 나아갑니다.",
    details: ["파일럿", "데이터 기반 개선", "확장/파트너십"],
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

// ─── Migration helpers ───────────────────────────────────────────────

/** Convert legacy section formats (cards/steps/features/etc.) to unified details[] */
function migrateSection(sec: Record<string, unknown>): Record<string, unknown> {
  if (sec.details) return sec; // Already migrated

  // cards / features / metrics → extract title strings
  for (const key of ["cards", "features", "metrics"]) {
    if (Array.isArray(sec[key])) {
      const items = sec[key] as { title?: string; description?: string }[];
      const details = items.map((c) => c.title ?? c.description ?? "");
      const { [key]: _, ...rest } = sec;
      return { ...rest, details };
    }
  }

  // steps / bullets → rename to details
  for (const key of ["steps", "bullets"]) {
    if (Array.isArray(sec[key])) {
      const { [key]: items, ...rest } = sec;
      return { ...rest, details: items };
    }
  }

  // phases → extract description strings
  if (Array.isArray(sec.phases)) {
    const phases = sec.phases as { label?: string; description?: string }[];
    const details = phases.map((p) => p.description ?? p.label ?? "");
    const { phases: _, ...rest } = sec;
    return { ...rest, details };
  }

  return sec;
}

const SCENE_KEYS = ["problem", "solution", "product", "transparency", "partners", "impact", "roadmap"];

/** Detect and migrate legacy config formats */
export function migrateConfig(raw: Record<string, unknown>): Record<string, unknown> {
  let result = { ...raw };

  // Migrate flat animation → dual format
  if (result.animation && typeof result.animation === "object") {
    const anim = result.animation as Record<string, unknown>;
    if ("colors" in anim && !("desktop" in anim)) {
      result = { ...result, animation: { desktop: anim, mobile: anim } };
    }
  }

  // Migrate content sections → unified details[] format
  if (result.content && typeof result.content === "object") {
    const content = { ...(result.content as Record<string, unknown>) };
    for (const key of SCENE_KEYS) {
      if (content[key] && typeof content[key] === "object") {
        content[key] = migrateSection(content[key] as Record<string, unknown>);
      }
    }
    result = { ...result, content };
  }

  return result;
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
