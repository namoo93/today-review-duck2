"use client";

import { useResetRecoilState } from "recoil";
import { userState } from "@/app/_recoil";
import {
  removeAuthorityCookie,
  getAuthorityCookie,
} from "@/app/_utils/cookies";
import { axiosInstance, handleApiError } from "../api/axios";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const resetUser = useResetRecoilState(userState);
  const router = useRouter();

  const logout = async () => {
    try {
      const refreshToken = getAuthorityCookie("refreshToken");
      if (!refreshToken) {
        console.warn("No refreshToken found.");
      }
      console.log("refreshToken --------- ", refreshToken);
      await axiosInstance.post(
        "auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      // 쿠키 제거
      removeAuthorityCookie("accessToken");
      removeAuthorityCookie("refreshToken");
      removeAuthorityCookie("nickname");

      // 상태 초기화
      resetUser();

      // 페이지 이동
      router.push("/");
    } catch (error) {
      handleApiError(error);
    }
  };

  return logout;
};

export default useLogout;
