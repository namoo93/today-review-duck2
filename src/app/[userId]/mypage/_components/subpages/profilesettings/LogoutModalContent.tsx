import { useModal } from "@/app/_hooks/useModal";
import styles from "../../../_css/profilesettings.module.css";
import { Button, Icon } from "@/app/_components/atoms";
import IcoLogout from "@/../public/icon/icon-logout.svg";

export default function LogoutModalContent() {
  const { closeModal } = useModal();

  return (
    <div className={styles.modal}>
      <Icon src={IcoLogout} width={50} height={50} alt="로그아웃 모달 아이콘" />
      <strong className={styles.modal_title}>로그아웃 하시겠어요?</strong>
      <p className={styles.modal_info}>언제든 다시 로그인 할 수 있어요.</p>
      <div className={styles.button_wrap}>
        <Button buttonType="button" height="42px" onClick={() => closeModal()}>
          취소
        </Button>
        <Button
          buttonType="button"
          height="42px"
          filled
          onClick={() => closeModal()}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
