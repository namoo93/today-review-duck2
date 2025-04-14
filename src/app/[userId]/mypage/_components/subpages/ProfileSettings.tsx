"use client";
import styles from "../../_css/profilesettings.module.css";
import Modal from "@/app/_components/modal/Modal";
import ProfileForm from "./_profileSettingsComponents/ProfileForm";
import ProfileInfo from "./_profileSettingsComponents/ProfileInfo";
import ProfileImage from "./_profileSettingsComponents/ProfileImage";
import ProfileBottom from "./_profileSettingsComponents/ProfileBottom";
import { useMyInfo } from "@/app/_hooks/useMyInfo";
import { useSetRecoilState } from "recoil";
import { myInfoState } from "@/app/_recoil/myInfoAtom";
import { useEffect } from "react";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ProfileSettings() {
  const { data: userInfo, isLoading, isSuccess } = useMyInfo();
  const setMyInfo = useSetRecoilState(myInfoState);

  useEffect(() => {
    if (isSuccess && userInfo) {
      setMyInfo(userInfo);
    }
  }, [isSuccess, userInfo, setMyInfo]);

  if (isLoading || !userInfo) return <p>로딩 중...</p>;
  return (
    <div className={styles.contents}>
      <ProfileImage imageSrc={userInfo.profileImg} />
      <ProfileInfo
        nickname={userInfo.nickname}
        profile={userInfo.profile}
        interest1={userInfo.interest1}
        interest2={userInfo.interest2}
      />
      <ProfileForm
        nickname={userInfo.nickname}
        email={userInfo.email}
        provider={userInfo.provider}
        profile={userInfo.profile}
        interest1={userInfo.interest1}
        interest2={userInfo.interest2}
      />
      <ProfileBottom />
      <Modal width="355px" />
    </div>
  );
}
