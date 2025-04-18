import { useQuery } from "@tanstack/react-query";
import { CommentType } from "@/types/CommentType";
import { reviewInstance } from "../_api/axios";

interface CommentListResponse {
  totalPage: number;
  comments: CommentType[];
}
export const useCommentList = (reviewIdx: number, page: number, size = 10) => {
  return useQuery<CommentListResponse>({
    queryKey: ["comments", reviewIdx, page],
    queryFn: async () => {
      const { data } = await reviewInstance.get(`/${reviewIdx}/comment/all`, {
        params: { page, size },
      });
      return data;
    },
  });
};
