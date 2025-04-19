import { useMutation } from "@tanstack/react-query";
import { commentInstance, handleApiError } from "@/app/_api/axios";

interface ReportPayload {
  commentIdx: number;
  content: string;
  type: number;
}

export const useReportComment = () => {
  return useMutation({
    mutationFn: ({ commentIdx, content, type }: ReportPayload) =>
      commentInstance.post(`/${commentIdx}/report`, {
        content,
        type,
      }),
    onError: (error) => {
      handleApiError(error);
    },
  });
};
