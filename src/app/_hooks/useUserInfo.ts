import { UserInfoType } from "@/types/UserInfoType";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, userInstance } from "../_api/axios";

export const useUserInfo = (userIdx: string, myIdx?: string) => {
  return useQuery<UserInfoType>({
    queryKey: ["userInfo", userIdx],
    queryFn: async () => {
      if (myIdx) {
        const res = await userInstance.get(`/${userIdx}/info`); // 로그인 상태면 userInstance 사용
        return res.data;
      } else {
        const res = await axiosInstance.get(`/user/${userIdx}/info`); // 비로그인 상태면 원래대로
        return res.data;
      }
    },
    enabled: !!userIdx, // userIdx가 있을 때만 호출
    // staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
