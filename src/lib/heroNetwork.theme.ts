// src/lib/heroNetwork.theme.ts

export type HeroNetTheme = typeof HERO_NET_PRESETS.CLEAN_SOFT;

/**
 * Preset names
 */
export type HeroNetPresetName = keyof typeof HERO_NET_PRESETS;

/**
 * 공통 베이스(안전한 기본값)
 * - 다른 프리셋은 여기서 "차이"만 덮어씀
 */
const BASE = {
  // Rendering / performance
  perf: {
    dprMax: 2,
  },

  // Seed position in normalized coordinates (0..1)
  seed: {
    x: 0.62,
    y: 0.42,
  },

  // Background gradient
  bg: {
    top: "rgba(231,255,249,0.95)",
    bottom: "rgba(255,255,255,1)",
  },

  // Core colors
  color: {
    mint: "#30D5C8",
    mintSoft: "#BFF8EE",
    ink: "#0B1220",
    line: "#D8E2EA",
  },

  // Sticky fade behavior
  sticky: {
    fadeTo: 0.92,
  },

  // Node population + birth schedule
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
    appearMinForDraw: 0.1,
    appearMinForEdgeA: 0.2,
    appearMinForEdgeB: 0.15,
  },

  // Propagation order sampling
  litOrder: {
    sampleFromFirstN: 36,
    takeClosest: 10,
  },

  // Global timeline thresholds (ms)
  timeline: {
    introEnd: 600,
    propagateEnd: 2800,
    weaveEnd: 4400,
    secondaryEnd: 5600,

    propagateBase: 900,
    propagateStep: 160,
    propagateWindow: 40,
  },

  // Ambient behavior
  ambient: {
    litDecayPerFrame: 0.004,
    randomPulseChance: 0.002,
    randomPulsePickFrom: 40,
  },

  // Weave / edges generation rules
  weave: {
    maxLenMul: 0.32,
    seedK: 3,
    nodeK: 4,
    triangulateChance: 0.12,
    triangulateK: 2,
  },

  // Secondary wave
  secondary: {
    at: 4600,
    window: 60,

    sourceIndex: 3,

    targetMinIdExclusive: 36,
    targetMaxIdExclusive: 78,
    targetCount: 6,

    pulseDelayMs: 90,
  },

  // Edge drawing
  edgeDraw: {
    lineCap: "round" as const,

    baseAlpha: 0.55,
    bornFadeMs: 350,
    highlightMul: 0.25,
    highlightMinToDrawMint: 0.06,

    widthBase: 1,
    widthMint: 1.5,

    mintHiAlphaMul: 0.28,
  },

  // Node drawing
  nodeDraw: {
    glowSeedAlpha: 0.65,
    glowLitAlphaMul: 0.42,
    glowRadiusMul: 5.2,

    inkBase: 0.55,
    inkAppearBoost: 0.25,
    inkMul: 0.8,

    pulseDurationMs: 700,
    pulseFromMul: 2,
    pulseToMul: 18,
    pulseAlpha: 0.42,
    pulseWidth: 1.25,

    litGlowThreshold: 0.2,
  },
} as const;

/**
 * Presets
 * - CLEAN_SOFT: 지금과 비슷하지만 너무 흐리지 않게, 부드럽고 깔끔
 * - CLEAN_CLEAR: 깔끔 유지 + 선/점등/펄스가 “확실히” 보이도록
 * - TECH_BOLD: 임팩트 강하게(테크 감성), 대비/점등/펄스/활기 ↑
 */
export const HERO_NET_PRESETS = {
  CLEAN_SOFT: {
    ...BASE,
    bg: {
      top: "rgba(237,255,250,0.96)",
      bottom: "rgba(255,255,255,1)",
    },
    sticky: { fadeTo: 0.94 },
    edgeDraw: {
      ...BASE.edgeDraw,
      baseAlpha: 0.52,
      widthBase: 1.0,
      widthMint: 1.35,
      mintHiAlphaMul: 0.26,
    },
    nodeDraw: {
      ...BASE.nodeDraw,
      glowSeedAlpha: 0.62,
      glowLitAlphaMul: 0.38,
      pulseAlpha: 0.40,
      pulseWidth: 1.2,
    },
    ambient: {
      ...BASE.ambient,
      randomPulseChance: 0.0016,
      litDecayPerFrame: 0.0038,
    },
  },

  CLEAN_CLEAR: {
    ...BASE,
    bg: {
      top: "rgba(231,255,249,0.985)", // 대비 조금 ↑
      bottom: "rgba(255,255,255,1)",
    },
    sticky: { fadeTo: 0.93 },
    edgeDraw: {
      ...BASE.edgeDraw,
      baseAlpha: 0.64, // 선이 “은은하지만 확실”
      widthBase: 1.15,
      widthMint: 1.55,
      mintHiAlphaMul: 0.32,
      highlightMul: 0.28,
    },
    nodeDraw: {
      ...BASE.nodeDraw,
      glowSeedAlpha: 0.72,
      glowLitAlphaMul: 0.46,
      glowRadiusMul: 5.6,
      pulseAlpha: 0.52,
      pulseWidth: 1.35,
      pulseDurationMs: 640,
    },
    ambient: {
      ...BASE.ambient,
      randomPulseChance: 0.0026,
      litDecayPerFrame: 0.0035,
    },
  },

  TECH_BOLD: {
    ...BASE,
    // 살짝 더 테크 느낌: 배경 상단을 조금 더 “색” 있게
    bg: {
      top: "rgba(221,255,247,1)",
      bottom: "rgba(255,255,255,1)",
    },
    sticky: { fadeTo: 0.92 },
    edgeDraw: {
      ...BASE.edgeDraw,
      baseAlpha: 0.72,
      widthBase: 1.25,
      widthMint: 1.75,
      mintHiAlphaMul: 0.40,
      highlightMul: 0.34,
      bornFadeMs: 420,
    },
    nodeDraw: {
      ...BASE.nodeDraw,
      glowSeedAlpha: 0.82,
      glowLitAlphaMul: 0.56,
      glowRadiusMul: 6.2,
      pulseAlpha: 0.62,
      pulseWidth: 1.5,
      pulseDurationMs: 560,
      pulseToMul: 22,
      litGlowThreshold: 0.14, // 더 자주 글로우 발생
    },
    ambient: {
      ...BASE.ambient,
      randomPulseChance: 0.0045,
      litDecayPerFrame: 0.0032,
      randomPulsePickFrom: 52,
    },
    // “얽힘 중”을 유지하되 조금 더 엮이게
    weave: {
      ...BASE.weave,
      triangulateChance: 0.16,
      maxLenMul: 0.34,
    },
  },

    ULTRA_VIVID: {
    ...BASE,

    // 배경 자체를 더 “크림 민트”로: 선/노드 대비 확보
    bg: {
      top: "rgba(210,255,245,1)",     // 더 진한 연민트
      bottom: "rgba(255,255,255,1)",
    },

    // 스크롤로 줄어들어도 덜 죽게(선명 유지)
    sticky: { fadeTo: 0.95 },

    // 연결선: 확실히 보이게(하지만 너무 두꺼워지진 않게)
    edgeDraw: {
      ...BASE.edgeDraw,
      baseAlpha: 0.84,        // 핵심: 선 존재감 크게↑
      widthBase: 1.35,
      widthMint: 1.95,
      mintHiAlphaMul: 0.50,   // 새로 생길 때 민트 하이라이트 확실
      highlightMul: 0.42,
      bornFadeMs: 520,        // “잠깐 반짝”이 조금 더 오래
      highlightMinToDrawMint: 0.03,
    },

    // 점등/글로우: 한 눈에 확 들어오게
    nodeDraw: {
      ...BASE.nodeDraw,
      glowSeedAlpha: 0.98,
      glowLitAlphaMul: 0.78,
      glowRadiusMul: 7.0,

      // 펄스 링: 강하고 빠르게(확산이 명확)
      pulseAlpha: 0.82,
      pulseWidth: 1.8,
      pulseDurationMs: 520,
      pulseToMul: 26,

      // 약간만 lit 되어도 글로우 나오게
      litGlowThreshold: 0.10,
    },

    // 앰비언트에서도 살아있게(너무 과하면 피로할 수 있음)
    ambient: {
      ...BASE.ambient,
      randomPulseChance: 0.0075,
      litDecayPerFrame: 0.0028,
      randomPulsePickFrom: 64,
    },

    // 얽힘(거미줄)도 조금 더 공격적으로
    weave: {
      ...BASE.weave,
      triangulateChance: 0.22,
      maxLenMul: 0.36,
      nodeK: 5,
    },

    // 2차 확산도 임팩트 있게
    secondary: {
      ...BASE.secondary,
      targetCount: 8,
      pulseDelayMs: 70,
      window: 120,
    },
  },

} as const;

/**
 * ✅ 여기만 바꾸면 프리셋 선택 끝.
 * - "CLEAN_SOFT" | "CLEAN_CLEAR" | "TECH_BOLD" | "ULTRA_VIVID"
 */
export const HERO_NET_PRESET_NAME: HeroNetPresetName = "TECH_BOLD";

/**
 * Canvas가 실제로 참조하는 최종 테마
 */
export const HERO_NET_THEME = HERO_NET_PRESETS[HERO_NET_PRESET_NAME];
