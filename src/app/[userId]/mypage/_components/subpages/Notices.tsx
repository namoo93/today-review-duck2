import { useState } from "react";
import styles from "../../_css/mypage.module.css";
import List from "@/app/_components/list/postList/List";

import { ListTypes } from "./WrittenReviews";
import DataNone from "@/app/_components/atoms/DataNone";
import Pagination from "@/app/_components/pagination/Pagination";
//TODO: api
export const dummyListData = [
  {
    isManager: true,
    alt: "",
    src: "",
    title: "제목입니다 1",
    user: "user1 | 2024.05.01",
    value: "평가: 좋음",
    contents: "내용입니다 1. 아주 긴 설명이 여기에 들어갑니다.",
  },
  {
    isManager: true,
    alt: "",
    src: "",
    title:
      "제목입니다 2 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 ",
    user: "user2 | 2024.05.02",
    value: "평가: 보통",
    contents:
      "내용입니다 2. 두 번째 더미 텍스트입니다.1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 1wnf wnfdltkd 1줄 이상 ",
  },
  {
    isManager: true,
    alt: "",
    src: "",
    title: "제목입니다 3",
    user: "user3 | 2024.05.03",
    value: "평가: 나쁨",
    contents: "내용입니다 3. 테스트용 텍스트입니다.",
  },
];

export default function Notices() {
  const [noticeList, setNoticeList] = useState<ListTypes[]>(dummyListData);

  return (
    <div className={styles.list_contents}>
      {noticeList.length > 0 ? (
        <ul className={styles.list_wrap}>
          {noticeList.map((review, index) => (
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
        <DataNone target={"올라온 공지"} />
      )}
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    </div>
  );
}
