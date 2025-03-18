"use client";
import { useState } from "react";
import styles from "../_css/lnb.module.css";
import { Icon } from "@/app/_components/atoms";
import IcoArrowOff from "@/../public/icon/icon-arrow-off.svg";
import IcoArrowOn from "@/../public/icon/icon-arrow-on.svg";

export default function Lnb({
  onSelectMenu,
  selectedMenu,
}: {
  onSelectMenu: (menu: string) => void;
  selectedMenu: string;
}) {
  const handleSelectMenu = (title: string) => {
    onSelectMenu(title);
  };

  return (
    <nav className={styles.lnb}>
      <ul className={styles.lnb_list_wrap}>
        <li>
          <strong className={styles.lnb_list_title}>설정</strong>
          <ul className={styles.lnb_list}>
            <li>
              <button
                className={
                  selectedMenu == "기본 프로필 설정" ? `${styles.on}` : ""
                }
                onClick={() => handleSelectMenu("기본 프로필 설정")}
              >
                기본 프로필 설정
              </button>
              <Icon
                width={20}
                height={20}
                src={
                  selectedMenu == "기본 프로필 설정" ? IcoArrowOn : IcoArrowOff
                }
                alt="화살표 아이콘"
              />
            </li>
            <li>
              <button
                className={selectedMenu == "차단한 계정" ? `${styles.on}` : ""}
                onClick={() => handleSelectMenu("차단한 계정")}
              >
                차단한 계정
              </button>
              <Icon
                width={20}
                height={20}
                src={selectedMenu == "차단한 계정" ? IcoArrowOn : IcoArrowOff}
                alt="화살표 아이콘"
              />
            </li>
          </ul>
        </li>

        <li>
          <strong className={styles.lnb_list_title}>활동 정보</strong>
          <ul className={styles.lnb_list}>
            <li>
              <button
                className={selectedMenu == "작성한 리뷰" ? `${styles.on}` : ""}
                onClick={() => handleSelectMenu("작성한 리뷰")}
              >
                작성한 리뷰
              </button>
              <Icon
                width={20}
                height={20}
                src={selectedMenu == "작성한 리뷰" ? IcoArrowOn : IcoArrowOff}
                alt="화살표 아이콘"
              />
            </li>
            <li>
              <button
                className={selectedMenu == "댓글단 리뷰" ? `${styles.on}` : ""}
                onClick={() => handleSelectMenu("댓글단 리뷰")}
              >
                댓글단 리뷰
              </button>
              <Icon
                width={20}
                height={20}
                src={selectedMenu == "댓글단 리뷰" ? IcoArrowOn : IcoArrowOff}
                alt="화살표 아이콘"
              />
            </li>
            <li>
              <button
                className={
                  selectedMenu == "좋아요 누른 리뷰" ? `${styles.on}` : ""
                }
                onClick={() => handleSelectMenu("좋아요 누른 리뷰")}
              >
                좋아요 누른 리뷰
              </button>
              <Icon
                width={20}
                height={20}
                src={
                  selectedMenu == "좋아요 누른 리뷰" ? IcoArrowOn : IcoArrowOff
                }
                alt="화살표 아이콘"
              />
            </li>
            <li>
              <button
                className={
                  selectedMenu == "북마크한 리뷰" ? `${styles.on}` : ""
                }
                onClick={() => handleSelectMenu("북마크한 리뷰")}
              >
                북마크한 리뷰
              </button>
              <Icon
                width={20}
                height={20}
                src={selectedMenu == "북마크한 리뷰" ? IcoArrowOn : IcoArrowOff}
                alt="화살표 아이콘"
              />
            </li>
          </ul>
        </li>
        <li>
          <strong className={styles.lnb_list_title}>고객지원</strong>
          <ul className={styles.lnb_list}>
            <li>
              <button
                className={selectedMenu == "공지사항" ? `${styles.on}` : ""}
                onClick={() => handleSelectMenu("공지사항")}
              >
                공지사항
              </button>
              <Icon
                width={20}
                height={20}
                src={selectedMenu == "공지사항" ? IcoArrowOn : IcoArrowOff}
                alt="화살표 아이콘"
              />
            </li>
            <li>
              <button
                className={selectedMenu == "약관" ? `${styles.on}` : ""}
                onClick={() => handleSelectMenu("약관")}
              >
                약관
              </button>
              <Icon
                width={20}
                height={20}
                src={selectedMenu == "약관" ? IcoArrowOn : IcoArrowOff}
                alt="화살표 아이콘"
              />
            </li>
            <li>
              <button
                className={selectedMenu == "정책" ? `${styles.on}` : ""}
                onClick={() => handleSelectMenu("정책")}
              >
                정책
              </button>
              <Icon
                width={20}
                height={20}
                src={selectedMenu == "정책" ? IcoArrowOn : IcoArrowOff}
                alt="화살표 아이콘"
              />
            </li>
          </ul>
        </li>

        <li>
          <strong className={styles.lnb_list_title}>계정</strong>
          <ul className={styles.lnb_list}>
            <li>
              <button
                className={selectedMenu == "로그아웃" ? `${styles.on}` : ""}
                onClick={() => handleSelectMenu("로그아웃")}
              >
                로그아웃
              </button>
              <Icon
                width={20}
                height={20}
                src={selectedMenu == "로그아웃" ? IcoArrowOn : IcoArrowOff}
                alt="화살표 아이콘"
              />
            </li>
            <li>
              <button
                className={selectedMenu == "회원 탈퇴" ? `${styles.on}` : ""}
                onClick={() => handleSelectMenu("회원 탈퇴")}
              >
                회원 탈퇴
              </button>
              <Icon
                width={20}
                height={20}
                src={selectedMenu == "회원 탈퇴" ? IcoArrowOn : IcoArrowOff}
                alt="화살표 아이콘"
              />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
