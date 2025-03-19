"use client";
import styles from "../../_css/profilesettings.module.css";
import Modal from "@/app/_components/modal/Modal";
import ProfileForm from "./profile/ProfileForm";
import ProfileInfo from "./profile/ProfileInfo";
import ProfileImage from "./profile/ProfileImage";
import ProfileBottom from "./profile/ProfileBottom";

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
