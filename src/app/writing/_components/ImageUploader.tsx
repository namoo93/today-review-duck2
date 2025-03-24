"use client";

import { useRef } from "react";
import styles from "../_css/imageuploader.module.css";
import { ImageDataType } from "@/types";
import { Icon } from "@/app/_components/atoms";
import IcoImageAdd from "@/../public/icon/icon-add-image.svg";
import IcoClose from "@/../public/icon/icon-delete-imges.svg";

type ImageUploaderProps = {
  images: ImageDataType[];
  onAddImage: (image: ImageDataType) => void;
  onRemoveImage: (index: number) => void;
  onChangeDescription: (index: number, description: string) => void;
};

export default function ImageUploader({
  images,
  onAddImage,
  onRemoveImage,
  onChangeDescription,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const isFirstImage = images.length === 0;

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onAddImage({
        file,
        previewUrl,
        description: "",
        isRepresentative: isFirstImage,
      });
    }
  };

  return (
    <div className={styles.image_container}>
      {images.length < 6 && (
        <div className={styles.add_button_box}>
          <button
            className={styles.add_button}
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon src={IcoImageAdd} alt="이미지 추가" width={28} height={28} />
            <span className={styles.count}>
              <span className={styles.count_color}>{images.length}</span>/6
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr_only"
          />
        </div>
      )}

      {images.map((img, index) => (
        <div key={index} className={styles.image_box}>
          <span className={styles.button_box}>
            <button
              className={styles.delete_button}
              onClick={() => onRemoveImage(index)}
            >
              <Icon src={IcoClose} alt="이미지 삭제" width={24} height={24} />
            </button>
            <span className={styles.preview_img}>
              <Icon src={img.previewUrl} alt={`업로드 이미지 ${index + 1}`} />
            </span>
            {img.isRepresentative && (
              <span className={styles.representative_badge}>대표 사진</span>
            )}
          </span>
          <textarea
            placeholder="사진 설명 (선택)"
            value={img.description}
            onChange={(e) => onChangeDescription(index, e.target.value)}
            maxLength={32}
            className={styles.desc_textarea}
          />
        </div>
      ))}
    </div>
  );
}
