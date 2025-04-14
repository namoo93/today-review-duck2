import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/app/_api/axios";
import { ReviewType } from "@/types";

type ReviewListType = "written" | "bookmark" | "like" | "commented";

export const useUserReviewList = (
  userIdx: string,
  type: ReviewListType,
  size = 10,
  page = 1
) => {
  const getApiPath = () => {
    switch (type) {
      case "written":
        return `/${userIdx}/review/all`;
      case "bookmark":
        return `/${userIdx}/review/bookmark`;
      case "like":
        return `/${userIdx}/review/like`;
      case "commented":
        return `/${userIdx}/review/commented`;
      default:
        throw new Error("리뷰 타입이 올바르지 않습니다.");
    }
  };

  return useQuery<{ totalPage: number; reviews: ReviewType[] }>({
    queryKey: ["userReviewList", userIdx, type, page],
    queryFn: async () => {
      const res = await userInstance.get(getApiPath(), {
        params: { size, page },
      });
      return res.data;
    },
    enabled: !!userIdx,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
};
