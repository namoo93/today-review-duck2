"use client";
import styles from "../_css/mainlist.module.css";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";
import List from "@/app/_components/list/postList/List";
import { useState } from "react";
import { TabMenu } from "@/app/_components/tab/TabMenu";
import { ReviewType } from "@/types";

export default function MainList() {
  const [theme] = useRecoilState(themeState);
  const reviewList: ReviewType[] = [];
  const [tab, setTab] = useState("오늘");

  return (
    <section className={styles.page}>
      <TabMenu
        width="240px"
        margin="30px 0 10px -20px"
        selected={tab}
        setTabView={setTab}
        menu={["오늘", "이번주", "이번달"]}
        textOnly
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
