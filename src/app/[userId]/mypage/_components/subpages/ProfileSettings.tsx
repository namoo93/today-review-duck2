"use client";
import { DropDown, Icon } from "@/app/_components/atoms";
import styles from "../../_css/profilesettings.module.css";
import IcoEdit from "@/../public/icon/icon-edit.svg";
import { useRef, useState } from "react";

export default function ProfileSettings() {
  const [image, setImage] = useState<string | null>(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      //TODO : api
      // 초기화
      setIsDropDownOpen(false);
    }
  };

  const handleImageDelete = () => {
    //TODO : api
    // 초기화
    setImage(null);
    setIsDropDownOpen(false);
  };

  return (
    <div className={styles.contents}>
      <div className={styles.dropdown_wrap}>
        <button
          type="button"
          className={styles.profile_img_button}
          onClick={() => setIsDropDownOpen((prev) => !prev)}
        >
          <Icon
            className={styles.profile_img}
            src={image || ""}
            width={120}
            height={120}
            alt="프로필 이미지"
          />
          <Icon
            className={styles.profile_edit_icon}
            src={IcoEdit}
            width={24}
            height={24}
            alt="프로필 이미지 수정 아이콘"
          />
        </button>
        <DropDown
          margin="60px 0 0 80px"
          width="172px"
          position="left"
          isOpen={isDropDownOpen}
          onClose={() => setIsDropDownOpen(false)}
        >
          <ul className={styles.profile_setting_list}>
            <li>
              <button
                className={styles.profile_setting_list_button}
                type="button"
                onClick={handleImageDelete}
              >
                현재 사진 삭제
              </button>
            </li>
            <li>
              <label
                htmlFor="profile-upload"
                className={styles.profile_setting_list_button}
                aria-label="프로필 사진 변경"
              >
                프로필 사진 변경
              </label>

              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="sr_only"
                onChange={handleImageChange}
              />
            </li>
          </ul>
        </DropDown>
      </div>
    </div>
  );
}
