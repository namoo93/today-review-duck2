"use client";
import styles from "../_css/searchlist.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeState, userIdxState } from "@/app/_recoil";
import List from "@/app/_components/list/postList/List";
import { useEffect, useRef, useState } from "react";
import { TabMenu } from "@/app/_components/tab/TabMenu";
import { MyInfoType, ReviewType } from "@/types";
import { useSearchResult } from "@/app/_hooks/useSearchResult";
import Pagination from "@/app/_components/pagination/Pagination";
import DataNone from "@/app/_components/atoms/DataNone";
import { searchKeywordState } from "@/app/_recoil/searchKeywordAtom";
import ProfileBox from "@/app/_components/profile/ProfileBox";
import { useToggleFollow } from "@/app/_hooks/useToggleFollow";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/app/_hooks/useToast";
import SkeletonListItem from "@/app/_components/skeleton/list/SkeletonListItem";
import SkeletonUserItem from "@/app/_components/skeleton/userList/SkeletonUserItem";
import { applyHorizontalScroll } from "@/app/_utils/applyHorizontalScroll";

export default function SearchListBox() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addToast } = useToast();
  const theme = useRecoilValue(themeState);
  const userIdx = useRecoilValue(userIdxState);
  const keyword = useRecoilValue(searchKeywordState);
  const containerRef = useRef(null);

  const [tab, setTab] = useState("게시글");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useSearchResult(tab, keyword, currentPage);
  const { follow, unfollow } = useToggleFollow();
  const totalPages = data?.totalPage ?? 1;
  const isEmpty =
    (tab === "게시글" && data?.reviews.length === 0) ||
    (tab === "유저" && data?.users.length === 0);

  const updateFollowState = (userIdx: string, isFollowing: boolean) => {
    // 현재 캐시된 데이터 불러오기
    const currentData = queryClient.getQueryData<{
      totalPage: number;
      users: MyInfoType[];
    }>(["searchResult", tab, keyword, currentPage]);

    if (!currentData) return;

    // 유저 리스트일 경우만 업데이트
    if (tab === "유저" && "users" in currentData) {
      const updatedUsers = currentData.users.map((user: MyInfoType) =>
        user.idx === userIdx ? { ...user, isMyFollowing: !isFollowing } : user
      );

      queryClient.setQueryData(["searchResult", tab, keyword, currentPage], {
        ...currentData,
        users: updatedUsers,
      });
    }
  };

  const handleToggleFollow = (userIdx: string, isFollowing: boolean) => {
    if (!userIdx) {
      addToast("로그인이 필요한 기능이에요 🐥", "error");
      return;
    }

    if (isFollowing) {
      unfollow.mutate(userIdx);
      updateFollowState(userIdx, isFollowing);
    } else {
      follow.mutate(userIdx);
      updateFollowState(userIdx, isFollowing);
    }
  };
  const goToUserPage = (user: string) => {
    router.push(`/mypage/${user}`);
  };

  useEffect(() => {
    if (tab === "유저") {
      const cleanup = applyHorizontalScroll(containerRef, { width: "960px" });
      return cleanup;
    }
  }, [tab]);

  return (
    <section className={styles.page}>
      <TabMenu
        width="140px"
        margin="30px 0 10px 0"
        selected={tab}
        setTabView={setTab}
        onClickTab={() => {
          setCurrentPage(1);
        }}
        menu={["게시글", "유저"]}
      />
      {isLoading ? (
        <>
          {tab === "게시글" && <SkeletonListItem />}
          {tab === "유저" && (
            <>
              <SkeletonUserItem /> <SkeletonUserItem />
            </>
          )}
        </>
      ) : isEmpty ? (
        <DataNone target={`검색된 키워드' ${keyword}' 의 ${tab}(이)`} />
      ) : (
        <>
          {tab === "게시글" && (
            <div className={styles.list_box}>
              <ul className={styles.list_wrap}>
                {data?.reviews.map((review: ReviewType) => (
                  <List
                    key={review.idx}
                    reviewIdx={review.idx}
                    isManager={false}
                    alt={review.title}
                    src={review.thumbnail}
                    title={review.title}
                    user={review.user}
                    value={review.score}
                    contents={review.content}
                  />
                ))}
              </ul>
            </div>
          )}
          {tab === "유저" && (
            <div ref={containerRef} className={styles.list_box_user}>
              <ul className={styles.list_wrap_user}>
                {data?.users.map((user: MyInfoType) => (
                  <li key={`검색된 유저 리스트 ${user.nickname}`}>
                    <ProfileBox
                      name={user.nickname}
                      onClickBox={() => goToUserPage(user.idx)}
                      interest={`${user.interest1 ?? ""} ${
                        user.interest2 ?? ""
                      }`}
                      textWidth={"190px"}
                      isOn={!!user.isMyFollowing}
                      isOnText="덕질 중"
                      isOffText="덕질하기"
                      onClickButton={() =>
                        handleToggleFollow(user.idx, user.isMyFollowing)
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              margin="20px 0"
            />
          )}
        </>
      )}
    </section>
  );
}
