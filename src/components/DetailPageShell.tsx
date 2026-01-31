"use client";

import IosTopBar from "@/components/IosTopBar";

export default function DetailPageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-white">
      {/* ✅ 기존 UI.cta.mobileTopBarClass + router.back() 구현 제거 */}
      <IosTopBar title={title} />

      <div className="mx-auto max-w-3xl px-4 py-6">{children}</div>
    </div>
  );
}