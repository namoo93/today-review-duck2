import * as React from "react";
import styles from "./_css/checkbox.module.css";

type Props = {
  defaultChecked?: boolean;
  id: string;
  name?: string;
  value: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  $margin?: string;
  marginLeft?: number;
  checkRound?: number; // Accepts a number for rounding
  label?: string;
  lineHeight?: number;
  fontSize?: number;
  textMarginLeft?: number;
  fullWidth?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  disabled?: boolean;
  width?: string;
  height?: string;
  readOnly?: boolean;
};

export default function Checkbox({
  defaultChecked,
  id,
  name,
  value,
  checked,
  onClick,
  onChange,
  $margin,
  marginLeft,
  label,
  lineHeight,
  fontSize,
  textMarginLeft,
  fullWidth,
  // iconWidth,
  // iconHeight,
  disabled,
  width,
  height,
  checkRound = 0,
  ...props
}: Props) {
  const componentClassName = `${styles.component} ${
    fullWidth ? styles.fullWidth : ""
  }`;
  const marginClassName = `${styles.margin} ${$margin ? styles[$margin] : ""}`;
  const marginLeftClassName = `${styles.marginLeft} ${
    marginLeft ? `styles.marginLeft-${marginLeft}` : ""
  }`;

  return (
    <span
      className={`${componentClassName} ${marginClassName} ${marginLeftClassName}`}
      onClick={() => onClick && onClick}
      {...props}
    >
      <label htmlFor={id} className={styles.label}>
        <input
          type="checkbox"
          className={styles.inputCheckbox}
          defaultChecked={defaultChecked}
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <span className="label">
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
      </label>
      {label && (
        <span style={{ marginLeft: textMarginLeft, lineHeight, fontSize }}>
          {label}
        </span>
      )}
    </span>
  );
}
