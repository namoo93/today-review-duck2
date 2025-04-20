import { axiosInstance } from "./axios";

// 구글 로그인 
export const googleLogin = async (accessToken: string) => {
  const res = await axiosInstance.post("/auth/google", {
    accessToken,
  });

  return res.data;
};