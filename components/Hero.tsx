import Image from "next/image";
import { ASSETS } from "@/lib/constants";
import GalleryStrip from "@/components/GalleryStrip";
import FloatingStickers from "@/components/FloatingStickers";
import { Reveal } from "@/components/motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Pattern layer */}
      <div className="absolute inset-0 opacity-[0.18]">
        <Image
          src={ASSETS.patternSet}
          alt="pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Hero background */}
      <div className="absolute inset-0 opacity-90">
        <Image
          src={ASSETS.heroBg}
          alt="hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />

      {/* Floating stickers (desktop only) */}
      <FloatingStickers
        src={ASSETS.stickers20}
        stickers={[
          { top: "12%", left: "64%", size: 110, x: "10%", y: "10%", delay: 0.2, rotate: 6 },
          { top: "22%", left: "80%", size: 130, x: "70%", y: "20%", delay: 0.8, rotate: -8 },
          { top: "60%", left: "70%", size: 120, x: "30%", y: "70%", delay: 0.4, rotate: 10 },
          { top: "72%", left: "86%", size: 140, x: "85%", y: "75%", delay: 1.0, rotate: -6 }
        ]}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Left */}
          <div className="max-w-xl">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-teal/20 px-4 py-2 text-sm font-semibold text-brand-ink">
                <span className="h-2 w-2 rounded-full bg-brand-teal" />
                위치기반 소셜 × 게임화 기부 플랫폼
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                기부, <span className="text-brand-blue">게임처럼</span> 즐기자.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-7 text-brand-slate">
                1,000원부터 시작해서 배지/스트릭/챌린지로 “다음 참여”까지 이어지는 기부 경험.
                선행을 숨기지 말고, 힙하게 참여하세요.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-brand-blue/90"
                >
                  데모/제휴 문의
                </a>
                <a
                  href="#service"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-brand-ink hover:bg-white"
                >
                  서비스 더 보기
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur">
                <div>
                  <dt className="text-xs font-semibold text-brand-slate">시작</dt>
                  <dd className="mt-1 text-sm font-bold">1,000원부터</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-brand-slate">재미</dt>
                  <dd className="mt-1 text-sm font-bold">배지·스트릭</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-brand-slate">신뢰</dt>
                  <dd className="mt-1 text-sm font-bold">Journey</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Right gallery */}
          <div className="space-y-4">
            <Reveal>
              <GalleryStrip
                src={ASSETS.uiCards12}
                alt="UI gallery"
                tiles={[
                  { x: "12%", y: "18%" },
                  { x: "44%", y: "16%" },
                  { x: "76%", y: "18%" },
                  { x: "18%", y: "74%" },
                  { x: "80%", y: "78%" }
                ]}
                height={190}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <GalleryStrip
                src={ASSETS.badgeSet}
                alt="Badges gallery"
                tiles={[
                  { x: "12%", y: "18%" },
                  { x: "38%", y: "30%" },
                  { x: "72%", y: "26%" },
                  { x: "22%", y: "80%" },
                  { x: "78%", y: "80%" }
                ]}
                height={150}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}