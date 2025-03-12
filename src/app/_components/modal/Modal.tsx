import { useModal } from "@/app/_hooks/useModal";
import styles from "./modal.module.css";

interface ModalProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export default function Modal({
  width,
  height,
  borderRadius = "12px",
}: ModalProps) {
  const { modal, closeModal } = useModal();
  if (!modal.isOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={styles.modal}
        style={{ width, height, borderRadius }}
        onClick={(e) => e.stopPropagation()}
      >
        {modal.content}
      </div>
    </div>
  );
}
