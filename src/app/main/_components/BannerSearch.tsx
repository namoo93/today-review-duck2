"use client";
import styles from "../_css/bannersearch.module.css";
import { useRecoilState } from "recoil";
import { DropDown, Icon, Search } from "@/app/_components/atoms";
import { useEffect, useState } from "react";
import { onSearchPageState } from "@/app/_recoil";
import IcoDelete from "@/../public/icon/icon-delete-search.svg";
import { usePopularKeywords } from "@/app/_hooks/usePopularKeywords";
import {
  getSearchHistory,
  removeSearchHistoryItem,
  setSearchHistory,
} from "@/app/_utils/searchStorage";
import { searchKeywordState } from "@/app/_recoil/searchKeywordAtom";
import { useToast } from "@/app/_hooks/useToast";
import ToastContainer from "@/app/_components/toast/ToastContainer";
// import { useRouter } from "next/navigation";

export default function BannerSearch() {
  const [, setOnSearchPage] = useRecoilState(onSearchPageState);
  const [, setKeyword] = useRecoilState(searchKeywordState);
  const { data: popularData, isLoading: isPopularLoading } =
    usePopularKeywords();
  // const router = useRouter();
  const { addToast } = useToast();
  const [searchHistoryList, setSearchHistoryList] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  //  초기 렌더 시 localStorage에서 기록 불러오기
  useEffect(() => {
    setSearchHistoryList(getSearchHistory());
  }, []);

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      setOnSearchPage(false);
      return;
    }
    if (searchValue.length == 0) return;
    if (e.key === "Enter") {
      if (searchValue.length < 1) {
        addToast("검색어는 두 글자 이상 입력해주세요", "error");
        return;
      }

      if (searchValue.length > 1) {
        setKeyword(searchValue);
        setOnSearchPage(true);
        resetSearch();
        return;
      }
    }
  };

  const searchButtonHandler = () => {
    if (!searchValue.trim()) {
      addToast("검색어는 두 글자 이상 입력해주세요", "error");
      return;
    }
    setKeyword(searchValue);
    setOnSearchPage(true);
    resetSearch();
  };

  const handleReSearch = (term: string) => {
    setSearchValue(term);
    setSearchHistory(term); // localStorage 갱신
    setSearchHistoryList(getSearchHistory());
    setOnSearchPage(true);
    setKeyword(term);
  };

  const deleteKeyword = (term: string) => {
    const updated = removeSearchHistoryItem(term);
    setSearchHistoryList(updated);
  };

  //초기화 함수
  const resetSearch = () => {
    const updated = setSearchHistory(searchValue); // localStorage 저장
    setSearchHistoryList(updated); // 상태 반영
    setIsDropDownOpen(false);
    setSearchValue("");
    setOnSearchPage(true);
  };

  // 검색창 스크롤시 이동
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 700);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.search_input_wrap} ${
        isSticky ? styles.sticky_input : styles.fixed_y
      }`}
      onClick={() => setIsDropDownOpen((prev) => !prev)}
    >
      <ToastContainer
        width="335px"
        top="50px"
        right="50%"
        transform="translateX(50%)"
      />
      <Search
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={(e) => searchHandler(e)}
        onClick={() => searchButtonHandler()}
        placeholder="어떤 리뷰가 궁금하신가요?"
        minLength={2}
      />
      <DropDown
        margin={isSticky ? "45px 0 0 0" : "70px 0 0 0"}
        isOpen={isDropDownOpen}
        onClose={() => setIsDropDownOpen(false)}
      >
        <div className={styles.list_wrap}>
          <div className={styles.list_box}>
            <strong className={styles.list_box_title}>최근 검색어</strong>
            {searchHistoryList.length == 0 && (
              <span className={styles.list_box_info}>
                최근 검색 기록이 없어요
              </span>
            )}
            <ul className={styles.list_recent_searches}>
              {searchHistoryList.map((term, index) => (
                <li key={term + index}>
                  <button
                    type="button"
                    onClick={() => handleReSearch(term)}
                    className={styles.recent_searches_title}
                  >
                    {term}
                  </button>
                  <button type="button" onClick={() => deleteKeyword(term)}>
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
              {isPopularLoading
                ? "로딩 중..."
                : popularData?.keywords.length
                ? "현재 인기 있는 검색어에요"
                : "아직 인기 검색어가 없어요"}
            </span>
            <div className={styles.list_popular_searches_wrap}>
              <ol className={styles.list_popular_searches}>
                {isPopularLoading ? (
                  <li>
                    <span className={styles.list_box_info}>로딩 중...</span>
                  </li>
                ) : (
                  popularData?.keywords.slice(0, 5).map((item) => (
                    <li key={item.keyword}>
                      <button
                        type="button"
                        className={styles.popular_searches_button}
                        onClick={() => handleReSearch(item.keyword)}
                      >
                        <span className={styles.searches_bullet}>
                          {item.rank}
                        </span>
                        <span
                          className={`elipsis_1_lines ${styles.searches_item}`}
                        >
                          {item.keyword}
                        </span>
                        <span className={styles.searches_icon}>
                          {item.status === "up" && "🔼"}
                          {item.status === "down" && "🔽"}
                          {item.status === "equal" && "➖"}
                          {item.status === "new" && "🆕"}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ol>
              <ol className={styles.list_popular_searches}>
                {isPopularLoading ? (
                  <li>
                    <span className={styles.list_box_info}>로딩 중...</span>
                  </li>
                ) : (
                  popularData?.keywords.slice(5, 10).map((item) => (
                    <li key={item.keyword}>
                      <button
                        type="button"
                        className={styles.popular_searches_button}
                        onClick={() => handleReSearch(item.keyword)}
                      >
                        <span className={styles.searches_bullet}>
                          {item.rank}
                        </span>
                        <span
                          className={`elipsis_1_lines ${styles.searches_item}`}
                        >
                          {item.keyword}
                        </span>
                        <span className={styles.searches_icon}>
                          {item.status === "up" && "🔼"}
                          {item.status === "down" && "🔽"}
                          {item.status === "equal" && "➖"}
                          {item.status === "new" && "🆕"}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ol>
            </div>
          </div>
        </div>
      </DropDown>
    </div>
  );
}
