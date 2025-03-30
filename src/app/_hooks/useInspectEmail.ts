import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../api/axios";

/*
  ✅ 이메일 중복 검사 API 요청 (회원가입 시 사용)
*/
export const useInspectDuplicateEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosInstance.post("/email/inspect-duplicate", {
        email,
      });
      return response.data;
    },
  });
};

/*
  ✅ 가입 이메일 검사 API 요청
*/
export const useInspectEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosInstance.post("/email/inspect", {
        email,
      });
      return response.data;
    },
  });
};
