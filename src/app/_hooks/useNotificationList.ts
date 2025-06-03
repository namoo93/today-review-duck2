import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";
import { useRecoilValue } from "recoil";
import { userIdxState } from "../_recoil";

export const useNotificationList = (page = 1, size = 10) => {
  const userIdx = useRecoilValue(userIdxState);

  return useQuery({
    queryKey: ["notification", page],
    queryFn: async () => {
      const res = await userInstance.get("/notification/all", {
        params: { page, size },
      });
      return res.data;
    },
    enabled: !!userIdx,
  });
};
