"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import styles from "./fixedbutton.module.css";
import { useEffect } from "react";
import { themeState, ThemeType } from "@/app/_recoil/themeAtom";
import IocModeDark from "@/../../public/icon/icon-mode-dark.svg";
import IocWritingDark from "@/../../public/icon/icon-writing-dark.svg";
import IocModeLight from "@/../../public/icon/icon-mode-light.svg";
import IocWritingLight from "@/../../public/icon/icon-writing-light.svg";
import { Icon } from "../atoms";
import { activeItemState, userState } from "@/app/_recoil";

export default function FixedButton() {
  const [, setActiveItem] = useRecoilState(activeItemState);
  const [theme, setTheme] = useRecoilState(themeState);
  const router = useRouter();
  const user = useRecoilValue(userState);

  // 클라이언트에서 `localStorage`에서 초기 테마 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as ThemeType | null;
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    }
  }, []);

  // 테마 변경 함수
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const goToWriting = () => {
    router.push(`/writing`);
    setActiveItem("리뷰 작성하기");
  };

  return (
    <div className={styles.button_wrap}>
      <button className={styles.toggle_button} onClick={toggleTheme}>
        <Icon
          src={theme !== "light" ? IocModeLight : IocModeDark}
          alt="라이트모드 버튼 아이콘"
          width={80}
          height={80}
        />
      </button>
      {!!user.id && (
        <button className={styles.toggle_button} onClick={goToWriting}>
          <Icon
            src={theme == "light" ? IocWritingLight : IocWritingDark}
            alt="글쓰기 버튼 아이콘"
            width={80}
            height={80}
          />
        </button>
      )}
    </div>
  );
}
