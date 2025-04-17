import { useMutation } from "@tanstack/react-query";
import { reviewInstance } from "../_api/axios";
import { ReviewSubmitPayload } from "@/types";

export const useSubmitReview = () => {
  const post = useMutation({
    mutationFn: (payload: ReviewSubmitPayload) =>
      reviewInstance.post("/", payload),
  });

  const put = useMutation({
    mutationFn: ({
      reviewIdx,
      payload,
    }: {
      reviewIdx: number;
      payload: ReviewSubmitPayload;
    }) => reviewInstance.put(`/${reviewIdx}`, payload),
  });

  return { post, put };
};
