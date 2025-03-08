"use client";
import styles from "../_css/banner.module.css";
import { useRecoilState } from "recoil";
import { onSearchPageState, themeState } from "@/app/_recoil";
import { Search } from "@/app/_components/atoms";
import { useState } from "react";

export default function Banner() {
  const [theme] = useRecoilState(themeState);
  const [searchValue, setSearchValue] = useState<string>("");
  const [, setOnSearchPage] = useRecoilState(onSearchPageState);

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue !== "") {
      console.log("검색 실행:", searchValue);
      setOnSearchPage(true);
    }

    if (e.key === "Backspace" || searchValue === "") {
      console.log("검색 값 초기화");
      setOnSearchPage(false);
    }
  };
  const searchButtonHandler = () => {
    if (searchValue !== "") {
      console.log("검색 실행:", searchValue);
      setOnSearchPage(true);
    }
  };

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

        <div className={styles.search_input_wrap}>
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => searchHandler(e)}
            onClick={() => searchButtonHandler()}
            placeholder="어떤 리뷰가 궁금하신가요?"
          />
        </div>
      </div>
    </section>
  );
}
