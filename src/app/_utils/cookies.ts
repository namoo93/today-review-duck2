import Cookies from "js-cookie";

// 쿠키에서 값 가져오기
export const getAuthorityCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

// 쿠키 설정 (만료 시간 30분)
export const setAuthorityCookie = (key: string, value: string) => {
  Cookies.set(key, value, {
    expires: 30 / 1440, // 30분
    secure: process.env.NODE_ENV === "production", // HTTPS에서만 작동 (운영 환경에서만 적용)
    sameSite: "Strict", // CSRF 방지
  });
};

// 쿠키 삭제
export const removeAuthorityCookie = (key: string) => {
  Cookies.remove(key);
};
