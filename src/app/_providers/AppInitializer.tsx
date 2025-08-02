'use client';

import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { useUser } from '@clerk/nextjs';
import { userIdxState } from '@/app/_recoil';

export default function AppInitializer() {
  const { isSignedIn, user } = useUser();
  const setUserIdx = useSetRecoilState(userIdxState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 상태 설정
  useEffect(() => {
    if (isSignedIn && user) {
      // ✅ Clerk 사용자 ID를 Recoil에 설정
      setUserIdx(user.id);
      console.log(
        '✅ 로그인 상태 유지됨:',
        user.username ?? user.emailAddresses[0]?.emailAddress,
      );
    } else {
      // ❌ 로그아웃 상태 → Recoil 초기화
      setUserIdx(null);
      console.log('🚫 로그인 되어있지 않음, 상태 초기화');
    }
  }, [isSignedIn, user, setUserIdx]);

  // 👇 필요 시 visibilitychange 이벤트 등록
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('🟢 탭 활성화됨');
      } else {
        console.log('⚪ 탭 비활성화됨');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return null;
}
