import { useState } from "react";
import styles from "../../../_css/profilesettings.module.css";
import { Button, DropDown } from "@/app/_components/atoms";
import ShareSnsList from "@/app/_components/list/shareSnsList/ShareSnsList";

export default function ProfileInfo() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
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
      {/* sns 공유하기 드롭다운 박스 */}
      <div className={styles.dropdown_wrap}>
        <Button
          buttonType="button"
          onClick={() => setIsDropDownOpen((prev) => !prev)}
          inlineText
          color="#FFB271"
          padding="10px 0"
        >
          프로필 공유하기
        </Button>
        <DropDown
          margin="10px 0 0 110px"
          width="240px"
          position="left"
          isOpen={isDropDownOpen}
          onClose={() => setIsDropDownOpen(false)}
        >
          <ShareSnsList />
        </DropDown>
      </div>
    </div>
  );
}
