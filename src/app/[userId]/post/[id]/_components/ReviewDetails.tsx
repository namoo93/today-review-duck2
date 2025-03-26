"use client";
import styles from "../_css/reviewdetails.module.css";
import IcoBack from "@/../../public/icon/icon-back.svg";
import { useRouter } from "next/navigation";
import ReviewDetailContents from "./ReviewDetailContents";
import ReviewDetailComment from "./ReviewDetailComment";
import ReviewDetailFixedButtons from "./ReviewDetailFixedButtons";

export default function ReviewDetails() {
  const router = useRouter();

  return (
    <section className={styles.page}>
      <h3 className="sr_only">리뷰 상세 페이지</h3>
      <ReviewDetailFixedButtons />
      <ReviewDetailContents />
      <ReviewDetailComment />
    </section>
  );
}
