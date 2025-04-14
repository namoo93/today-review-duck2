"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { reviewInstance } from "@/app/_api/axios";
import { ReviewType } from "@/types";

interface Response {
  totalPage: number;
  reviews: ReviewType[];
}

export const useMainReviewList = (
  type: "high-score" | "low-score",
  timeframe?: "1D" | "7D" | "1M"
) => {
  return useInfiniteQuery<Response>({
    queryKey: ["mainReviewList", type, timeframe],
    queryFn: async ({ pageParam = 1 }) => {
      const url = timeframe ? `/${type}/hot` : `/${type}`;
      const res = await reviewInstance.get(url, {
        params: {
          page: pageParam,
          size: 10,
          ...(timeframe && { timeframe }),
        },
      });
      return res.data;
    },
    initialPageParam: 1, // ✅ 필수
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPage ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};
