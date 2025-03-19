"use client";
import styles from "../../_css/profilesettings.module.css";
import Modal from "@/app/_components/modal/Modal";
import ProfileBottom from "./profilesettings/ProfileBottom";
import ProfileForm from "./profilesettings/ProfileForm";
import ProfileInfo from "./profilesettings/ProfileInfo";
import ProfileImage from "./profilesettings/ProfileImage";

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
