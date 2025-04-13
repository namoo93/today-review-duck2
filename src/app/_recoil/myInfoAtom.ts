import { atom } from "recoil";
import { MyInfoType } from "@/types";

export const myInfoState = atom<MyInfoType | null>({
  key: "myInfoState",
  default: null,
});
