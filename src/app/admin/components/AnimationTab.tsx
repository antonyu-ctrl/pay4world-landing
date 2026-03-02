"use client";

import { useCallback, useState } from "react";
import HeroNetworkCanvas from "@/components/HeroNetworkCanvas";
import type { AnimationConfig, DualAnimationConfig } from "@/lib/siteConfig";

type Props = {
  config: DualAnimationConfig;
  onChange: (config: DualAnimationConfig) => void;
};

// ─── Slider helper ──────────────────────────────────────────────────

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <label className="w-24 shrink-0 text-[11px] text-brand-slate sm:w-40 sm:text-xs">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-mint"
      />
      <span className="w-12 text-right text-[11px] font-mono text-brand-ink sm:w-16 sm:text-xs">
        {value}
      </span>
    </div>
  );
}

/** Convert any CSS color string to a 7-char hex for the native picker. */
function toHex(color: string): string {
  if (/^#[0-9a-f]{6}$/i.test(color)) return color;
  try {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return "#000000";
    ctx.fillStyle = color;
    const computed = ctx.fillStyle; // browser normalises to hex or rgb()
    if (computed.startsWith("#")) return computed;
    const m = computed.match(/\d+/g);
    if (!m) return "#000000";
    const hex = (n: string) => parseInt(n).toString(16).padStart(2, "0");
    return `#${hex(m[0])}${hex(m[1])}${hex(m[2])}`;
  } catch {
    return "#000000";
  }
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <label className="w-24 shrink-0 text-[11px] text-brand-slate sm:w-40 sm:text-xs">{label}</label>
      <div className="relative flex flex-1 items-center gap-2">
        <input
          type="color"
          value={toHex(value)}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 shrink-0 cursor-pointer rounded-md border border-slate-200 bg-transparent p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-[11px] font-mono sm:px-3 sm:text-xs"
        />
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="mt-6 mb-3 text-xs font-bold uppercase tracking-wider text-brand-mint first:mt-0">
      {title}
    </h3>
  );
}

// ─── Component ──────────────────────────────────────────────────────

export default function AnimationTab({ config, onChange }: Props) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [showPreview, setShowPreview] = useState(false);

  const activeConfig = config[device];

  const update = useCallback(
    <K extends keyof AnimationConfig>(
      section: K,
      key: string,
      value: number | string
    ) => {
      const updated: AnimationConfig = {
        ...activeConfig,
        [section]: {
          ...(activeConfig[section] as Record<string, unknown>),
          [key]: value,
        },
      };
      onChange({ ...config, [device]: updated });
    },
    [activeConfig, config, device, onChange]
  );

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[400px_1fr]">
      {/* Mobile preview toggle */}
      <button
        onClick={() => setShowPreview((p) => !p)}
        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-brand-ink lg:hidden"
      >
        {showPreview ? "← Back to Controls" : "Show Live Preview →"}
      </button>

      {/* Left: Controls */}
      <div className={`max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 ${showPreview ? "hidden lg:block" : ""}`}>
        {/* Device toggle */}
        <div className="mb-4 flex gap-1 rounded-lg bg-slate-100 p-1">
          {(["desktop", "mobile"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                device === d
                  ? "bg-white text-brand-ink shadow-sm"
                  : "text-brand-slate hover:text-brand-ink"
              }`}
            >
              {d === "desktop" ? "Desktop" : "Mobile"}
            </button>
          ))}
        </div>

        <SectionHeader title="Seed Position" />
        <div className="space-y-2">
          <Slider label="X (horizontal)" value={activeConfig.seed.x} min={0} max={1} step={0.02} onChange={(v) => update("seed", "x", v)} />
          <Slider label="Y (vertical)" value={activeConfig.seed.y} min={0} max={1} step={0.02} onChange={(v) => update("seed", "y", v)} />
        </div>

        <SectionHeader title="3D Depth" />
        <div className="space-y-2">
          <Slider label="Perspective dist" value={activeConfig.depth.perspectiveDist} min={0.5} max={5} step={0.1} onChange={(v) => update("depth", "perspectiveDist", v)} />
          <Slider label="Opacity min (far)" value={activeConfig.depth.opacityMin} min={0} max={1} step={0.05} onChange={(v) => update("depth", "opacityMin", v)} />
          <Slider label="Opacity max (near)" value={activeConfig.depth.opacityMax} min={0.5} max={1} step={0.05} onChange={(v) => update("depth", "opacityMax", v)} />
        </div>

        <SectionHeader title="Parallax" />
        <div className="space-y-2">
          <Slider label="Strength" value={activeConfig.parallax.strength} min={0} max={0.1} step={0.002} onChange={(v) => update("parallax", "strength", v)} />
          <Slider label="Lerp speed" value={activeConfig.parallax.lerpSpeed} min={0.01} max={0.2} step={0.01} onChange={(v) => update("parallax", "lerpSpeed", v)} />
        </div>

        <SectionHeader title="Drift" />
        <div className="space-y-2">
          <Slider label="Amplitude X" value={activeConfig.drift.amplitudeX} min={0} max={5} step={0.1} onChange={(v) => update("drift", "amplitudeX", v)} />
          <Slider label="Amplitude Y" value={activeConfig.drift.amplitudeY} min={0} max={5} step={0.1} onChange={(v) => update("drift", "amplitudeY", v)} />
          <Slider label="Speed" value={activeConfig.drift.speed} min={0.0001} max={0.002} step={0.0001} onChange={(v) => update("drift", "speed", v)} />
        </div>

        <SectionHeader title="Nodes" />
        <div className="space-y-2">
          <Slider label="Total" value={activeConfig.nodes.total} min={20} max={150} step={1} onChange={(v) => update("nodes", "total", v)} />
          <Slider label="Seed radius" value={activeConfig.nodes.seedR} min={2} max={10} step={0.5} onChange={(v) => update("nodes", "seedR", v)} />
          <Slider label="Node min R" value={activeConfig.nodes.rMin} min={1} max={5} step={0.2} onChange={(v) => update("nodes", "rMin", v)} />
          <Slider label="Node R jitter" value={activeConfig.nodes.rJitter} min={0} max={3} step={0.1} onChange={(v) => update("nodes", "rJitter", v)} />
        </div>

        <SectionHeader title="Edges" />
        <div className="space-y-2">
          <Slider label="Base alpha" value={activeConfig.edges.baseAlpha} min={0} max={1} step={0.05} onChange={(v) => update("edges", "baseAlpha", v)} />
          <Slider label="Width base" value={activeConfig.edges.widthBase} min={0.5} max={3} step={0.25} onChange={(v) => update("edges", "widthBase", v)} />
          <Slider label="Width mint" value={activeConfig.edges.widthMint} min={0.5} max={4} step={0.25} onChange={(v) => update("edges", "widthMint", v)} />
          <Slider label="Highlight mul" value={activeConfig.edges.highlightMul} min={0} max={1} step={0.05} onChange={(v) => update("edges", "highlightMul", v)} />
        </div>

        <SectionHeader title="Glow" />
        <div className="space-y-2">
          <Slider label="Seed alpha" value={activeConfig.glow.seedAlpha} min={0} max={1} step={0.05} onChange={(v) => update("glow", "seedAlpha", v)} />
          <Slider label="Lit alpha mul" value={activeConfig.glow.litAlphaMul} min={0} max={1} step={0.05} onChange={(v) => update("glow", "litAlphaMul", v)} />
          <Slider label="Radius mul" value={activeConfig.glow.radiusMul} min={2} max={12} step={0.5} onChange={(v) => update("glow", "radiusMul", v)} />
          <Slider label="Depth falloff" value={activeConfig.glow.depthFalloff} min={0} max={1} step={0.05} onChange={(v) => update("glow", "depthFalloff", v)} />
        </div>

        <SectionHeader title="Pulse" />
        <div className="space-y-2">
          <Slider label="Duration (ms)" value={activeConfig.pulse.durationMs} min={200} max={1500} step={50} onChange={(v) => update("pulse", "durationMs", v)} />
          <Slider label="To multiplier" value={activeConfig.pulse.toMul} min={5} max={40} step={1} onChange={(v) => update("pulse", "toMul", v)} />
          <Slider label="Alpha" value={activeConfig.pulse.alpha} min={0} max={1} step={0.05} onChange={(v) => update("pulse", "alpha", v)} />
        </div>

        <SectionHeader title="Ambient" />
        <div className="space-y-2">
          <Slider label="Pulse chance" value={activeConfig.ambient.randomPulseChance} min={0} max={0.02} step={0.0005} onChange={(v) => update("ambient", "randomPulseChance", v)} />
          <Slider label="Lit decay/frame" value={activeConfig.ambient.litDecayPerFrame} min={0.001} max={0.01} step={0.0005} onChange={(v) => update("ambient", "litDecayPerFrame", v)} />
        </div>

        <SectionHeader title="Colors" />
        <div className="space-y-2">
          <ColorInput label="Mint" value={activeConfig.colors.mint} onChange={(v) => update("colors", "mint", v)} />
          <ColorInput label="Mint soft" value={activeConfig.colors.mintSoft} onChange={(v) => update("colors", "mintSoft", v)} />
          <ColorInput label="Ink" value={activeConfig.colors.ink} onChange={(v) => update("colors", "ink", v)} />
          <ColorInput label="Line" value={activeConfig.colors.line} onChange={(v) => update("colors", "line", v)} />
          <ColorInput label="BG top" value={activeConfig.colors.bgTop} onChange={(v) => update("colors", "bgTop", v)} />
          <ColorInput label="BG bottom" value={activeConfig.colors.bgBottom} onChange={(v) => update("colors", "bgBottom", v)} />
        </div>
      </div>

      {/* Right: Live preview */}
      <div className={`rounded-2xl border border-slate-200 bg-white overflow-hidden ${showPreview ? "" : "hidden lg:block"}`}>
        <div className="border-b border-slate-100 px-4 py-2">
          <p className="text-xs font-semibold text-brand-slate">
            Live Preview ({device === "desktop" ? "Desktop" : "Mobile"}) — move mouse over canvas to test parallax
          </p>
        </div>
        <div className="relative h-[60vh] lg:h-[calc(100vh-180px)]">
          <HeroNetworkCanvas
            stickyProgress={0}
            animationConfig={activeConfig}
          />
        </div>
      </div>
    </div>
  );
}
