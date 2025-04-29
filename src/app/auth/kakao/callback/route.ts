import { kakaoLogin } from "@/app/_api/socialAuth";
import { NextRequest, NextResponse } from "next/server";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "No code provided" }, { status: 400 });
  }

  try {
    // 🔥 카카오 토큰 요청
    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URI,
        code,
      }).toString(),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("❌ Kakao OAuth Error:", tokenData);
      return NextResponse.json(
        { message: "Failed to get Kakao access token", error: tokenData },
        { status: 400 }
      );
    }

    // 🔥 우리 백엔드로 카카오 access_token 보내 로그인
    const backendResult = await kakaoLogin(tokenData.access_token);

    const isProduction = process.env.NODE_ENV === "production";

    const response = NextResponse.redirect(new URL("/", request.url));

    response.cookies.set("accessToken", backendResult.accessToken, {
      path: "/",
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 30 * 60, // 30분
    });

    response.cookies.set("refreshToken", backendResult.refreshToken, {
      path: "/",
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 14 * 24 * 60 * 60, // 14일
    });

    response.cookies.set("nickname", backendResult.nickname, {
      path: "/",
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 14 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error(
      "❌ Error during Kakao OAuth callback processing:",
      error.message || error
    );
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
