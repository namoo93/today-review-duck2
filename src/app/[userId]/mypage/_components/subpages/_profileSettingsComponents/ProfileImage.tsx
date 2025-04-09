import styles from "../../../_css/profilesettings.module.css";
import IcoEdit from "@/../public/icon/icon-edit.svg";
import { useState } from "react";
import { DropDown, Icon } from "@/app/_components/atoms";
import { useToast } from "@/app/_hooks/useToast";
import { useUploadProfileImage } from "@/app/_hooks/useUploadProfileImage";
import { useDeleteProfileImage } from "@/app/_hooks/useDeleteProfileImage";

export default function ProfileImage({ imageSrc }: { imageSrc: string }) {
  const [image, setImage] = useState<string | null>(imageSrc);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { mutateAsync: uploadImage, isPending } = useUploadProfileImage();
  const { mutateAsync: deleteImage, isPending: isDeleting } =
    useDeleteProfileImage();
  const { addToast } = useToast();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      addToast("이미지 크기는 최대 5MB까지 업로드할 수 있어요!", "error");
    }

    try {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // 미리보기 먼저 보여줌

      await uploadImage(file);
    } catch (err) {
      addToast("이미지 업로드에 실패했어요", "error");
    } finally {
      setIsDropDownOpen(false);
    }
  };

  const handleImageDelete = async () => {
    try {
      await deleteImage();
      setImage(null);
      addToast("프로필 이미지가 삭제되었어요!", "info");
    } catch {
      addToast("이미지 삭제에 실패했어요", "error");
    } finally {
      setIsDropDownOpen(false);
    }
  };

  return (
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
  );
}
