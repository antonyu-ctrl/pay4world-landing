export type CtaVariant = "brand" | "outline" | "ghost";
export type CtaSize = "sm" | "md" | "lg";

export const UI = {
  cta: {
    enabled: true,
    defaultLabel: "자세히 보기",

    // ✅ 한 번에 바꾸되, 타입은 유니온으로 유지
    variant: "outline" as CtaVariant,
    size: "md" as CtaSize,
    showArrow: true,

    overlay: {
      backdropClass: "bg-black/30 backdrop-blur-[2px]",
      panelClass:
        "w-[min(960px,92vw)] max-h-[calc(100dvh-2rem)] flex flex-col rounded-3xl bg-white shadow-2xl ring-1 ring-black/5",
    },
  },
} as const;