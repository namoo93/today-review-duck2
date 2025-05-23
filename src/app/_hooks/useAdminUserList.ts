import { useQuery } from "@tanstack/react-query";
import { adminInstance } from "@/app/_api/axios";
import { UserInfoType } from "@/types/UserInfoType";

interface AdminUserListResponse {
  users: UserInfoType[];
  totalPage: number;
}

export const useAdminUserList = (
  status: "active" | "suspended" | "blacklist" | "" = "",
  page = 1,
  size = 10
) => {
  return useQuery<AdminUserListResponse>({
    queryKey: ["adminUserList", status, page],
    queryFn: async () => {
      const response = await adminInstance.get("/user", {
        params: { status, page, size },
      });
      return response.data;
    },
  });
};
