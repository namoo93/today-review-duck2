import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";

export const useNotificationList = (page = 1, size = 10) => {
  return useQuery({
    queryKey: ["notification", page],
    queryFn: async () => {
      const res = await userInstance.get("/notification/all", {
        params: { page, size },
      });
      return res.data;
    },
  });
};
