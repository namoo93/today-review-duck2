import { userState } from "@/app/_recoil";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { authInstance, handleApiError } from "../api/axios";
import { setAuthorityCookie } from "@/app/_utils/cookies";

interface LoginParams {
  email: string;
  password: string;
  fcmToken: string;
}

const useAuth = () => {
  const [, setUser] = useRecoilState(userState);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password, fcmToken }: LoginParams) => {
      const response = await authInstance.post("/login", {
        email,
        pw: password,
        fcmToken,
      });

      // 액세스 토큰 & 리프레시 토큰을 쿠키에 저장
      setAuthorityCookie("accessToken", response.data.accessToken);
      setAuthorityCookie("refreshToken", response.data.refreshToken);

      // 로그인 성공 시 유저 nickname 상태 업데이트
      setUser({ id: response.data.nickname });

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
