import { useModal } from "@/app/_hooks/useModal";
import styles from "../_css/admin.module.css";
import { Button, Input, TabMenu } from "@/app/_components/atoms";
import TextArea from "@/app/_components/atoms/TextArea";
import { useToast } from "@/app/_hooks/useToast";
import { useEffect, useMemo, useState } from "react";
import { usePostAnnouncement } from "@/app/_hooks/usePostAnnouncement";
import { useUpdateAnnouncement } from "@/app/_hooks/useUpdateAnnouncement";
import Select, { ItemSelectProps } from "@/app/_components/atoms/Select";

interface EditModalProps {
  announcementIdx?: number;
  announcementTitle?: string;
  announcementContent?: string;
  announcementCategory?: number;
  status?: string;
  isPinned?: boolean;
}

export default function EditModal({
  announcementIdx,
  announcementTitle,
  announcementContent,
  announcementCategory,
  status,
  isPinned,
}: EditModalProps) {
  const { closeModal } = useModal();
  const [tab, setTab] = useState("업데이트");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isError, setIsError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ItemSelectProps | null>({
      label: "공개",
      value: "published",
    });
  const { addToast } = useToast();
  const isEdit = !!announcementIdx;

  useEffect(() => {
    if (status !== undefined) {
      setSelectedCategory(
        status
          ? { label: "공개", value: "published" }
          : { label: "비공개", value: "archived" }
      );
    }
    if (announcementTitle) {
      setTitle(announcementTitle);
    }
    if (announcementContent) {
      setContents(announcementContent);
    }
    if (announcementCategory) {
      switch (announcementCategory) {
        case 1:
          setTab("업데이트");
          break;
        case 2:
          setTab("이벤트");
          break;
        case 3:
          setTab("규정 변경");
          break;
        case 4:
          setTab("시스템 점검");
          break;
        case 5:
          setTab("기타");
          break;
        default:
          setTab("업데이트");
      }
    }
  }, [
    announcementTitle,
    announcementContent,
    announcementCategory,
    status,
    isPinned,
  ]);
  const post = usePostAnnouncement();
  const update = useUpdateAnnouncement();
  const category = useMemo(() => {
    switch (tab) {
      case "업데이트":
        return 1;
      case "이벤트":
        return 2;
      case "규정 변경":
        return 3;
      case "시스템 점검":
        return 4;
      case "기타":
        return 5;
      default:
        return 1;
    }
  }, [tab]);
  const selectOptions: ItemSelectProps[] = [
    { label: "공개", value: "published" },
    { label: "비공개", value: "archived" },
  ];
  // console.log("selectedCategory : ", selectedCategory);
  const handleReport = () => {
    if (!title || !contents) {
      setIsError("제목과 내용을 모두 입력해주세요.");
      return;
    }
    setIsError(null);

    const payload = {
      title,
      content: contents,
      category,
      status: selectedCategory?.value as string,
      isPinned: isPinned ? isPinned : false,
    };

    if (isEdit && announcementIdx) {
      update.mutate({ announcementIdx, ...payload });
      closeModal();
    } else {
      post.mutate(payload);
      closeModal();
    }
  };

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
        name={"announcement"}
        label="내용을 작성해주세요."
        onChange={(e) => setContents(e.target.value)}
        placeholder={"공지사항 내용을 작성해주세요."}
        height="250px"
        maxLength={5000}
        errorMessage={isError}
        margin={"15px 0 0 0"}
      />
      {isEdit && (
        <Select
          options={selectOptions}
          defaultValue={selectedCategory?.label}
          setSelectedValue={setSelectedCategory}
          height="40px"
          margin="10px 0 0 0"
        />
      )}
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
