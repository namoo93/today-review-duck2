"use client";
import { Icon } from "@/app/_components/atoms";
import styles from "../_css/completed.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import IconCheck from "@/../../public/icon/icon-check.svg";
import { Suspense, useEffect, useState } from "react";

// ✅ Next.js에서 서버 프리렌더링 방지 설정 추가
export const dynamic = "force-dynamic";

function CompletedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      console.log("✅ code 가져옴:", code);

      const fetchLogin = async () => {
        try {
          const res = await fetch(`/auth/callback?code=${code}`);
          if (res.ok) {
            console.log("✅ 서버에서 로그인 성공");
            router.replace("/"); // 로그인 성공 → 홈으로 이동
          } else {
            console.error("❌ 로그인 실패");
            router.replace("/auth/auth-code-error"); // 실패 시 에러 페이지
          }
        } catch (error) {
          console.error("❌ fetch 에러:", error);
          router.replace("/auth/auth-code-error");
        }
      };

      fetchLogin();
    }
  }, [searchParams, router]);

  return (
    <section className={styles.page}>
      <div className={styles.box_wrap}>
        <div className={styles.icon_wrap}>
          <Icon
            src={IconCheck}
            alt={"완료 페이지 아이콘"}
            width={90}
            height={90}
          />
          <strong className={styles.sub_title}>
            구글 로그인 처리 중입니다...
          </strong>
        </div>
      </div>
    </section>
  );
}

export default function Completed() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <CompletedContent />
    </Suspense>
  );
}
