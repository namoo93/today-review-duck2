import { useModal } from "@/app/_hooks/useModal";
import styles from "../_css/modal.module.css";
import { Button, Icon, Select } from "@/app/_components/atoms";
import IcoLogo from "@/../public/images/logo.svg";
import { useState } from "react";
import { useToast } from "@/app/_hooks/useToast";
import TextArea from "@/app/_components/atoms/TextArea";
import { ItemSelectProps } from "@/app/_components/atoms/Select";
import { useReportReview } from "@/app/_hooks/useReportReview";

export default function ReviewReportModal({
  reviewIdx,
}: {
  reviewIdx: number;
}) {
  const { closeModal } = useModal();
  const [isError, setIsError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ItemSelectProps | null>(null);
  const { addToast } = useToast();
  const reportReview = useReportReview();

  const reportOptions: ItemSelectProps[] = [
    {
      label: "스팸 홍보 및 도배글이에요",
      value: 1,
    },
    {
      label: "욕설/혐오/차별적 표현이에요",
      value: 2,
    },
    { label: "불쾌한 표현이 있어요", value: 3 },
    {
      label: "불법 상품을 판매 및 홍보해요",
      value: 4,
    },
    {
      label: "음란물과 관련되어 있어요",
      value: 5,
    },
    { label: "청소년에게 유해해요", value: 6 },
    { label: "다른 문제가 있어요", value: 7 },
  ];

  const handleReport = () => {
    if (!selectedCategory) {
      setIsError("신고 사유를 선택해주세요");
    }
    if (reason.length < 30) {
      setIsError("30자 이상 입력해주세요.");
    }

    if (!!selectedCategory && reason.length > 30) {
      reportReview.mutate(
        {
          reviewIdx,
          type: selectedCategory.value,
          content: reason,
        },
        {
          onSuccess: () => {
            closeModal();
            addToast("신고 내용이 접수되었습니다.", "success");
            setIsError(null);
          },
        }
      );
    }
  };
  return (
    <div className={styles.modal}>
      <Icon
        src={IcoLogo}
        width={68}
        height={50}
        alt="게시글 신고 모달 아이콘"
      />
      <strong className={styles.modal_title}>이 리뷰를 신고 합니다</strong>
      <div className={styles.select_wrap}>
        <span className={styles.select_label}>어떤 사유로 신고하시나요?</span>
        <Select
          options={reportOptions}
          defaultValue="신고 사유를 선택해주세요"
          setSelectedValue={setSelectedCategory}
          height="40px"
          errorMessage={isError}
        />
      </div>
      <TextArea
        value={reason}
        label={"자세한 신고 내용을 알려주세요."}
        name={"신고 내용"}
        onChange={(e) => setReason(e.target.value)}
        placeholder={"신고 내용을 최소 30자 이상으로 작성해주세요."}
        height="250px"
        maxLength={300}
        minLength={30}
        errorMessage={isError}
      />
      <div className={styles.button_wrap}>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          onClick={() => closeModal()}
        >
          취소
        </Button>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          filled
          onClick={() => handleReport()}
        >
          제출하기
        </Button>
      </div>
    </div>
  );
}
