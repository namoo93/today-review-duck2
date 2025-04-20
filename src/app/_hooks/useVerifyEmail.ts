import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../_api/axios";
import { AxiosError } from "axios";

/*
 이메일 인증번호 검증 API 요청 Hook
 */
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ email, code }: { email: string; code: number }) => {
      try {
        const response = await axiosInstance.post("/auth/email/verify", {
          email,
          code,
        });
        return response.data;
      } catch (error) {
        throw error as AxiosError;
      }
    },
  });
};
