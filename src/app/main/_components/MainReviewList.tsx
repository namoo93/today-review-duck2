"use client";

import { useEffect } from "react";
import styles from "../_css/mainlist.module.css";
import List from "@/app/_components/list/postList/List";
import { useMainReviewList } from "@/app/_hooks/useMainReviewList";
import { useInView } from "react-intersection-observer";
import { ReviewType } from "@/types";

interface Props {
  type: "high-score" | "low-score";
  timeframe?: "1D" | "7D" | "1M";
}

export default function MainReviewList({ type, timeframe }: Props) {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMainReviewList(type, timeframe);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <ul className={styles.list_wrap}>
        {data?.pages.flatMap((page: { reviews: ReviewType[] }) =>
          page.reviews.map((review: ReviewType) => (
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
          ))
        )}
      </ul>
      {isLoading || isFetchingNextPage ? <p>로딩 중...</p> : null}
      <div ref={ref} style={{ height: 1 }} />
    </>
  );
}
