import React, { SetStateAction } from "react";
import styles from "./tabmenu.module.css";

type TabMenuProps = {
  menu?: string[];
  className?: string;
  selected: string;
  setTabView?: React.Dispatch<SetStateAction<string>>;
  getTabList?: (value: string) => void;
  width?: string;
  height?: string;
  margin?: string;
  onClickTab?: () => void;
  fontSize?: string;
  textOnly?: boolean;
  lineOnly?: boolean;
};

type TabProps = {
  label: string;
  height?: string;
  selected: string;
  onChange: (value: string) => void;
  className?: string;
  onClickTab?: () => void;
  fontSize?: string;
  textOnly?: boolean;
  lineOnly?: boolean;
};

function Tab({
  label,
  height,
  selected,
  onChange,
  className,
  onClickTab,
  fontSize,
  textOnly = false,
  lineOnly = false,
}: TabProps) {
  return (
    <button
      className={`${styles.tab_button} ${
        label === selected
          ? lineOnly
            ? styles.line_only_active
            : textOnly
            ? styles.text_only_active
            : styles.tab_button_active
          : lineOnly
          ? styles.line_only_inactive
          : textOnly
          ? styles.text_only_inactive
          : styles.tab_button_inactive
      } ${className || ""}`}
      style={{ height, fontSize }}
      onClick={() => {
        if (onClickTab) onClickTab();
        onChange(label);
      }}
    >
      <span className={styles.button_text}>{label}</span>
    </button>
  );
}

export function TabMenu({
  menu = [],
  className,
  selected,
  setTabView,
  getTabList,
  width,
  height,
  margin,
  onClickTab,
  fontSize,
  textOnly = false,
  lineOnly = false,
}: TabMenuProps) {
  const handleChange = (value: string) => {
    setTabView?.(value);
    getTabList?.(value);
  };
  return (
    <div className={styles.component} style={{ width, margin }}>
      {menu.map((label) => (
        <Tab
          key={label}
          label={label}
          selected={selected}
          onChange={handleChange}
          className={className}
          height={height}
          onClickTab={onClickTab}
          fontSize={fontSize}
          textOnly={textOnly}
          lineOnly={lineOnly}
        />
      ))}
    </div>
  );
}
