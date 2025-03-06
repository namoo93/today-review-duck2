import { atom } from "recoil";

export type ThemeType = "light" | "dark";

export const themeState = atom<ThemeType>({
  key: "themeState",
  default: "light",
});
