"use client";
import { Icon } from "@/app/_components/atoms";
import styles from "../../_css/noticedetails.module.css";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { formatDate } from "@/app/_utils/date";
import IcoBack from "@/../../public/icon/icon-back.svg";
import IcoBackDark from "@/../../public/icon/icon-back-dark.svg";
import { AnnouncementItemType } from "@/types/AnnouncementItemType";
import { category } from "@/app/_utils/ratingUtils";
import LottieLoading from "@/app/_components/atoms/LottieLoading";

export default function NoticeContents({
  announcement,
  setIsOnDetail,
}: {
  announcement: AnnouncementItemType | null;
  setIsOnDetail: Dispatch<SetStateAction<boolean>>;
}) {
  const [theme] = useRecoilState(themeState);

  const handleBack = () => {
    setIsOnDetail(false);
  };

  return (
    <>
      <button type="button" className={styles.back_button} onClick={handleBack}>
        <Icon
          src={theme == "light" ? IcoBack : IcoBackDark}
          alt="공지사항 페이지 뒤로가기 버튼 아이콘"
          width={36}
          height={36}
        />
      </button>
      {!!announcement && (
        <div className={styles.review_detail_contents}>
          <strong className={styles.review_detail_title}>
            {`${announcement.title}`}
          </strong>
          <span className={styles.review_detail_user}>
            <span
              className={
                theme == "light"
                  ? styles.review_detail_user_icon
                  : styles.review_detail_user_icon_dark
              }
            >
              <Icon
                src={announcement.user.profileImg || ""}
                alt={`${announcement.user.nickname} 프로필 이미지`}
                width={24}
                height={24}
              />
            </span>
            <span className={styles.review_detail_user_text}>
              {`${announcement.user.nickname} | ${formatDate(
                announcement.createdAt
              )}`}
            </span>
          </span>
          <div className={styles.review_detail_evaluation}>
            <span className={styles.review_evaluation}>
              {category(announcement.category)}
            </span>
          </div>
          <p className={styles.review_detail_text}>{announcement.content}</p>
        </div>
      )}
      {!announcement && <LottieLoading />}
    </>
  );
}
