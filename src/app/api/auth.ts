import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from "../_utils/cookies";
import { axiosInstance } from "./axios";

export const postRefreshToken = async (): Promise<boolean> => {
  const refreshToken = getAuthorityCookie("refreshToken");

  if (!refreshToken) throw new Error("🔐 리프레시 토큰이 없습니다.");

  const response = await axiosInstance.post("/auth/access-token", null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const newAccessToken = response.data.accessToken;
  if (!newAccessToken) throw new Error("🚨 엑세스 토큰이 없습니다.");

  setAuthorityCookie("accessToken", newAccessToken); // ✅ 갱신된 토큰 저장

  return newAccessToken;
};
