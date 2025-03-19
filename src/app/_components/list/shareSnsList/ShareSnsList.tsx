import { Icon } from "../../atoms";
import styles from "./sharesnslist.module.css";
import IcoFacebook from "@/../public/icon/icon-share-facebook.svg";
import IcoKakao from "@/../public/icon/icon-share-kakao.svg";
import IcoLink from "@/../public/icon/icon-share-link.svg";
import IcoX from "@/../public/icon/icon-share-x.svg";

const snsList = [
  {
    id: "kakao",
    label: "카카오톡",
    iconSrc: IcoKakao,
    alt: "카카오톡 아이콘",
  },
  { id: "twitter", label: "X", iconSrc: IcoX, alt: "X 아이콘" },
  {
    id: "facebook",
    label: "페이스북",
    iconSrc: IcoFacebook,
    alt: "페이스북 아이콘",
  },
  { id: "copy", label: "링크 복사", iconSrc: IcoLink, alt: "링크복사 아이콘" },
];

export default function ShareSnsList() {
  const handleShare = (sns: string) => {
    console.log(sns);
  };
  return (
    <ul className={styles.share_sns_list}>
      {snsList.map((sns) => (
        <li key={sns.id}>
          <button
            type="button"
            className={styles.sns_item_button}
            onClick={() => handleShare(sns.id)}
          >
            <Icon src={sns.iconSrc} alt={sns.alt} width={30} height={30} />

            <span className={styles.sns_label}>{sns.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
