import { useState } from "react";
import styles from "./_css/input.module.css";
import Icon from "./Icon";
import IocEyeOn from "@/../../public/icon/icon-eye-on.svg";
import IocEyeOff from "@/../../public/icon/icon-eye-off.svg";

type Props = {
  label?: string;
  type?: "text" | "email" | "password";
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string | boolean;
  subInfo?: string | boolean;
  disabled?: boolean;
  height?: string;
  width?: string;
  padding?: string;
  success?: string | boolean;
  important?: boolean;
  lineStyle?: boolean;
  maxLength?: number;
  minLength?: number;
};
export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  subInfo,
  disabled = false,
  success,
  height = "50px",
  width = "100%",
  padding,
  important,
  lineStyle,
  maxLength,
  minLength,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <span className={styles.input_container} style={{ padding, width }}>
      {label && (
        <label className={styles.label}>
          {label}
          {important && <span className={styles.important}>*</span>}
        </label>
      )}
      <span
        className={`${lineStyle ? styles.input_line_wrap : styles.input_wrap} ${
          error ? styles.error : ""
        } ${disabled ? styles.disabled : ""}`}
        style={{ height }}
      >
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.input}
          maxLength={maxLength}
          minLength={minLength}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.icon_button}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Icon
                src={IocEyeOn}
                alt="비밀번호 보임 처리 아이콘"
                width={20}
                height={20}
              />
            ) : (
              <Icon
                src={IocEyeOff}
                alt="비밀번호 보임 처리 아이콘"
                width={20}
                height={20}
              />
            )}
          </button>
        )}
      </span>
      {error && <span className={styles.error_message}>{error}</span>}
      {subInfo && <span className={styles.sub_info_message}>{subInfo}</span>}
      {success && <span className={styles.success_message}>{success}</span>}
    </span>
  );
}
