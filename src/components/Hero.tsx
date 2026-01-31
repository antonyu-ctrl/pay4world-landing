"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/motion";
import HeroNetworkCanvas from "@/components/HeroNetworkCanvas";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Hero() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // ✅ SSR/CSR mismatch 방지: 첫 렌더를 서버와 동일하게 맞춘 뒤, 마운트 후 동적 계산 적용
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const p = clamp(window.scrollY / 260, 0, 1);
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroHeight = useMemo(() => {
    // ✅ 서버 렌더 + 첫 클라 렌더에서 동일한 값 사용
    if (!mounted) return "92vh";

    const vh = window.innerHeight;
    const max = Math.min(vh * 0.92, 880);
    const min = 140;
    return max - (max - min) * progress;
  }, [progress, mounted]);

  return (
    <section className="relative" style={{ height: heroHeight }}>
      <div className="sticky top-[52px] h-full overflow-hidden border-b border-brand-line/50 bg-white">
        <div className="absolute inset-0">
          <HeroNetworkCanvas stickyProgress={progress} />
          <div className="p4w-grid absolute inset-0 opacity-[0.14]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/30" />
        </div>

        <div className="relative mx-auto h-full max-w-6xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid h-full items-center gap-10 lg:grid-cols-2">
            <div className="max-w-xl">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full bg-brand-mint/15 px-4 py-2 text-sm font-semibold text-brand-ink">
                  <span className="h-2 w-2 rounded-full bg-brand-mint" />
                  위치기반 소셜 × 기부 네트워크
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-5 text-4xl font-black tracking-tight text-brand-ink sm:text-5xl leading-[1.15]">
                  <span className="block">한 사람의 기부가,</span>
                  <span className="block mt-2 text-brand-mint">세상을 연결합니다</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 text-base leading-7 text-brand-slate">
                  한 번의 시작이 주변으로 번지고, 연결될수록 더 큰 임팩트가 만들어져요. Pay4World는 기부가 ‘혼자’가 아니라
                  ‘네트워크’가 되도록 설계됐습니다.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white shadow-glowMint hover:bg-brand-ink/90"
                  >
                    시작 노드 켜기
                  </a>
                  <a
                    href="#how"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-brand-ink hover:bg-white"
                  >
                    작동 원리 보기
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <dl className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur">
                  <div>
                    <dt className="text-xs font-semibold text-brand-slate">시작</dt>
                    <dd className="mt-1 text-sm font-bold">한 사람</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-brand-slate">확산</dt>
                    <dd className="mt-1 text-sm font-bold">주변 참여</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-brand-slate">연결</dt>
                    <dd className="mt-1 text-sm font-bold">거미줄 네트워크</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
