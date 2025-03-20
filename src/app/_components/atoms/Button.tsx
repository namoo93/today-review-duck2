import { FormEvent, ReactNode } from "react";
import styles from "./_css/button.module.css";

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
  borderRadius?: string;
  border?: boolean;
  disabled?: boolean;
  filled?: boolean;
  brightFilled?: boolean;
  success?: boolean;
  warning?: boolean;
  isChecked?: boolean;
  normal?: boolean;
  inlineText?: boolean;
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
  borderRadius,
  border,
  disabled,
  filled,
  brightFilled,
  normal,
  success,
  warning,
  isChecked,
  transparent,
  inlineText,
  className,
}: Props) {
  let buttonClasses = `${styles.button} ${className}`;
  if (isChecked) buttonClasses += ` ${styles.button_checked}`;
  if (filled) buttonClasses += ` ${styles.button_filled}`;
  if (brightFilled) buttonClasses += ` ${styles.button_bright_filled}`;
  if (normal) buttonClasses += ` ${styles.button_normal}`;
  if (success && filled) buttonClasses += ` ${styles.button_success}`;
  if (warning && filled) buttonClasses += ` ${styles.button_warning}`;
  if (disabled) buttonClasses += ` ${styles.button_disabled}`;
  if (transparent) buttonClasses += ` ${styles.button_transparent}`;
  if (border) buttonClasses += ` ${styles.button_border}`;
  if (inlineText) buttonClasses += ` ${styles.button_inline_text}`;

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
        borderRadius: borderRadius ? borderRadius : undefined,
      }}
    >
      {children || text}
    </button>
  );
}
