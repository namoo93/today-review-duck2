"use client";
import styles from "../_css/mainlist.module.css";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";
import List from "@/app/_components/list/postList/List";
import { useState } from "react";
import { TabMenu } from "@/app/_components/tab/TabMenu";
import { ReviewType } from "@/types";

export default function SearchList() {
  const [theme] = useRecoilState(themeState);
  const reviewList: ReviewType[] = [];
  const [tab, setTab] = useState("게시글");

  return (
    <section className={styles.page}>
      <TabMenu
        width="140px"
        margin="30px 0 10px 0"
        selected={tab}
        setTabView={setTab}
        menu={["게시글", "유저"]}
      />
      <ul className={styles.list_wrap}>
        {reviewList.map((review: ReviewType) => (
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
    </section>
  );
}
