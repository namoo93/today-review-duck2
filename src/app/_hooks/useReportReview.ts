import { useMutation } from "@tanstack/react-query";
import { handleApiError, reviewInstance } from "@/app/_api/axios";
import { useToast } from "./useToast";

type ReportReviewPayload = {
  reviewIdx: number;
  type: number;
  content: string;
};

export const useReportReview = () => {
  const { addToast } = useToast();
  return useMutation({
    mutationFn: async ({ reviewIdx, type, content }: ReportReviewPayload) => {
      const response = await reviewInstance.post(`/${reviewIdx}/report`, {
        type,
        content,
      });
      return response.data;
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
