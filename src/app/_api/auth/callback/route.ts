
import { NextRequest, NextResponse } from "next/server";
import { googleLogin } from "../../socialAuth";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;
const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect("/auth/auth-code-error");
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
      console.error("❌ Failed to get Google access token:", tokenData);
      return NextResponse.redirect("/auth/auth-code-error");
    }

    // 👉 accessToken만 서버에 전달
    await googleLogin(tokenData.access_token);

    return NextResponse.redirect(`${SITE_URL}${next}`);
  } catch (error) {
    console.error("❌ Google login callback error:", error);
    return NextResponse.redirect("/auth/auth-code-error");
  }
}
