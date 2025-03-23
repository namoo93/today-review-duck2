"use client";
import { Icon, Input } from "@/app/_components/atoms";
import styles from "../_css/writingform.module.css";
import IcoBack from "@/../../public/icon/icon-back.svg";
import IcoBackDark from "@/../../public/icon/icon-back-dark.svg";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";
import { useState } from "react";
import Modal from "@/app/_components/modal/Modal";
import { useModal } from "@/app/_hooks/useModal";
import IsBackModalContent from "./IsBackModalContent";

export default function WritingForm() {
  const [theme] = useRecoilState(themeState);
  const router = useRouter();
  const { openModal } = useModal();
  const [titleData, setTitleData] = useState("");

  const handleBack = () => {
    openModal(<IsBackModalContent />);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <section className={styles.page}>
      <div className={styles.writing_form_box}>
        <h3 className={styles.page_title}>
          <button
            type="button"
            className={styles.back_button}
            onClick={handleBack}
          >
            <Icon
              src={theme == "light" ? IcoBack : IcoBackDark}
              alt="리뷰쓰기 페이지 뒤로가기 버튼 아이콘"
              width={36}
              height={36}
            />
          </button>
          리뷰 등록하기
        </h3>
        <div className={styles.writing_form}>
          <Input
            type={"text"}
            name={"title"}
            label="제목"
            placeholder="리뷰 제목을 자유롭게 작성해주세요."
            value={titleData}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <Modal width="355px" />
    </section>
  );
}
