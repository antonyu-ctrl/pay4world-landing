export type SceneBgPresetName = "AIR" | "TECH" | "BRAND";

export const SCENE_CONTROLS = {
  frame: {
    minVh: 44,
    maxVh: 50,
    stickyTopPx: 0,
    wrapperMinVh: 62, // 너가 조정한 값
  },

  typography: {
    eyebrow: "text-xs font-semibold tracking-wide uppercase text-brand-mint",
    title: "mt-3 text-4xl sm:text-5xl leading-[1.05] font-black tracking-tight text-brand-ink",
    desc: "mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-brand-slate",
  },

  layout: {
    container: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
    grid: "grid items-center gap-10 lg:grid-cols-12",
    textCol: "lg:col-span-5",
    mediaCol: "lg:col-span-7",
  },

  bg: {
    // ✅ 여기만 바꾸면 3가지 스타일을 전부 테스트 가능
    activePreset: "AIR" as SceneBgPresetName,

    presets: {
      AIR: {
        sectionTintOdd: "rgba(255,255,255,1)",
        sectionTintEven: "rgba(72,186,175,0.05)",
        overlay:
          "radial-gradient(80% 60% at 20% 20%, rgba(72,186,175,0.14) 0%, rgba(255,255,255,0) 60%)",
        borderTopClass: "border-slate-100",
        textPanelClass:
  	  "rounded-3xl p-5 md:p-0 " +
  	  "bg-white/88 backdrop-blur-sm border border-white/70 shadow-sm " + // ✅ 모바일 가독성
  	  "md:bg-white/0 md:border-white/0 md:shadow-none md:backdrop-blur-0",
        mediaCardBgClass: "bg-white",
        accentBar: { enabled: false, className: "bg-[#48baaf]", widthPx: 3 },
        pattern: { enabled: false as const },
      },

      TECH: {
        sectionTintOdd: "rgba(255,255,255,1)",
        sectionTintEven: "rgba(240,255,252,1)",
        overlay:
          "radial-gradient(90% 70% at 10% 10%, rgba(72,186,175,0.16) 0%, rgba(255,255,255,0) 55%)",
        borderTopClass: "border-brand-line/60",
        textPanelClass:
  	  "rounded-3xl p-5 md:p-0 " +
  	  "bg-white/88 backdrop-blur-sm border border-white/70 shadow-sm " + // ✅ 모바일 가독성
  	  "md:bg-white/0 md:border-white/0 md:shadow-none md:backdrop-blur-0",
        mediaCardBgClass: "bg-[#F3FFFD]",
        accentBar: { enabled: false, className: "bg-[#48baaf]", widthPx: 3 },
        pattern: {
          enabled: true as const,
          style: {
            backgroundImage: "radial-gradient(rgba(15,23,42,0.12) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(120% 80% at 20% 10%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(120% 80% at 20% 10%, black 0%, transparent 70%)",
            opacity: 0.22,
          } as const,
        },
      },

      BRAND: {
        sectionTintOdd: "rgba(255,255,255,1)",
        sectionTintEven: "rgba(72,186,175,0.09)",
        overlay:
          "radial-gradient(75% 65% at 30% 15%, rgba(72,186,175,0.22) 0%, rgba(255,255,255,0) 58%)",
        borderTopClass: "border-brand-line/70",
        textPanelClass:
  	  "rounded-3xl p-5 md:p-0 " +
  	  "bg-white/88 backdrop-blur-sm border border-white/70 shadow-sm " + // ✅ 모바일 가독성
  	  "md:bg-white/0 md:border-white/0 md:shadow-none md:backdrop-blur-0",
        mediaCardBgClass: "bg-[#EFFFFB]",
        accentBar: { enabled: true, className: "bg-[#48baaf]", widthPx: 3 },
        pattern: { enabled: false as const },
      },
    } as const,
  },

  media: {
    placeholderLabel: "Image Coming",
  },

  // ContactScene이 참조하는 값(네 코드에 이미 사용 중)
  contact: {
    targetBg: "#48baaf",
    fixedMinH: "min-h-[520px]",
  },
} as const;