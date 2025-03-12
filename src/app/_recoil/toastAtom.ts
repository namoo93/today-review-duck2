import { atom } from "recoil";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export const toastState = atom<Toast[]>({
  key: "toastState",
  default: [],
});
