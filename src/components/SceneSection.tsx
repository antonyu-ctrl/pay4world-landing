"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SCENE_CONTROLS as C } from "@/lib/sceneControls";
import SceneMedia from "@/components/SceneMedia";

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function SceneSection({
  id,
  index,
  eyebrow,
  title,
  desc,
  details,
  align,
  mediaSrc, // ✅ 추가
}: {
  id: string;
  index: number;
  eyebrow: string;
  title: string;
  desc: string;
  details?: string[];
  align: "left" | "right";
  mediaSrc?: string; // ✅ 추가
}) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const el = wrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // wrapperMinVh=90 기준 템포(빨리 전환)
      const start = vh * 0.80;
      const end = -vh * 0.10;
      const raw = (start - rect.top) / (start - end);

      setP(clamp(raw, 0, 1));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const t = useMemo(() => easeOutCubic(p), [p]);
  const heightVh = useMemo(() => lerp(C.frame.minVh, C.frame.maxVh, t), [t]);

  const preset = C.bg.presets[C.bg.activePreset];
  const isEven = index % 2 === 1;
  const bgColor = isEven ? preset.sectionTintEven : preset.sectionTintOdd;

  const isRight = align === "right";
  const textCol = `${C.layout.textCol} ${isRight ? "lg:order-2" : ""}`;
  const mediaCol = `${C.layout.mediaCol} ${isRight ? "lg:order-1" : ""}`;

  return (
    <section
      ref={(n) => {
        wrapRef.current = n;
      }}
      id={id}
      className={`relative border-t ${preset.borderTopClass}`}
      style={{ minHeight: `${C.frame.wrapperMinVh}vh`, background: bgColor }}
    >
      {/* 공기감 overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: preset.overlay }}
      />

      {/* TECH preset 점 패턴 */}
      {preset.pattern?.enabled ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={preset.pattern.style}
        />
      ) : null}

      <div
        className="sticky"
        style={{
          top: C.frame.stickyTopPx,
          height: `${C.frame.maxVh}vh`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className={C.layout.container} style={{ width: "100%" }}>
          <div className={C.layout.grid} style={{ minHeight: `${heightVh}vh` }}>
            <div className={textCol}>
              {/* BRAND preset accent bar */}
              {preset.accentBar?.enabled ? (
                <div className="mb-4">
                  <div
                    className={`rounded-full ${preset.accentBar.className}`}
                    style={{ width: preset.accentBar.widthPx, height: 28 }}
                  />
                </div>
              ) : null}

              <div className={preset.textPanelClass}>
                <p className={C.typography.eyebrow}>{eyebrow}</p>
                <h2 className={C.typography.title}>{title}</h2>
                <p className={C.typography.desc}>{desc}</p>

                {details?.length ? (
                  <ul className="mt-6 grid gap-2 text-sm text-brand-slate">
                    {details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-brand-mint" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <div
              className={mediaCol}
              style={{ transform: `scale(${lerp(0.96, 1.02, t)})` }}
            >
              {/* ✅ 여기만 바뀜: src를 넘기면 이미지, 없으면 기존 placeholder */}
              <SceneMedia
                presetName={C.bg.activePreset}
                src={mediaSrc}
                alt={`${id} illustration`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}