"use client";

import { useMutation } from "@tanstack/react-query";
import { fileInstance } from "../api/axios";

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      console.log("호출후 넘어온 파일 데이터 :", file);

      const formData = new FormData();
      formData.append("image", file);

      const response = await fileInstance.put("/profile-img", formData);
      return response.data;
    },
  });
};
