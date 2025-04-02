import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";

export const getFcmToken = async (): Promise<string | null> => {
  if (typeof window === "undefined" || !messaging) {
    console.warn("FCM은 브라우저 환경에서만 실행됩니다.");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("알림 권한이 거부되었습니다.");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    return token;
  } catch (error) {
    console.error("FCM 토큰 에러:", error);
    return null;
  }
};
