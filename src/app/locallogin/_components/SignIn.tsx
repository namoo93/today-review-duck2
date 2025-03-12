"use client";
import styles from "../_css/signin.module.css";
import Image from "next/image";
import ImgLogo from "@/../../public/images/logo.svg";
import useAuth from "@/app/_hooks/useAuth";
import { userState } from "@/app/_recoil";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@/app/_components/atoms";
import { useToast } from "@/app/_hooks/useToast";
import ToastContainer from "@/app/_components/toast/ToastContainer";
import Modal from "@/app/_components/modal/Modal";
import { useModal } from "@/app/_hooks/useModal";

export default function SignIn() {
  const { login, isPending } = useAuth();
  const user = useRecoilValue(userState);
  const router = useRouter();
  const { addToast } = useToast();
  const { openModal } = useModal();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({
        email: formData.email,
        password: formData.password,
        fcmToken: "sample-fcm-token",
      });
      alert("로그인 성공!");
      router.push("/"); // 로그인 후 이동
    } catch (error) {
      alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.signup_wrap}>
        <h1 className={styles.logo_wrap}>
          {/* <Link href={"./"}> */}
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
        <form className={styles.form_wrap}>
          <strong className={styles.sub_title}>
            다시 만나서 반가워요!
            <br /> 로그인 후 모든 활동이 가능해요
          </strong>

          <Input
            type={"email"}
            label="이메일"
            placeholder="이메일을 입력해주세요"
            // error={"앗! 이메일 주소 형식이 맞는지 다시 확인해주세요"}
            error={emailError}
            value={""}
            onChange={() => {}}
            padding="30px 0 0 0"
          />

          <Input
            type={"password"}
            label="비밀번호"
            placeholder="이메일을 입력해주세요"
            subInfo={
              !passwordError.length &&
              "영문, 숫자, 특수문자가 포함된 6자리 이상 30자 이하"
            }
            error={passwordError}
            value={""}
            onChange={() => {}}
            padding="30px 0 0 0"
          />

          <p className={styles.find_password}>
            <strong className={styles.find_password_title}>
              비밀번호가 기억나지 않나요?
            </strong>
            <button
              type="button"
              className={styles.find_password_button}
              onClick={() => openModal(<p>안녕하세요! 🌟</p>)}
            >
              비밀번호 찾기
            </button>
          </p>
        </form>
        <div className={styles.form_button_wrap}>
          <Button
            buttonType="submit"
            filled
            onClick={() =>
              addToast("에러 발생! 두줄이상의 에러일 경우", "info")
            }
            className={styles.form_button}
            disabled={!isPending}
          >
            로그인
          </Button>
        </div>
      </div>

      <ToastContainer
        width="335px"
        top="70%"
        right="50%"
        transform="translateX(50%)"
      />
      <Modal />
    </section>
  );
}
