"use client";
import styles from "../../_css/profilesettings.module.css";
import Modal from "@/app/_components/modal/Modal";
import ProfileForm from "./profileSettings/ProfileForm";
import ProfileInfo from "./profileSettings/ProfileInfo";
import ProfileImage from "./profileSettings/ProfileImage";
import ProfileBottom from "./profileSettings/ProfileBottom";

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
