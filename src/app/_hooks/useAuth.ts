"use client";
import { userState } from "@/app/_recoil";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { authInstance, handleApiError } from "../api/axios";
import { setAuthorityCookie } from "@/app/_utils/cookies";
import { getFcmToken } from "../_utils/getFcmToken";

interface LoginParams {
  email: string;
  password: string;
}

const useAuth = () => {
  const [, setUser] = useRecoilState(userState);

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
      setAuthorityCookie("refreshToken", response.data.refreshToken);
      setAuthorityCookie("nickname", response.data.nickname);
      setUser({ id: response.data.nickname });

      // console.log(
      //   " 로그인 하며 : ",
      //   response.data.nickname,
      //   response.data.accessToken,
      //   response.data.refreshToken
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
