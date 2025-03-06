"use client";

import { useRecoilState } from "recoil";
import styles from "./theme.module.css";
import { useEffect } from "react";
import { themeState, ThemeType } from "@/app/_recoil/themeAtom";

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
    <button className={styles.toggleButton} onClick={toggleTheme}>
      {theme == "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
