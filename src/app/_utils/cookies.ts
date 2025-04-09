import Cookies from "js-cookie";

// 쿠키에서 값 가져오기
export const getAuthorityCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

// 쿠키 설정 (만료 시간 30분)
export const setAuthorityCookie = (key: string, value: string) => {
  const isProduction = process.env.NODE_ENV === "production";

  Cookies.set(key, value, {
    expires: 30 / 1440, // 30분
    secure: isProduction, // 운영환경에서는 secure, 개발에서는 false
    sameSite: isProduction ? "Strict" : "Lax", // 개발환경에서는 Lax로 허용
    path: "/", // 전체 경로에서 접근 가능하도록
  });
};

// 쿠키 삭제
export const removeAuthorityCookie = (key: string) => {
  Cookies.remove(key, { path: "/" });
};
