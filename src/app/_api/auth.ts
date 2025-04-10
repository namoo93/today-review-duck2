import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from "../_utils/cookies";
import { axiosInstance } from "./axios";

export const postRefreshToken = async (): Promise<boolean> => {
  const refreshToken = getAuthorityCookie("refreshToken");

  if (!refreshToken) {
    console.warn("🔐 리프레시 토큰이 없습니다.");
    window.location.href = "/"; // 👉 메인으로 이동
    return false;
  }

  try {
    const response = await axiosInstance.post("/auth/access-token", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const newAccessToken = response.data.accessToken;
    if (!newAccessToken) {
      console.warn("🚨 엑세스 토큰이 없습니다.");
      window.location.href = "/"; // 👉 메인으로 이동
      return false;
    }

    setAuthorityCookie("accessToken", newAccessToken); // ✅ 갱신된 토큰 저장
    return true;
  } catch (error) {
    console.error("❌ 토큰 갱신 실패", error);
    window.location.href = "/"; // 👉 메인으로 이동
    return false;
  }
};
