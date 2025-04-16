import { atom } from "recoil";

export const userIdxState = atom<string | null>({
  key: "userIdxState",
  default: null,
});
