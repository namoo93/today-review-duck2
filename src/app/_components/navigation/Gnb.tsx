"use client";

import styles from "./_css/gnb.module.css";
import { useRecoilValue } from "recoil";
import { userIdxState } from "@/app/_recoil";

import NavItem from "./NavItem";

export default function Gnb() {
  const userIdx = useRecoilValue(userIdxState);

  return (
    <ul className={styles.gnb_list}>
      <NavItem label={"최신"} href={"/"} show={true} />
      <NavItem label={"트랜드"} href={"/"} show={true} />
      <NavItem label={"덕질 중"} href={"/following"} show={!!userIdx?.length} />
      <NavItem
        label={"리뷰 작성하기"}
        href={"/writing"}
        show={!!userIdx?.length}
      />
      <NavItem
        label={"마이페이지"}
        href={userIdx?.length ? `/mypage/${userIdx}` : "/login"}
        show={!!userIdx?.length}
      />
    </ul>
  );
}
