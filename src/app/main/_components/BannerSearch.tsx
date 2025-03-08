"use client";
import styles from "../_css/bannersearch.module.css";
import { useRecoilState } from "recoil";
import { DropDown, Search } from "@/app/_components/atoms";
import { useState } from "react";
import { onSearchPageState } from "@/app/_recoil";
import { useRouter } from "next/navigation";

export default function BannerSearch() {
  const [, setOnSearchPage] = useRecoilState(onSearchPageState);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue !== "") {
      console.log("검색 실행:", searchValue);
      setOnSearchPage(true);

      resetSearch();
    }

    if (e.key === "Backspace" || searchValue === "") {
      console.log("검색 값 초기화");
      setOnSearchPage(false);
    }
  };
  const searchButtonHandler = () => {
    if (!searchValue.trim()) return;

    console.log("검색 실행:", searchValue);
    resetSearch();
  };

  const handleReSearch = (term: string) => {
    setSearchValue(term);
    searchButtonHandler();
  };

  //초기화 함수
  const resetSearch = () => {
    setOnSearchPage(true);
    // 검색어 기록 추가 (중복 방지)
    setSearchHistory((prev) =>
      prev.includes(searchValue) ? prev : [searchValue, ...prev]
    );

    //초기화
    setIsOpen(false);
    setSearchValue("");
  };

  return (
    <div
      className={styles.search_input_wrap}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <Search
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => searchHandler(e)}
        onClick={() => searchButtonHandler()}
        placeholder="어떤 리뷰가 궁금하신가요?"
      />
      <DropDown
        margin="70px 0 0 0"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.list_wrap}>
          <div className={styles.list_box}>
            <strong>최근 검색어</strong>
            <span>최근 검색 기록이 없어요</span>
            <ul>
              {searchHistory.map((term, index) => (
                <li key={index} onClick={() => handleReSearch(term)}>
                  {term}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.list_box}>
            <strong>인기 검색어</strong>
            <span>현재 인기 있는 검색어에요</span>
            <ol>
              <li>
                <button type="button" onClick={() => {}}>
                  1 dnlr rjatordj{" "}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => {}}>
                  2 dnlr rjatordj 검색어가 긴경우 두줄이상 이클립스{" "}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => {}}>
                  3 dnlr rjatordj{" "}
                </button>
              </li>
            </ol>
          </div>
        </div>
      </DropDown>
    </div>
  );
}
