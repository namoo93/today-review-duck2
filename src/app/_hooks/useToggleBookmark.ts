import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewInstance } from "../_api/axios";

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  const bookmark = useMutation({
    mutationFn: (reviewIdx: number) =>
      reviewInstance.post(`/${reviewIdx}/bookmark`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userReviewList"] });
    },
  });

  const unbookmark = useMutation({
    mutationFn: (reviewIdx: number) =>
      reviewInstance.delete(`/${reviewIdx}/bookmark`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userReviewList"] });
    },
  });

  const handleToggle = (reviewIdx: number, isBookmarked: boolean) => {
    if (bookmark.isPending || unbookmark.isPending) return;
    isBookmarked ? unbookmark.mutate(reviewIdx) : bookmark.mutate(reviewIdx);
  };

  return { bookmark, unbookmark, handleToggle };
};
