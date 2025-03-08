"use client";
import styles from "../_css/banner.module.css";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";

import BannerSearch from "./BannerSearch";

export default function Banner() {
  const [theme] = useRecoilState(themeState);

  return (
    <section className={styles.page}>
      <div
        className={`${styles.banner_wrap} ${
          theme == "light" ? styles.wrap_light : styles.wrap_dark
        }`}
      >
        <h3 className={styles.banner_title}>
          오늘도 리뷰에서 시작하는 <br />
          모든 것에 대한 리뷰
        </h3>
        <p className={styles.banner_title_sub}>
          나의 이야기가 정보가 되는 곳 <br />
          여러분의 일상, 취미 모든 것을 자유롭게 공유해주세요!
        </p>

        <BannerSearch />
      </div>
    </section>
  );
}
