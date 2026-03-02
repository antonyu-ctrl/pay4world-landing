"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/motion";
import HeroNetworkCanvas from "@/components/HeroNetworkCanvas";
import { useContent, useResponsiveAnimationConfig } from "@/lib/ConfigContext";
import type { HeroContent, AnimationConfig } from "@/lib/siteConfig";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Hero({
  contentOverride,
  animationOverride,
  previewMode = false,
}: {
  contentOverride?: HeroContent;
  animationOverride?: AnimationConfig;
  previewMode?: boolean;
} = {}) {
  const configContent = useContent();
  const configAnimation = useResponsiveAnimationConfig();

  const hero = contentOverride ?? configContent.hero;
  const animCfg = animationOverride ?? configAnimation;

  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (previewMode) return;
    const onScroll = () => {
      const p = clamp(window.scrollY / 260, 0, 1);
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [previewMode]);

  const heroHeight = useMemo(() => {
    if (previewMode) return "auto";
    if (!mounted) return "80vh";
    const vh = window.innerHeight;
    const max = Math.min(vh * 0.80, 880);
    const min = 140;
    return max - (max - min) * progress;
  }, [progress, mounted, previewMode]);

  return (
    <section className="relative" style={{ height: heroHeight }}>
      <div className={`${previewMode ? "relative" : "sticky top-[52px]"} h-full overflow-hidden border-b border-brand-line/50 bg-white`}>
        <div className="absolute inset-0 pointer-events-none">
          <HeroNetworkCanvas
            stickyProgress={progress}
            animationConfig={animCfg}
          />
          <div className="p4w-grid absolute inset-0 opacity-[0.14]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/90 lg:bg-gradient-to-r lg:from-white/80 lg:via-white/50 lg:to-transparent" />
        </div>

        <div className="relative mx-auto h-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-24 pointer-events-none">
          <div className="grid h-full items-center gap-10 lg:grid-cols-2">
            <div className="max-w-xl pointer-events-auto">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full bg-brand-mint/15 px-4 py-2 text-sm font-semibold text-brand-ink">
                  <span className="h-2 w-2 rounded-full bg-brand-mint" />
                  {hero.badge}
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-5 text-4xl font-black tracking-tight text-brand-ink sm:text-5xl leading-[1.15]">
                  <span className="block">{hero.titleLine1}</span>
                  <span className="block mt-2 text-brand-mint">
                    {hero.titleLine2}
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 text-base leading-7 text-brand-slate">
                  {hero.description}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white shadow-glowMint hover:bg-brand-ink/90"
                  >
                    {hero.ctaPrimary}
                  </a>
                  <a
                    href="#how"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-brand-ink hover:bg-white"
                  >
                    {hero.ctaSecondary}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <dl className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur">
                  {hero.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="text-xs font-semibold text-brand-slate">
                        {s.label}
                      </dt>
                      <dd className="mt-1 text-sm font-bold">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
