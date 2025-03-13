import { useMutation } from "@tanstack/react-query";
import { authInstance } from "../api/axios";

/*
  이메일 중복 검사 API 요청 (회원가입용) Hook
 */
export const useInspectDuplicateEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await authInstance.post("/email/inspect-duplicate", {
        email,
      });
      return response.data;
    },
  });
};

/*
  가입 이메일 검사 API 요청 Hook
 */
export const useInspectEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await authInstance.post("/email/inspect", {
        email,
      });
      return response.data;
    },
  });
};
