"use client";

import { useRouter } from "next/navigation";

type Props = {
  title: string;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
};

export default function IosTopBar({ title, onBack, rightSlot }: Props) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/60 bg-white/80 backdrop-blur">
      <div className="relative mx-auto flex h-12 max-w-3xl items-center px-3">
        <button
          type="button"
          onClick={onBack ?? (() => router.back())}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-ink"
          aria-label="Back"
        >
          <span className="text-lg leading-none">‹</span>
          <span>Back</span>
        </button>

        <div className="pointer-events-none absolute left-1/2 max-w-[70%] -translate-x-1/2 truncate text-center text-sm font-semibold text-brand-ink">
          {title}
        </div>

        <div className="ml-auto flex items-center">{rightSlot}</div>
      </div>
    </header>
  );
}