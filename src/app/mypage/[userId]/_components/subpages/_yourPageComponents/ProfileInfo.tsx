import { useState } from "react";
import styles from "../../../_css/yourpage.module.css";
import { Button, DropDown, Icon } from "@/app/_components/atoms";
import ProfileBox from "@/app/_components/profile/ProfileBox";

//TODO :  must delete
export const list0 = [
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-0",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname1_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-1",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname1_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-2",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-3",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-4",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname3_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-5",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname3_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-6",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname4_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-7",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname4_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-8",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname5_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-9",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname5_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-10",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname6_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-11",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname6_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-12",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname7_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-13",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname7_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-14",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname8_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-15",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname8_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-16",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname9_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-17",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname9_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-18",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname10_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-19",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname10_1",
    interest1: "스포츠",
    interest2: "여행",
  },
];

export default function ProfileInfo() {
  const [isFollowerDropDownOpen, setIsFollowerDropDownOpen] = useState(false);
  const [isFollowingDropDownOpen, setIsFollowingDropDownOpen] = useState(false);
  const [follower, setFollower] = useState(list0);
  const [following, setFollowing] = useState(list0);
  const [user, setUser] = useState({
    image: "",
    interest1: "#요리#사진#운동#패션",
    interest2: "#러닝#코딩#게임#독서",
  });

  return (
    <div className={styles.user_info}>
      <div className={styles.profile_box}>
        <span className={styles.profile_img_box}>
          <Icon
            className={styles.profile_img}
            src={user.image || ""}
            width={120}
            height={120}
            alt="프로필 이미지"
          />
        </span>

        <strong
          className={styles.profile_name}
        >{`${`123456번째 오리`}`}</strong>
        <p
          className={styles.profile_info}
        >{`${`안녕하세요, 새로운 도전을 즐기며 꾸준히 성장하는 웹 개발자입니다. 문제 해결과 협업을 좋아해요!`}`}</p>
        <ul className={styles.profile_tgs}>
          <li>{user.interest1}</li>
          <li>{user.interest2}</li>
        </ul>
        <Button
          buttonType="button"
          filled
          width="196px"
          height="40px"
          text="덕질하기"
          onClick={() => {}}
        />
      </div>

      {/* 통계 */}
      <ul className={styles.info_list}>
        <li>
          <strong className={styles.info_list_title}>게시글</strong>
          <span className={styles.info_list_button}>999+개</span>
        </li>
        <li>
          <strong className={styles.info_list_title}>덕후</strong>
          <button
            className={styles.info_list_button}
            type="button"
            onClick={() => setIsFollowerDropDownOpen((prev) => !prev)}
          >
            482명
          </button>
          <DropDown
            margin="80px 0 0 0"
            width="415px"
            position="center"
            isOpen={isFollowerDropDownOpen}
            onClose={() => setIsFollowerDropDownOpen(false)}
          >
            <ul className={styles.follow_list}>
              {follower.map((item) => (
                <li key={`덕후 리스트 ${item.nickname}`}>
                  <ProfileBox
                    name={item.nickname}
                    interest={`${item.interest1} ${item.interest2}`}
                    textWidth={"190px"}
                    isOn={item.isMyFollowing}
                    isOnText="덕질 중"
                    isOffText="덕질하기"
                    onClickButton={() => {}}
                    src={item.profileImg}
                  />
                </li>
              ))}
            </ul>
          </DropDown>
        </li>
        <li>
          <strong className={styles.info_list_title}>덕질</strong>
          <button
            className={styles.info_list_button}
            type="button"
            onClick={() => setIsFollowingDropDownOpen((prev) => !prev)}
          >
            42명
          </button>
          <DropDown
            margin="80px 0 0 0"
            width="415px"
            position="right"
            isOpen={isFollowingDropDownOpen}
            onClose={() => setIsFollowingDropDownOpen(false)}
          >
            <ul className={styles.follow_list}>
              {following.map((item) => (
                <li key={`덕후 리스트 ${item.nickname}`}>
                  <ProfileBox
                    name={item.nickname}
                    interest={`${item.interest1} ${item.interest2}`}
                    textWidth={"190px"}
                    isOn={item.isMyFollowing}
                    isOnText="덕질 중"
                    isOffText="덕질하기"
                    onClickButton={() => {}}
                    src={item.profileImg}
                  />
                </li>
              ))}
            </ul>
          </DropDown>
        </li>
      </ul>
    </div>
  );
}
