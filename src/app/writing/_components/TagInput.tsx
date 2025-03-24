"use client";

import { useEffect, useRef } from "react";
import styles from "../_css/taginput.module.css"; // 원하는 CSS로 경로 조정
import IocTagBtn from "@/../../public/icon/icon-tag-add.svg";
import IocTagBtnDark from "@/../../public/icon/icon-tag-add-dark.svg";
import IocTagDeleteBtn from "@/../../public/icon/icon-tag-delete.svg";
import IocTagDeleteBtnDark from "@/../../public/icon/icon-tag-delete-dark.svg";
import { Button, Icon } from "@/app/_components/atoms";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";

type TagInputProps = {
  tags: string[];
  onAddTag: () => void;
  onChangeTag: (index: number, value: string) => void;
  onDeleteTag: (index: number) => void;
};

export default function TagInput({
  tags,
  onAddTag,
  onChangeTag,
  onDeleteTag,
}: TagInputProps) {
  const [theme] = useRecoilState(themeState);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // 마지막 태그 input에 포커스
    if (tags.length > 0) {
      const lastInput = inputRefs.current[tags.length - 1];
      if (lastInput) lastInput.focus();
    }
  }, [tags]);

  useEffect(() => {
    // 각 input 너비 동기화
    tags.forEach((_, index) => {
      const span = spanRefs.current[index];
      const input = inputRefs.current[index];
      if (span && input) {
        input.style.width = `${span.offsetWidth + 10}px`;
      }
    });
  }, [tags]);

  return (
    <div className={styles.tags_input_wrap}>
      <Button buttonType="button" onClick={onAddTag} transparent>
        <Icon
          src={theme == "light" ? IocTagBtn : IocTagBtnDark}
          width={28}
          height={28}
          alt="태그 추가 아이콘"
        />
      </Button>
      {tags.map((tag, index) => (
        <div
          key={index}
          className={
            theme == "light"
              ? styles.tag_input_container
              : styles.tag_input_container_dark
          }
        >
          <span
            ref={(el) => {
              spanRefs.current[index] = el;
            }}
            className={styles.hidden_span}
          >
            {tag || " "}
          </span>
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={tag}
            onChange={(e) => onChangeTag(index, e.target.value)}
            className={styles.tag_input}
            style={{ width: "auto" }}
          />

          <Button
            buttonType="button"
            onClick={() => onDeleteTag(index)}
            transparent
          >
            <Icon
              src={theme == "light" ? IocTagDeleteBtn : IocTagDeleteBtnDark}
              width={16}
              height={16}
              alt="태그 삭제 아이콘"
            />
          </Button>
        </div>
      ))}
    </div>
  );
}
