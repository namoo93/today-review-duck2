"use client";
import styles from "../_css/bannersearch.module.css";
import { useRecoilState } from "recoil";
import { DropDown, Icon, Search } from "@/app/_components/atoms";
import { useState } from "react";
import { onSearchPageState } from "@/app/_recoil";
import IcoDelete from "@/../public/icon/icon-delete-search.svg";
// import { useRouter } from "next/navigation";

export default function BannerSearch() {
  const [, setOnSearchPage] = useRecoilState(onSearchPageState);
  // const router = useRouter();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

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
    setIsDropDownOpen(false);
    setSearchValue("");
  };

  return (
    <div
      className={styles.search_input_wrap}
      onClick={() => setIsDropDownOpen((prev) => !prev)}
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
        isOpen={isDropDownOpen}
        onClose={() => setIsDropDownOpen(false)}
      >
        <div className={styles.list_wrap}>
          <div className={styles.list_box}>
            <strong className={styles.list_box_title}>최근 검색어</strong>
            {searchHistory.length == 0 && (
              <span className={styles.list_box_info}>
                최근 검색 기록이 없어요
              </span>
            )}
            <ul className={styles.list_recent_searches}>
              {searchHistory.map((term, index) => (
                <li key={index} onClick={() => handleReSearch(term)}>
                  <button
                    type="button"
                    onClick={() => {}}
                    className={styles.recent_searches_title}
                  >
                    {term}
                  </button>
                  <button type="button" onClick={() => {}}>
                    <Icon
                      src={IcoDelete}
                      alt="검색어 삭재"
                      width={18}
                      height={18}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.list_box}>
            <strong className={styles.list_box_title}>인기 검색어</strong>
            <span className={styles.list_box_info}>
              현재 인기 있는 검색어에요
            </span>
            <div className={styles.list_popular_searches_wrap}>
              <ol className={styles.list_popular_searches}>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj fasdf fdsaf asfd af safdsf
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj{" "}
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj{" "}
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj{" "}
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj{" "}
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
              </ol>
              <ol className={styles.list_popular_searches}>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj{" "}
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj{" "}
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj{" "}
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj{" "}
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.popular_searches_button}
                    onClick={() => {}}
                  >
                    <span className={styles.searches_bullet}>1</span>
                    <span className={`elipsis_1_lines ${styles.searches_item}`}>
                      dnlr rjatordj{" "}
                    </span>
                    <span className={styles.searches_icon}>-</span>
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </DropDown>
    </div>
  );
}
