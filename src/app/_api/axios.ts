import axios from "axios";
import { getAuthorityCookie } from "../_utils/cookies";
import { postRefreshToken } from "./auth";

axios.defaults.withCredentials = true; // 쿠키 자동 포함
const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === "local"
    ? "/api" // 👉 로컬에서는 프록시 경유
    : process.env.NEXT_PUBLIC_BASE_URL; // 👉 운영에서는 직접 API

console.log("BASE_URL ----- ", BASE_URL);

const attachAuthHeaders = (config: any) => {
  const accessToken = getAuthorityCookie("accessToken");
  const csrfToken = getAuthorityCookie("csrfToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
};

// 아직 발급된 토큰이 없는 상태에서 사용
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 공통 API 인스턴스 생성기
function createAPIInstance(
  basePath: string,
  contentType: string = "application/json"
) {
  const instance = axios.create({
    baseURL: `${BASE_URL}/${basePath}`,
    headers: { "Content-Type": contentType },
  });

  instance.interceptors.request.use(attachAuthHeaders);

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await postRefreshToken();
          const newAccessToken = getAuthorityCookie("accessToken");

          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return axios(originalRequest); // axiosInstance가 아니라 axios 자체로 재요청해야 정확
        } catch (err) {
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
export const authInstance = createAPIInstance("auth");
export const userInstance = createAPIInstance("user");
export const reviewInstance = createAPIInstance("review");
//프로필 이미지 변경시
export const fileInstance = createAPIInstance("user", "multipart/form-data");

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
