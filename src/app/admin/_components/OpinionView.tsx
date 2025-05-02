import { useState } from "react";
import styles from "../_css/admin.module.css";
import { Search } from "@/app/_components/atoms";
import { useToast } from "@/app/_hooks/useToast";
import { formatDate } from "@/app/_utils/date";
import AdminModal from "./AdminModal";
import { useModal } from "@/app/_hooks/useModal";
import DataNone from "@/app/_components/atoms/DataNone";
import Pagination from "@/app/_components/pagination/Pagination";
import { users } from "./UserListView"; //TODO del

export default function OpinionView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>("");
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
        setSearchValue("");
        return;
      }
    }
  };
  const searchButtonHandler = () => {
    if (!searchValue.trim()) {
      addToast("검색어는 두 글자 이상 입력해주세요", "error");
      return;
    }
    setSearchValue("");
  };

  return (
    <section aria-labelledby="section_title" className={styles.admin_section}>
      <h4 id="section_title" className={styles.admin_section_title}>
        의견 리스트
      </h4>
      <div className={styles.admin_section_box}>
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
          <strong className={styles.table_header_5}>
            <span>닉네임</span>
            <span>아이디</span>
            <span>활성화 상태</span>
            <span>작성 날짜</span>
            <span>의견 내용</span>
          </strong>
        </div>
        <ul className={styles.table_list}>
          {users.map((user) => (
            <li key={user.email} className={styles.table_card_5}>
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
