"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiError, userInstance } from "../_api/axios";
import { useToast } from "./useToast";

export const useUpdateMyInfo = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

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
      const payload: {
        nickname?: string;
        profile?: string;
        interest?: string[];
      } = {};

      if (nickname !== undefined) payload.nickname = nickname;
      if (profile !== undefined) payload.profile = profile;
      if (interest !== undefined) payload.interest = interest;

      console.log("프로필 수정 최종 요청 데이터:", payload);

      const response = await userInstance.put("/myinfo", payload);
      return response.data;
    },
    onSuccess: () => {
      // 최신 데이터 다시 요청
      queryClient.refetchQueries({ queryKey: ["myinfo"] });
    },

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
        addToast("입력한 정보가 유효하지 않아요. 다시 확인해주세요.", "error");
      } else {
        addToast("정보 수정에 실패했어요. 다시 시도해주세요.", "error");
      }
    },
  });
};
