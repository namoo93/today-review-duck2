import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/mypage(.*)',
  '/writing(.*)',
  '/following(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// const PROTECTED_ROUTES = ['/mypage', '/writing', '/following'];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const accessToken = request.cookies.get('accessToken')?.value;

//   const isProtected = PROTECTED_ROUTES.some((route) =>
//     pathname.startsWith(route),
//   );

//   if (isProtected && !accessToken) {
//     // ❌ 비로그인 상태로 보호된 페이지 접근 시 → 메인으로
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }
