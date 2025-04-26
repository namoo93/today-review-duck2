"use client";
import { Icon } from "@/app/_components/atoms";
import styles from "../_css/reviewdetails.module.css";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";
import { useRef, useState } from "react";
import { ReviewDetailType } from "@/types";
import { getRatingText } from "@/app/_utils/ratingUtils";
import { formatDate } from "@/app/_utils/date";
import { applyHorizontalScroll } from "@/app/_utils/applyHorizontalScroll";
import IcoArrow from "@/../../public/icon/icon-arrow-off.svg";

export default function ReviewDetailContents({
  review,
}: {
  review: ReviewDetailType;
}) {
  const [theme] = useRecoilState(themeState);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  applyHorizontalScroll(containerRef, {
    width: "calc(100% + 4px)",
    height: "320px",
  });

  const goToUserPage = (user: string) => {
    router.push(`/mypage/${user}`);
  };

  return (
    <div className={styles.review_detail_contents}>
      <strong className={styles.review_detail_title}>
        {`${review.title}`}
      </strong>
      <button
        type="button"
        onClick={() => goToUserPage(review.user.idx)}
        className={styles.review_detail_user}
      >
        <span
          className={
            theme == "light"
              ? styles.review_detail_user_icon
              : styles.review_detail_user_icon_dark
          }
        >
          <Icon
            src={review.user.profileImg || ""}
            alt={`${review.user.nickname} 프로필 이미지`}
            width={24}
            height={24}
          />
        </span>
        <span className={styles.review_detail_user_text}>
          {`${review.user.nickname} | ${formatDate(review.createdAt)}`}
        </span>
      </button>
      <div className={styles.review_detail_images}>
        {review.images && review.images.length > 0 ? (
          <div ref={containerRef}>
            <div className={styles.image_box_wrap}>
              {review.images.map((image, idx) => (
                <span key={`${image}_${idx}`} className={styles.image_box}>
                  <Icon
                    width={300}
                    height={300}
                    src={image || ""}
                    alt={review.imgContent?.[idx] || `이미지 ${idx + 1}`}
                  />
                  <span className={styles.overlay}>
                    <span className={styles.overlay_text}>
                      {review.imgContent?.[idx] || ""}
                    </span>
                  </span>
                </span>
              ))}
            </div>
            {review.images.length > 3 && (
              <span className={styles.image_box_next}>
                scroll
                <Icon
                  src={IcoArrow}
                  alt="이미지 더보기"
                  width={15}
                  height={15}
                />
              </span>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.review_detail_evaluation}>
        <span
          className={
            review.score > 2
              ? styles.review_evaluation
              : styles.review_evaluation_dark
          }
        >{`평가: ${getRatingText(review.score)}`}</span>
      </div>
      <p className={styles.review_detail_text}>{review.content}</p>
    </div>
  );
}
