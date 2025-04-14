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
    staleTime: 1000 * 60 * 10, // 10분 동안은 신선하다고 간주
    gcTime: 1000 * 60 * 60, // 1시간까지 메모리에서 유지
  });
};
