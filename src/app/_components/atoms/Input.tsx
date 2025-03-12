import { useState } from "react";
import styles from "./_css/input.module.css";
import Icon from "./Icon";
import IocEyeOn from "@/../../public/icon/icon-eye-on.svg";
import IocEyeOff from "@/../../public/icon/icon-eye-off.svg";

type Props = {
  label?: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string | boolean;
  subInfo?: string | boolean;
  disabled?: boolean;
  height?: string;
  padding?: string;
  showSuccess?: boolean;
};
export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  subInfo,
  disabled = false,
  showSuccess = false,
  height = "50px",
  padding,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <span className={styles.input_container} style={{ padding }}>
      {label && <label className={styles.label}>{label}</label>}

      <span
        className={`${styles.input_wrap} ${error ? styles.error : ""} ${
          disabled ? styles.disabled : ""
        }`}
        style={{ height }}
      >
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.input}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.icon_button}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Icon src={IocEyeOn} alt="비밀번호 보임 처리 아이콘" />
            ) : (
              <Icon src={IocEyeOff} alt="비밀번호 보임 처리 아이콘" />
            )}
          </button>
        )}
      </span>
      {error && <span className={styles.error_message}>{error}</span>}
      {subInfo && <span className={styles.sub_info_message}>{subInfo}</span>}
    </span>
  );
}
