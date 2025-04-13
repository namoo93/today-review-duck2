"use client";

import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";
import { FollowerUserType } from "@/types";

export const useFollowerList = (userIdx: string, size = 8, page = 1) => {
  return useQuery<{ users: FollowerUserType[]; totalPage: number }>({
    queryKey: ["followerList", userIdx, size, page],
    queryFn: async () => {
      const response = await userInstance.get(`/${userIdx}/follower/all`, {
        params: { size, page },
      });
      return response.data;
    },
    enabled: !!userIdx,
  });
};
