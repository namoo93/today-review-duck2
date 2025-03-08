import { atom } from "recoil";

export const onSearchPageState = atom<boolean>({
  key: "onSearchPageState",
  default: false,
});
