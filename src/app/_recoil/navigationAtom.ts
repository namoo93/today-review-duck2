import { atom } from "recoil";

export const activeItemState = atom<string>({
  key: "activeItemState",
  default: "최신",
});
