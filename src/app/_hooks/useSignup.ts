import { useMutation } from "@tanstack/react-query";
import { userInstance } from "@/app/api/axios";

type SignupPayload = {
  email: string;
  pw: string;
  confirmPw: string;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const response = await userInstance.post("/signup", payload);
      return response.data;
    },
  });
};
