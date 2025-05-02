import { useModal } from "@/app/_hooks/useModal";
import styles from "../_css/admin.module.css";
import { Button, Icon } from "@/app/_components/atoms";
import { useState } from "react";

export default function AdminModal({ commentIdx }: { commentIdx: number }) {
  const { closeModal } = useModal();
  const [reason, setReason] = useState("");

  return (
    <div className={styles.modal}>
      <strong className={styles.modal_title}>이 댓글을 신고 합니다</strong>
      <p>
        {reason}안녕하세요, 커뮤니티 관리팀께. 최근 게시된 [게시글 제목 또는
        번호]에서 부적절한 내용이 포함되어 있어 신고드립니다. 해당 게시글은
        커뮤니티의 규칙을 위반하며, 타 사용자들에게 불쾌감을 줄 수 있는 표현이
        사용되었습니다. 신속한 검토와 적절한 조치를 부탁드립니다. 감사합니다.
      </p>
      <div className={styles.button_wrap}>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          filled
          onClick={() => closeModal()}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
