import { useModal } from "@/app/_hooks/useModal";
import styles from "../../../_css/profilesettings.module.css";
import { Button } from "@/app/_components/atoms";
import LogoutModalContent from "./LogoutModalContent";
import DeleteAccountModal from "./DeleteAccountModal";

export default function ProfileBottom() {
  const { openModal } = useModal();

  return (
    <div className={styles.profile_bottom_buttons}>
      <Button
        buttonType="button"
        onClick={() => openModal(<LogoutModalContent />)}
        inlineText
        color="#aaa"
        padding="10px 0"
      >
        로그아웃
      </Button>
      <Button
        buttonType="button"
        onClick={() => openModal(<DeleteAccountModal />)}
        inlineText
        color="#aaa"
        padding="10px 0"
      >
        회원 탈퇴
      </Button>
    </div>
  );
}
