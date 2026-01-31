"use client";

import Link from "next/link";
import Image from "next/image";
import { ASSETS, NAV } from "@/lib/constants";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

function scrollToTop() {
  // 해시가 있으면 URL을 깔끔하게 '/'로 정리 (원치 않으면 이 블록 삭제 가능)
  if (window.location.pathname !== "/" || window.location.hash) {
    history.replaceState(null, "", "/");
  }

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Pay4World 홈"
          onClick={(e) => {
            // Link 기본 네비게이션(리로드/라우팅) 대신 항상 top으로 스크롤
            e.preventDefault();
            scrollToTop();
          }}
        >
          <Image src={ASSETS.logo} alt="Pay4World" width={170} height={44} priority />
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-brand-slate md:flex">
          {NAV.slice(0, 6).map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => scrollToId(it.id)}
              className="hover:text-brand-ink"
            >
              {it.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => scrollToId("contact")}
          className="inline-flex items-center justify-center rounded-full bg-brand-ink px-4 py-2 text-sm font-semibold text-white hover:bg-brand-ink/90"
        >
          문의
        </button>
      </div>
    </header>
  );
}