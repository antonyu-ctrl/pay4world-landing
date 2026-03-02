"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_ANIMATION,
  type AnimationConfig,
} from "@/lib/siteConfig";

// ─── Utility helpers (allocation-free) ──────────────────────────────

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgba(hex: string, a: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

function depthScale(z: number, perspectiveDist: number): number {
  return perspectiveDist / (perspectiveDist + z);
}

function depthOpacity(
  z: number,
  zMax: number,
  opacityMin: number,
  opacityMax: number
): number {
  const t = z / zMax;
  return opacityMax - t * (opacityMax - opacityMin);
}

// ─── Types ──────────────────────────────────────────────────────────

type Mode = "intro" | "propagate" | "weave" | "secondary" | "ambient";

type Node = {
  id: number;
  x: number;
  y: number;
  z: number;
  r: number;
  lit: number;
  bornAt: number;
  pulseAt: number;
  appear: number;
  driftPhase: number;
};

type Edge = {
  a: number;
  b: number;
  bornAt: number;
};

// ─── Component ──────────────────────────────────────────────────────

export default function HeroNetworkCanvas({
  stickyProgress = 0,
  animationConfig,
}: {
  stickyProgress?: number;
  animationConfig?: AnimationConfig;
}) {
  const T = animationConfig ?? DEFAULT_ANIMATION;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const modeRef = useRef<Mode>("intro");

  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const sortOrderRef = useRef<number[]>([]);

  // Mouse tracking
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });

  // Pre-allocated projection arrays
  const projXRef = useRef<Float32Array>(new Float32Array(0));
  const projYRef = useRef<Float32Array>(new Float32Array(0));

  const seed = useMemo(() => ({ x: T.seed.x, y: T.seed.y }), [T.seed.x, T.seed.y]);
  const [dpr, setDpr] = useState(1);

  useEffect(() => setDpr(Math.min(2, window.devicePixelRatio || 1)), []);

  // Config version ref to detect changes
  const configRef = useRef(T);
  configRef.current = T;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = configRef.current;
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // ── Resize ────────────────────────────────────────────────
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // ── Mouse tracking ────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = 0.5;
      mouseRef.current.y = 0.5;
    };

    if (!prefersReduced && !isTouchDevice) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);
    }

    // ── Init ──────────────────────────────────────────────────
    const init = () => {
      const c = configRef.current;
      nodesRef.current = [];
      edgesRef.current = [];
      startRef.current = performance.now();
      modeRef.current = "intro";

      const total = prefersReduced ? c.nodes.reducedTotal : c.nodes.total;
      const baseCount = prefersReduced
        ? c.nodes.reducedBaseCount
        : c.nodes.baseCount;

      const parent = canvas.parentElement!;
      const W = parent.clientWidth;
      const H = parent.clientHeight;

      // Seed node — near front
      nodesRef.current.push({
        id: 0,
        x: seed.x * W,
        y: seed.y * H,
        z: 0.15,
        r: c.nodes.seedR,
        lit: 1,
        bornAt: 0,
        pulseAt: 0,
        appear: 1,
        driftPhase: 0,
      });

      const sample = () => {
        const rx = (Math.random() - 0.5) * 1.4;
        const ry = (Math.random() - 0.5) * 1.0;
        const x = clamp(seed.x + rx * 0.35, 0.05, 0.98);
        const y = clamp(seed.y + ry * 0.45, 0.08, 0.92);
        return { x: x * W, y: y * H };
      };

      for (let i = 1; i < total; i++) {
        const p = sample();

        // z biased by distance from seed: nearby → closer, far → deeper
        const dx = (p.x / W - seed.x);
        const dy = (p.y / H - seed.y);
        const distNorm = Math.min(
          1,
          Math.sqrt(dx * dx + dy * dy) / 0.5
        );
        const z = Math.random() * (0.3 + 0.7 * distNorm);

        nodesRef.current.push({
          id: i,
          x: p.x,
          y: p.y,
          z,
          r: c.nodes.rMin + Math.random() * c.nodes.rJitter,
          lit: 0,
          bornAt:
            i < baseCount
              ? c.nodes.bornEarlyAt
              : c.nodes.bornLateBaseAt +
                Math.random() * c.nodes.bornLateJitter,
          pulseAt: -99999,
          appear: 0,
          driftPhase: Math.random() * Math.PI * 2,
        });
      }

      // Sort order: back-to-front (highest z first)
      sortOrderRef.current = nodesRef.current
        .map((_, i) => i)
        .sort((a, b) => nodesRef.current[b].z - nodesRef.current[a].z);

      // Pre-allocate projection arrays
      projXRef.current = new Float32Array(total);
      projYRef.current = new Float32Array(total);
    };

    init();

    // ── Edge helpers ──────────────────────────────────────────
    const kNearest = (idx: number, k: number) => {
      const n = nodesRef.current[idx];
      const arr: { j: number; d: number }[] = [];
      for (let j = 0; j < nodesRef.current.length; j++) {
        if (j === idx) continue;
        const m = nodesRef.current[j];
        const d = Math.hypot(n.x - m.x, n.y - m.y);
        arr.push({ j, d });
      }
      arr.sort((a, b) => a.d - b.d);
      return arr.slice(0, k);
    };

    const edgeKey = (a: number, b: number) =>
      `${Math.min(a, b)}-${Math.max(a, b)}`;
    const edgeSet = new Set<string>();

    const addEdge = (a: number, b: number, t: number) => {
      const key = edgeKey(a, b);
      if (edgeSet.has(key)) return;
      edgeSet.add(key);
      edgesRef.current.push({
        a: Math.min(a, b),
        b: Math.max(a, b),
        bornAt: t,
      });
    };

    const pulseNode = (i: number, t: number) => {
      const n = nodesRef.current[i];
      if (!n) return;
      n.pulseAt = t;
      n.lit = 1;
    };

    // ── Propagation order ─────────────────────────────────────
    const litOrder: number[] = (() => {
      const seedNode = nodesRef.current[0];
      return nodesRef.current
        .slice(1, 36)
        .map((n) => ({
          id: n.id,
          d: Math.hypot(n.x - seedNode.x, n.y - seedNode.y),
        }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 10)
        .map((x) => x.id);
    })();

    // ── Timeline ──────────────────────────────────────────────
    const timeline = (t: number) => {
      const c = configRef.current;
      if (prefersReduced) return (modeRef.current = "ambient");
      if (t < c.timeline.introEnd) modeRef.current = "intro";
      else if (t < c.timeline.propagateEnd) modeRef.current = "propagate";
      else if (t < c.timeline.weaveEnd) modeRef.current = "weave";
      else if (t < c.timeline.secondaryEnd) modeRef.current = "secondary";
      else modeRef.current = "ambient";
    };

    // ── Draw loop ─────────────────────────────────────────────
    const draw = (now: number) => {
      const c = configRef.current;
      const elapsed = now - startRef.current;
      timeline(elapsed);

      const parent = canvas.parentElement!;
      const W = parent.clientWidth;
      const H = parent.clientHeight;

      // Smooth mouse
      const effectiveParallax = prefersReduced || isTouchDevice ? 0 : c.parallax.strength;
      smoothMouseRef.current.x = lerp(
        smoothMouseRef.current.x,
        mouseRef.current.x,
        c.parallax.lerpSpeed
      );
      smoothMouseRef.current.y = lerp(
        smoothMouseRef.current.y,
        mouseRef.current.y,
        c.parallax.lerpSpeed
      );
      const mouseOffsetX = (smoothMouseRef.current.x - 0.5) * 2;
      const mouseOffsetY = (smoothMouseRef.current.y - 0.5) * 2;

      // ── Background ──────────────────────────────────────
      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, c.colors.bgTop);
      grad.addColorStop(1, c.colors.bgBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const stickyFade = lerp(1, 0.92, clamp(stickyProgress, 0, 1));

      // ── Appear / decay / pulse triggers ─────────────────
      for (const n of nodesRef.current) {
        const appear = clamp(
          (elapsed - n.bornAt) / c.nodes.appearDurationMs,
          0,
          1
        );
        n.appear = easeOutCubic(appear);

        if (modeRef.current === "ambient") {
          n.lit = Math.max(0, n.lit - c.ambient.litDecayPerFrame);
          if (Math.random() < c.ambient.randomPulseChance) {
            pulseNode(
              1 + Math.floor(Math.random() * c.ambient.randomPulsePickFrom),
              elapsed
            );
          }
        }
      }

      if (modeRef.current === "propagate") {
        const base = c.timeline.propagateBase;
        const step = c.timeline.propagateStep;
        for (let i = 0; i < litOrder.length; i++) {
          const at = base + i * step;
          if (elapsed > at && elapsed < at + c.timeline.propagateWindow)
            pulseNode(litOrder[i], elapsed);
        }
      }

      // ── Edge generation ──────────────────────────────────
      if (
        modeRef.current === "weave" ||
        modeRef.current === "secondary" ||
        modeRef.current === "ambient"
      ) {
        const maxLen = Math.min(W, H) * c.weave.maxLenMul;
        const litIdx: number[] = [];
        for (let i = 0; i < nodesRef.current.length; i++) {
          const n = nodesRef.current[i];
          if (n.appear < 0.2) continue;
          if (i === 0 || n.lit > 0.15) litIdx.push(i);
        }

        for (const i of litIdx) {
          const k = i === 0 ? c.weave.seedK : c.weave.nodeK;
          const near = kNearest(i, k);
          for (const { j, d } of near) {
            if (d > maxLen) continue;
            if (nodesRef.current[j].appear < 0.15) continue;
            addEdge(i, j, elapsed);
          }
          if (Math.random() < c.weave.triangulateChance) {
            const n2 = kNearest(i, 2);
            if (n2.length >= 2) addEdge(n2[0].j, n2[1].j, elapsed);
          }
        }
      }

      if (modeRef.current === "secondary") {
        const at = 4600;
        if (elapsed > at && elapsed < at + 60) {
          const src = litOrder[3];
          pulseNode(src, elapsed);
          const targets = nodesRef.current
            .filter((n) => n.id > 36 && n.id < 78)
            .sort(() => Math.random() - 0.5)
            .slice(0, 6)
            .map((n) => n.id);

          for (let i = 0; i < targets.length; i++) {
            setTimeout(
              () => pulseNode(targets[i], elapsed + i * 90),
              i * 90
            );
          }
        }
      }

      // ── Pre-compute projected positions ──────────────────
      const effectiveDriftAmpX = prefersReduced ? 0 : c.drift.amplitudeX;
      const effectiveDriftAmpY = prefersReduced ? 0 : c.drift.amplitudeY;
      const projX = projXRef.current;
      const projY = projYRef.current;

      for (let i = 0; i < nodesRef.current.length; i++) {
        const n = nodesRef.current[i];
        const dS = depthScale(n.z, c.depth.perspectiveDist);

        const parallaxX =
          -mouseOffsetX * (1 - n.z) * effectiveParallax * W;
        const parallaxY =
          -mouseOffsetY * (1 - n.z) * effectiveParallax * H;

        const driftX =
          Math.sin(elapsed * c.drift.speed + n.driftPhase) *
          effectiveDriftAmpX *
          dS;
        const driftY =
          Math.cos(elapsed * c.drift.speed * 0.7 + n.driftPhase) *
          effectiveDriftAmpY *
          dS;

        projX[i] = n.x + parallaxX + driftX;
        projY[i] = n.y + parallaxY + driftY;
      }

      // ── Draw edges (back-to-front) ───────────────────────
      ctx.lineCap = "round";

      // Sort edges by average z (lazy: only re-sort when edge count changes)
      const edges = edgesRef.current;
      // Simple back-to-front: draw them in order, depth modulates opacity
      for (const e of edges) {
        const a = nodesRef.current[e.a];
        const b = nodesRef.current[e.b];
        if (a.appear < 0.2 || b.appear < 0.2) continue;

        const avgZ = (a.z + b.z) / 2;
        const dS = depthScale(avgZ, c.depth.perspectiveDist);
        const dO = depthOpacity(avgZ, 1, c.depth.opacityMin, c.depth.opacityMax);

        const edgeAlphaFactor = lerp(1, dO, 0.5);
        const edgeWidthFactor = lerp(1, dS, 0.4);

        const baseAlpha = c.edges.baseAlpha * stickyFade * edgeAlphaFactor;
        const bornT = clamp(
          (elapsed - e.bornAt) / c.edges.bornFadeMs,
          0,
          1
        );
        const hi = (1 - bornT) * c.edges.highlightMul;

        ctx.strokeStyle = rgba(
          c.colors.line,
          baseAlpha + hi * edgeAlphaFactor
        );
        ctx.lineWidth = c.edges.widthBase * edgeWidthFactor;
        ctx.beginPath();
        ctx.moveTo(projX[e.a], projY[e.a]);
        ctx.lineTo(projX[e.b], projY[e.b]);
        ctx.stroke();

        if (hi > c.edges.highlightMinToDrawMint) {
          ctx.strokeStyle = rgba(
            c.colors.mint,
            c.edges.mintHiAlphaMul * hi * edgeAlphaFactor
          );
          ctx.lineWidth = c.edges.widthMint * edgeWidthFactor;
          ctx.beginPath();
          ctx.moveTo(projX[e.a], projY[e.a]);
          ctx.lineTo(projX[e.b], projY[e.b]);
          ctx.stroke();
        }
      }

      // ── Draw nodes (back-to-front via sortOrder) ─────────
      for (const idx of sortOrderRef.current) {
        const n = nodesRef.current[idx];
        if (n.appear < 0.1) continue;

        const isSeed = n.id === 0;
        const baseR = isSeed ? c.nodes.seedR : n.r;
        const dS = depthScale(n.z, c.depth.perspectiveDist);
        const dO = depthOpacity(
          n.z,
          1,
          c.depth.opacityMin,
          c.depth.opacityMax
        );
        const r = baseR * dS;

        const px = projX[idx];
        const py = projY[idx];

        // Glow
        if (isSeed || n.lit > 0.14) {
          const glowFactor = lerp(1, dO, c.glow.depthFalloff);
          const g = isSeed
            ? c.glow.seedAlpha
            : c.glow.litAlphaMul * n.lit;
          ctx.fillStyle = rgba(
            c.colors.mintSoft,
            g * stickyFade * glowFactor
          );
          ctx.beginPath();
          ctx.arc(px, py, r * c.glow.radiusMul, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node fill
        ctx.fillStyle = isSeed
          ? rgba(c.colors.mint, dO)
          : rgba(
              c.colors.ink,
              (0.55 + 0.25 * n.appear) * 0.8 * stickyFade * dO
            );

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();

        // Pulse ring
        const dt = elapsed - n.pulseAt;
        if (dt >= 0 && dt < c.pulse.durationMs) {
          const t = dt / c.pulse.durationMs;
          const rr = lerp(
            r * c.pulse.fromMul,
            r * c.pulse.toMul * dS,
            easeOutCubic(t)
          );
          ctx.strokeStyle = rgba(
            c.colors.mint,
            (1 - t) * c.pulse.alpha * stickyFade * dO
          );
          ctx.lineWidth = c.pulse.width * dS;
          ctx.beginPath();
          ctx.arc(px, py, rr, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
    // Re-init when config changes (admin preview)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpr, seed.x, seed.y, stickyProgress, animationConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-auto"
      aria-hidden="true"
    />
  );
}
