import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useRecoilValue } from "recoil";
import { userIdxState } from "@/app/_recoil";

export const useSseNotification = (onReceive: (data: any) => void) => {
  const userIdx = useRecoilValue(userIdxState); // ✅ 로그인 여부 체크

  const BASE_URL =
    process.env.NEXT_PUBLIC_MODE === "local"
      ? "/api"
      : process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!userIdx) return; // ✅ 로그인 안 했으면 SSE 연결 안 함

    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (!accessToken) {
      return;
    }
    if (!BASE_URL) {
      console.error("⛔ BASE_URL is undefined.");
      return;
    }

    const eventSource = new EventSourcePolyfill(
      `${BASE_URL}/notification/sse`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onReceive(data);
      } catch (err) {
        console.error("Invalid SSE JSON:", err);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE 연결 오류:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [onReceive, userIdx]);
};
