export const BRAND = {
  mint: "#30D5C8",
  mintSoft: "#BFF8EE",
  ink: "#0B1220",
  slate: "#475569",
  line: "#D8E2EA",
  bgTint: "#F1FFFB"
} as const;

export const ASSETS = {
  logo: "/assets/logo-transparent.png",
  heroFallback: "/assets/hero-ref.jpg"
} as const;

export const NAV = [
  { id: "service", label: "서비스" },
  { id: "how", label: "어떻게 동작하나요" },
  { id: "product", label: "기능" },
  { id: "transparency", label: "투명성" },
  { id: "partners", label: "B2B·NPO" },
  { id: "impact", label: "임팩트" },
  { id: "roadmap", label: "로드맵" },
  { id: "contact", label: "문의" }
] as const;
