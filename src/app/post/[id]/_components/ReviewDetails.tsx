"use client";
import styles from "../_css/reviewdetails.module.css";
import ReviewDetailContents from "./ReviewDetailContents";
import ReviewDetailComment from "./ReviewDetailComment";
import ReviewDetailFixedButtons from "./ReviewDetailFixedButtons";
import { useReviewDetail } from "@/app/_hooks/useReviewDetail";
import { useParams } from "next/navigation";

export default function ReviewDetails() {
  const { id } = useParams();
  const reviewIdx = Number(id);

  const { data: review, isLoading } = useReviewDetail(reviewIdx);

  if (isLoading || !review) return <p>로딩 중...</p>;

  return (
    <section className={styles.page}>
      <h3 className="sr_only">리뷰 상세 페이지</h3>
      <ReviewDetailFixedButtons review={review} />
      <ReviewDetailContents review={review} />
      <ReviewDetailComment reviewIdx={review.idx} />
    </section>
  );
}
