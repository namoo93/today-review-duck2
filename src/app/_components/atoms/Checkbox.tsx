import * as React from "react";
import styles from "./_css/checkbox.module.css";

type Props = {
  id: string;
  name?: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
  textMarginLeft?: number;
  checkRound?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
};

export default function Checkbox({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  textMarginLeft,
  checkRound = 0,
  fullWidth,
  disabled,
  width,
  height,
}: Props) {
  return (
    <label
      htmlFor={id}
      className={`${styles.label} ${fullWidth ? styles.fullWidth : ""}`}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.inputCheckbox}
        style={{ display: "none" }}
      />
      <span className={styles.customCheckbox}>
        {checked ? (
          <svg
            width={width || "20"}
            height={height || "20"}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="18"
              rx={checkRound}
              fill="white"
              stroke="#FF7E29"
            />
            <path
              d="M16 6.84116L8.45714 14L5 10.7189L5.88629 9.8777L8.45714 12.3117L15.1137 6L16 6.84116Z"
              fill="#FF7E29"
            />
          </svg>
        ) : (
          <svg
            width={width || "20"}
            height={height || "20"}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="18"
              rx={checkRound}
              fill="white"
              stroke="#FF7E29"
            />
          </svg>
        )}
      </span>
      <span style={{ marginLeft: textMarginLeft }}>{label}</span>
    </label>
  );
}
