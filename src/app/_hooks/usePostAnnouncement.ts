import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminInstance } from "../_api/axios";
import { AnnouncementItemType } from "@/types/AnnouncementItemType";
import { useToast } from "./useToast";

interface PostAnnouncementPayload {
  title: string;
  content: string;
  category: number;
  status: string;
	isPinned: boolean;
}

export const usePostAnnouncement = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation<
    { data: AnnouncementItemType },
    Error,
    PostAnnouncementPayload
  >({
    mutationFn: async (payload) => {
      const res = await adminInstance.post("/announcement", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcementList"] });
      addToast("공지사항이 등록되었어요!", "success");
    },
    onError: () => {
      addToast("오류가 발생했어요. 다시 시도해주세요.", "error");
    },
  });
};
