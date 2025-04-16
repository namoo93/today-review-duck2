"use client";
import { useState } from "react";
import styles from "../_css/mypage.module.css";
import Contents from "./Contents";
import SideBar from "./SideBar";

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState("기본 프로필 설정");

  return (
    <section className={styles.page}>
      <SideBar onSelectMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      <Contents selectedMenu={selectedMenu} />
    </section>
  );
}
