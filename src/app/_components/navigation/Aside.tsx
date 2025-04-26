"use client";

import styles from "./_css/aside.module.css";
import Alarm from "@/../public/icon/alarm-icon.svg";
import AlarmDark from "@/../public/icon/alarm-icon-dark.svg";
import { themeState, userIdxState } from "@/app/_recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { DropDown, Icon } from "../atoms";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNotificationList } from "@/app/_hooks/useNotificationList";
import { useSseNotification } from "@/app/_hooks/useSseNotification";
import { NotificationType } from "@/types/NotificationType";
import NotificationList from "../list/notificationList/NotificationList";

export default function Aside() {
  const [theme] = useRecoilState(themeState);
  const userIdx = useRecoilValue(userIdxState);
  const router = useRouter();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { data } = useNotificationList();

  const goToSignPage = () => {
    router.push(`/login`);
  };

  useEffect(() => {
    if (data?.notifications) {
      setNotifications(data.notifications);
    }
  }, [data]);

  useSseNotification((newNotif) => {
    setNotifications((prev) => [newNotif, ...prev]);
  });

  // 알림 리스트 내 유저 팔로우 상태 업데이트 함수
  const updateFollowState = (senderIdx: string, isNowFollowing: boolean) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.sender.idx === senderIdx
          ? {
              ...n,
              sender: {
                ...n.sender,
                isMyFollowing: isNowFollowing,
              },
            }
          : n
      )
    );
  };

  return (
    <aside className={styles.aside}>
      {userIdx?.length ? (
        <button
          type="button"
          className={styles.alaram_button}
          onClick={() => setIsDropDownOpen((prev) => !prev)}
        >
          {theme == "light" ? (
            <Icon src={Alarm} alt="alarm image" width={24} height={24} />
          ) : (
            <Icon src={AlarmDark} alt="alarm image" width={24} height={24} />
          )}
          <DropDown
            margin="30px 0 0 0"
            isOpen={isDropDownOpen}
            onClose={() => setIsDropDownOpen(false)}
            position="right"
            height="500px"
            width="428px"
          >
            <ul className={styles.notification_list}>
              {notifications.map((item) => (
                <NotificationList
                  item={item}
                  onFollowChange={updateFollowState}
                />
              ))}
              <li></li>
            </ul>
          </DropDown>
        </button>
      ) : (
        <button type="button" onClick={() => goToSignPage()}>
          <span className={styles.login_info_title}>로그인 및 회원가입</span>
        </button>
      )}
    </aside>
  );
}
