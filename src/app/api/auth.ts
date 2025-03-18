import { removeAuthorityCookie, setAuthorityCookie } from "../_utils/cookies";
import { tokenInstance } from "./axios";

export const postRefreshToken = async (): Promise<boolean> => {
  try {
    const response = await tokenInstance.post("/auth/access-token");
    setAuthorityCookie("accessToken", response.data.accessToken);
    return true; // 토큰 갱신 성공
  } catch (error) {
    console.error("리프레시 토큰 만료됨, 로그아웃 필요:", error);
    removeAuthorityCookie("accessToken");
    removeAuthorityCookie("refreshToken");
    window.location.href = "/"; //메인으로
    return false; // 토큰 갱신 실패
  }
};
