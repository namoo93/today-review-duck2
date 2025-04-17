import { useMutation } from "@tanstack/react-query";
import { reviewInstance } from "@/app/_api/axios";

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: async (reviewIdx: number) => {
      const response = await reviewInstance.delete(`/${reviewIdx}`);
      return response.data;
    },
  });
};
