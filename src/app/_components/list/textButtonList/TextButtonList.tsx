import { ReactNode } from "react";
import styles from "./textbuttonlist.module.css";

interface Props {
  width?: string;
  onClkickList?: () => void;
  children: ReactNode;
}

export default function TextButtonList({
  width,
  onClkickList,
  children,
}: Props) {
  return (
    <li className={styles.item_list}>
      <button
        type="button"
        className={styles.item_button}
        style={{ width }}
        onClick={onClkickList}
      >
        {children}
      </button>
    </li>
  );
}
