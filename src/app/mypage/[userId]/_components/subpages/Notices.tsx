import { useEffect, useState } from "react";
import styles from "../../_css/mypage.module.css";
import List from "@/app/_components/list/postList/List";
import DataNone from "@/app/_components/atoms/DataNone";
import Pagination from "@/app/_components/pagination/Pagination";
import { useAnnouncementList } from "@/app/_hooks/useAnnouncementList";
import NoticeContents from "./NoticeContents";
import { AnnouncementItemType } from "@/types/AnnouncementItemType";

export default function Notices() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOnDetail, setIsOnDetail] = useState(false);
  const [announcement, setAnnouncement] = useState<AnnouncementItemType | null>(
    null
  );

  const { data, isLoading } = useAnnouncementList(currentPage, 10, "published");
  const noticeList = data?.announcements ?? [];
  const totalPages = data?.totalPage ?? 1;

  const handlePage = (announcement: AnnouncementItemType) => {
    console.log("isOnDetail", isOnDetail, announcement);

    setIsOnDetail(true);
    setAnnouncement(announcement);
  };

  return (
    <div className={styles.list_contents}>
      {!isOnDetail && (
        <>
          {noticeList.length > 0 ? (
            <ul className={styles.list_wrap}>
              {noticeList.map((announcement) => (
                <List
                  key={announcement.idx}
                  reviewIdx={announcement.idx}
                  isManager={true}
                  alt={announcement.title}
                  src={""}
                  title={announcement.title}
                  user={announcement.user}
                  value={announcement.category}
                  contents={announcement.content}
                  date={announcement.createdAt}
                  onClkickList={() => handlePage(announcement)}
                />
              ))}
            </ul>
          ) : (
            <DataNone target={"올라온 공지"} />
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              margin="20px 0"
            />
          )}
        </>
      )}
      {isOnDetail && (
        <NoticeContents
          announcement={announcement}
          setIsOnDetail={setIsOnDetail}
        />
      )}
    </div>
  );
}
