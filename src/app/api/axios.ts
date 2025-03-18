import axios from "axios";

const locationURL =
  typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : `${process.env.NEXT_PUBLIC_API_ROUTE_BASE_URL}/api`;

export const axiosInstance = axios.create({
  baseURL: locationURL,
  headers: { "Content-Type": "application/json" },
});

// import axios from "axios";
// import { getAuthorityCookie } from "../_utils/cookies";

// axios.defaults.withCredentials = true; // 쿠키 자동 포함

// console.log(
//   "getAuthorityCookie : ",
//   `Bearer ${getAuthorityCookie("accessToken")}`
// );

// // ✅ 공통 API Instance 생성 함수 (프록시 적용)
// function createAPIInstance(basePath: string) {
//   const instance = axios.create({
//     baseURL: `/api/proxy/${basePath}`, // ✅ 프록시 API 적용
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getAuthorityCookie("accessToken")}`,
//       "X-CSRF-Token": getAuthorityCookie("csrfToken") || "",
//     },
//   });

//   return instance;
// }

// /* ✅ 서비스별 API Instance */
// export const authInstance = createAPIInstance("auth");
// export const userInstance = createAPIInstance("user");

// // ✅ 에러 처리 함수
// export const handleApiError = (error: unknown) => {
//   if (axios.isAxiosError(error)) {
//     if (error.response) {
//       console.error("API 에러:", error.response.data);
//     } else if (error.request) {
//       console.error("서버 응답 없음");
//     }
//   } else if (error instanceof Error) {
//     console.error("JavaScript Error", error.message);
//   } else {
//     console.error("알 수 없는 에러 발생");
//   }
// };
