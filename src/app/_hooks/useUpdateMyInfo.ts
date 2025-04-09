"use client";

import { useMutation } from "@tanstack/react-query";
import { handleApiError, userInstance } from "../_api/axios";
import { useToast } from "./useToast";

export const useUpdateMyInfo = () => {
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({
      nickname,
      profile,
      interest,
    }: {
      nickname?: string;
      profile?: string;
      interest?: string[];
    }) => {
      const response = await userInstance.put("/myinfo", {
        nickname,
        profile,
        interest,
      });
      return response.data;
    },

    // 에러 처리
    onError: (error: any) => {
      handleApiError(error);
      const res = error?.response?.data;

      if (typeof res?.message === "string") {
        if (res.message.includes("닉네임에 사용할 수 없습니다")) {
          addToast(res.message, "error");
        } else {
          addToast("정보 수정에 실패했어요. 다시 시도해주세요.", "error");
        }
      } else if (Array.isArray(res?.message)) {
        // 배열인 경우는 제약조건 에러로 판단 (예: 관심사 글자 수)
        addToast("입력한 정보가 유효하지 않아요. 다시 확인해주세요.", "error");
      } else {
        addToast("정보 수정에 실패했어요. 다시 시도해주세요.", "error");
      }
    },
  });
};
