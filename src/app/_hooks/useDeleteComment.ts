import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewInstance } from "@/app/_api/axios";

export const useDeleteComment = (reviewIdx: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentIdx: number) =>
      reviewInstance.delete(`/${reviewIdx}/comment/${commentIdx}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewIdx] });
    },
  });
};
