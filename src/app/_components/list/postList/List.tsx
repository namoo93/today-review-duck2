import { Icon } from "../../atoms";
import styles from "./list.module.css";
import ImgDefault from "@/../public/images/img-default-post.svg";
import ImgManager from "@/../public/images/img-manager.svg";
import RatingTag from "./RatingTag";
import { useRouter } from "next/navigation";

interface Props {
  width?: string;
  onClkickList?: () => void;
  alt?: string;
  src: string | null;
  title?: string;
  user: {
    idx: string;
    email: string;
    nickname: string;
    profileImg: string | null;
    interest1: string | null;
    interest2: string | null;
  };
  value: number;
  contents?: string;
  isManager?: boolean;
  reviewIdx?: number;
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
  reviewIdx,
}: Props) {
  const router = useRouter();
  const onClickItem = () => {
    //상세로 이동 reviewIdx
    if (reviewIdx) {
      router.push(`/post/${reviewIdx}`);
    }
    if (!!onClkickList) onClkickList;
  };
  return (
    <li className={styles.list_box} style={{ width }}>
      <button
        type="button"
        className={styles.list_button}
        onClick={onClickItem}
      >
        <span className={styles.list_img}>
          {isManager ? (
            <Icon
              alt={alt}
              src={src ? src : ImgManager}
              height={300}
              width={300}
            />
          ) : (
            <Icon
              alt={alt}
              src={src ? src : ImgDefault}
              height={300}
              width={300}
            />
          )}
        </span>

        <span className={styles.list_info}>
          <span className={`${styles.list_title} elipsis_1_lines`}>
            {title}
          </span>
          <span className={styles.list_user}>{user.nickname}</span>
          {!isManager && <RatingTag score={value} />}
          <span className={`elipsis_5_lines ${styles.list_contents}`}>
            {contents}
          </span>
        </span>
      </button>
    </li>
  );
}
