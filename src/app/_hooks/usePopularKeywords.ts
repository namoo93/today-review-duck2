"use client";

import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";

interface KeywordItem {
  rank: number;
  keyword: string;
  status: "up" | "down" | "equal" | "new";
}

interface Response {
  keywords: KeywordItem[];
}

export const usePopularKeywords = () => {
  return useQuery<Response>({
    queryKey: ["popularKeywords"],
    queryFn: async () => {
      const res = await userInstance.get("/search/hot");
      return res.data;
    },
    staleTime: 1000 * 60 * 30, // 30분 간 캐싱
  });
};
