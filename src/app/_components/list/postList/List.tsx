import { Icon } from "../../atoms";
import styles from "./list.module.css";
import ImgDefault from "@/../public/images/img-default-post.svg";
import ImgManager from "@/../public/images/img-manager.svg";
import IconLike from "@/../public/icon/icon-like-post.svg";
import IconComment from "@/../public/icon/icon-comment-post.svg";
import RatingTag from "./RatingTag";
import { useRouter } from "next/navigation";
import { formatDate } from "@/app/_utils/date";
import { category } from "@/app/_utils/ratingUtils";

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
  likeCount?: number;
  commentCount?: number;
  date: string;
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
  date,
  likeCount,
  commentCount,
}: Props) {
  const router = useRouter();
  const onClickItem = () => {
    //상세로 이동 reviewIdx
    if (reviewIdx && !isManager) {
      router.push(`/post/${reviewIdx}`);
    }

    if (onClkickList) onClkickList();
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
              height={210}
              width={210}
            />
          ) : (
            <Icon
              alt={alt}
              src={src ? src : ImgDefault}
              height={210}
              width={210}
            />
          )}
        </span>

        <span className={styles.list_info}>
          <span className={`${styles.list_title} elipsis_1_lines`}>
            {title}
          </span>
          <span className={styles.list_user}>
            {`${user.nickname} | ${formatDate(date)}`}
          </span>
          {isManager && (
            <span className={styles.review_evaluation}>{category(value)}</span>
          )}
          {!isManager && (
            <span className={styles.icon_wrap}>
              <RatingTag score={value} />
              <Icon
                alt={"좋아요 아이콘"}
                src={IconLike}
                height={20}
                width={20}
              />
              <span className={styles.count}>{likeCount}</span>
              <Icon
                alt={"댓글 아이콘"}
                src={IconComment}
                height={20}
                width={20}
              />
              <span className={styles.count}>{commentCount}</span>
            </span>
          )}
          <span className={`elipsis_3_lines ${styles.list_contents}`}>
            {contents}
          </span>
        </span>
      </button>
    </li>
  );
}
