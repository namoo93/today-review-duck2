import styles from "./profilebox.module.css";
import Icon from "../atoms/Icon";
import { Button } from "../atoms";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";

type Props = {
  src?: string | null | undefined;
  width?: string | number;
  height?: string | number;
  iconWidth?: string | number;
  iconHeight?: string | number;
  onClickBox?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
  interest?: string;
  textWidth?: string | number;
  isOn?: boolean;
  isOnText?: string;
  isOffText?: string;
  disabled: boolean;
};
export default function ProfileBox({
  src,
  width = "100%",
  height,
  iconWidth,
  iconHeight,
  onClickBox,
  onClickButton,
  name,
  interest,
  textWidth,
  isOn,
  isOnText,
  isOffText,
  disabled,
}: Props) {
  const [theme] = useRecoilState(themeState);

  return (
    <div className={styles.box_wrap}>
      <button
        className={styles.profile_box}
        style={{ width: width, height: height }}
        onClick={onClickBox}
      >
        <span
          className={theme == "light" ? styles.avatar : styles.avatar_dark}
          style={{ width: iconWidth, height: iconHeight }}
        >
          <Icon
            width={iconWidth ? iconWidth : 50}
            height={iconHeight ? iconHeight : 50}
            src={src ? src : ""}
            alt={"프로필 이미지"}
          />
        </span>
        <span className={styles.profile_info}>
          <span className={styles.name} style={{ width: textWidth }}>
            {name}
          </span>
          {interest && (
            <span className={styles.interest} style={{ width: textWidth }}>
              {interest}
            </span>
          )}
        </span>
      </button>
      <span className={styles.button_wrap}>
        {isOn ? (
          <Button
            buttonType="button"
            width="74px"
            height="34px"
            onClick={onClickButton}
            fontSize="12px"
            brightFilled
            disabled={disabled}
          >
            {isOnText}
          </Button>
        ) : (
          <Button
            buttonType="button"
            width="74px"
            height="34px"
            onClick={onClickButton}
            fontSize="12px"
            filled
            disabled={disabled}
          >
            {isOffText}
          </Button>
        )}
      </span>
    </div>
  );
}
