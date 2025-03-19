import styles from "../../../_css/profilesettings.module.css";
import { Button } from "@/app/_components/atoms";

export default function ProfileForm() {
  return (
    <div className={styles.profile_form}>
      <Button
        buttonType="button"
        onClick={() => {}}
        inlineText
        color="#FFB271"
        padding="10px 0"
      >
        프로필 수정하기
      </Button>
    </div>
  );
}
