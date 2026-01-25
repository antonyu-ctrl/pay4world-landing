import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          mint: "#30D5C8",
          mintSoft: "#BFF8EE",
          ink: "#0B1220",
          slate: "#475569",
          line: "#D8E2EA",
          bgTint: "#F1FFFB"
        }
      },
      boxShadow: {
        glowMint:
          "0 0 0 1px rgba(48,213,200,0.18), 0 12px 40px rgba(48,213,200,0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;