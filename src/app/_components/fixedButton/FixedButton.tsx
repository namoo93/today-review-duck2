"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import styles from "./fixedbutton.module.css";
import { useEffect } from "react";
import { themeState, ThemeType } from "@/app/_recoil/themeAtom";
import IocModeDark from "@/../../public/icon/icon-mode-dark.svg";
import IocModeLight from "@/../../public/icon/icon-mode-light.svg";
import IocMobileDark from "@/../../public/icon/icon-mobile-dark.svg";
import IocMobileLight from "@/../../public/icon/icon-mobile-light.svg";
import { Icon } from "../atoms";

export default function FixedButton() {
  const [theme, setTheme] = useRecoilState(themeState);

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

  const goToMobile = () => {
    //
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

      <button className={styles.toggle_button} onClick={goToMobile}>
        <span className={styles.icon_wrap}>
          <Icon
            src={theme == "light" ? IocMobileLight : IocMobileDark}
            alt="모바일 안내 팝업 버튼 아이콘"
            width={32}
            height={32}
          />
        </span>
      </button>
    </div>
  );
}
