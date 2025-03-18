import { Button, Input } from "@/app/_components/atoms";
import styles from "../_css/step.module.css";
import { SetStateAction, useEffect, useState } from "react";
import { validatePassword } from "@/app/_utils/validation";
import { useToast } from "@/app/_hooks/useToast";
import ToastContainer from "@/app/_components/toast/ToastContainer";

type Props = {
  setStep: React.Dispatch<SetStateAction<number>>;
};
export default function Step3({ setStep }: Props) {
  const { addToast } = useToast();

  const [passwordError, setPasswordError] = useState("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [verifyPasswordData, setVerifyPasswordData] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPasswordData(value);
      setPasswordError(validatePassword(value));
    }

    if (name === "verifyPassword") {
      setVerifyPasswordData(value);
    }
  };

  useEffect(() => {
    if (verifyPasswordData !== passwordData) {
      setVerifyPasswordError("앗! 비밀번호가 일치하지 않아요");
    } else {
      setVerifyPasswordError("");
    }
  }, [verifyPasswordData]);

  const handleNextButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    // TODO : api 연결
    addToast("두줄이상 인포의 경우 두줄이상 ", "info");
    setStep(4);
  };

  const isButtonDisabled =
    !passwordData.trim() ||
    !verifyPasswordData.trim() ||
    passwordError.trim() !== "" ||
    verifyPasswordError.trim() !== "";

  return (
    <>
      <div className={styles.form_wrap}>
        <strong className={styles.main_title}>
          마지막이에요!
          <br />
          사용하실 비밀번호를 입력해주세요.
        </strong>
        <p className={styles.sub_title}>
          영문, 숫자, 특수문자를 사용하여 6자 ~ 30자로 입력해주세요!
        </p>

        <Input
          type={"password"}
          name={"password"}
          placeholder="비밀번호를 입력해주세요"
          error={passwordError}
          value={passwordData}
          onChange={(e) => handleChange(e)}
          padding="30px 0 0 0"
        />
        <Input
          type={"password"}
          name={"verifyPassword"}
          placeholder="비밀번호를 다시 입력해주세요"
          error={verifyPasswordError}
          value={verifyPasswordData}
          onChange={(e) => handleChange(e)}
          padding="15px 0 0 0"
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
