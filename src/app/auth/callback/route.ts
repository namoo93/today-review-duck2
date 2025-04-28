import { NextRequest, NextResponse } from "next/server";
import { googleLogin } from "../../_api/socialAuth";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  console.log("✅ Received OAuth callback request");
  console.log("🔍 code:", code);

  if (!code) {
    console.error("❌ No code provided in query params.");
    return NextResponse.json({ message: "No code provided" }, { status: 400 });
  }

  try {
    console.log("📡 Requesting Google OAuth access token...");

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
    console.log("📦 Google token response:", tokenData);

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("❌ Failed to get Google access token:", tokenData);
      return NextResponse.json(
        { message: "Failed to get Google access token" },
        { status: 400 }
      );
    }

    console.log("✅ Successfully received Google access token.");

    console.log("📡 Sending access token to our backend...");
    const backendResult = await googleLogin(tokenData.access_token);
    console.log("📦 Backend login result:", backendResult);

    console.log("✅ OAuth login process completed successfully.");
    return NextResponse.json({ message: "Login success" }, { status: 200 });
  } catch (error: any) {
    console.error(
      "❌ Error during OAuth callback processing:",
      error.message || error
    );
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
