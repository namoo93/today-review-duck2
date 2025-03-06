"use client";

import { useRecoilState } from "recoil";
import styles from "./theme.module.css";
import { useEffect } from "react";
import { themeState, ThemeType } from "@/app/_recoil/themeAtom";
import IocModeOff from "@/../../public/icon/icon-mode-off.svg";
import IocModeOn from "@/../../public/icon/icon-mode-on.svg";
import { Icon } from "../atoms";

export default function ThemeButton() {
  const [theme, setTheme] = useRecoilState(themeState);

  // ✅ 클라이언트에서 `localStorage`에서 초기 테마 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as ThemeType | null;
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    }
  }, []);

  // ✅ 테마 변경 함수
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <div className={styles.button_wrap}>
      <button className={styles.toggle_button} onClick={toggleTheme}>
        {theme == "light" ? (
          <Icon
            src={IocModeOn}
            alt="라이트모드 버튼 아이콘"
            width={24}
            height={24}
          />
        ) : (
          <Icon
            src={IocModeOff}
            alt="다크모드 버튼 아이콘"
            width={24}
            height={24}
          />
        )}
      </button>
    </div>
  );
}
