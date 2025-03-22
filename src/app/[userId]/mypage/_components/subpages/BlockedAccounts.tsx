import { useEffect, useRef, useState } from "react";
import styles from "../../_css/mypage.module.css";
import ProfileBox from "@/app/_components/profile/ProfileBox";

//TODO :  must delete
const list0 = [
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-0",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname1_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-1",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname1_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-2",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-3",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname2_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-4",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname3_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-5",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname3_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-6",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname4_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-7",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname4_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-8",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname5_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-9",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname5_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-10",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname6_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-11",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname6_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-12",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname7_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-13",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname7_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-14",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname8_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-15",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname8_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-16",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname9_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-17",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname9_1",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-18",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname10_0",
    interest1: "스포츠",
    interest2: "여행",
  },
  {
    isMyFollowing: false,
    isMyBlock: false,
    idx: "idx-19",
    email: "test2@a.com",
    profile: "수정된 프로필",
    profileImg: null,
    nickname: "nickname10_1",
    interest1: "스포츠",
    interest2: "여행",
  },
];

export default function BlockedAccounts() {
  const [blockUsers, setBlockUsers] = useState(list0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 마우스 휠 이벤트 처리 (Y축 스크롤을 X축으로 변환)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelScroll = (e: WheelEvent) => {
      if (container.scrollWidth > container.clientWidth) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 2;
      }
    };

    //  passive: false 로 이벤트 수동 등록
    container.addEventListener("wheel", handleWheelScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.contents_block_users}>
      <ul className={styles.block_list}>
        {blockUsers.map((user) => (
          <li key={`차단한 리스트 ${user.nickname}`}>
            <ProfileBox
              name={user.nickname}
              isOn
              isOnText="해제하기"
              textWidth={"190px"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
