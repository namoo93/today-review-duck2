import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewInstance } from "@/app/_api/axios";

interface EditPayload {
  commentIdx: number;
  content: string;
}

export const useEditComment = (reviewIdx: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentIdx, content }: EditPayload) =>
      reviewInstance.put(`/${reviewIdx}/comment/${commentIdx}`, {
        content,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewIdx] });
    },
  });
};
