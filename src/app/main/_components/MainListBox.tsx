"use client";
import styles from "../_css/mainlist.module.css";
import { useRecoilState } from "recoil";
import { activeItemState, themeState } from "@/app/_recoil";
import { useState } from "react";
import { TabMenu } from "@/app/_components/tab/TabMenu";
import MainReviewList from "./MainReviewList";

export default function MainListBox() {
  const [activeItem] = useRecoilState(activeItemState);
  const [theme] = useRecoilState(themeState);
  const [tab, setTab] = useState("오늘");

  const type = theme === "light" ? "high-score" : "low-score";
  const isTrend = activeItem === "트랜드";

  return (
    <section className={styles.page}>
      {activeItem == "트랜드" && (
        <TabMenu
          width="240px"
          margin="0 10px -20px"
          selected={tab}
          setTabView={setTab}
          menu={["오늘", "이번주", "이번달"]}
          textOnly
        />
      )}
      <MainReviewList type={type} timeframe={isTrend ? "1D" : undefined} />
    </section>
  );
}
