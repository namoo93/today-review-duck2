import { useState } from "react";
import styles from "../../_css/mypage.module.css";
import List from "@/app/_components/list/postList/List";
import DataNone from "@/app/_components/atoms/DataNone";

import { ListTypes } from "./WrittenReviews";

export default function CommentedReviews() {
  const [reviewList, setReviewList] = useState<ListTypes[]>([]);

  return (
    <div className={styles.list_contents}>
      {reviewList.length > 0 ? (
        <ul className={styles.list_wrap}>
          {reviewList.map((review, index) => (
            <List
              key={index}
              isManager={review.isManager}
              alt={review.alt}
              src={review.src}
              title={review.title}
              user={review.user}
              value={review.value}
              contents={review.contents}
            />
          ))}
        </ul>
      ) : (
        <DataNone target={"댓글 단 리뷰"} />
      )}
    </div>
  );
}
