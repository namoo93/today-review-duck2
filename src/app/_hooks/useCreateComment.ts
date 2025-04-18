import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewInstance } from "../_api/axios";

interface CreateCommentPayload {
  commentIdx?: number | null;
  userIdxs?: string[]; // 태그 유저 목록
  content: string;
}

export const useCreateComment = (reviewIdx: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommentPayload) =>
      reviewInstance.post(`/${reviewIdx}/comment`, payload),
    onSuccess: () => {
      // 댓글 리스트 리프레시
      queryClient.invalidateQueries({ queryKey: ["comments", reviewIdx] });
    },
  });
};
