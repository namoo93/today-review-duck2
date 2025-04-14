"use client";
import styles from "../_css/mainlist.module.css";
import { useRecoilState } from "recoil";
import { activeItemState, themeState } from "@/app/_recoil";
import { useState } from "react";
import { TabMenu } from "@/app/_components/tab/TabMenu";
import MainReviewList from "./MainReviewList";

export default function MainListBox() {
  const [activeItem] = useRecoilState(activeItemState); // "트랜드", "최신", "덕질 중"
  const [theme] = useRecoilState(themeState); // "light" or "dark"
  const [tab, setTab] = useState("오늘"); // 트렌드일 때만 사용하는 탭

  const type = theme === "light" ? "high-score" : "low-score";

  // 트렌드이면 mode는 "hot", timeframe은 탭 기준
  const mode =
    activeItem === "트랜드"
      ? "hot"
      : activeItem === "덕질 중"
      ? "following"
      : "";

  let timeframe: "1D" | "7D" | "1M" | undefined;

  if (activeItem === "트랜드") {
    switch (tab) {
      case "오늘":
        timeframe = "1D";
        break;
      case "이번주":
        timeframe = "7D";
        break;
      case "이번달":
        timeframe = "1M";
        break;
      default:
        timeframe = undefined;
    }
  } else {
    timeframe = undefined;
  }

  return (
    <section className={styles.page}>
      {activeItem == "트랜드" && (
        <TabMenu
          width="240px"
          margin="0 10px 0"
          selected={tab}
          setTabView={setTab}
          menu={["오늘", "이번주", "이번달"]}
          textOnly
        />
      )}
      <MainReviewList
        type={type}
        mode={mode}
        timeframe={timeframe}
        key={`${type}-${mode}-${timeframe}`}
      />
    </section>
  );
}
