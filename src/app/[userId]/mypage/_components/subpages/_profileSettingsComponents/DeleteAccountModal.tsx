import { useModal } from "@/app/_hooks/useModal";
import styles from "../../../_css/profilesettings.module.css";
import { Button, Icon } from "@/app/_components/atoms";
import ImgDelete from "@/../public/images/img-delete.svg";

export default function DeleteAccountModal() {
  const { closeModal } = useModal();

  return (
    <div className={styles.modal}>
      <strong className={styles.modal_title_left}>탈퇴하시겠어요?</strong>
      <p className={styles.modal_info_left}>언제든지 기다리고 있을게요 ..</p>
      <Icon
        src={ImgDelete}
        alt="탈퇴하기 모달 이미지"
        width={315}
        height={183}
      />
      <div className={styles.button_wrap}>
        <Button buttonType="button" height="42px" onClick={() => closeModal()}>
          취소하기
        </Button>
        <Button
          buttonType="button"
          height="42px"
          filled
          onClick={() => closeModal()}
        >
          탈퇴하기
        </Button>
      </div>
    </div>
  );
}
