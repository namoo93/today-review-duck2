"use client";

import { useRecoilState, useResetRecoilState } from "recoil";
import { activeItemState, userIdxState } from "@/app/_recoil";
import {
  removeAuthorityCookie,
  getAuthorityCookie,
} from "@/app/_utils/cookies";
import { axiosInstance, handleApiError } from "../_api/axios";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const [, setActiveItem] = useRecoilState(activeItemState);
  const resetUser = useResetRecoilState(userIdxState);
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
          withCredentials: true,
        }
      );

      // 쿠키 제거
      ["accessToken", "refreshToken", "nickname"].forEach((cookieName) => {
        removeAuthorityCookie(cookieName);
      });

      // 상태 초기화
      resetUser();
      setActiveItem("최신");
      // 페이지 이동
      router.push("/");
    } catch (error) {
      handleApiError(error);
    }
  };

  return logout;
};

export default useLogout;
