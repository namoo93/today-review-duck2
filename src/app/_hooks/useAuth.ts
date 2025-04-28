"use client";
import { userIdxState } from "@/app/_recoil";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { authInstance, handleApiError } from "../_api/axios";
import { setAuthorityCookie } from "@/app/_utils/cookies";
import { getFcmToken } from "../_utils/getFcmToken";
import { decodeJWT } from "../_utils/jwt";

interface LoginParams {
  email: string;
  password: string;
}

const useAuth = () => {
  const setUserIdx = useSetRecoilState(userIdxState);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const fcmToken = await getFcmToken();

      console.log("로그인 시 fcm : ", fcmToken);
      const response = await authInstance.post("/login", {
        email,
        pw: password,
        fcmToken,
      });

      // 액세스 토큰 & 리프레시 토큰을 쿠키에 저장
      setAuthorityCookie("accessToken", response.data.accessToken);
      // refreshToken은 2주 (1209600초)
      setAuthorityCookie("refreshToken", response.data.refreshToken, 1209600);
      setAuthorityCookie("nickname", response.data.nickname);

      const payload = decodeJWT(response.data.accessToken);
      // console.log("디코딩 결과:", payload);

      if (payload && payload.idx) {
        setUserIdx(payload.idx);
      }

      // console.log(
      //   " 로그인 하며 : ",
      //   response.data.accessToken,
      //   payload && payload.idx
      // );

      return response.data;
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isPending: loginMutation.isPending,
  };
};

export default useAuth;
