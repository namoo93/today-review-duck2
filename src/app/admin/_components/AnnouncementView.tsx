import { useState } from "react";
import styles from "../_css/admin.module.css";
import { Button, TabMenu } from "@/app/_components/atoms";
import { formatDate } from "@/app/_utils/date";
import { useModal } from "@/app/_hooks/useModal";
import DataNone from "@/app/_components/atoms/DataNone";
import Pagination from "@/app/_components/pagination/Pagination";
import EditModal from "./EditModal";
import { useAnnouncementList } from "@/app/_hooks/useAnnouncementList";
import { useDeleteAnnouncement } from "@/app/_hooks/useDeleteAnnouncement";
import { category } from "@/app/_utils/ratingUtils";

export default function AnnouncementView() {
  const [tab, setTab] = useState("게시글 관리");
  const [currentPage, setCurrentPage] = useState(1);

  const { openModal } = useModal();
  const status = tab === "게시글 보관" ? "archived" : "published";
  const deleteMutation = useDeleteAnnouncement();
  const { data, isLoading } = useAnnouncementList(currentPage, 10, status);
  const announcements = data?.announcements ?? [];
  const totalPages = data?.totalPage ?? 1;

  const handleDelete = (announcementIdx: number) => {
    if (confirm("정말로 이 공지사항을 삭제하시겠어요?")) {
      deleteMutation.mutate(announcementIdx);
    }
  };

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
          <strong className={styles.table_header_8}>
            <span>작성자</span>
            <span>제목</span>
            <span>카테고리</span>
            <span>작성 날짜</span>
            <span>조회수</span>
            <span>작성 내용</span>
            <span>상태</span>
            <span>삭제하기</span>
          </strong>
        </div>
        <ul className={styles.table_list}>
          {announcements.map((announcement) => (
            <li
              key={`공지사항 ${announcement.idx}`}
              className={styles.table_card_8}
            >
              <span className="elipsis_2_lines">
                {announcement.user.nickname}
              </span>
              <span className="elipsis_2_lines">{announcement.title}</span>
              <span className="elipsis_2_lines">
                {category(announcement.category)}
              </span>
              <span className="elipsis_2_lines">
                {formatDate(announcement.createdAt)}
              </span>
              <span className="elipsis_2_lines">{announcement.viewCount}</span>
              <button
                type="button"
                className={styles.table_button_line}
                onClick={() =>
                  openModal(
                    <EditModal
                      announcementIdx={announcement.idx}
                      announcementTitle={announcement.title}
                      announcementContent={announcement.content}
                      announcementCategory={announcement.category}
                      status={announcement.status}
                      isPinned={announcement.isPinned}
                    />
                  )
                }
              >
                내용 보기 / 수정
              </button>

              <span>
                {announcement.status == "archived" ? "보관중" : "게시중"}
              </span>
              <button
                type="button"
                className={styles.table_delete_button}
                onClick={() => handleDelete(announcement.idx)}
              >
                삭제
              </button>
            </li>
          ))}
          {announcements.length == 0 && (
            <li className={styles.data_none_wrap}>
              <DataNone target="등록된 공지 사항" />
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
