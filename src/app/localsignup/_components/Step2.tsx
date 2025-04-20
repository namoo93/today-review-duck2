import { Button, Input } from "@/app/_components/atoms";
import styles from "../_css/step.module.css";
import { SetStateAction, useEffect, useState } from "react";
import { useToast } from "@/app/_hooks/useToast";
import ToastContainer from "@/app/_components/toast/ToastContainer";
import { useVerifyEmail } from "@/app/_hooks/useVerifyEmail";
import { useInspectDuplicateEmail } from "@/app/_hooks/useInspectEmail";

type Props = {
  setStep: React.Dispatch<SetStateAction<number>>;
  email: string;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
};
export default function Step2({
  setStep,
  email,
  timeLeft,
  setTimeLeft,
}: Props) {
  const { addToast } = useToast();
  const { mutate: verifyEmailMutate, isPending, isError } = useVerifyEmail();
  const { mutate: inspectEmailMutate, isPending: isPendingInspectEmail } =
    useInspectDuplicateEmail();
  const [numberData, setNumberData] = useState("");

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력 허용

    const newNumberData = numberData.split("");
    newNumberData[index] = value;
    setNumberData(newNumberData.join(""));

    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // 백스페이스 키 입력 시 이전 입력 필드로 포커스 이동
    if (e.key === "Backspace" && !numberData[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`)?.focus();
    }
  };

  const handleNextButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    const code = Number(numberData);

    verifyEmailMutate(
      { email, code },
      {
        onSuccess: () => {
          addToast("이메일 인증 성공!", "success");
          setStep(3);
        },
        onError: (error: any) => {
          if (error?.response?.status === 400) {
            addToast("유효하지 않은 요청입니다.", "error");
          } else if (error?.response?.status === 401) {
            addToast(
              "인증되지 않은 이메일이거나 시간이 초과되었습니다.",
              "error"
            );
            setNumberData("");
          } else {
            addToast("알 수 없는 오류가 발생했습니다.", "error");
            setNumberData("");
          }
        },
      }
    );
  };

  const handleResend = () => {
    !isPendingInspectEmail &&
      inspectEmailMutate(email, {
        onSuccess: () => {
          addToast("인증번호가 재전송되었습니다.", "success");
          setTimeLeft(299);
        },
        onError: () => {
          addToast("인증번호 재전송 실패. 다시 시도해주세요.", "error");
        },
      });
  };

  const isButtonDisabled = numberData.length !== 6 || isPending;

  return (
    <>
      <div className={styles.form_wrap}>
        <strong className={styles.main_title}>
          이메일로 전송된
          <br />
          인증번호 6자리를 입력해주세요!
        </strong>
        <div className={styles.code_input_wrap}>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className={`${styles.code_input} ${
                isError ? styles.code_input_error : ""
              }`}
              value={numberData[i] || ""}
              id={`code-input-${i}`}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <p className={styles.timer}>
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </p>
        <p className={styles.resend_wrap}>
          <span>인증번호가 오지 않았나요?</span>
          <button type="button" disabled={isPending} onClick={handleResend}>
            다시 전송하기
          </button>
        </p>
      </div>

      <div className={styles.form_button_wrap}>
        <Button
          buttonType="button"
          filled
          className={styles.form_button}
          onClick={(e) => handleNextButton(e)}
          disabled={isButtonDisabled}
        >
          다음으로
        </Button>

        <ToastContainer
          width="335px"
          top="-60px"
          right="50%"
          transform="translateX(50%)"
        />
      </div>
    </>
  );
}
