"use client";

import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";
import { FollowerUser } from "@/types";

export const useFollowerList = (userIdx: string, size = 100, page = 1) => {
  return useQuery<FollowerUser[]>({
    queryKey: ["followerList", userIdx],
    queryFn: async () => {
      const response = await userInstance.get(`/${userIdx}/follower/all`, {
        params: { size, page },
      });
      return response.data.users;
    },
    enabled: !!userIdx,
  });
};
