import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminInstance, handleApiError } from "../_api/axios";
import { useToast } from "@/app/_hooks/useToast";

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (announcementIdx: number) => {
      const response = await adminInstance.delete(
        `/announcement/${announcementIdx}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcementList"] });
      addToast("공지사항이 삭제되었어요 🗑️", "success");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
