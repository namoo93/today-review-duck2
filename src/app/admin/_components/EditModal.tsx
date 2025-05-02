import { useModal } from "@/app/_hooks/useModal";
import styles from "../_css/admin.module.css";
import { Button, Input, TabMenu } from "@/app/_components/atoms";
import TextArea from "@/app/_components/atoms/TextArea";
import { useToast } from "@/app/_hooks/useToast";
import { useState } from "react";

export default function EditModal({ commentIdx }: { commentIdx?: number }) {
  const { closeModal } = useModal();
  const [tab, setTab] = useState("업데이트");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isError, setIsError] = useState<string | null>(null);
  const { addToast } = useToast();
  const isEdit = commentIdx ? true : false;

  const handleReport = () => {};

  return (
    <div className={styles.modal}>
      <strong className={styles.modal_title}>
        공지사항 {isEdit ? "수정 하기" : "등록 하기"}
      </strong>
      <TabMenu
        width="100%"
        margin="10px 0 20px 0"
        selected={tab}
        setTabView={setTab}
        menu={["업데이트", "이벤트", "규정 변경", "시스템 점검", "기타"]}
      />
      <Input
        value={title}
        name={"title"}
        lineStyle
        label="타이틀을 작성해주세요."
        placeholder="공지사항 타이틀을 작성해주세요."
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        value={contents}
        name={"신고 내용"}
        label="내용을 작성해주세요."
        onChange={(e) => setContents(e.target.value)}
        placeholder={"공지사항 내용을 작성해주세요."}
        height="250px"
        maxLength={5000}
        errorMessage={isError}
        margin={"15px 0 0 0"}
      />
      <div className={styles.button_wrap}>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          onClick={() => closeModal()}
        >
          닫기
        </Button>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          filled
          onClick={() => handleReport()}
        >
          {isEdit ? "수정" : "등록"}
        </Button>
      </div>
    </div>
  );
}
