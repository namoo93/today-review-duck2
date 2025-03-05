import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘도 리뷰",
  description: "모든것을 리뷰하는 오늘도 리뷰 웹 사이트 입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
