"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SCENE_CONTROLS as C } from "@/lib/sceneControls";

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

// hex -> rgb
function hexToRgb(hex: string) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export default function ContactScene() {
  const ref = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // ✅ A안: 들어오기 시작 → 중앙쯤에서 #48baaf 완성
      const start = vh * 0.92;
      const end = vh * 0.55;
      const raw = (start - rect.top) / (start - end);

      setP(clamp(raw, 0, 1));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const bg = useMemo(() => {
    const target = hexToRgb(C.contact.targetBg); // #48baaf
    const base = { r: 255, g: 255, b: 255 }; // white
    const t = p;

    const r = Math.round(base.r + (target.r - base.r) * t);
    const g = Math.round(base.g + (target.g - base.g) * t);
    const b = Math.round(base.b + (target.b - base.b) * t);

    return `rgb(${r} ${g} ${b})`;
  }, [p]);

  return (
    <section
      ref={(n) => {
        ref.current = n;
      }}
      id="contact"
      className="border-t border-slate-100"
      style={{ background: bg }}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wide uppercase text-white/90">
              Contact
            </p>
            <h2 className="mt-3 text-4xl sm:text-5xl leading-[1.05] font-black tracking-tight text-white">
              데모/제휴 문의
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-white/90">
              파트너십, 시범 운영, 투자/협업 등 무엇이든 편하게 연락 주세요.
            </p>

            <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-white/90">
              <p className="font-semibold">안내</p>
              <p className="mt-2">
                현재는 데모 폼입니다. 실제 전송은 폼 서비스/백엔드 연동으로
                붙일 수 있어요.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className={`${C.contact.fixedMinH} rounded-3xl bg-white p-6 shadow-sm`}>
              <form
                className="grid gap-3 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("제출(데모) 완료! 실제 전송은 폼 서비스/백엔드 연동이 필요합니다.");
                }}
              >
                <input
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  placeholder="이름"
                  name="name"
                />
                <input
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  placeholder="이메일"
                  name="email"
                  type="email"
                />
                <input
                  className="sm:col-span-2 rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  placeholder="회사/조직"
                  name="org"
                />
                <textarea
                  className="sm:col-span-2 min-h-[140px] rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  placeholder="문의 내용"
                  name="message"
                />
                <button
                  type="submit"
                  className="sm:col-span-2 inline-flex items-center justify-center rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink/90"
                >
                  제출하기
                </button>

                <p className="sm:col-span-2 text-xs text-slate-500">
                  * 데모용 UI입니다. 실제 전송은 백엔드/폼 서비스 연동이 필요합니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}