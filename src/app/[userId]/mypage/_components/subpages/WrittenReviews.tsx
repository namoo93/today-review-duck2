import { useState } from "react";
import styles from "../../_css/mypage.module.css";
import List from "@/app/_components/list/postList/List";
import DataNone from "@/app/_components/atoms/DataNone";
import { useUserReviewList } from "@/app/_hooks/useUserReviewList";
import { useRecoilValue } from "recoil";
import { myInfoState } from "@/app/_recoil/myInfoAtom";
import { ReviewType } from "@/types";
import Pagination from "@/app/_components/pagination/Pagination";

export default function WrittenReviews() {
  const myInfo = useRecoilValue(myInfoState);
  const myIdx = myInfo?.idx as string;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: reviewData = { reviews: [], totalPage: 1 }, isLoading } =
    useUserReviewList(myIdx, 10, currentPage);

  const reviewList = reviewData.reviews;
  const totalPages = reviewData.totalPage;

  return (
    <div className={styles.list_contents}>
      {isLoading ? (
        <p>로딩 중입니다...</p>
      ) : reviewList.length > 0 ? (
        <>
          <ul className={styles.list_wrap}>
            {reviewList.map((review: ReviewType) => (
              <List
                key={review.idx}
                isManager={false} // 필요 시 조건 설정
                alt={review.title}
                src={review.thumbnail}
                title={review.title}
                user={review.user}
                value={review.score}
                contents={review.content}
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
        <DataNone target={"작성한 리뷰"} />
      )}
    </div>
  );
}
