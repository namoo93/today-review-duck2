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
import Pagination from "@/app/_components/pagination/Pagination";
import { useToggleFollow } from "@/app/_hooks/useToggleFollow";
import { useRouter } from "next/navigation";

export default function SideBar({
  onSelectMenu,
  selectedMenu,
}: {
  onSelectMenu: (menu: string) => void;
  selectedMenu: string;
}) {
  const router = useRouter();
  // 마이페이지 데이터
  const { data: myInfo } = useMyInfo();
  const myPostCount = myInfo?.reviewCount ?? 0;
  const followerCount = myInfo?.followerCount ?? 0;
  const followingCount = myInfo?.followingCount ?? 0;
  const myIdx = myInfo?.idx as string;
  const [currentPage, setCurrentPage] = useState(1);
  // 덕후 리스트 데이터
  const { data: followerData = { users: [], totalPage: 1 } } = useFollowerList(
    myIdx,
    20,
    currentPage
  );
  const followers = followerData.users;
  const [isFollowerDropDownOpen, setIsFollowerDropDownOpen] = useState(false);
  // 덕질 리스트 데이터
  const { data: followingData = { users: [], totalPage: 1 } } =
    useFollowingList(myIdx, 20, currentPage);
  const followings = followingData.users;
  const [isFollowingDropDownOpen, setIsFollowingDropDownOpen] = useState(false);
  const { follow, unfollow } = useToggleFollow();

  const goToMyPost = () => {
    onSelectMenu("작성한 리뷰");
  };

  const handleToggleFollow = (userIdx: string, isFollowing: boolean) => {
    if (isFollowing) {
      unfollow.mutate(userIdx);
    } else {
      follow.mutate(userIdx);
    }
  };

  const goToUserPage = (user: string) => {
    router.push(`/${user}/mypage`);
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
            onClose={() => {
              setIsFollowerDropDownOpen(false);
              setCurrentPage(1);
            }}
          >
            {followers.length === 0 ? (
              <p className={styles.empty_message}>
                아직 나를 덕질 중인 사람이 없어요 🐥
              </p>
            ) : (
              <>
                <ul className={styles.follow_list}>
                  {followers.map((user: FollowerUser) => (
                    <li key={`덕후 리스트 ${user.nickname}`}>
                      <ProfileBox
                        name={user.nickname}
                        onClickBox={() => goToUserPage(user.nickname)}
                        interest={`${user.interest1} ${user.interest2}`}
                        textWidth={"190px"}
                        isOn={user.isMyFollowing}
                        isOnText="덕질 중"
                        isOffText="덕질하기"
                        onClickButton={() =>
                          handleToggleFollow(user.idx, user.isMyFollowing)
                        }
                      />
                    </li>
                  ))}
                </ul>
                {followerData.totalPage > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={followerData.totalPage}
                    onPageChange={setCurrentPage}
                    margin="15px 20px"
                  />
                )}
              </>
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
            onClose={() => {
              setIsFollowingDropDownOpen(false);
              setCurrentPage(1);
            }}
          >
            {followings.length === 0 ? (
              <p className={styles.empty_message}>
                아직 덕질 중인 사람이 없어요 🐣
              </p>
            ) : (
              <>
                <ul className={styles.follow_list}>
                  {followings.map((user: FollowerUser) => (
                    <li key={`덕질 리스트 ${user.nickname}`}>
                      <ProfileBox
                        name={user.nickname}
                        onClickBox={() => goToUserPage(user.nickname)}
                        interest={`${user.interest1} ${user.interest2}`}
                        textWidth={"190px"}
                        isOn={user.isMyFollowing}
                        isOnText="덕질 중"
                        isOffText="덕질하기"
                        onClickButton={() =>
                          handleToggleFollow(user.idx, user.isMyFollowing)
                        }
                      />
                    </li>
                  ))}
                </ul>
                {followingData.totalPage > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={followingData.totalPage}
                    onPageChange={setCurrentPage}
                    margin="15px 20px"
                  />
                )}
              </>
            )}
          </DropDown>
        </li>
      </ul>

      {/* 네비게이션 목록 */}
      <Lnb onSelectMenu={onSelectMenu} selectedMenu={selectedMenu} />
    </div>
  );
}
