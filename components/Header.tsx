import Image from "next/image";
import { ASSETS, NAV } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <Image
            src={ASSETS.logo}
            alt="Pay4World 로고"
            width={180}
            height={48}
            priority
          />
          <span className="sr-only">Pay4World</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-slate md:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="hover:text-brand-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full border border-brand-blue/25 px-4 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-blue/5 md:inline-flex"
          >
            NPO 등록
          </a>
          <a
            href="#contact"
            className="inline-flex rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-brand-blue/90"
          >
            데모/제휴 문의
          </a>
        </div>
      </div>
    </header>
  );
}