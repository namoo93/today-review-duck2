"use client";

import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";
import { BlockedUser } from "@/types";

type UseBlockedUserListParams = {
  size?: number;
  page?: number;
};

export const useBlockedUserList = ({
  size = 100,
  page = 1,
}: {
  size: number;
  page: number;
}) => {
  return useQuery<{ users: BlockedUser[]; totalPage: number }>({
    queryKey: ["blocked-users", size, page],
    queryFn: async () => {
      const res = await userInstance.get("/blocked-user/all", {
        params: { size, page },
      });
      return {
        users: res.data.users,
        totalPage: res.data.totalPage,
      };
    },
  });
};
