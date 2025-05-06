import { AnnouncementItemType } from "@/types/AnnouncementItemType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminInstance } from "../_api/axios";

export interface AnnouncementListType {
  totalPage: number;
  announcements: AnnouncementItemType[];
}

export const useAnnouncementList = (
  page: number,
  size: number = 10,
  status: string = "published"
) => {
  const queryClient = useQueryClient();

  return useQuery<AnnouncementListType>({
    queryKey: ["announcementList", page, status],
    queryFn: async () => {
      const res = await adminInstance.get("/announcement", {
        params: {
          page,
          size,
          status: status || undefined,
        },
      });
      return res.data;
    },
    // placeholderData: () => // 이전 데이터 사용하여 깜박임 방지
    //   queryClient.getQueryData<AnnouncementListType>([
    //     "announcementList",
    //     page - 1,
    //     status,
    //   ]) ?? {
    //     totalPage: 0,
    //     announcements: [],
    //   },
  });
};
