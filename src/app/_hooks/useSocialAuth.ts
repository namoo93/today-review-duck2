import { useRouter } from "next/navigation";
import { authInstance } from "../_api/axios";
import { useMutation } from "@tanstack/react-query";
import { setAuthorityCookie } from "../_utils/cookies";
import { useRecoilState } from "recoil";
import { activeItemState } from "../_recoil";

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
  const [, setActiveItem] = useRecoilState(activeItemState);
  const router = useRouter();
  return useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (data) => {
      console.log("로그인 성공:", data);

      // ✅ 받은 accessToken & refreshToken 저장
      setAuthorityCookie("accessToken", data.accessToken);
      setAuthorityCookie("refreshToken", data.refreshToken, 1209600); // refreshToken은 2주

      // ✅ 로그인 후 홈으로 이동
      router.push("/");
      setActiveItem("최신");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
}
