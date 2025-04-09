"use client";

import { useQuery } from "@tanstack/react-query";
import { userInstance } from "../api/axios";
import { MyInfoType } from "@/types";

export const useMyInfo = () => {
  return useQuery<MyInfoType>({
    queryKey: ["myinfo"],
    queryFn: async () => {
      const { data } = await userInstance.get("/myinfo");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
