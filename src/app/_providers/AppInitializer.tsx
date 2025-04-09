"use client";

import { useEffect } from "react";
import { getAuthorityCookie } from "@/app/_utils/cookies";
import { useSetRecoilState } from "recoil";
import { userState } from "@/app/_recoil";

export default function AppInitializer() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const nickname = getAuthorityCookie("nickname");

    if (nickname) {
      setUser({ id: nickname });
      console.log("✅ AppInitializer → 사용자 로그인 상태 복원:", nickname);
    }
  }, []);

  return null;
}
