"use client";
import React, { useEffect, useState } from "react";
import styles from "./css/select.module.css";
import Icon from "./Icon";
import IocSelect from "@/../../public/icon/icon-select.svg";

export type ItemSelectProps = {
  id?: string | number;
  label?: string;
  value?: string | number;
};

type SelectProps = {
  options?: ItemSelectProps[];
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
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Select({
  options,
  onSelect,
  defaultValue,
  width,
  height = "40px",
  disabled,
  setSelectedValue,
}: SelectProps) {
  const [isOptionShow, setIsOptionShow] = useState(false);
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    selectHandler();
  }, [selected]);
  const selectHandler = () => {
    if (setSelectedValue !== undefined && selected) {
      setSelectedValue(selected);
    }
  };

  const optionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.value);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (onSelect) onSelect;
  };

  return (
    <div className={styles.component}>
      <button
        type="button"
        className={styles.select_button}
        style={{
          width: width ? width : "100%",
          height: height ? height : "30px",
        }}
        onClick={() => setIsOptionShow(true)}
      >
        <span>{selected || defaultValue}</span>
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
          style={{ width: "65px" }}
          onMouseLeave={() => setIsOptionShow(false)}
        >
          {options?.map((el, idx) => (
            <li
              key={el.id}
              className={`${styles.list_item} ${
                idx === 0 && styles.first_list_item
              } ${idx === options.length - 1 ? styles.last_list_item : ""}`}
            >
              <button
                disabled={disabled}
                value={el.label}
                onClick={(e) => {
                  optionHandler(e);
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
