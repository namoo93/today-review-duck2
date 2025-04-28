import { getAuthorityCookie, setAuthorityCookie } from "../_utils/cookies";
import { axiosInstance } from "./axios";

export const postRefreshToken = async (): Promise<boolean> => {
  const refreshToken = getAuthorityCookie("refreshToken");

  console.log("postRefreshToken 실행 refreshToken :", refreshToken);
  if (!refreshToken) {
    throw new Error("리프레시 토큰 없음");
  }

  try {
    const response = await axiosInstance.post("/auth/access-token", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    console.log("postRefreshToken 실행 response :", response);
    const newAccessToken = response.data.accessToken;
    if (!newAccessToken) {
      throw new Error("엑세스 토큰 없음");
    }

    setAuthorityCookie("accessToken", newAccessToken, 1800); // ✅ 갱신된 토큰 저장
    return true;
  } catch (error) {
    console.error("❌ 토큰 갱신 실패", error);
    throw error;
  }
};
