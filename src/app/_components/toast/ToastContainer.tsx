import { useToast } from "@/app/_hooks/useToast";
import styles from "./toast.module.css";

type ToastContainerProps = {
  width?: string;
  top?: string;
  right?: string;
  transform?: string;
};

const ToastContainer = ({
  width,
  top,
  right,
  transform,
}: ToastContainerProps) => {
  const { toasts, removeToast } = useToast();

  return (
    <span
      className={styles.toast_container}
      style={{ width, top, right, transform }}
    >
      {toasts.map((toast) => (
        <span
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </span>
      ))}
    </span>
  );
};

export default ToastContainer;
