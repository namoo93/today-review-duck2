import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/mypage", "/writing", "/following"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !accessToken) {
    // ❌ 비로그인 상태로 보호된 페이지 접근 시 → 메인으로
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*", "/writing/:path*", "/following"],
};
