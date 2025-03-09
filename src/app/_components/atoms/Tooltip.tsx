import styles from "./_css/tooltip.module.css";
import { useState } from "react";

interface TooltipProps {
  text: string;
  position?: "left" | "right" | "center"; // 툴팁 위치
  isVisible?: boolean; // 보이기 여부
  width?: string;
  margin?: string;
  children: React.ReactNode;
}

export default function Tooltip({
  text,
  position = "center",
  isVisible = false,
  width,
  margin,
  children,
}: TooltipProps) {
  const [visible] = useState(isVisible);

  // `isVisible` 값이 변경될 때 툴팁 표시
  // useEffect(() => {
  //   if (isVisible) {
  //     setVisible(true);
  //     setTimeout(() => setVisible(false), 2000); // 2초 후 자동 숨김
  //   }
  // }, [isVisible]);

  return (
    <div className={styles.tooltip_container}>
      {children}
      {visible && (
        <div
          style={{ width, margin }}
          className={`${styles.tooltip} ${styles[`tooltip_${position}`]}`}
        >
          <p className={styles.tooltip_text}>{text}</p>
          <span
            className={`${styles.tooltip_arrow} ${
              styles[`tooltip_arrow_${position}`]
            }`}
          />
        </div>
      )}
    </div>
  );
}
