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
  mode: "hot" | "following" | "",
  timeframe?: "1D" | "7D" | "1M"
) => {
  let url = `/${type}`; // 기본값

  switch (mode) {
    case "hot":
      url = `/${type}/hot`;
      break;
    case "following":
      url = `/${type}/following`;
      break;
    case "":
      url = `/${type}`;
      break;
  }

  return useInfiniteQuery<Response>({
    queryKey: ["mainReviewList", type, timeframe, mode],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await reviewInstance.get(url, {
        params: {
          page: pageParam,
          size: 10,
          ...(timeframe && { timeframe }),
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPage ? nextPage : undefined;
    },
    staleTime: 0, // 항상 최신 데이터가 필요하니까 바로 stale 처리
    gcTime: 1000 * 60 * 10, // 필요에 따라 10분 유지
  });
};
