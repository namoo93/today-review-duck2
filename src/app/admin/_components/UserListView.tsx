import { UserInfoType } from "@/types/UserInfoType";
import styles from "../_css/admin.module.css";

const users: UserInfoType[] = Array.from({ length: 10 }).map((_, i) => ({
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
  return (
    <section aria-labelledby="section_title" className={styles.admin_section}>
      <h4 id="section_title">유저 리스트 (총 {users.length}명)</h4>

      <form aria-label="유저 검색">
        <label htmlFor="userSearch">닉네임 또는 이메일 검색</label>
        <input id="userSearch" type="text" />
      </form>

      <ul className="user_list">
        {users.map((user) => (
          <li key={user.email} className="user_card">
            <p>
              <strong>닉네임:</strong> {user.nickname}
            </p>
            <p>
              <strong>이메일:</strong> {user.email}
            </p>
            <p>
              <strong>상태:</strong> {user.status}
            </p>
            <p>
              <strong>가입일:</strong> {user.createdAt}
            </p>
            <button>제한 설정</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
