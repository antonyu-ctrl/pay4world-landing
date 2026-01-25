"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BRAND } from "@/lib/constants";

type Mode = "intro" | "propagate" | "weave" | "secondary" | "ambient";

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
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgba(hex: string, a: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

type Node = {
  id: number;
  x: number;
  y: number;
  r: number;
  lit: number; // 0..1
  bornAt: number;
  pulseAt: number;
  appear: number;
};

type Edge = {
  a: number;
  b: number;
  bornAt: number;
};

export default function HeroNetworkCanvas({ stickyProgress = 0 }: { stickyProgress?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const modeRef = useRef<Mode>("intro");

  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);

  const seed = useMemo(() => ({ x: 0.62, y: 0.42 }), []);
  const [dpr, setDpr] = useState(1);

  useEffect(() => setDpr(Math.min(2, window.devicePixelRatio || 1)), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

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

    const init = () => {
      nodesRef.current = [];
      edgesRef.current = [];
      startRef.current = performance.now();
      modeRef.current = "intro";

      const total = prefersReduced ? 60 : 86;
      const baseCount = prefersReduced ? 26 : 34;

      const parent = canvas.parentElement!;
      const W = parent.clientWidth;
      const H = parent.clientHeight;

      nodesRef.current.push({
        id: 0,
        x: seed.x * W,
        y: seed.y * H,
        r: 5,
        lit: 1,
        bornAt: 0,
        pulseAt: 0,
        appear: 1
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
        nodesRef.current.push({
          id: i,
          x: p.x,
          y: p.y,
          r: 2.4 + Math.random() * 1.2,
          lit: 0,
          bornAt: i < baseCount ? 200 : 1200 + Math.random() * 3200,
          pulseAt: -99999,
          appear: 0
        });
      }
    };

    init();

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

    const edgeKey = (a: number, b: number) => `${Math.min(a, b)}-${Math.max(a, b)}`;
    const edgeSet = new Set<string>();

    const addEdge = (a: number, b: number, t: number) => {
      const key = edgeKey(a, b);
      if (edgeSet.has(key)) return;
      edgeSet.add(key);
      edgesRef.current.push({ a: Math.min(a, b), b: Math.max(a, b), bornAt: t });
    };

    const pulseNode = (i: number, t: number) => {
      const n = nodesRef.current[i];
      if (!n) return;
      n.pulseAt = t;
      n.lit = 1;
    };

    const litOrder: number[] = (() => {
      const seedNode = nodesRef.current[0];
      return nodesRef.current
        .slice(1, 36)
        .map((n) => ({ id: n.id, d: Math.hypot(n.x - seedNode.x, n.y - seedNode.y) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 10)
        .map((x) => x.id);
    })();

    const timeline = (t: number) => {
      if (prefersReduced) return (modeRef.current = "ambient");
      if (t < 600) modeRef.current = "intro";
      else if (t < 2800) modeRef.current = "propagate";
      else if (t < 4400) modeRef.current = "weave";
      else if (t < 5600) modeRef.current = "secondary";
      else modeRef.current = "ambient";
    };

    const draw = (now: number) => {
      const elapsed = now - startRef.current;
      timeline(elapsed);

      const parent = canvas.parentElement!;
      const W = parent.clientWidth;
      const H = parent.clientHeight;

      // background
      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(231,255,249,0.95)"); // 더 민트 느낌(상단)
      grad.addColorStop(1, "rgba(255,255,255,1)");    // 하단은 화이트로 유지
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const stickyFade = lerp(1, 0.92, clamp(stickyProgress, 0, 1));

      // appear / decay
      for (const n of nodesRef.current) {
        const appear = clamp((elapsed - n.bornAt) / 500, 0, 1);
        n.appear = easeOutCubic(appear);
        if (modeRef.current === "ambient") {
          n.lit = Math.max(0, n.lit - 0.004);
          if (Math.random() < 0.002) pulseNode(1 + Math.floor(Math.random() * 40), elapsed);
        }
      }

      if (modeRef.current === "propagate") {
        const base = 900;
        const step = 160;
        for (let i = 0; i < litOrder.length; i++) {
          const at = base + i * step;
          if (elapsed > at && elapsed < at + 40) pulseNode(litOrder[i], elapsed);
        }
      }

      if (modeRef.current === "weave" || modeRef.current === "secondary" || modeRef.current === "ambient") {
        const maxLen = Math.min(W, H) * 0.32;
        const litIdx: number[] = [];
        for (let i = 0; i < nodesRef.current.length; i++) {
          const n = nodesRef.current[i];
          if (n.appear < 0.2) continue;
          if (i === 0 || n.lit > 0.15) litIdx.push(i);
        }

        for (const i of litIdx) {
          const k = i === 0 ? 3 : 4;
          const near = kNearest(i, k);
          for (const { j, d } of near) {
            if (d > maxLen) continue;
            if (nodesRef.current[j].appear < 0.15) continue;
            addEdge(i, j, elapsed);
          }
          // subtle triangulation for "weave"
          if (Math.random() < 0.12) {
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
          for (let i = 0; i < targets.length; i++) setTimeout(() => pulseNode(targets[i], elapsed + i * 90), i * 90);
        }
      }

      // edges
      ctx.lineCap = "round";
      for (const e of edgesRef.current) {
        const a = nodesRef.current[e.a];
        const b = nodesRef.current[e.b];
        if (a.appear < 0.2 || b.appear < 0.2) continue;

        const baseAlpha = 0.55 * stickyFade; // 은은
        const bornT = clamp((elapsed - e.bornAt) / 350, 0, 1);
        const hi = (1 - bornT) * 0.25;

        ctx.strokeStyle = rgba(BRAND.line, baseAlpha + hi);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        if (hi > 0.06) {
          ctx.strokeStyle = rgba(BRAND.mint, 0.28 * hi);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodesRef.current) {
        if (n.appear < 0.1) continue;
        const isSeed = n.id === 0;
        const r = isSeed ? 5 : n.r;

        if (isSeed || n.lit > 0.2) {
          const g = isSeed ? 0.65 : 0.42 * n.lit;
          ctx.fillStyle = rgba(BRAND.mintSoft, g * stickyFade);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 5.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = isSeed ? rgba(BRAND.mint, 1) : rgba(BRAND.ink, (0.55 + 0.25 * n.appear) * 0.80 * stickyFade);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        const dt = elapsed - n.pulseAt;
        if (dt >= 0 && dt < 700) {
          const t = dt / 700;
          const rr = lerp(r * 2, r * 18, easeOutCubic(t));
          ctx.strokeStyle = rgba(BRAND.mint, (1 - t) * 0.42 * stickyFade);
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.arc(n.x, n.y, rr, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [dpr, seed.x, seed.y, stickyProgress]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
