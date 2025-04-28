import { useModal } from "@/app/_hooks/useModal";
import styles from "./fixedbutton.module.css";
import { Button, Icon } from "@/app/_components/atoms";
import IcoLogout from "@/../public/icon/icon-logout.svg";
import Slider from "../slider/Slider";

export default function MobileModal() {
  const { closeModal } = useModal();

  const goToMobile = () => {
    closeModal();

    const userAgent = navigator.userAgent || navigator.vendor;

    const isIOS = /iPad|iPhone|iPod/.test(userAgent);

    const url = isIOS
      ? "https://apps.apple.com/kr/app/" //TODO: 애플스토어 승인후 링크 등록
      : "https://play.google.com/store/apps/details?id=site.mylittlereviewduck";

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const items = [
    {
      img: "/images/img-slider-1.png",
      titleText: "좋은 리뷰를 공유하고 구경할 수 있어요.",
      infoText: "내가 만족한 리뷰는 라이트 모드에서",
    },
    {
      img: "/images/img-slider-2.png",
      titleText: "아쉬웠던 리뷰를 공유하고 구경해보세요.",
      infoText: "만족하지 못했던 리뷰는 다크 모드에서",
    },
    {
      img: "/images/img-slider-3.png",
      titleText: "밝은 표정의 오리는 라이트 모드로 등록돼요!",
      infoText: "귀여운 오리표정으로 선택하는 만족도",
    },
    {
      img: "/images/img-slider-4.png",
      titleText: "어두운 표정의 오리는 다크 모드로 등록돼요!",
      infoText: "귀여운 오리표정으로 선택하는 만족도",
    },
  ];

  return (
    <div className={styles.modal}>
      <Slider items={items} autoPlay centered width={375} height={338} />

      <div className={styles.modal_button_wrap}>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          filled
          onClick={goToMobile}
        >
          앱 다운로드
        </Button>
      </div>
    </div>
  );
}
