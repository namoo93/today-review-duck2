"use client";

import { useState } from "react";
import styles from "./_css/gnb.module.css";
import Link from "next/link";

export default function Gnb() {
  const session = true; // 로그인 상태 확인
  const [activeItem, setActiveItem] = useState<string>("트랜드");

  const navItems = [
    { label: "트랜드", href: "./", show: true },
    { label: "최신", href: "./", show: true },
    { label: "덕질 중", href: "./", show: !!session }, // 로그인 시 표시
    { label: "마이페이지", href: "./", show: !!session }, // 로그인 시 표시
  ];

  return (
    <ul className={styles.gnb_list}>
      {navItems
        .filter((item) => item.show)
        .map((item) => (
          <li key={item.label}>
            <Link href={item.href} onClick={() => setActiveItem(item.label)}>
              <h2
                className={`${styles.gnb_item} ${
                  activeItem === item.label ? styles.gnb_item_on : ""
                }`}
              >
                <span>{item.label}</span>
              </h2>
            </Link>
          </li>
        ))}
    </ul>
  );
}
