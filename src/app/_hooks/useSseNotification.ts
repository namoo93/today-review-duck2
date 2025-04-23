import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

export const useSseNotification = (onReceive: (data: any) => void) => {
  const BASE_URL =
    process.env.NEXT_PUBLIC_MODE === "local"
      ? "/api" // 👉 로컬에서는 프록시 경유
      : process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    console.log("NEXT_PUBLIC_BASE_URL", process.env.NEXT_PUBLIC_BASE_URL);
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

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
  }, [onReceive]);
};
