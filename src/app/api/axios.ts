import axios from "axios";
import { getAuthorityCookie } from "../_utils/cookies";

axios.defaults.withCredentials = true; // 쿠키 자동 포함

console.log(
  "getAuthorityCookie : ",
  `Bearer ${getAuthorityCookie("accessToken")}`
);
/*  토큰 재발급 API Instance */
export const tokenInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthorityCookie("refreshToken")}`, // 리프레시 토큰 포함
    "X-CSRF-Token": getAuthorityCookie("csrfToken") || "", // CSRF 보호 추가
  },
});

// 요청 인터셉터 (토큰 자동 갱신)
tokenInstance.interceptors.request.use((config) => {
  const refreshToken = getAuthorityCookie("refreshToken");
  const csrfToken = getAuthorityCookie("csrfToken");

  if (`Bearer ${refreshToken}` !== config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }
  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

/* 공통 API Instance 생성 함수 */
function createAPIInstance(baseURL: string) {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${baseURL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthorityCookie("accessToken")}`,
      "X-CSRF-Token": getAuthorityCookie("csrfToken") || "", // CSRF 보호 추가
    },
  });

  // 요청 인터셉터 설정
  instance.interceptors.request.use((config) => {
    const accessToken = getAuthorityCookie("accessToken");
    const csrfToken = getAuthorityCookie("csrfToken");

    if (`Bearer ${accessToken}` !== config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }

    return config;
  });

  return instance;
}

/* 서비스별 API Instance */
export const authInstance = createAPIInstance("auth/");
export const userInstance = createAPIInstance("user/");

// 에러 처리 함수
export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("API 에러:", error.response.data);
    } else if (error.request) {
      console.error("서버 응답 없음");
    }
  } else if (error instanceof Error) {
    console.error("JavaScript Error", error.message);
  } else {
    console.error("알 수 없는 에러 발생");
  }
};
