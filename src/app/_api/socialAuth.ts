import { serverInstance } from "./axios";

// 구글 로그인
export const googleLogin = async (accessToken: string) => {
  const res = await serverInstance.post("/auth/google", {
    accessToken,
  });

  return res.data;
};
