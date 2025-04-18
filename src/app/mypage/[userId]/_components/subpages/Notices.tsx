import { useState } from "react";
import styles from "../../_css/mypage.module.css";
import List from "@/app/_components/list/postList/List";
import DataNone from "@/app/_components/atoms/DataNone";
import Pagination from "@/app/_components/pagination/Pagination";
import { ReviewType } from "@/types";

export default function Notices() {
  const noticeList: ReviewType[] = [];

  return (
    <div className={styles.list_contents}>
      {noticeList.length > 0 ? (
        <ul className={styles.list_wrap}>
          {noticeList.map((review, index) => (
            <List
              key={review.idx}
              reviewIdx={review.idx}
              isManager={true}
              alt={review.title}
              src={review.thumbnail}
              title={review.title}
              user={review.user}
              value={review.score}
              contents={review.content}
              date={review.createdAt}
            />
          ))}
        </ul>
      ) : (
        <DataNone target={"올라온 공지"} />
      )}
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    </div>
  );
}
