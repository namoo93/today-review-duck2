"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../_css/mainlist.module.css";
import List from "@/app/_components/list/postList/List";
import { useMainReviewList } from "@/app/_hooks/useMainReviewList";
import { useInView } from "react-intersection-observer";
import { ReviewType } from "@/types";
import DataNone from "@/app/_components/atoms/DataNone";

import SkeletonItem from "@/app/_components/skeleton/list/SkeletonItem";

interface Props {
  type: "high-score" | "low-score";
  timeframe?: "1D" | "7D" | "1M";
  mode: "hot" | "following" | "";
}

export default function MainReviewList({ type, mode, timeframe }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMainReviewList(type, mode, timeframe);

  const { ref, inView } = useInView({
    threshold: 0.5, // 요소의 절반 이상이 보여야 true
  });

  useEffect(() => {
    setHasMounted(true); // 페이지 진입시 호출 제한
  }, []);

  useEffect(() => {
    if (hasMounted && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasMounted, inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const uniqueReviews = useMemo(() => {
    const allReviews = data?.pages.flatMap((page) => page.reviews) ?? [];
    const uniqueMap = new Map<number, ReviewType>();

    allReviews.forEach((review) => {
      if (!uniqueMap.has(review.idx)) {
        uniqueMap.set(review.idx, review);
      }
    });

    return Array.from(uniqueMap.values());
  }, [data]);

  return (
    <>
      {isLoading ? (
        <SkeletonItem />
      ) : uniqueReviews.length === 0 ? (
        <DataNone target="리뷰" />
      ) : (
        <>
          <ul className={styles.list_wrap}>
            {uniqueReviews.map((review) => (
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
          {isFetchingNextPage && <SkeletonItem />}
          <div ref={ref} style={{ height: 1, marginTop: "200px" }} />
        </>
      )}
    </>
  );
}
