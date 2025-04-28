import Cookies from "js-cookie";

// 쿠키에서 값 가져오기
export const getAuthorityCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

// 쿠키 설정 (key, value, expires(초 단위))
export const setAuthorityCookie = (
  key: string,
  value: string,
  expiresInSeconds?: number // 만료시간 직접 넘길 수 있게
) => {
  const isProduction = process.env.NODE_ENV === "production";

  Cookies.set(key, value, {
    expires: expiresInSeconds
      ? expiresInSeconds / (60 * 60 * 24) // 초 → 일(day)로 변환
      : 30 / 1440, // 기본 30분 (기존과 동일)
    secure: isProduction,
    sameSite: isProduction ? "Strict" : "Lax",
    path: "/",
  });
};

// 쿠키 삭제
export const removeAuthorityCookie = (key: string) => {
  Cookies.remove(key, { path: "/" });
};
