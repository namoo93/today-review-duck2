"use client";
import styles from "../_css/banner.module.css";
import ImgStar from "@/../../public/images/img-banner-star.svg";
import ImgStarDark from "@/../../public/images/img-banner-star-dark.svg";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil/themeAtom";
import { Icon, Search } from "@/app/_components/atoms";
// import Link from "next/link";

export default function Banner() {
  const [theme] = useRecoilState(themeState);

  return (
    <section className={styles.page}>
      <div
        className={`${styles.banner_wrap} ${
          theme == "light" ? styles.wrap_light : styles.wrap_dark
        }`}
      >
        <div className={styles.banner_text_wrap}>
          <h3 className={styles.banner_title}>
            오늘도 리뷰에서 시작하는 <br />
            모든 것에 대한 리뷰
          </h3>
          <p className={styles.banner_title_sub}>
            나의 이야기가 정보가 되는 곳 <br />
            여러분의 일상, 취미 모든 것을 자유롭게 공유해주세요!
          </p>
        </div>

        <div className={styles.search_bar_wrap}>
          <Search value={""} onChange={() => {}} onKeyDown={() => {}} />
        </div>

        <div className={styles.banner_back_pattern_top}>
          <Icon
            width={136}
            height={136}
            alt="배너 배경 패턴 이미지"
            src={theme == "light" ? ImgStar : ImgStarDark}
          />
        </div>
        <div className={styles.banner_back_pattern_bottom}>
          <Icon
            width={368}
            height={360}
            alt="배너 배경 패턴 이미지"
            src={theme == "light" ? ImgStar : ImgStarDark}
          />
        </div>
      </div>
    </section>
  );
}
