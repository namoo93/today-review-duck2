import { UserInfoType } from "@/types/UserInfoType";
import styles from "../_css/admin.module.css";
import { Button, Search, Select, TabMenu } from "@/app/_components/atoms";
import { useState } from "react";
import { useToast } from "@/app/_hooks/useToast";
import Pagination from "@/app/_components/pagination/Pagination";
import { ItemSelectProps } from "@/app/_components/atoms/Select";
import { formatDate } from "@/app/_utils/date";
import DataNone from "@/app/_components/atoms/DataNone";

export const users: UserInfoType[] = Array.from({ length: 10 }).map((_, i) => ({
  idx: `user${i}@example.com idxxxxx`,
  email: `user${i}@example.com`,
  profile: `자기소개 ${i}`,
  provider: "kakao",
  profileImg: null,
  nickname: `유저${i}`,
  interest1: i % 2 === 0 ? "코딩" : null,
  interest2: i % 3 === 0 ? "독서" : null,
  isAdmin: false,
  serialNumber: i + 1,
  createdAt: new Date().toISOString(),
  suspensionCount: null,
  suspendExpireAt: null,
  reviewCount: Math.floor(Math.random() * 50),
  followingCount: Math.floor(Math.random() * 100),
  followerCount: Math.floor(Math.random() * 100),
  isMyFollowing: Math.random() > 0.5,
  isMyBlock: false,
  status: i % 2 === 0 ? "활성화" : "영구정지",
}));

export default function UserListView() {
  const [tab, setTab] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<ItemSelectProps | null>(null);
  const { addToast } = useToast();

  const totalPages = 2;

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchValue.length == 0) return;
    if (e.key === "Enter") {
      if (searchValue.length < 1) {
        addToast("검색어는 두 글자 이상 입력해주세요", "error");
        return;
      }

      if (searchValue.length > 1) {
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
    resetSearch();
  };

  //초기화 함수
  const resetSearch = () => {
    setSearchValue("");
  };

  const selectOptions: ItemSelectProps[] = [
    {
      label: "활성화",
      value: 0,
    },
    {
      label: "일주일 정지",
      value: 1,
    },
    {
      label: "한 달 정지",
      value: 2,
    },
    { label: "영구 정지", value: 3 },
  ];

  return (
    <section aria-labelledby="section_title" className={styles.admin_section}>
      <h4 id="section_title" className={styles.admin_section_title}>
        유저 리스트 (총 {users.length}명)
      </h4>

      <div className={styles.admin_section_box}>
        <TabMenu
          width="340px"
          margin="0 0 20px 0"
          selected={tab}
          setTabView={setTab}
          onClickTab={() => {
            setCurrentPage(1);
          }}
          menu={["전체", "활성화", "정지", "영구정지"]}
          lineOnly
        />
        <Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={(e) => searchHandler(e)}
          onClick={() => searchButtonHandler()}
          placeholder="닉네임, 이메일로 검색"
          minLength={2}
          width="300px"
          bgColor="#FFF6ED"
          iconRight
        />
        <div className={styles.table_header_wrap}>
          <strong className={styles.table_header}>
            <span>닉네임</span>
            <span>이메일</span>
            <span>활성화 여부</span>
            <span>가입 날짜</span>
            <span>가입 경로</span>
            <span>제한 넣기</span>
          </strong>
        </div>
        <ul className={styles.table_list}>
          {users.map((user) => (
            <li key={user.email} className={styles.table_card}>
              <span className="elipsis_2_lines">{user.nickname}</span>
              <span className="elipsis_2_lines">{user.email}</span>
              <span className="elipsis_2_lines">{user.status}</span>
              <span className="elipsis_2_lines">
                {formatDate(user.createdAt)}
              </span>
              <span className="elipsis_2_lines">{user.provider}</span>
              <span className={styles.restrict_wrap}>
                <Select
                  options={selectOptions}
                  defaultValue="기간 선택"
                  setSelectedValue={setSelectedCategory}
                  height="40px"
                  margin="0"
                />
                <button
                  type="button"
                  className={styles.table_button}
                  onClick={() => {}}
                >
                  변경
                </button>
              </span>
            </li>
          ))}
          {users.length == 0 && (
            <li className={styles.data_none_wrap}>
              <DataNone target="유저" />
            </li>
          )}
        </ul>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            margin="30px 0"
          />
        )}
      </div>
    </section>
  );
}
