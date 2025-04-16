"use client";

import { useEffect, useRef } from "react";
import { getAuthorityCookie } from "@/app/_utils/cookies";
import { useSetRecoilState } from "recoil";
import { userIdxState } from "@/app/_recoil";
import { postRefreshToken } from "../_api/auth";
import { decodeJWT } from "../_utils/jwt";

export default function AppInitializer() {
  const setUserIdx = useSetRecoilState(userIdxState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const nickname = getAuthorityCookie("nickname");
  const refreshToken = getAuthorityCookie("refreshToken");
  console.log("로그인 자동 연장 전 상태 확인용 refreshToken :", refreshToken);

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
    if (refreshToken) {
      const payload = decodeJWT(refreshToken);
      if (payload && payload.idx) {
        setUserIdx(payload.idx);
      }
      startRefreshTokenInterval(); // 최초 실행 시 시작
      console.log("✅ AppInitializer → 사용자 로그인 상태 복원:", nickname);
    }
    if (!refreshToken) {
      setUserIdx(null);
      stopRefreshTokenInterval();
      console.log("🚫 AppInitializer → 로그인 상태 없음, 초기화 완료");
    }

    // 브라우져가 활성화 되있을 때만
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && refreshToken) {
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
