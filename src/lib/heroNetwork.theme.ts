// src/lib/heroNetwork.theme.ts

export type HeroNetTheme = typeof HERO_NET_THEME;

export const HERO_NET_THEME = {
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

  // Core colors (use theme only; avoid BRAND inside canvas)
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
    // total node count (including seed)
    total: 86,
    baseCount: 34,

    // reduced-motion (including seed)
    reducedTotal: 60,
    reducedBaseCount: 26,

    // node radius range for non-seed
    rMin: 2.4,
    rJitter: 1.2,

    // seed radius
    seedR: 5,

    // bornAt schedule (ms)
    bornEarlyAt: 200,
    bornLateBaseAt: 1200,
    bornLateJitter: 3200,

    // appear
    appearDurationMs: 500,
    appearMinForDraw: 0.1,
    appearMinForEdgeA: 0.2,
    appearMinForEdgeB: 0.15,
  },

  // Propagation order sampling
  litOrder: {
    sampleFromFirstN: 36, // take nodesRef.slice(1, N)
    takeClosest: 10,
  },

  // Global timeline thresholds (ms)
  timeline: {
    introEnd: 600,
    propagateEnd: 2800,
    weaveEnd: 4400,
    secondaryEnd: 5600,

    // propagate pulses
    propagateBase: 900,
    propagateStep: 160,
    propagateWindow: 40,
  },

  // Ambient behavior
  ambient: {
    // lit decay per frame tick
    litDecayPerFrame: 0.004,
    randomPulseChance: 0.002,
    randomPulsePickFrom: 40, // pulseNode(1 + floor(rand * N))
  },

  // Weave / edges generation rules
  weave: {
    maxLenMul: 0.32, // maxLen = min(W,H) * mul
    seedK: 3,
    nodeK: 4,
    triangulateChance: 0.12,
    triangulateK: 2,
  },

  // Secondary wave
  secondary: {
    at: 4600,
    window: 60,

    // source: litOrder[index]
    sourceIndex: 3,

    // select targets among nodes with id in (minId, maxId)
    targetMinIdExclusive: 36,
    targetMaxIdExclusive: 78,
    targetCount: 6,

    // schedule
    pulseDelayMs: 90,
  },

  // Edge drawing
  edgeDraw: {
    lineCap: "round" as const,

    // base alpha (before sticky)
    baseAlpha: 0.55,

    // highlight after born
    bornFadeMs: 350,
    highlightMul: 0.25,
    highlightMinToDrawMint: 0.06,

    // widths
    widthBase: 1,
    widthMint: 1.5,

    // mint highlight alpha
    mintHiAlphaMul: 0.28,
  },

  // Node drawing
  nodeDraw: {
    // glow
    glowSeedAlpha: 0.65,
    glowLitAlphaMul: 0.42, // * n.lit
    glowRadiusMul: 5.2,

    // non-seed ink alpha shaping
    inkBase: 0.55,
    inkAppearBoost: 0.25,
    inkMul: 0.8,

    // pulse ring
    pulseDurationMs: 700,
    pulseFromMul: 2,
    pulseToMul: 18,
    pulseAlpha: 0.42,
    pulseWidth: 1.25,

    // lit threshold for glow
    litGlowThreshold: 0.2,
  },
} as const;