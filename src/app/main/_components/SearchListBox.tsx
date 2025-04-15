"use client";
import styles from "../_css/searchlist.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeState } from "@/app/_recoil";
import List from "@/app/_components/list/postList/List";
import { useState } from "react";
import { TabMenu } from "@/app/_components/tab/TabMenu";
import { MyInfoType, ReviewType } from "@/types";
import { useSearchResult } from "@/app/_hooks/useSearchResult";
import Pagination from "@/app/_components/pagination/Pagination";
import DataNone from "@/app/_components/atoms/DataNone";
import { searchKeywordState } from "@/app/_recoil/searchKeywordAtom";
import ProfileBox from "@/app/_components/profile/ProfileBox";
import { useToggleFollow } from "@/app/_hooks/useToggleFollow";
import { useRouter } from "next/navigation";

export default function SearchListBox() {
  const router = useRouter();
  const [theme] = useRecoilState(themeState);
  const keyword = useRecoilValue(searchKeywordState);
  const [tab, setTab] = useState("게시글");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useSearchResult(tab, keyword, currentPage);
  const { follow, unfollow } = useToggleFollow();
  const totalPages = data?.totalPage ?? 1;
  const isEmpty =
    (tab === "게시글" && data?.reviews.length === 0) ||
    (tab === "유저" && data?.users.length === 0);

  const handleToggleFollow = (userIdx: string, isFollowing: boolean) => {
    if (isFollowing) {
      unfollow.mutate(userIdx);
    } else {
      follow.mutate(userIdx);
    }
  };
  const goToUserPage = (user: string) => {
    router.push(`/${user}`);
  };

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
        <p>로딩 중...</p>
      ) : isEmpty ? (
        <DataNone target={`검색된 키워드' ${keyword}' 의 ${tab}(이)`} />
      ) : (
        <>
          {tab === "게시글" && (
            <ul className={styles.list_wrap_user}>
              {data?.reviews.map((review: ReviewType) => (
                <List
                  key={review.idx}
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
          )}

          {tab === "유저" && (
            <ul className={styles.list_wrap}>
              {data?.users.map((user: MyInfoType) => (
                <li key={`검색된 유저 리스트 ${user.nickname}`}>
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
