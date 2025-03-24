"use client";
import { Button, Icon, Input } from "@/app/_components/atoms";
import styles from "../_css/writingform.module.css";
import IcoBack from "@/../../public/icon/icon-back.svg";
import IcoBackDark from "@/../../public/icon/icon-back-dark.svg";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";
import { useEffect, useRef, useState } from "react";
import Modal from "@/app/_components/modal/Modal";
import { useModal } from "@/app/_hooks/useModal";
import IsBackModalContent from "./IsBackModalContent";
import TextArea from "@/app/_components/atoms/TextArea";

import IcoRange0Btn from "@/../../public/icon/icon-range-0.svg";
import IcoRange1Btn from "@/../../public/icon/icon-range-1.svg";
import IcoRange2Btn from "@/../../public/icon/icon-range-2.svg";
import IcoRange3Btn from "@/../../public/icon/icon-range-3.svg";
import IcoRange4Btn from "@/../../public/icon/icon-range-4.svg";
import IcoRange5Btn from "@/../../public/icon/icon-range-5.svg";
import TagInput from "./TagInput";
import EvaluationSelector from "./EvaluationSelector";

export default function WritingForm() {
  const [theme] = useRecoilState(themeState);
  const router = useRouter();
  const { openModal } = useModal();
  const [titleData, setTitleData] = useState("");
  const [review, setReview] = useState("");

  const [rangeValue, setRangeValue] = useState<number>(3);
  const [tags, setTags] = useState<string[]>([]);

  const handleBack = () => {
    openModal(<IsBackModalContent />);
  };

  // 태그 데이터
  const handleAddTagInput = () => {
    setTags([...tags, ""]);
  };

  const handleTagChange = (index: number, value: string) => {
    console.log("value-----", value);
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleDeleteTagInput = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index); // 해당 인덱스의 태그 삭제
    setTags(newTags);
  };

  const handleSubmit = () => {};

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
          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>제목</strong>
            <Input
              type={"text"}
              name={"title"}
              placeholder="리뷰 제목을 자유롭게 작성해주세요."
              value={titleData}
              onChange={(e) => setTitleData(e.target.value)}
            />
          </div>
          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>
              태그를 입력해주세요.
            </strong>
            <span className={`${styles.input_info}`}>
              버튼을 클릭하여 태그를 등록할 수 있습니다.
            </span>

            <TagInput
              tags={tags}
              onAddTag={handleAddTagInput}
              onChangeTag={handleTagChange}
              onDeleteTag={handleDeleteTagInput}
            />
          </div>

          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>
              평가를 선택해주세요.
            </strong>

            <EvaluationSelector
              value={rangeValue}
              onChange={(val) => {
                setRangeValue(val);
                console.log("선택된 값:", val); // 여기서 출력됨
              }}
            />
          </div>

          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>
              이미지를 등록해주세요.
            </strong>
            <span className={`${styles.input_info}`}>
              이미지는 최대 6장까지 등록할 수 있습니다.
            </span>
            <div className={`${styles.img_add_button_wrap}`}>
              {["", "", "", "", ""].map((img) => (
                <button key={`${img} 사진 추가 버튼`} onClick={() => {}}>
                  사진 추가하기
                </button>
              ))}
            </div>
          </div>
          <div className={`${styles.input_container}`}>
            <strong className={`${styles.custom_label}`}>
              리뷰를 작성해주세요.
            </strong>
            <TextArea
              name="review"
              // label="리뷰를 작성해주세요."
              placeholder="리뷰 내용을 자유롭게 작성해주세요."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              height="242px"
            />
          </div>
          <p className={styles.writing_info}>
            근거 없는 비방 또는 관련 없는 리뷰일 경우 <br />
            서비스 이용약관이나 관련 법률에 따라 제재를 받을 수 있습니다.
          </p>
        </div>
        <div className={styles.writing_form_button}>
          {theme == "light" ? (
            <Button buttonType={"button"} filled width="335px ">
              등록하기
            </Button>
          ) : (
            <Button buttonType={"button"} filledDark width="335px ">
              등록하기
            </Button>
          )}
        </div>
      </div>
      <Modal width="355px" />
    </section>
  );
}
