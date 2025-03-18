"use client";
import { useRouter } from "next/navigation";
import styles from "../_css/sidebar.module.css";

export default function Lnb() {
  const router = useRouter();

  return (
    <nav className={styles.lnb}>
      <ul className={styles.lnb_list}>
        <li>
          설정
          <ul>
            <li>
              <button onClick={() => router.push("/profile")}>
                기본 프로필 설정
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/blocked-accounts")}>
                차단한 계정
              </button>
            </li>
          </ul>
        </li>

        <li>
          활동 정보
          <ul>
            <li>
              <button onClick={() => router.push("/reviews")}>
                작성한 리뷰
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/comment-reviews")}>
                댓글단 리뷰
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/liked-reviews")}>
                좋아요 누른 리뷰
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/bookmarked-reviews")}>
                북마크한 리뷰
              </button>
            </li>
          </ul>
        </li>

        <li>
          고객지원
          <ul>
            <li>
              <button onClick={() => router.push("/notices")}>공지사항</button>
            </li>
            <li>
              <button onClick={() => router.push("/terms")}>약관</button>
            </li>
            <li>
              <button onClick={() => router.push("/policy")}>정책</button>
            </li>
            <li>
              <button onClick={() => router.push("/feedback")}>
                의견 남기기
              </button>
            </li>
          </ul>
        </li>

        <li>
          계정
          <ul>
            <li>
              <button onClick={() => router.push("/logout")}>로그아웃</button>
            </li>
            <li>
              <button onClick={() => router.push("/delete-account")}>
                회원 탈퇴
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
