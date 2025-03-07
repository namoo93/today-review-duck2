import { Button, Icon } from ".";
import styles from "./_css/dropdown.module.css";
import dropDownIcon from "@/../../public/icon/icon-arrow.svg";

export type DropDownItemProps = {
  key: string;
  title: string;
  onClick: () => void;
};

type Props = {
  list: DropDownItemProps[];
  buttonText: string;
  width?: string;
  height?: string;
  buttonWidth?: string;
  buttonHeight?: string;
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
};
export default function DropDown({
  showDropDown,
  setShowDropDown,
  list,
  buttonText,
  width,
  height,
  buttonWidth,
  buttonHeight = "35px",
  disabled,
}: Props) {
  return (
    <div className={styles.component}>
      <Button
        width={buttonWidth}
        height={buttonHeight}
        fontSize="14px"
        borderRadius="7px"
        onClick={() => setShowDropDown(!showDropDown)}
        disabled={disabled}
        buttonType={"button"}
        transparent
      >
        <span className={"elipsis_1_lines"}>{buttonText}</span>
        <Icon
          className={`${styles.icon_position} ${
            showDropDown ? styles.icon_arrow_motion : ""
          }`}
          src={dropDownIcon}
          alt="드롭다운 아이콘"
          width={"30px"}
          height={"30px"}
        />
      </Button>
      {showDropDown && (
        <ul
          className={styles.dropdown_list}
          style={{ width: width, height: height }}
          onMouseLeave={() => setShowDropDown(false)}
        >
          {list.map((item) => (
            <li key={item.key} className={styles.list_item}>
              <span className={styles.list_item_bullets}>{item.key}</span>
              <button className={styles.button} onClick={item.onClick}>
                <span className="elipsis_1_lines">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
