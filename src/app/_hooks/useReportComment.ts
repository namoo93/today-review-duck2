import { useMutation } from "@tanstack/react-query";
import { commentInstance } from "@/app/_api/axios";
import { useToast } from "./useToast";

interface ReportPayload {
  commentIdx: number;
  content: string;
  type: number;
}

export const useReportComment = () => {
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({ commentIdx, content, type }: ReportPayload) =>
      commentInstance.post(`/${commentIdx}/report`, {
        content,
        type,
      }),
    onSuccess: () => {
      addToast("댓글이 신고 되었어요!", "success");
    },
  });
};
