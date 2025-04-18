import { useEffect, useState } from "react";
import styles from "../../_css/mypage.module.css";
import List from "@/app/_components/list/postList/List";
import DataNone from "@/app/_components/atoms/DataNone";
import Pagination from "@/app/_components/pagination/Pagination";
import { ReviewType } from "@/types";
import { useUserReviewList } from "@/app/_hooks/useUserReviewList";
import LottieLoading from "@/app/_components/atoms/LottieLoading";

interface Props {
  type: "written" | "bookmark" | "like" | "commented";
  title: string;
  userIdx: string;
}

export default function ReviewList({ type, title, userIdx }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: reviewData = { reviews: [], totalPage: 1 }, isLoading } =
    useUserReviewList(userIdx, type, 10, currentPage);

  const reviewList = reviewData?.reviews ?? [];
  const totalPages = reviewData?.totalPage ?? 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [type, userIdx]);

  return (
    <div className={styles.list_contents}>
      {isLoading ? (
        <LottieLoading />
      ) : reviewList.length > 0 ? (
        <>
          <ul className={styles.list_wrap}>
            {reviewList.map((review: ReviewType) => (
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
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              margin="20px 0"
            />
          )}
        </>
      ) : (
        <DataNone target={title} />
      )}
    </div>
  );
}
