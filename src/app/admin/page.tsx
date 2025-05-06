"use client";
import { useEffect, useState } from "react";
import styles from "./_css/admin.module.css";
import AdminNav from "./_components/AdminNav";
import UserListView from "./_components/UserListView";
import ImgLogo from "@/../public/images/logo.svg";
import { Icon } from "../_components/atoms";
import AnnouncementView from "./_components/AnnouncementView";
import OpinionView from "./_components/OpinionView";
import ReportView from "./_components/ReportView";
import Modal from "../_components/modal/Modal";
import ToastContainer from "../_components/toast/ToastContainer";

export default function AdminPage() {
  const [current, setCurrent] = useState("announcement_list");

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
        {current === "announcement_list" && <AnnouncementView />}
        {current === "user_list" && <UserListView />}
        {current === "opinion_list" && <OpinionView />}
        {current === "report" && <ReportView />}
        <Modal width="600px" />
        <ToastContainer
          width="335px"
          top="60px"
          right="50%"
          transform="translateX(50%)"
        />
      </main>
    </>
  );
}
