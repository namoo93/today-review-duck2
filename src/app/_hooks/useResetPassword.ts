import { useMutation } from "@tanstack/react-query";
import { handleApiError, userInstance } from "@/app/_api/axios";

interface ResetPasswordPayload {
  email: string;
  pw: string;
  confirmPw: string;
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      userInstance.post("/pw/reset", payload),
    onError: (error) => {
      handleApiError(error);
    },
  });
};
