"use client";

import { useMutation } from "@tanstack/react-query";
import { userInstance } from "../_api/axios";

export const useDeleteProfileImage = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await userInstance.delete("/profile-img");
      return response.data;
    },
  });
};
