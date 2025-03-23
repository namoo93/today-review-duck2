import { useModal } from "@/app/_hooks/useModal";
import styles from "../_css/writingform.module.css";
import { Button, Icon } from "@/app/_components/atoms";
import IcoLogout from "@/../public/icon/icon-logout.svg";
import { useRouter } from "next/navigation";

export default function IsBackModalContent() {
  const { closeModal } = useModal();
  const router = useRouter();

  const handleBack = () => {
    closeModal();
    router.back();
  };

  return (
    <div className={styles.modal}>
      <Icon src={IcoLogout} width={50} height={50} alt="로그아웃 모달 아이콘" />
      <strong className={styles.modal_title}>
        리뷰 작성을 중단하시겠어요?
      </strong>
      <p className={styles.modal_info}>
        리뷰 작성 중단시 내용이 저장되지 않습니다.
      </p>
      <div className={styles.button_wrap}>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          onClick={() => closeModal()}
        >
          아니요, 계속할래요
        </Button>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          filled
          onClick={handleBack}
        >
          네, 중단할래요
        </Button>
      </div>
    </div>
  );
}
