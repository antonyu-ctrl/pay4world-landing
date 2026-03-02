"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SCENE_CONTROLS as C } from "@/lib/sceneControls";
import { useContent } from "@/lib/ConfigContext";
import type { ContactContent } from "@/lib/siteConfig";

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export default function ContactScene({
  contentOverride,
}: {
  contentOverride?: ContactContent;
}) {
  const configContent = useContent();
  const ct = contentOverride ?? configContent.contact;

  const ref = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

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
    const target = hexToRgb(C.contact.targetBg);
    const base = { r: 255, g: 255, b: 255 };
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
              {ct.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl sm:text-5xl leading-[1.05] font-black tracking-tight text-white">
              {ct.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-white/90">
              {ct.description}
            </p>

            <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-white/90">
              <p className="font-semibold">{ct.noticeTitle}</p>
              <p className="mt-2">{ct.noticeText}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className={`${C.contact.fixedMinH} rounded-3xl bg-white p-6 shadow-sm`}
            >
              <form
                className="grid gap-3 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "제출(데모) 완료! 실제 전송은 폼 서비스/백엔드 연동이 필요합니다."
                  );
                }}
              >
                <input
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  placeholder={ct.formName}
                  name="name"
                />
                <input
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  placeholder={ct.formEmail}
                  name="email"
                  type="email"
                />
                <input
                  className="sm:col-span-2 rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  placeholder={ct.formOrg}
                  name="org"
                />
                <textarea
                  className="sm:col-span-2 min-h-[140px] rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  placeholder={ct.formMessage}
                  name="message"
                />
                <button
                  type="submit"
                  className="sm:col-span-2 inline-flex items-center justify-center rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink/90"
                >
                  {ct.submitLabel}
                </button>

                <p className="sm:col-span-2 text-xs text-slate-500">
                  {ct.formFooter}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
