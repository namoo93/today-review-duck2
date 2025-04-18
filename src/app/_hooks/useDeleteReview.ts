import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewInstance } from "@/app/_api/axios";

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewIdx: number) => {
      const response = await reviewInstance.delete(`/${reviewIdx}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainReviewList"] });
      queryClient.invalidateQueries({ queryKey: ["userReviewList"] });
    },
  });
};
