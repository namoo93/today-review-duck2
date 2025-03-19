import styles from "../../../_css/profilesettings.module.css";
import { Button } from "@/app/_components/atoms";

export default function ProfileInfo() {
  const tags = ["dsa", "dsa"];

  return (
    <div className={styles.profile_box}>
      <strong className={styles.profile_name}>{`${`N번째 오리`}`}</strong>
      <p className={styles.profile_info}>{`${`한 줄 소개를 입력해보세요`}`}</p>
      <ul className={styles.profile_tgs}>
        {tags.map((tag) => (
          <li>#{tag}</li>
        ))}
      </ul>
      <Button
        buttonType="button"
        onClick={() => {}}
        inlineText
        color="#FFB271"
        padding="10px 0"
      >
        프로필 공유하기
      </Button>
    </div>
  );
}
