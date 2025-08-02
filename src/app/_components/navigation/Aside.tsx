'use client';

import styles from './_css/aside.module.css';
import Alarm from '@/../public/icon/alarm-icon.svg';
import AlarmDark from '@/../public/icon/alarm-icon-dark.svg';
import { themeState, userIdxState } from '@/app/_recoil';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { DropDown, Icon } from '../atoms';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useNotificationList } from '@/app/_hooks/useNotificationList';
import { useSseNotification } from '@/app/_hooks/useSseNotification';
import { NotificationType } from '@/types/NotificationType';
import NotificationList from '../list/notificationList/NotificationList';
// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';

export default function Aside() {
  const [theme] = useRecoilState(themeState);
  // const userIdx = useRecoilValue(userIdxState);

  const router = useRouter();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { data } = useNotificationList();

  // const goToSignPage = () => {
  //   router.push(`/login`);
  // };
  const { isSignedIn, user } = useUser(); // ✅ 로그인 상태 및 유저 정보
  const setUserIdx = useSetRecoilState(userIdxState);
  useEffect(() => {
    if (isSignedIn && user) {
      // 로그인한 경우 Clerk의 user.id를 Recoil에 저장
      setUserIdx(user.id);
    } else {
      // 로그아웃 시 null로 초기화
      setUserIdx(null);
    }
  }, [isSignedIn, user, setUserIdx]);
  useEffect(() => {
    if (data?.notifications) {
      setNotifications(data.notifications);
    }
  }, [data]);

  useSseNotification((newNotif) => {
    setNotifications((prev) => [newNotif, ...prev]);
    setHasUnread(true);
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
          : n,
      ),
    );
  };

  const handleToggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);

    if (!isDropDownOpen) {
      setHasUnread(false);
    }
  };

  return (
    <aside className={styles.aside}>
      <SignedIn>
        <button
          type="button"
          className={styles.alaram_button}
          onClick={() => setIsDropDownOpen((prev) => !prev)}
        >
          {theme == 'light' ? (
            <Icon src={Alarm} alt="alarm image" width={24} height={24} />
          ) : (
            <Icon src={AlarmDark} alt="alarm image" width={24} height={24} />
          )}
          {hasUnread && <span className={styles.badge} />}
          <DropDown
            margin="30px 0 0 0"
            isOpen={isDropDownOpen}
            onClose={() => handleToggleDropDown()}
            position="right"
            width="428px"
          >
            {notifications.length === 0 ? (
              <div className={styles.empty_message}>아직 알림이 없어요 🐥</div>
            ) : (
              <ul className={styles.notification_list}>
                {notifications.map((item) => (
                  <NotificationList
                    key={`${item.createdAt}-${item.sender.idx}`} // ✅ key 추가
                    item={item}
                    onFollowChange={updateFollowState}
                  />
                ))}
              </ul>
            )}
          </DropDown>
        </button>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <SignUpButton>
          <button className={styles.accession_info_button}>회원가입</button>
        </SignUpButton>
        <SignInButton>
          <button
            type="button"
            className={styles.login_info_button}
            // onClick={() => goToSignPage()}
          >
            <span>로그인</span>
          </button>
        </SignInButton>
      </SignedOut>
    </aside>
  );
}
