"use client";
import { useState } from "react";
import Lnb from "./Lnb";
import styles from "../_css/sidebar.module.css";
import { DropDown } from "@/app/_components/atoms";
import ProfileBox from "@/app/_components/profile/ProfileBox";
import { useMyInfo } from "@/app/_hooks/useMyInfo";
import { useFollowerList } from "@/app/_hooks/useFollowerList";
import { useFollowingList } from "@/app/_hooks/useFollowingList";
import { FollowerUser } from "@/types";

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

export default function SideBar({
  onSelectMenu,
  selectedMenu,
}: {
  onSelectMenu: (menu: string) => void;
  selectedMenu: string;
}) {
  const { data: myInfo } = useMyInfo();
  const myPostCount = myInfo?.reviewCount ?? 0;
  const followerCount = myInfo?.followerCount ?? 0;
  const followingCount = myInfo?.followingCount ?? 0;
  const myIdx = myInfo?.idx as string;
  const { data: followers = [] } = useFollowerList(myIdx);
  const { data: followings = [] } = useFollowingList(myIdx);

  const [isFollowerDropDownOpen, setIsFollowerDropDownOpen] = useState(false);
  const [isFollowingDropDownOpen, setIsFollowingDropDownOpen] = useState(false);

  const goToMyPost = () => {
    onSelectMenu("작성한 리뷰");
  };

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
            {myPostCount}개
          </button>
        </li>
        <li>
          <strong className={styles.top_list_title}>덕후</strong>
          <button
            className={styles.top_list_button}
            type="button"
            onClick={() => setIsFollowerDropDownOpen((prev) => !prev)}
          >
            {followerCount}명
          </button>
          <DropDown
            margin="60px 0 0 0"
            width="415px"
            position="left"
            isOpen={isFollowerDropDownOpen}
            onClose={() => setIsFollowerDropDownOpen(false)}
          >
            {followers.length === 0 ? (
              <p className={styles.empty_message}>
                아직 나를 덕질 중인 사람이 없어요 🐥
              </p>
            ) : (
              <ul className={styles.follow_list}>
                {followers.map((user: FollowerUser) => (
                  <li key={`덕후 리스트 ${user.nickname}`}>
                    <ProfileBox
                      name={user.nickname}
                      interest={`${user.interest1} ${user.interest2}`}
                      textWidth={"190px"}
                      isOn={user.isMyFollowing}
                      isOnText="덕질 중"
                      isOffText="덕질하기"
                      onClickButton={() => {}}
                    />
                  </li>
                ))}
              </ul>
            )}
          </DropDown>
        </li>
        <li>
          <strong className={styles.top_list_title}>덕질</strong>
          <button
            className={styles.top_list_button}
            type="button"
            onClick={() => setIsFollowingDropDownOpen((prev) => !prev)}
          >
            {followingCount}명
          </button>
          <DropDown
            margin="60px 0 0 0"
            width="415px"
            position="left"
            isOpen={isFollowingDropDownOpen}
            onClose={() => setIsFollowingDropDownOpen(false)}
          >
            {followings.length === 0 ? (
              <p className={styles.empty_message}>
                아직 덕질 중인 사람이 없어요 🐣
              </p>
            ) : (
              <ul className={styles.follow_list}>
                {followings.map((user: FollowerUser) => (
                  <li key={`덕질 리스트 ${user.nickname}`}>
                    <ProfileBox
                      name={user.nickname}
                      interest={`${user.interest1} ${user.interest2}`}
                      textWidth={"190px"}
                      isOn={user.isMyFollowing}
                      isOnText="덕질 중"
                      isOffText="덕질하기"
                      onClickButton={() => {}}
                    />
                  </li>
                ))}
              </ul>
            )}
          </DropDown>
        </li>
      </ul>

      {/* 네비게이션 목록 */}
      <Lnb onSelectMenu={onSelectMenu} selectedMenu={selectedMenu} />
    </div>
  );
}
