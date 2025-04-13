import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";
import { useToast } from "@/app/_hooks/useToast";

export const useUnblockUser = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (userIdx: string) => {
      await userInstance.delete(`/${userIdx}/block`);
    },
    onSuccess: () => {
      addToast("차단이 해제되었어요!", "success");
      queryClient.invalidateQueries({ queryKey: ["blocked-users"] }); // 차단 리스트 갱신
    },
    onError: () => {
      addToast("차단 해제에 실패했어요. 다시 시도해주세요.", "error");
    },
  });
};
