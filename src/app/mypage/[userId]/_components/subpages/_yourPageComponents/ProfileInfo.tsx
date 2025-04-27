"use client";
import { useState } from "react";
import styles from "../../../_css/yourpage.module.css";
import { Button, DropDown, Icon } from "@/app/_components/atoms";
import ProfileBox from "@/app/_components/profile/ProfileBox";
import Pagination from "@/app/_components/pagination/Pagination";
import { FollowerUserType } from "@/types";
import { useRouter } from "next/navigation";
import { useFollowerList } from "@/app/_hooks/useFollowerList";
import { useFollowingList } from "@/app/_hooks/useFollowingList";
import { useToggleFollow } from "@/app/_hooks/useToggleFollow";
import { useRecoilValue } from "recoil";
import { myInfoState } from "@/app/_recoil/myInfoAtom";
import { useToast } from "@/app/_hooks/useToast";
import ToastContainer from "@/app/_components/toast/ToastContainer";
import { useUserInfo } from "@/app/_hooks/useUserInfo";
import LottieLoading from "@/app/_components/atoms/LottieLoading";

export default function ProfileInfo({ userIdx }: { userIdx: string }) {
  const router = useRouter();
  const myInfo = useRecoilValue(myInfoState);
  const myIdx = myInfo?.idx as string;
  const { addToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  // 덕후 리스트 데이터
  const { data: followerData = { users: [], totalPage: 1 } } = useFollowerList(
    userIdx,
    20,
    currentPage
  );
  const followers = followerData.users;
  const [isFollowerDropDownOpen, setIsFollowerDropDownOpen] = useState(false);
  // 덕질 리스트 데이터
  const { data: followingData = { users: [], totalPage: 1 } } =
    useFollowingList(userIdx, 20, currentPage);
  const followings = followingData.users;
  const [isFollowingDropDownOpen, setIsFollowingDropDownOpen] = useState(false);
  const { follow, unfollow, isPending } = useToggleFollow();

  const { data: userData } = useUserInfo(userIdx);

  const handleToggleFollow = (userIdx: string, isFollowing: boolean) => {
    if (!myIdx) {
      addToast("로그인이 필요한 서비스에요 🐥", "error");
      return;
    }

    if (isFollowing) {
      unfollow.mutate(userIdx);
    } else {
      follow.mutate(userIdx);
    }
  };

  const goToUserPage = (user: string) => {
    router.push(`/mypage/${user}`);
  };

  return (
    <div className={styles.user_info}>
      <ToastContainer
        width="335px"
        top="50px"
        right="50%"
        transform="translateX(50%)"
      />
      {userData ? (
        <div className={styles.profile_box}>
          <span className={styles.profile_img_box}>
            <Icon
              className={styles.profile_img}
              src={userData.profileImg || ""}
              width={120}
              height={120}
              alt="프로필 이미지"
            />
          </span>

          <strong
            className={styles.profile_name}
          >{`${userData.nickname}`}</strong>
          <p className={styles.profile_info}>{`${userData.profile}`}</p>
          <ul className={styles.profile_tgs}>
            <li>{userData.interest1}</li>
            <li>{userData.interest2}</li>
          </ul>

          <Button
            buttonType="button"
            width="196px"
            height="40px"
            onClick={(e) => handleToggleFollow(userIdx, userData.isMyFollowing)}
            fontSize="12px"
            filled={!userData.isMyFollowing}
            brightFilled={userData.isMyFollowing}
            disabled={isPending}
          >
            {isPending
              ? "로딩중..."
              : userData.isMyFollowing
              ? "덕질 중"
              : "덕질하기"}
          </Button>
        </div>
      ) : (
        <>
          <LottieLoading />
        </>
      )}
      {/* 통계 */}
      {userData ? (
        <ul className={styles.info_list}>
          <li>
            <strong className={styles.info_list_title}>게시글</strong>
            <span className={styles.info_list_button}>
              {`${userData.reviewCount} 개`}
            </span>
          </li>
          <li>
            <strong className={styles.info_list_title}>덕후</strong>
            <button
              className={styles.info_list_button}
              type="button"
              onClick={() => setIsFollowerDropDownOpen((prev) => !prev)}
            >
              {`${userData.followerCount} 명`}
            </button>
            <DropDown
              margin="80px 0 0 0"
              width="415px"
              position="center"
              isOpen={isFollowerDropDownOpen}
              onClose={() => setIsFollowerDropDownOpen(false)}
            >
              {followers.length === 0 ? (
                <p className={styles.empty_message}>
                  아직 덕질 하는 사람이 없어요 🐥
                </p>
              ) : (
                <>
                  <ul className={styles.follow_list}>
                    {followers.map((user: FollowerUserType) => (
                      <li key={`덕후 리스트 ${user.nickname}`}>
                        <ProfileBox
                          name={user.nickname}
                          onClickBox={() => goToUserPage(user.idx)}
                          interest={`${user.interest1 ?? ""} ${
                            user.interest2 ?? ""
                          }`}
                          textWidth={"190px"}
                          isOn={user.isMyFollowing}
                          isOnText={myIdx == user.idx ? "나" : "덕질 중"}
                          isOffText={myIdx == user.idx ? "나" : "덕질하기"}
                          onClickButton={() =>
                            handleToggleFollow(user.idx, user.isMyFollowing)
                          }
                          src={user.profileImg}
                          disabled={isPending || myIdx == user.idx}
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
            <strong className={styles.info_list_title}>덕질</strong>
            <button
              className={styles.info_list_button}
              type="button"
              onClick={() => setIsFollowingDropDownOpen((prev) => !prev)}
            >
              {`${userData.followingCount} 명`}
            </button>
            <DropDown
              margin="80px 0 0 0"
              width="415px"
              position="right"
              isOpen={isFollowingDropDownOpen}
              onClose={() => setIsFollowingDropDownOpen(false)}
            >
              {followings.length === 0 ? (
                <p className={styles.empty_message}>
                  아직 덕질 중인 사람이 없어요 🐣
                </p>
              ) : (
                <>
                  <ul className={styles.follow_list}>
                    {followings.map((user: FollowerUserType) => (
                      <li key={`덕질 리스트 ${user.nickname}`}>
                        <ProfileBox
                          name={user.nickname}
                          onClickBox={() => goToUserPage(user.idx)}
                          interest={`${user.interest1 ?? ""} ${
                            user.interest2 ?? ""
                          }`}
                          textWidth={"190px"}
                          isOn={user.isMyFollowing}
                          isOnText={myIdx == user.idx ? "나" : "덕질 중"}
                          isOffText={myIdx == user.idx ? "나" : "덕질하기"}
                          onClickButton={() =>
                            handleToggleFollow(user.idx, user.isMyFollowing)
                          }
                          src={user.profileImg}
                          disabled={isPending || myIdx == user.idx}
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
      ) : (
        <>
          {" "}
          <LottieLoading />
        </>
      )}
    </div>
  );
}
