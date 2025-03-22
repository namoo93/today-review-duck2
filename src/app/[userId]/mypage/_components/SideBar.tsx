"use client";
import { useState } from "react";
import Lnb from "./Lnb";
import styles from "../_css/sidebar.module.css";
import { DropDown } from "@/app/_components/atoms";
import ProfileBox from "@/app/_components/profile/ProfileBox";

//TODO :  must delete
const list0 = [
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

export default function SideBar({
  onSelectMenu,
  selectedMenu,
}: {
  onSelectMenu: (menu: string) => void;
  selectedMenu: string;
}) {
  const [isFollowerDropDownOpen, setIsFollowerDropDownOpen] = useState(false);
  const [isFollowingDropDownOpen, setIsFollowingDropDownOpen] = useState(false);
  const [follower, setFollower] = useState(list0);
  const [following, setFollowing] = useState(list0);

  const goToMyPost = () => {};

  return (
    <div className={styles.page}>
      {/* 상단 통계 */}
      <ul className={styles.top_list}>
        <li>
          <strong className={styles.top_list_title}>게시글</strong>
          <button
            className={styles.top_list_button}
            type="button"
            onClick={() => goToMyPost()}
          >
            10개
          </button>
        </li>
        <li>
          <strong className={styles.top_list_title}>덕후</strong>
          <button
            className={styles.top_list_button}
            type="button"
            onClick={() => setIsFollowerDropDownOpen((prev) => !prev)}
          >
            482명
          </button>
          <DropDown
            margin="60px 0 0 0"
            width="415px"
            position="left"
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
                  />
                </li>
              ))}
            </ul>
          </DropDown>
        </li>
        <li>
          <strong className={styles.top_list_title}>덕질</strong>
          <button
            className={styles.top_list_button}
            type="button"
            onClick={() => setIsFollowingDropDownOpen((prev) => !prev)}
          >
            42명
          </button>
          <DropDown
            margin="60px 0 0 0"
            width="415px"
            position="left"
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
                  />
                </li>
              ))}
            </ul>
          </DropDown>
        </li>
      </ul>

      {/* 네비게이션 목록 */}
      <Lnb onSelectMenu={onSelectMenu} selectedMenu={selectedMenu} />
    </div>
  );
}
