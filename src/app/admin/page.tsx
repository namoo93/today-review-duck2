"use client";
import { useEffect, useState } from "react";
import styles from "./_css/admin.module.css";
import AdminNav from "./_components/AdminNav";
import UserListView from "./_components/UserListView";
import ImgLogo from "@/../public/images/logo.svg";
import { Icon } from "../_components/atoms";
import NoticeView from "./_components/NoticeView";
import BlacklistView from "./_components/BlacklistView";
import OpinionView from "./_components/OpinionView";
import ReportView from "./_components/ReportView";

export default function AdminPage() {
  const [current, setCurrent] = useState("notice");

  return (
    <>
      <header>
        <h1 className={styles.admin_logo}>
          <Icon src={ImgLogo} alt="로고 이미지" width={69} height={51} />
          <strong>ADMIN</strong>
          <span className="sr_only">오늘도 리뷰 관리자</span>
        </h1>
      </header>

      <AdminNav setCurrent={setCurrent} current={current} />

      <main>
        {current === "notice" && <NoticeView />}
        {current === "user_list" && <UserListView />}
        {current === "blacklist" && <BlacklistView />}
        {current === "opinion_list" && <OpinionView />}
        {current === "report" && <ReportView />}
      </main>
    </>
  );
}
