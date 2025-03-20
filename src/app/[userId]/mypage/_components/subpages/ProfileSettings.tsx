"use client";
import styles from "../../_css/profilesettings.module.css";
import Modal from "@/app/_components/modal/Modal";
import ProfileForm from "./_profileSettingsComponents/ProfileForm";
import ProfileInfo from "./_profileSettingsComponents/ProfileInfo";
import ProfileImage from "./_profileSettingsComponents/ProfileImage";
import ProfileBottom from "./_profileSettingsComponents/ProfileBottom";

export default function ProfileSettings() {
  return (
    <div className={styles.contents}>
      <ProfileImage />
      <ProfileInfo />
      <ProfileForm />
      <ProfileBottom />
      <Modal width="355px" />
    </div>
  );
}
