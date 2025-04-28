import { NextRequest, NextResponse } from "next/server";
import { googleLogin } from "../../_api/socialAuth";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "No code provided" }, { status: 400 });
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.json(
        { message: "Failed to get Google access token" },
        { status: 400 }
      );
    }

    const backendResult = await googleLogin(tokenData.accessToken);
    const isProduction = process.env.NODE_ENV === "production";

    // ✅ 쿠키 설정 + 리다이렉트
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
      maxAge: 14 * 24 * 60 * 60, // 14일
    });

    return response;
  } catch (error: any) {
    console.error(
      "❌ Error during OAuth callback processing:",
      error.message || error
    );
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
