import type { Config } from "tailwindcss";

export default {
<<<<<<< HEAD
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
=======
  content: ["./src/**/*.{ts,tsx}"],
>>>>>>> 8b7061e4 (Initial rebuild landing: sticky hero + canvas network)
  theme: {
    extend: {
      colors: {
        brand: {
<<<<<<< HEAD
          blue: "#007BFF",
          teal: "#40E0D0",
          ink: "#0B1220",
          slate: "#475569"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,123,255,0.20), 0 10px 30px rgba(0,123,255,0.20)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(1200px 600px at 15% 10%, rgba(64,224,208,0.20), transparent 55%), radial-gradient(900px 500px at 70% 20%, rgba(0,123,255,0.18), transparent 55%)"
=======
          mint: "#30D5C8",
          mintSoft: "#BFF8EE",
          ink: "#0B1220",
          slate: "#475569",
          line: "#D8E2EA",
          bgTint: "#F1FFFB"
        }
      },
      boxShadow: {
        glowMint: "0 0 0 1px rgba(48,213,200,0.18), 0 12px 40px rgba(48,213,200,0.18)"
>>>>>>> 8b7061e4 (Initial rebuild landing: sticky hero + canvas network)
      }
    }
  },
  plugins: []
<<<<<<< HEAD
} satisfies Config;
=======
} satisfies Config;
>>>>>>> 8b7061e4 (Initial rebuild landing: sticky hero + canvas network)
