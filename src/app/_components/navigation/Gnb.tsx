"use client";

import styles from "./_css/gnb.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeItemState, userState } from "@/app/_recoil";
import { useRouter } from "next/navigation";

export default function Gnb() {
  const user = useRecoilValue(userState);
  const router = useRouter();
  const [activeItem, setActiveItem] = useRecoilState(activeItemState);

  const navItems = [
    { label: "트랜드", href: "/", show: true },
    { label: "최신", href: "/", show: true },
    { label: "덕질 중", href: "/", show: user.id }, // 로그인 시 표시
    { label: "리뷰 작성하기", href: "/writing", show: user.id }, // 로그인 시 표시
    {
      label: "마이페이지",
      href: user.id ? `${user.id}/mypage` : "/login",
      show: user.id,
    }, // 로그인 시 표시
  ]; // TODO : 추천하지 않는 스타일 컴포넌트를 새로 하나파는것을 추천

  const handleNavigation = (label: string, href: string) => {
    if (activeItem === label) return; // 현재 선택된 항목이면 함수 중단
    setActiveItem(label);
    router.push(href); // Next.js 페이지 이동
  };

  return (
    <ul className={styles.gnb_list}>
      {navItems
        .filter((item) => item.show)
        .map((item) => (
          <li key={item.label}>
            <button
              onClick={() => handleNavigation(item.label, item.href)}
              disabled={activeItem === item.label} // 현재 선택된 항목이면 비활성화
            >
              <h2
                className={`${styles.gnb_item} ${
                  activeItem === item.label ? styles.gnb_item_on : ""
                }`}
              >
                <span>{item.label}</span>
              </h2>
            </button>
          </li>
        ))}
    </ul>
  );
}
