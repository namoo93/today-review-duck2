"use client";
import styles from "../_css/signin.module.css";
import Image from "next/image";
import ImgLogo from "@/../../public/images/logo.svg";
import useAuth from "@/app/_hooks/useAuth";
import { userState } from "@/app/_recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button, Input } from "@/app/_components/atoms";
import { useToast } from "@/app/_hooks/useToast";
import ToastContainer from "@/app/_components/toast/ToastContainer";
import { validateEmail, validatePassword } from "@/app/_utils/validation";

export default function SignIn() {
  const { login, isPending } = useAuth();
  const [, setUser] = useRecoilState(userState);
  const router = useRouter();
  const { addToast } = useToast();
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 이메일 검증
    if (name === "email") {
      setEmailError(validateEmail(value));
      setEmailData(value);
    }
    // 비밀번호 검증
    if (name === "password") {
      setPasswordError(validatePassword(value));
      setPasswordData(value);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    // TODO : 임시로 로그인 ui 보이게
    setUser({ id: "nickname" });
    router.push("/");

    // try {
    //   await login({
    //     email: emailData,
    //     password: passwordData,
    //     fcmToken: "sample-fcm-token",
    //   });

    //   router.push("/"); // 로그인 후 이동
    // } catch (error) {
    //   addToast(`로그인 실패. ${error}`, "info");
    // }
  };

  const goToFindPasswordPage = () => {
    router.push(`/resetPassword`); // 페이지가 아닌 컴포넌트로분기 고려
  };

  const isButtonDisabled =
    !emailData.trim() ||
    !passwordData.trim() ||
    isPending ||
    emailError.trim() !== "" ||
    passwordError.trim() !== "";

  return (
    <section className={styles.page}>
      <div className={styles.signup_wrap}>
        <h1 className={styles.logo_wrap}>
          {/* <Link href={"/"}> */}
          <Image
            src={ImgLogo}
            alt="logo image"
            loading="lazy"
            property={"public/images/logo.svg"}
            width={69}
            height={51}
          />
          {/* </Link> */}
        </h1>
        <div className={styles.form_wrap}>
          <strong className={styles.sub_title}>
            다시 만나서 반가워요!
            <br /> 로그인 후 모든 활동이 가능해요
          </strong>

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

          <Input
            type={"password"}
            name={"password"}
            label="비밀번호"
            placeholder="이메일을 입력해주세요"
            subInfo={
              !passwordError.length &&
              "영문, 숫자, 특수문자가 포함된 6자리 이상 30자 이하"
            }
            error={passwordError}
            value={passwordData}
            onChange={(e) => handleChange(e)}
            padding="30px 0 0 0"
          />

          <p className={styles.find_password}>
            <strong className={styles.find_password_title}>
              비밀번호가 기억나지 않나요?
            </strong>
            <button
              type="button"
              className={styles.find_password_button}
              onClick={() => goToFindPasswordPage()}
            >
              비밀번호 찾기
            </button>
          </p>
        </div>

        <div className={styles.form_button_wrap}>
          <Button
            buttonType="button"
            filled
            className={styles.form_button}
            disabled={isButtonDisabled}
            onClick={(e) => handleSubmit(e)}
          >
            로그인
          </Button>
          <ToastContainer
            width="335px"
            top="-60px"
            right="50%"
            transform="translateX(50%)"
          />
        </div>
      </div>
    </section>
  );
}
