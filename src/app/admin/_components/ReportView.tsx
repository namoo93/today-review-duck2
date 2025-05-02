import { useState } from "react";
import styles from "../_css/admin.module.css";
import Select, { ItemSelectProps } from "@/app/_components/atoms/Select";
import { useToast } from "@/app/_hooks/useToast";
import { Search, TabMenu } from "@/app/_components/atoms";
import Pagination from "@/app/_components/pagination/Pagination";
import { formatDate } from "@/app/_utils/date";
import DataNone from "@/app/_components/atoms/DataNone";
import { users } from "./UserListView";
import { useModal } from "@/app/_hooks/useModal";
import AdminModal from "./AdminModal";

export default function ReportView() {
  const [tab, setTab] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<ItemSelectProps | null>(null);
  const { addToast } = useToast();
  const { openModal } = useModal();

  const totalPages = 2;
  const commentIdx = 0;

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
        신고 내역
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
          menu={["전체", "게시글", "댓글"]}
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
            <span>신고자</span>
            <span>신고 받은 사람</span>
            <span>신고 분류</span>
            <span>신고 날짜</span>
            <span>신고 내용</span>
            <span>제한 넣기</span>
          </strong>
        </div>
        <ul className={styles.table_list}>
          {users.map((user) => (
            <li key={user.email} className={styles.table_card}>
              <span>{user.nickname}</span>
              <span>{user.email}</span>
              <span>{user.status}</span>
              <span>{formatDate(user.createdAt)}</span>
              <button
                type="button"
                className={styles.table_button_line}
                onClick={() =>
                  openModal(<AdminModal commentIdx={commentIdx} />)
                }
              >
                상세 내용 보기
              </button>
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
              <DataNone target="신고 내역" />
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
