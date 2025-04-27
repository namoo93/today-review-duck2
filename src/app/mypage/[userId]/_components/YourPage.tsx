import Pagination from "@/app/_components/pagination/Pagination";
import styles from "../_css/yourpage.module.css";
import DataNone from "@/app/_components/atoms/DataNone";
import List from "@/app/_components/list/postList/List";
import ProfileInfo from "./subpages/_yourPageComponents/ProfileInfo";
import { useMemo, useState } from "react";
import { TabMenu } from "@/app/_components/atoms";
import { useUserReviewList } from "@/app/_hooks/useUserReviewList";
import SkeletonListItem from "@/app/_components/skeleton/list/SkeletonListItem";

export default function YourPage({ userIdx }: { userIdx: string }) {
  const [tab, setTab] = useState("작성 리뷰");
  const [currentPage, setCurrentPage] = useState(1);

  // console.log("다른 유저 마이페이지 접근시/", userIdx);
  const type = useMemo(() => {
    switch (tab) {
      case "작성 리뷰":
        return "written";
      case "좋아요한 리뷰":
        return "like";
      case "북마크한 리뷰":
        return "bookmark";
      case "댓글단 리뷰":
        return "commented";
      default:
        return "written";
    }
  }, [tab]);

  const { data: reviewData = { reviews: [], totalPage: 1 }, isLoading } =
    useUserReviewList(userIdx, type, 10, currentPage);
  const totalPages = reviewData?.totalPage ?? 1;
  const reviewList = reviewData?.reviews ?? [];

  return (
    <section className={styles.page}>
      <ProfileInfo userIdx={userIdx} />
      <div className={styles.line} />
      <div className={styles.tab_wrap}>
        <TabMenu
          width="540px"
          margin="0 0 0 -35px"
          selected={tab}
          setTabView={setTab}
          menu={["작성 리뷰", "좋아요한 리뷰", "북마크한 리뷰", "댓글단 리뷰"]}
          textOnly
        />
      </div>
      <div className={styles.list_contents}>
        {reviewList.length > 0 ? (
          <ul className={styles.list_wrap}>
            {reviewList.map((review) => (
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
                date={review.createdAt}
              />
            ))}
          </ul>
        ) : (
          <>
            {isLoading ? (
              <SkeletonListItem />
            ) : (
              <DataNone target={"작성된 리뷰"} />
            )}
          </>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          margin="30px 0"
        />
      )}
    </section>
  );
}
