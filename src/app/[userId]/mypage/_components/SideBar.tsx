"use client";
import { useState } from "react";
import Lnb from "./Lnb";
import styles from "../_css/sidebar.module.css";
import { DropDown } from "@/app/_components/atoms";
import ProfileBox from "@/app/_components/profile/ProfileBox";

const list0 = [
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54ea1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54ea1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54ea1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54ea1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "a3a066c8-845a-41d5-9862-54eads1a918a29",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2 dsad dsdas sadsadas dsasda",
    interest1: "스포츠",
    interest2: "여행 dsadsa dsadsad adsa dsad sadsad sadsad sadsada",
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
  // 팔로워 리스트
  const [follower, setFollower] = useState(list0);
  const [following, setFollowing] = useState(list0);

  return (
    <div className={styles.page}>
      {/* 상단 통계 */}
      <ul className={styles.top_list}>
        <li>
          <strong className={styles.top_list_title}>게시글</strong>
          <button className={styles.top_list_button} type="button">
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
                    textWidth={"166px"}
                    isFollowing={item.isMyFollowing}
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
                    textWidth={"166px"}
                    isFollowing={item.isMyFollowing}
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
