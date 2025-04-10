"use client";

import { useMutation } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";

export const useWithdraw = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await userInstance.delete("/");
      return response.data;
    },
  });
};
