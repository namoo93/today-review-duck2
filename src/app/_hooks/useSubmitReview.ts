import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewInstance } from "../_api/axios";
import { ReviewSubmitPayload } from "@/types";

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  const post = useMutation({
    mutationFn: (payload: ReviewSubmitPayload) =>
      reviewInstance.post("/", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainReviewList"] });
      queryClient.invalidateQueries({ queryKey: ["userReviewList"] });
    },
  });

  const put = useMutation({
    mutationFn: ({
      reviewIdx,
      payload,
    }: {
      reviewIdx: number;
      payload: ReviewSubmitPayload;
    }) => reviewInstance.put(`/${reviewIdx}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainReviewList"] });
      queryClient.invalidateQueries({ queryKey: ["userReviewList"] });
    },
  });

  return { post, put };
};
