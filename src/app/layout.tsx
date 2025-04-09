import type { Metadata } from "next";
import "./globals.css";
import Providers from "./_providers/providers";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { postRefreshTokenServer } from "./_api/authServer";

export const metadata: Metadata = {
  title: "오늘도 리뷰",
  description: "모든것을 리뷰하는 오늘도 리뷰 웹 사이트 입니다.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    try {
      const newAccessToken = await postRefreshTokenServer(refreshToken);
      console.log("서버에서 accessToken 갱신 완료:", newAccessToken);
    } catch (error) {
      console.warn("자동 로그인 X");
    }
  }

  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
