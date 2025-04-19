import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";
import { useToast } from "./useToast";

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (userIdx: string) => userInstance.post(`/${userIdx}/block`),
    onSuccess: () => {
      addToast("해당 유저가 차단 되었어요!", "success");
			 // 차단 리스트 갱신
      queryClient.invalidateQueries({ queryKey: ["blocked-users"] });
			//TODO: 차단후 팔로우리스트 리뷰 상세 갱신
      queryClient.invalidateQueries({ queryKey: ["followerList"] });
      queryClient.invalidateQueries({ queryKey: ["followingList"] });
      queryClient.invalidateQueries({ queryKey: ["reviewDetail"] });
    },
    onError: () => {
      addToast("차단 해제에 실패했어요. 다시 시도해주세요.", "error");
    },
  });
};
