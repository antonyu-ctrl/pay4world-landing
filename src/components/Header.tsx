import Image from "next/image";
import { ASSETS, NAV } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <Image src={ASSETS.logo} alt="Pay4World" width={170} height={44} priority />
        </a>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-brand-slate md:flex">
          {NAV.slice(0, 6).map((it) => (
            <a key={it.id} href={`#${it.id}`} className="hover:text-brand-ink">
              {it.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-brand-ink px-4 py-2 text-sm font-semibold text-white hover:bg-brand-ink/90"
        >
          문의
        </a>
      </div>
    </header>
  );
}
