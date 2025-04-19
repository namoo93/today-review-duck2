import { ChangeEvent } from "react";
import styles from "./_css/textarea.module.css";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  height?: string;
  maxLength?: number;
  minLength?: number;
  errorMessage?: string | null;
};

export default function TextArea({
  name,
  label,
  placeholder,
  value,
  onChange,
  height = "100px",
  maxLength,
  minLength,
  errorMessage,
}: Props) {
  const isLimited = typeof maxLength === "number";
  const hasError = !!errorMessage;
  return (
    <div className={styles.textarea_wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={`${styles.textarea_box} ${
          !isLimited ? styles.textarea_box_filled : ""
        } ${hasError ? styles.textarea_box_error : ""}`}
      >
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          minLength={minLength}
          style={{ height }}
          className={`${styles.textarea} ${
            hasError ? styles.textarea_error : ""
          }`}
        />
        {isLimited && (
          <span className={styles.sub_info}>
            {`${value.length}/${maxLength}`}
          </span>
        )}
      </div>
      {hasError && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  );
}
