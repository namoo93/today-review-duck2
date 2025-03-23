import styles from "./_css/datanone.module.css";
import imgDataNone from "@/../../public/images/img-data-none.svg";
import Icon from "./Icon";

type Props = { target: string };
export default function DataNone({ target }: Props) {
  return (
    <p className={styles.data_none}>
      <Icon
        width={184}
        height={136}
        src={imgDataNone}
        alt="데이타 없음 페이지 아이콘"
        margin={"0 0 50px 0"}
      />
      <span>아직 {target}가 없어요</span>
    </p>
  );
}
