import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pay4World — 기부, 게임처럼 즐기자",
  description:
    "위치기반 소셜 네트워크와 게임이 결합된 지속가능한 기부 플랫폼 Pay4World. 참여율을 높이는 새로운 기부 경험을 만듭니다.",
  openGraph: {
    title: "Pay4World",
    description:
      "기부, 게임처럼 즐기자. 소셜 + 게임 + 투명성으로 참여율을 높이는 기부 플랫폼",
    type: "website"
  },
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}