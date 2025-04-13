"use client";

import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";
import { ReviewType } from "@/types";

export const useUserReviewList = (userIdx: string, size = 10, page = 1) => {
  return useQuery<{ totalPage: number; reviews: ReviewType[] }>({
    queryKey: ["userReviewList", userIdx, page],
    queryFn: async () => {
      const response = await userInstance.get(`/${userIdx}/review/all`, {
        params: { size, page },
      });
      return response.data;
    },
    enabled: !!userIdx,
  });
};
