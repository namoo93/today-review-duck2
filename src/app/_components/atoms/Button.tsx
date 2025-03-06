import { ReactNode } from "react";
import styles from "./css/button.module.css";

type Props = {
  buttonType: "button" | "submit" | "reset";
  children?: ReactNode;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  color?: string;
  $borderRadius?: string;
  $border?: boolean;
  disabled?: boolean;
  filled?: boolean;
  success?: boolean;
  warning?: boolean;
  isChecked?: boolean;
  normal?: boolean;
  transparent?: boolean;
  className?: string;
};

export default function Button({
  children,
  text,
  buttonType = "button",
  onClick,
  onKeyDown,
  padding,
  margin,
  width,
  height,
  fontSize,
  color,
  $borderRadius,
  // $border,
  disabled,
  filled,
  normal,
  success,
  warning,
  isChecked,
  transparent,
  className,
}: Props) {
  let buttonClasses = `${styles.button} ${className}`;
  if (isChecked) buttonClasses += ` ${styles.button_checked}`;
  if (filled) buttonClasses += ` ${styles.button_filled}`;
  if (normal) buttonClasses += ` ${styles.button_normal}`;
  if (success && filled) buttonClasses += ` ${styles.button_success}`;
  if (warning && filled) buttonClasses += ` ${styles.button_warning}`;
  if (disabled) buttonClasses += ` ${styles.button_disabled}`;
  if (transparent) buttonClasses += ` ${styles.button_transparent}`;
  return (
    <button
      className={buttonClasses}
      type={buttonType}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      style={{
        padding: padding ? padding : undefined,
        margin: margin ? margin : undefined,
        width: width ? width : undefined,
        height: height ? height : undefined,
        fontSize: fontSize ? fontSize : undefined,
        color: color ? color : undefined,
        borderRadius: $borderRadius ? $borderRadius : undefined,
      }}
    >
      {children || text}
    </button>
  );
}
