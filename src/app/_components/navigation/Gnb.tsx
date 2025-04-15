"use client";

import styles from "./_css/gnb.module.css";
import { useRecoilValue } from "recoil";
import { userState } from "@/app/_recoil";

import NavItem from "./NavItem";

export default function Gnb() {
  const user = useRecoilValue(userState);

  return (
    <ul className={styles.gnb_list}>
      <NavItem label={"트랜드"} href={"/"} show={true} />
      <NavItem label={"최신"} href={"/"} show={true} />
      <NavItem label={"덕질 중"} href={"/"} show={!!user.id} />
      <NavItem label={"리뷰 작성하기"} href={"/writing"} show={!!user.id} />
      <NavItem
        label={"마이페이지"}
        href={user.id ? `/${user.id}` : "/login"}
        show={!!user.id}
      />
    </ul>
  );
}
