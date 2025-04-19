"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileInstance, handleApiError } from "../_api/axios";

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      console.log("호출후 넘어온 파일 데이터 :", file);

      const formData = new FormData();
      formData.append("image", file);

      const response = await fileInstance.put("/profile-img", formData);
      return response.data;
    },
    onSuccess: () => {
      // 최신 데이터 다시 요청
      queryClient.refetchQueries({ queryKey: ["myinfo"] });
    },
    onError: (error: any) => {
      handleApiError(error);
    },
  });
};
