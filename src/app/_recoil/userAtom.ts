import { atom } from "recoil";

export const userState = atom<{ id: string | null }>({
  key: "userState",
  default: { id: null }, // 기본값은 로그인하지 않은 상태
});
