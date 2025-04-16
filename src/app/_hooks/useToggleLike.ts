import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewInstance } from "../_api/axios";

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  const like = useMutation({
    mutationFn: (reviewIdx: number) =>
      reviewInstance.post(`/${reviewIdx}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userReviewList"] });
    },
  });

  const unlike = useMutation({
    mutationFn: (reviewIdx: number) =>
      reviewInstance.delete(`/${reviewIdx}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userReviewList"] });
    },
  });

  const handleToggle = (reviewIdx: number, isLiked: boolean) => {
    if (like.isPending || unlike.isPending) return;
    isLiked ? unlike.mutate(reviewIdx) : like.mutate(reviewIdx);
  };

  return { like, unlike, handleToggle };
};
