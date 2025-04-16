import { Button, Input } from "@/app/_components/atoms";
import styles from "../_css/step.module.css";
import { SetStateAction, useEffect, useState } from "react";
import { validatePassword } from "@/app/_utils/validation";
import { useToast } from "@/app/_hooks/useToast";
import ToastContainer from "@/app/_components/toast/ToastContainer";
import { useSignup } from "@/app/_hooks/useSignup";
import { userIdxState } from "@/app/_recoil";
import { useSetRecoilState } from "recoil";
import { decodeJWT } from "@/app/_utils/jwt";

type Props = {
  setStep: React.Dispatch<SetStateAction<number>>;
  email: string;
};
export default function Step3({ setStep, email }: Props) {
  const { addToast } = useToast();
  const setUserIdx = useSetRecoilState(userIdxState);
  const { mutate: signupMutate, isPending } = useSignup();

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

    signupMutate(
      {
        email,
        pw: passwordData,
        confirmPw: verifyPasswordData,
      },
      {
        onSuccess: (response) => {
          addToast("회원가입이 완료되었습니다!", "success");
          setStep(4);

          const payload = decodeJWT(response.data.accessToken);
          if (payload && payload.idx) {
            setUserIdx(payload.idx);
          }
        },
        onError: (error: any) => {
          if (error?.response?.status === 409) {
            addToast("이미 가입된 이메일입니다.", "error");
          } else {
            addToast("회원가입 중 오류가 발생했습니다.", "error");
          }
        },
      }
    );
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
          disabled={isButtonDisabled || isPending}
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
