"use client";

import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";
import { FollowerUser } from "@/types";

export const useFollowingList = (userIdx: string, size = 8, page = 1) => {
  return useQuery<{ users: FollowerUser[]; totalPage: number }>({
    queryKey: ["followingList", userIdx, size, page],
    queryFn: async () => {
      const response = await userInstance.get(`/${userIdx}/following/all`, {
        params: { size, page },
      });
      return response.data;
    },
    enabled: !!userIdx,
  });
};
