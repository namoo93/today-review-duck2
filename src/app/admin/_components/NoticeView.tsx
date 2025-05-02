import { useState } from "react";
import styles from "../_css/admin.module.css";
import { Button, Select, TabMenu } from "@/app/_components/atoms";
import { formatDate } from "@/app/_utils/date";
import { useModal } from "@/app/_hooks/useModal";
import DataNone from "@/app/_components/atoms/DataNone";
import { ItemSelectProps } from "@/app/_components/atoms/Select";
import Pagination from "@/app/_components/pagination/Pagination";
import EditModal from "./EditModal";
import { users } from "./UserListView";

export default function NoticeView() {
  const [tab, setTab] = useState("게시글 관리");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] =
    useState<ItemSelectProps | null>(null);

  const { openModal } = useModal();

  const totalPages = 2;
  const commentIdx = 0;

  const selectOptions: ItemSelectProps[] = [
    {
      label: "비공개",
      value: 1,
    },
    {
      label: "공개",
      value: 2,
    },
    { label: "삭제", value: 3 },
  ];

  return (
    <section aria-labelledby="section_title" className={styles.admin_section}>
      <h4 id="section_title" className={styles.admin_section_title}>
        공지사항
      </h4>
      <div className={styles.admin_section_box}>
        <div className={styles.top_button_wrap}>
          <TabMenu
            width="300px"
            margin="0 0 20px 0"
            selected={tab}
            setTabView={setTab}
            onClickTab={() => {
              setCurrentPage(1);
            }}
            menu={["게시글 관리", "게시글 보관"]}
            lineOnly
          />
          <Button
            buttonType="button"
            width="150px"
            filled
            onClick={() => openModal(<EditModal />)}
          >
            공지 작성
          </Button>
        </div>
        <div className={styles.table_header_wrap}>
          <strong className={styles.table_header}>
            <span>작성자</span>
            <span>작성 날짜</span>
            <span>작성 사유</span>
            <span>정지 날짜</span>
            <span>작성 내용</span>
            <span>공개 설정</span>
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
                onClick={() => openModal(<EditModal commentIdx={commentIdx} />)}
              >
                상세 내용 보기
              </button>
              <span className={styles.restrict_wrap}>
                <Select
                  options={selectOptions}
                  defaultValue="공개 설정"
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
