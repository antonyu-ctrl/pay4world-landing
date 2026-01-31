"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UI } from "@/lib/uiControls";

export default function DetailOverlay({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") router.back();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  // ✅ 오버레이 열렸을 때 배경 스크롤 잠금
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${UI.cta.overlay.backdropClass}`}
      onMouseDown={() => router.back()}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={UI.cta.overlay.panelClass}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* 헤더 고정 */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 px-5 py-4">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* ✅ 본문만 스크롤: min-h-0 + flex-1 + overflow-y-auto 가 핵심 */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}