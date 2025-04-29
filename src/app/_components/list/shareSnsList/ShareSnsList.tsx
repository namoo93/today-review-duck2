import { Icon } from "../../atoms";
import styles from "./sharesnslist.module.css";
import IcoFacebook from "@/../public/icon/icon-share-facebook.svg";
import IcoKakao from "@/../public/icon/icon-share-kakao.svg";
import IcoLink from "@/../public/icon/icon-share-link.svg";
import IcoX from "@/../public/icon/icon-share-x.svg";
import { useToast } from "@/app/_hooks/useToast";
import { useEffect } from "react";

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
  const { addToast } = useToast();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY as string);
    }
  }, []);

  const handleShare = (sns: string) => {
    const currentUrl = window.location.href;

    switch (sns) {
      case "kakao":
        if (typeof window !== "undefined" && window.Kakao?.Share) {
          window.Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: "오늘도 리뷰 ✨",
              description: "나의 경험을 공유해보세요!",
              imageUrl:
                "https://mylittlereviewduck.site/_next/static/media/logo.eefef4be.svg", // 대표 이미지 URL
              link: {
                mobileWebUrl: currentUrl,
                webUrl: currentUrl,
              },
            },
            buttons: [
              {
                title: "보러가기",
                link: {
                  mobileWebUrl: currentUrl,
                  webUrl: currentUrl,
                },
              },
            ],
          });
        } else {
          alert("카카오톡 공유 준비가 안 되어 있어요.");
        }
        break;

      case "twitter":
        const twitterUrl = `https://twitter.com/intent/tweet?text=오늘도 리뷰 ✨&url=${encodeURIComponent(
          currentUrl
        )}`;
        window.open(twitterUrl, "_blank", "noopener,noreferrer");
        break;

      case "facebook":
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        window.open(facebookUrl, "_blank", "noopener,noreferrer");
        break;

      case "copy":
        navigator.clipboard
          .writeText(currentUrl)
          .then(() => addToast("링크가 복사되었습니다! 📋", "success"))
          .catch(() => addToast("복사에 실패했어요. 😢", "error"));
        break;

      default:
        break;
    }
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
