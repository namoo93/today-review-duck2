import { useRouter } from "next/navigation";
import { authInstance } from "../_api/axios";
import { useMutation } from "@tanstack/react-query";
import { setAuthorityCookie } from "../_utils/cookies";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  nickname: string;
}

const loginWithGoogle = async (code: string): Promise<AuthResponse> => {
  const response = await authInstance.post<AuthResponse>("google", {
    accessToken: code,
  });
  return response.data;
};

export default function useSocialAuth() {
  const router = useRouter();
  return useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (data) => {
      console.log("로그인 성공:", data);

      // ✅ 받은 accessToken & refreshToken 저장
      setAuthorityCookie("accessToken", data.accessToken);
      setAuthorityCookie("refreshToken", data.refreshToken);

      // ✅ 로그인 후 홈으로 이동
      router.push("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
}
