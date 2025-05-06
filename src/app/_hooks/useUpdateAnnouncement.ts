import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminInstance } from "../_api/axios";
import { AnnouncementItemType } from "@/types/AnnouncementItemType";
import { useToast } from "./useToast";

interface UpdateAnnouncementPayload {
  announcementIdx: number;
  title: string;
  content: string;
  category: number;
  status: string;
  isPinned: boolean;
}

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation<AnnouncementItemType, Error, UpdateAnnouncementPayload>({
    mutationFn: async ({
      announcementIdx,
      title,
      content,
      category,
      status,
      isPinned,
    }) => {
      const res = await adminInstance.put(`/announcement/${announcementIdx}`, {
        title,
        content,
        category,
        status,
        isPinned,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcementList"] });
      addToast("공지사항이 수정되었어요!", "success");
    },
    onError: () => {
      addToast("오류가 발생했어요. 다시 시도해주세요.", "error");
    },
  });
};
