import { UserInfoType } from "@/types/UserInfoType";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../_api/axios";

export const useUserInfo = (userIdx: string) => {
  return useQuery<UserInfoType>({
    queryKey: ["userInfo", userIdx],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user/${userIdx}/info`);
      return res.data;
    },
    enabled: !!userIdx, // userIdx가 있을 때만 호출
    // staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
