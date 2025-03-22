import { Icon } from "../../atoms";
import styles from "./list.module.css";

interface Props {
  width?: string;
  onClkickList?: () => void;
  alt: string;
  src: string;
  title: string;
  user: string;
  value?: string | boolean;
  contents: string;
  isManager?: string;
}

export default function List({
  width = "100%",
  alt = "게시글 이미지",
  src = "",
  title,
  user,
  value,
  contents,
  isManager,
  onClkickList,
}: Props) {
  return (
    <li className={styles.list_box} style={{ width }}>
      <button
        type="button"
        className={styles.list_button}
        onClick={onClkickList}
      >
        <Icon alt={alt} src={src} height={300} width={300} />
        {/* {isManager ? :} */}

        <span className={styles.list_info}>
          <span className={styles.list_title}>{title}</span>
          <span className={styles.list_user}>{user}</span>
          {value && <span className={styles.list_value}>{value}</span>}
          <span className={styles.list_contents}>{contents}</span>
        </span>
      </button>
    </li>
  );
}
