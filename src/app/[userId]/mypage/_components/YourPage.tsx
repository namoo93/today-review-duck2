import Pagination from "@/app/_components/pagination/Pagination";
import styles from "../_css/yourpage.module.css";
import DataNone from "@/app/_components/atoms/DataNone";
import List from "@/app/_components/list/postList/List";
import { useState } from "react";
import ProfileInfo from "./subpages/_yourPageComponents/ProfileInfo";
import { ReviewType } from "@/types";

export default function YourPage() {
  const reviewList: ReviewType[] = [];

  return (
    <section className={styles.page}>
      <ProfileInfo />
      <div className={styles.list_contents}>
        {reviewList.length > 0 ? (
          <ul className={styles.list_wrap}>
            {reviewList.map((review) => (
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
          <DataNone target={"작성된 리뷰"} />
        )}
      </div>
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    </section>
  );
}
