"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/app/_api/axios";
import { ReviewType, MyInfoType } from "@/types";

interface ReviewResponse {
  totalPage: number;
  reviews: ReviewType[];
}

interface UserResponse {
  totalPage: number;
  users: MyInfoType[];
}

export const useSearchResult = (tab: string, keyword: string, page: number) => {
  const url = tab === "게시글" ? "/review" : "/user";
  const paramName = "search"; // 공통으로 쓰이는 파라미터명
  const size = tab === "게시글" ? 10 : 50;
  return useQuery({
    queryKey: ["searchResult", tab, keyword, page],
    queryFn: async () => {
      const res = await axiosInstance.get(url, {
        params: {
          [paramName]: keyword,
          page,
          size,
        },
      });
      return res.data;
    },
    enabled: keyword.length >= 2, // 최소 2글자 이상일 때만 호출
    // keepPreviousData: true,
  });
};
