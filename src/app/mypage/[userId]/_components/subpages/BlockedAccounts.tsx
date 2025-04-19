"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../../_css/mypage.module.css";
import ProfileBox from "@/app/_components/profile/ProfileBox";
import { useBlockedUserList } from "@/app/_hooks/useBlockedUserList";
import Pagination from "@/app/_components/pagination/Pagination";
import DataNone from "@/app/_components/atoms/DataNone";
import { useUnblockUser } from "@/app/_hooks/useUnblockUser";
import LottieLoading from "@/app/_components/atoms/LottieLoading";
import { applyHorizontalScroll } from "@/app/_utils/applyHorizontalScroll";

export default function BlockedAccounts() {
  const containerRef = useRef<HTMLDivElement>(null);
  applyHorizontalScroll(containerRef);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: blockUsers = { users: [], totalPage: 1 }, isLoading } =
    useBlockedUserList({
      size: 50,
      page: currentPage,
    });
  const blockedUsers = blockUsers.users;
  const totalPages = blockUsers.totalPage;
  // 차단 해제
  const { mutate: unblockUser } = useUnblockUser();

  return (
    <div ref={containerRef} className={styles.contents_block_users}>
      {isLoading ? (
        <LottieLoading />
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
                src={user.profileImg}
                onClickButton={() => unblockUser(user.idx)}
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
