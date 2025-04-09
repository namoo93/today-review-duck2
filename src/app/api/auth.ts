import {
  getAuthorityCookie,
  removeAuthorityCookie,
  setAuthorityCookie,
} from "../_utils/cookies";
import { axiosInstance } from "./axios";

export const postRefreshToken = async (): Promise<boolean> => {
  const refreshToken = getAuthorityCookie("refreshToken");

  if (!refreshToken) {
    throw new Error("Refresh token is missing.");
  }

  const response = await axiosInstance.post("/auth/access-token", null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const newAccessToken = response.data.accessToken;
  setAuthorityCookie("accessToken", newAccessToken); // ✅ 갱신된 토큰 저장

  return newAccessToken;
};
