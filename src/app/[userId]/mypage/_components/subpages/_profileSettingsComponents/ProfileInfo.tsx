import { useState } from "react";
import styles from "../../../_css/profilesettings.module.css";
import { Button, DropDown } from "@/app/_components/atoms";
import ShareSnsList from "@/app/_components/list/shareSnsList/ShareSnsList";

export default function ProfileInfo({
  nickname,
  profile,
  interest1,
  interest2,
}: {
  nickname: string;
  profile: string | null;
  interest1: string | null;
  interest2: string | null;
}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const interest = [
    interest1 ?? "#관심사 태그도",
    interest2 ?? "#입력할 수 있어요",
  ];

  return (
    <div className={styles.profile_box}>
      <strong className={styles.profile_name}>{`${nickname}`}</strong>
      <p className={styles.profile_info}>
        {profile == null ? "한 줄 소개를 입력해보세요" : `${profile}`}
      </p>
      <ul className={styles.profile_tgs}>
        {interest.map((list) => (
          <li key={`흥미인 리스트 값${list}`}>{list}</li>
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
