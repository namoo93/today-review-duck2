"use client";
import styles from "../_css/reviewdetails.module.css";
import ReviewDetailContents from "./ReviewDetailContents";
import ReviewDetailComment from "./ReviewDetailComment";
import ReviewDetailFixedButtons from "./ReviewDetailFixedButtons";
import { useReviewDetail } from "@/app/_hooks/useReviewDetail";
import { useParams } from "next/navigation";
import SkeletonItem from "@/app/_components/skeleton/detail/SkeletonItem";
import { useEffect, useState } from "react";
import { ReviewDetailType } from "@/types";

export default function ReviewDetails() {
  const { id } = useParams();
  const reviewIdx = Number(id);

  const { data: fetchedReview, isLoading } = useReviewDetail(reviewIdx);
  const [review, setReview] = useState<ReviewDetailType | null>(null);

  useEffect(() => {
    if (fetchedReview) {
      setReview(fetchedReview);
    }
  }, [fetchedReview]);

  if (isLoading || !review)
    return (
      <section className={styles.page}>
        <SkeletonItem />
      </section>
    );

  return (
    <section className={styles.page}>
      <h3 className="sr_only">리뷰 상세 페이지</h3>
      <ReviewDetailFixedButtons review={review} setReview={setReview} />
      <ReviewDetailContents review={review} />
      <ReviewDetailComment
        reviewIdx={review.idx}
        commentCount={review.commentCount}
      />
    </section>
  );
}
