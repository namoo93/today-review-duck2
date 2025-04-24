import { ReactNode, useState } from "react";
import styles from "./notificationlist.module.css";
import { NotificationType } from "@/types/NotificationType";
import { formatDate } from "@/app/_utils/date";
import { Button, Icon } from "../../atoms";
import ImgDefault from "@/../public/images/img-default-post.svg";
import { useRouter } from "next/navigation";
import { useToggleFollow } from "@/app/_hooks/useToggleFollow";

interface Props {
  item: NotificationType;
  onFollowChange?: (senderIdx: string, isNowFollowing: boolean) => void;
}

export default function NotificationList({ item, onFollowChange }: Props) {
  const router = useRouter();
  const { follow, unfollow } = useToggleFollow();
  const [isLoading, setIsLoading] = useState(false);

  const goToUserPage = (user: string) => {
    router.push(`/mypage/${user}`);
  };
  const handleToggleFollow = (
    e: React.MouseEvent<HTMLButtonElement>,
    userIdx: string,
    isFollowing: boolean
  ) => {
    e.stopPropagation();
    setIsLoading(true);

    const onSuccess = () => {
      if (onFollowChange) {
        onFollowChange(userIdx, !isFollowing);
      }
      setIsLoading(false);
    };

    const onError = () => {
      setIsLoading(false); // 실패 시도 리셋
    };

    if (isFollowing) {
      unfollow.mutate(userIdx, { onSuccess, onError });
    } else {
      follow.mutate(userIdx, { onSuccess, onError });
    }
  };

  return (
    <li key={`알람 ${item.commentIdx}`} className={styles.notification_item}>
      {item.type == "follow_user" && (
        <button
          type="button"
          className={styles.item_button}
          onClick={() => goToUserPage(item.sender.idx)}
        >
          <span className={styles.item_profile_wrap}>
            <Icon
              src={item.sender.profileImg ? item.sender.profileImg : ImgDefault}
              alt={"알람 프로필 이미지"}
              width={40}
              height={40}
            />
          </span>
          <span className={styles.contents_wrap}>
            <span className={styles.contents}>{item.content}</span>
            <span className={styles.contents_date}>
              {formatDate(item.createdAt)}
            </span>
          </span>
          <Button
            buttonType="button"
            width="74px"
            height="34px"
            onClick={(e) =>
              handleToggleFollow(e, item.sender.idx, item.sender.isMyFollowing)
            }
            fontSize="12px"
            filled={!item.sender.isMyFollowing}
            brightFilled={item.sender.isMyFollowing}
            disabled={isLoading}
          >
            {isLoading
              ? "로딩중..."
              : item.sender.isMyFollowing
              ? "덕질 중"
              : "덕질하기"}
          </Button>
        </button>
      )}
      {item.type == "like_review" && (
        <button type="button" className={styles.item_button} onClick={() => {}}>
          <Icon
            src={item.sender.profileImg ? item.sender.profileImg : ImgDefault}
            alt={"알람 프로필 이미지"}
            width={40}
            height={40}
          />
          <p>{item.content}</p>
          <span>{formatDate(item.createdAt)}</span>
        </button>
      )}
      {item.type == "create_comment" && (
        <button type="button" className={styles.item_button} onClick={() => {}}>
          <p>{item.content}</p>
          <span>{formatDate(item.createdAt)}</span>
        </button>
      )}
      {item.type == "like_comment" && (
        <button type="button" className={styles.item_button} onClick={() => {}}>
          <Icon
            src={item.sender.profileImg ? item.sender.profileImg : ImgDefault}
            alt={"알람 프로필 이미지"}
            width={40}
            height={40}
          />
          <p>{item.content}</p>
          <span>{formatDate(item.createdAt)}</span>
        </button>
      )}
      {item.type == "reply_comment" && (
        <button type="button" className={styles.item_button} onClick={() => {}}>
          <Icon
            src={item.sender.profileImg ? item.sender.profileImg : ImgDefault}
            alt={"알람 프로필 이미지"}
            width={40}
            height={40}
          />
          <p>{item.content}</p>
          <span>{formatDate(item.createdAt)}</span>
        </button>
      )}
      {item.type == "admin_notice" && (
        <button type="button" className={styles.item_button} onClick={() => {}}>
          <Icon
            src={item.sender.profileImg ? item.sender.profileImg : ImgDefault}
            alt={"알람 프로필 이미지"}
            width={40}
            height={40}
          />
          <p>{item.content}</p>
          <span>{formatDate(item.createdAt)}</span>
        </button>
      )}
    </li>
  );
}
