import { useState } from "react";
import styles from "../../_css/mypage.module.css";
import List from "@/app/_components/list/postList/List";
import DataNone from "@/app/_components/atoms/DataNone";
import { ReviewType } from "@/types";

export default function BookmarkedReviews() {
  const reviewList: ReviewType[] = [];

  return (
    <div className={styles.list_contents}>
      {reviewList.length > 0 ? (
        <ul className={styles.list_wrap}>
          {reviewList.map((review: ReviewType) => (
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
      ) : (
        <DataNone target={"북마크 된 리뷰"} />
      )}
    </div>
  );
}
