import { useRecoilState } from "recoil";
import { toastState, ToastType } from "../_recoil/toastAtom";

export const useToast = () => {
  const [toasts, setToasts] = useRecoilState(toastState);

  const addToast = (message: string, type: ToastType = "info") => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // 자동 제거 (3초 후)
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};
