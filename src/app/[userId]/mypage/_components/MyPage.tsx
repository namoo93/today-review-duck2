"use client";
import styles from "../_css/mypage.module.css";
import Contents from "./Contents";
import SideBar from "./SideBar";

export default function MyPage() {
  return (
    <section className={styles.page}>
      <SideBar />
      <Contents />
    </section>
  );
}
