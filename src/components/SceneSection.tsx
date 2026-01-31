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
  mediaSrc,
}: {
  id: string;
  index: number;
  eyebrow: string;
  title: string;
  desc: string;
  details?: string[];
  align: "left" | "right";
  mediaSrc?: string;
}) {
  const wrapRef = useRef<HTMLElement | null>(null);

  // ✅ 모바일에서는 sticky를 끄기 위한 분기
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // 진행률은 데스크탑에서만 실사용(모바일은 그냥 0으로 둬도 OK)
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!isDesktop) {
      setP(0);
      return;
    }

    let raf = 0;
    const tick = () => {
      const el = wrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // 데스크탑 기준 템포
      const start = vh * 0.8;
      const end = -vh * 0.1;
      const raw = (start - rect.top) / (start - end);

      setP(clamp(raw, 0, 1));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isDesktop]);

  const t = useMemo(() => easeOutCubic(p), [p]);
  const heightVh = useMemo(() => lerp(C.frame.minVh, C.frame.maxVh, t), [t]);

  const preset = C.bg.presets[C.bg.activePreset];
  const isEven = index % 2 === 1;
  const bgColor = isEven ? preset.sectionTintEven : preset.sectionTintOdd;

  const isRight = align === "right";
  const textCol = `${C.layout.textCol} ${isRight ? "lg:order-2" : ""}`;
  const mediaCol = `${C.layout.mediaCol} ${isRight ? "lg:order-1" : ""}`;

  // ✅ 모바일에서는 “일반 섹션 높이”로 동작하도록
  const sectionMinHeight = isDesktop ? `${C.frame.wrapperMinVh}vh` : "auto";
  const stickyHeight = isDesktop ? `${C.frame.maxVh}vh` : "auto";
  const frameMinHeight = isDesktop ? `${heightVh}vh` : "auto";

  return (
    <section
      ref={(n) => {
        wrapRef.current = n;
      }}
      id={id}
      className={`relative border-t ${preset.borderTopClass}`}
      style={{ minHeight: sectionMinHeight, background: bgColor }}
    >
      {/* 배경 오버레이(겹침 방지 위해 z-index 관리) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: preset.overlay }}
      />

      {preset.pattern?.enabled ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={preset.pattern.style}
        />
      ) : null}

      {/* ✅ 모바일에서는 sticky OFF (겹침 해결) */}
      <div
        className={isDesktop ? "sticky" : "relative"}
        style={{
          top: isDesktop ? C.frame.stickyTopPx : undefined,
          height: stickyHeight,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className={C.layout.container} style={{ width: "100%" }}>
          <div
            className={C.layout.grid}
            style={{
              minHeight: frameMinHeight,
            }}
          >
            <div className={textCol}>
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

            {/* ✅ 모바일에서 이미지가 밑으로 내려가게 mt 추가 */}
            <div className={`${mediaCol} mt-6 lg:mt-0`}>
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