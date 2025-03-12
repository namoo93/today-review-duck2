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
    <div
      className={styles.toast_container}
      style={{ width, top, right, transform }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
