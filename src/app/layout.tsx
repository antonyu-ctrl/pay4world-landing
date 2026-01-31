import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pay4World — 한 사람의 기부가, 세상을 연결합니다",
  description:
    "한 사람의 시작이 주변으로 번지고, 거미줄처럼 연결되어 더 큰 임팩트를 만드는 기부 네트워크. Pay4World.",
  openGraph: {
    title: "Pay4World",
    description:
      "한 사람의 시작 → 주변 확산 → 거미줄 연결. 기부가 네트워크가 되도록 설계된 Pay4World.",
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}