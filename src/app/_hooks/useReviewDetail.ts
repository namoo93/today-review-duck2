import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ReviewDetailType } from "@/types";
import { reviewInstance } from "../_api/axios";

export const useReviewDetail = (
  reviewIdx: number,
  options?: Partial<UseQueryOptions<ReviewDetailType>>
) => {
  return useQuery({
    queryKey: ["reviewDetail", reviewIdx],
    queryFn: async () => {
      const { data } = await reviewInstance.get<ReviewDetailType>(
        `/${reviewIdx}`
      );
      return data;
    },
    enabled: !!reviewIdx, // reviewIdx 있을 때만 실행
    ...options,
  });
};
