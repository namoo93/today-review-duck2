import { useEffect, useRef, useState } from "react";
import styles from "../../_css/mypage.module.css";
import ProfileBox from "@/app/_components/profile/ProfileBox";
import { useHorizontalScroll } from "@/app/_hooks/useHorizontalScroll";
import { useBlockedUserList } from "@/app/_hooks/useBlockedUserList";
import Pagination from "@/app/_components/pagination/Pagination";
import DataNone from "@/app/_components/atoms/DataNone";

export default function BlockedAccounts() {
  const containerRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(containerRef);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: blockUsers = { users: [], totalPage: 1 }, isLoading } =
    useBlockedUserList({
      size: 10,
      page: currentPage,
    });
  const blockedUsers = blockUsers.users;
  const totalPages = blockUsers.totalPage;

  return (
    <div ref={containerRef} className={styles.contents_block_users}>
      {isLoading ? (
        <p>차단한 유저를 불러오는 중...</p>
      ) : blockedUsers.length === 0 ? (
        <DataNone target="차단한 유저" />
      ) : (
        <ul className={styles.block_list}>
          {blockedUsers.map((user) => (
            <li key={`차단한 리스트 ${user.nickname}`}>
              <ProfileBox
                name={user.nickname}
                interest={`${user.interest1 ?? ""} ${user.interest2 ?? ""}`}
                textWidth="190px"
                isOn
                isOnText="해제하기"
                onClickButton={() => {
                  // TODO: 차단 해제 로직 추가
                }}
              />
            </li>
          ))}
        </ul>
      )}

      {(totalPages ?? 1) > 10 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
