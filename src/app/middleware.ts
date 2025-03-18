import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("🔄 Middleware triggered:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/proxy/:path*", // ✅ 모든 API 요청을 감지하도록 설정
};
