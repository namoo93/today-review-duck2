"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./_css/select.module.css";
import Icon from "./Icon";
import IocSelect from "@/../../public/icon/icon-select.svg";

export type ItemSelectProps = {
  label: string;
  value: number | string;
};

type SelectProps = {
  options: ItemSelectProps[];
  onClick?: () => void;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  defaultValue?: null | string;
  width?: string;
  height?: string;
  children?: string;
  padding?: string;
  text?: string;
  disabled?: boolean;
  $positionTop?: boolean;
  setSelectedValue?: Dispatch<
    SetStateAction<{
      label: string;
      value: number | string;
    } | null>
  >;
  errorMessage?: string | null;
  margin?: string;
};

export default function Select({
  options,
  onSelect,
  defaultValue,
  width,
  height = "40px",
  disabled,
  setSelectedValue,
  errorMessage,
  margin,
}: SelectProps) {
  const [isOptionShow, setIsOptionShow] = useState(false);
  const [selected, setSelected] = useState<ItemSelectProps>();
  const hasError = !!errorMessage;
  useEffect(() => {
    if (selected && setSelectedValue) {
      setSelectedValue(selected);
    }
  }, [selected, setSelectedValue]);

  const optionHandler = (option: ItemSelectProps) => {
    setSelected(option);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (onSelect) onSelect;
  };

  return (
    <div
      className={styles.component}
      style={{
        margin: margin ? margin : "0 0 20px 0",
      }}
    >
      <button
        type="button"
        className={`${styles.select_button} ${
          hasError ? styles.error_box : ""
        }`}
        style={{
          width: width ? width : "100%",
          height: height ? height : "30px",
        }}
        onClick={() => setIsOptionShow(true)}
      >
        <span>{selected?.label || defaultValue}</span>
        <Icon
          alt="셀렉트 버튼"
          src={IocSelect}
          width={"15px"}
          height={"15px"}
        />
      </button>
      {isOptionShow && (
        <ul
          className={styles.select_options_list}
          onMouseLeave={() => setIsOptionShow(false)}
        >
          {options?.map((el) => (
            <li key={el.label} className={`${styles.list_item}`}>
              <button
                disabled={disabled}
                value={el.label}
                onClick={() => {
                  optionHandler(el);
                }}
              >
                <span>{el.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
