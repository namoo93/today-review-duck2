import { useMutation } from "@tanstack/react-query";
import { authInstance } from "../api/axios";

/*
  가입 이메일 검사 API 요청 Hook
 */
export const useInspectEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await authInstance.post("/email/inspect-duplicate", {
        email,
      });
      return response.data;
    },
  });
};
