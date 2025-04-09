"use client";

import { useEffect, useRef } from "react";
import { getAuthorityCookie } from "@/app/_utils/cookies";
import { useSetRecoilState } from "recoil";
import { userState } from "@/app/_recoil";
import { postRefreshToken } from "../_api/auth";

export default function AppInitializer() {
  const setUser = useSetRecoilState(userState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRefreshTokenInterval = () => {
    if (intervalRef.current) return; // 이미 설정되어 있으면 무시
    intervalRef.current = setInterval(() => {
      postRefreshToken()
        .then(() => {
          console.log("🔄 토큰 갱신 완료");
        })
        .catch((err) => {
          console.warn("❌ 토큰 갱신 실패", err);
        });
    }, 29 * 60 * 1000); // 29분 마다
    console.log("🔔 토큰 갱신 인터벌 시작");
  };

  const stopRefreshTokenInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log("🛑 토큰 갱신 인터벌 중지");
    }
  };

  useEffect(() => {
    const nickname = getAuthorityCookie("nickname");
    if (nickname) {
      setUser({ id: nickname });
      console.log("✅ AppInitializer → 사용자 로그인 상태 복원:", nickname);
      startRefreshTokenInterval(); // 최초 실행 시 시작
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startRefreshTokenInterval();
      } else {
        stopRefreshTokenInterval();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopRefreshTokenInterval();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
