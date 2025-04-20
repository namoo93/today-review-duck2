import { cookies } from "next/headers";

export const postRefreshTokenServer = async (
  refreshToken: string
): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/access-token`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include", // 쿠키 전송
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();

  const newAccessToken = data.accessToken;
  const cookieStore = cookies();

  // 🔐 클라이언트와 일치하도록 쿠키에 저장
  cookieStore.set("accessToken", newAccessToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 60 * 30, // 30분
  });

  return newAccessToken;
};

