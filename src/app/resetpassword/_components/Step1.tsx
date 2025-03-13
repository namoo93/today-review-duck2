import { Button, Input } from "@/app/_components/atoms";
import styles from "../_css/step.module.css";
import { SetStateAction, useState } from "react";
import { validateEmail } from "@/app/_utils/validation";
import { useToast } from "@/app/_hooks/useToast";
import ToastContainer from "@/app/_components/toast/ToastContainer";
import { useInspectEmail } from "@/app/_hooks/useInspectEmail";

type Props = {
  setStep: React.Dispatch<SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};
export default function Step1({ setStep, setEmail }: Props) {
  const { addToast } = useToast();
  const { mutate: inspectEmailMutate, isPending } = useInspectEmail();
  const [emailError, setEmailError] = useState("");
  const [emailData, setEmailData] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 이메일 검증
    if (name === "email") {
      setEmailError(validateEmail(value));
    }
    setEmailData(value);
  };

  const handleNextButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    inspectEmailMutate(emailData, {
      onSuccess: () => {
        // setStep(2);
        // setEmail(emailData);
      },
      onError: (error: any) => {
        // TODO : 타입정의
        setStep(2);
        setEmail(emailData);
        if (error?.response?.status === 400) {
          addToast("유효하지 않은 요청입니다.", "error");
        }
        if (error?.response?.status === 404) {
          addToast("앗! 가입되어 있지 않은 이메일이에요", "error");
        }
      },
    });
  };

  const isButtonDisabled =
    !emailData.trim() || emailError.trim() !== "" || isPending;

  return (
    <>
      <div className={styles.form_wrap}>
        <strong className={styles.main_title}>
          가입했던 이메일을 입력해주세요!
        </strong>
        <p className={styles.sub_title}>이메일로 인증번호를 보내드려요.</p>
        <Input
          type={"email"}
          name={"email"}
          label="이메일"
          placeholder="이메일을 입력해주세요"
          error={emailError}
          value={emailData}
          onChange={(e) => handleChange(e)}
          padding="30px 0 0 0"
        />
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
