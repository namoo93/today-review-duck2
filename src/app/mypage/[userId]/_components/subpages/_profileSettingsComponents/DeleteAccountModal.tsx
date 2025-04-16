import { useModal } from "@/app/_hooks/useModal";
import styles from "../../../_css/profilesettings.module.css";
import { Button, Icon } from "@/app/_components/atoms";
import ImgDelete from "@/../public/images/img-delete.svg";
import { useToast } from "@/app/_hooks/useToast";
import { useRouter } from "next/navigation";
import { useResetRecoilState } from "recoil";
import { userIdxState } from "@/app/_recoil";
import { useWithdraw } from "@/app/_hooks/useWithdraw";
import { removeAuthorityCookie } from "@/app/_utils/cookies";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteAccountModal() {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const { addToast } = useToast();
  const router = useRouter();
  const resetUser = useResetRecoilState(userIdxState);
  const { mutateAsync: withdraw, isPending } = useWithdraw();

  const handleWithdraw = async () => {
    try {
      await withdraw(); // API 요청
      // 초기화
      removeAuthorityCookie("accessToken");
      removeAuthorityCookie("refreshToken");
      removeAuthorityCookie("nickname");
      resetUser();
      queryClient.removeQueries({ queryKey: ["myinfo"] });
      addToast("회원탈퇴가 완료되었어요!", "info");
      closeModal();
      router.push("/"); // 홈으로 이동
    } catch (error) {
      addToast("회원탈퇴에 실패했어요", "error");
      console.error("❌ 탈퇴 실패:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <strong className={styles.modal_title_left}>탈퇴하시겠어요?</strong>
      <p className={styles.modal_info_left}>언제든지 기다리고 있을게요 ..</p>
      <Icon
        src={ImgDelete}
        alt="탈퇴하기 모달 이미지"
        width={315}
        height={183}
      />
      <div className={styles.button_wrap}>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          onClick={() => closeModal()}
        >
          취소하기
        </Button>
        <Button
          buttonType="button"
          height="42px"
          fontSize="12px"
          filled
          onClick={handleWithdraw}
          disabled={isPending}
        >
          {isPending ? "처리중..." : "탈퇴하기"}
        </Button>
      </div>
    </div>
  );
}
