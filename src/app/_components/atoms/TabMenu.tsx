import styles from "./css/tabmenu.module.css";
// import profileDefault from '@/../../public/image/img-default-profile.svg';

export type MenuProps = {
  label: string;
  value: string;
};
type TabMenuProps = {
  menu?: MenuProps[];
  className?: string;
  selected: string;
  setTabVeiw?: (value: string) => void;
  getTabList?: (value: string) => void;
  width?: string;
  height?: string;
  margin?: string;
  onClickTab?: () => void;
  fontSize?: string;
};

type TabProps = {
  label: string;
  height?: string;
  selected: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  onClickTab?: () => void;
  fontSize?: string;
};

function Tab({
  label,
  height,
  selected,
  value,
  onChange,
  className,
  onClickTab,
  fontSize,
}: TabProps) {
  return (
    <button
      className={`${styles.tab_button} ${
        value === selected
          ? styles.tab_button_active
          : styles.tab_button_inactive
      } ${className}`}
      style={{ height: height }}
      onClick={() => {
        if (onClickTab) onClickTab();
        onChange(value);
      }}
    >
      <span
        className={`${styles.button_text} ${
          value === selected
            ? styles.button_text_active
            : styles.button_text_inactive
        } `}
        style={{ fontSize }}
      >
        {label}
      </span>
    </button>
  );
}

export function TabMenu({
  menu = [],
  className,
  selected,
  setTabVeiw,
  getTabList,
  width,
  height,
  margin,
  onClickTab,
  fontSize,
}: TabMenuProps) {
  const handleChange = (value: string) => {
    if (setTabVeiw) setTabVeiw(value);
    if (getTabList) getTabList(value);
  };

  return (
    <div
      className={styles.component}
      style={{
        width: width,
        margin: margin ? margin : "0",
      }}
    >
      {menu.map(({ label, value }: MenuProps) => (
        <Tab
          className={className}
          key={`${value}+${label}`}
          label={label}
          selected={selected}
          value={value}
          onChange={handleChange}
          height={height}
          onClickTab={onClickTab}
          fontSize={fontSize}
        />
      ))}
    </div>
  );
}
