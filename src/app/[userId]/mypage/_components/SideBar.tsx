"use client";
import { useState } from "react";
import Lnb from "./Lnb";
import styles from "../_css/sidebar.module.css";

export default function SideBar({
  onSelectMenu,
  selectedMenu,
}: {
  onSelectMenu: (menu: string) => void;
  selectedMenu: string;
}) {
  return (
    <div className={styles.page}>
      {/* 상단 통계 */}
      <ul className={styles.top_list}>
        <li>
          <strong className={styles.top_list_title}>게시글</strong>
          <button
            className={styles.top_list_button}
            type="button"
            onClick={() => {}}
          >
            10개
          </button>
        </li>
        <li>
          <strong className={styles.top_list_title}>덕후</strong>
          <button
            className={styles.top_list_button}
            type="button"
            onClick={() => {}}
          >
            482명
          </button>
        </li>
        <li>
          <strong className={styles.top_list_title}>덕질</strong>
          <button
            className={styles.top_list_button}
            type="button"
            onClick={() => {}}
          >
            42명
          </button>
        </li>
      </ul>

      {/* 네비게이션 목록 */}
      <Lnb onSelectMenu={onSelectMenu} selectedMenu={selectedMenu} />
    </div>
  );
}
