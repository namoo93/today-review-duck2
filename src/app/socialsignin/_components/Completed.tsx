"use client";
import { Icon } from "@/app/_components/atoms";
import styles from "../_css/completed.module.css";
import { useSearchParams } from "next/navigation";
import IconCheck from "@/../../public/icon/icon-check.svg";
import useSocialAuth from "@/app/_hooks/useSocialAuth";
import { useEffect, useState } from "react";

// ✅ Next.js에서 서버 프리렌더링 방지 설정 추가
export const dynamic = "force-dynamic";

export default function Completed() {
  const searchParams = useSearchParams();
  const { mutate: loginWithGoogle, isSuccess, isPending } = useSocialAuth();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const codeParam = searchParams.get("code");
    if (codeParam) {
      setCode(codeParam);
      loginWithGoogle(codeParam);
    }
  }, [searchParams, loginWithGoogle]);

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
            {isPending
              ? "로그인 처리 중..."
              : isSuccess
              ? "로그인이 완료되었어요!"
              : "로그인을 진행 중입니다."}
          </strong>
        </div>
      </div>
    </section>
  );
}
