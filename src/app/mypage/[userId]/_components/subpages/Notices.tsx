import { useState } from "react";
import styles from "../../_css/mypage.module.css";
import List from "@/app/_components/list/postList/List";
import DataNone from "@/app/_components/atoms/DataNone";
import Pagination from "@/app/_components/pagination/Pagination";
import { ReviewType } from "@/types";

export default function Notices() {
  const [currentPage, setCurrentPage] = useState(1);
  const noticeList: ReviewType[] = [];
  const totalPages = 1;

  return (
    <div className={styles.list_contents}>
      {noticeList.length > 0 ? (
        <ul className={styles.list_wrap}>
          {noticeList.map((review) => (
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
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          margin="20px 0"
        />
      )}
    </div>
  );
}
