"use client";
import styles from "../_css/signup.module.css";
import ImgLogo from "@/../../public/images/logo.svg";
import IcoMail from "@/../../public/icon/icon-mail.svg";
import { Icon } from "@/app/_components/atoms";
import Image from "next/image";
import SocialLogin from "./SocialLogin";
// import Link from "next/link";

export default function Login() {
  return (
    <section className={styles.page}>
      <div className={styles.login_wrap}>
        <h1 className={styles.logo_wrap}>
          {/* <Link href={"./"}> */}
          <Image
            src={ImgLogo}
            alt="logo image"
            loading="lazy"
            property={"public/images/logo.svg"}
            width={138}
            height={102}
          />
          {/* </Link> */}
        </h1>
        <strong className={styles.sns_title}>
          소셜 계정으로 빠르게 시작하기
        </strong>
        <SocialLogin />
        <div className={styles.list_or}>
          <span className={styles.list_or_line}></span>
          <span className={styles.list_or_text}>또는</span>
          <span className={styles.list_or_line}></span>
        </div>
        <ul className={styles.local_list}>
          <li>
            <button
              className={styles.local_signin}
              type="button"
              onClick={() => {}}
            >
              <Icon width={24} height={24} alt="이메일 아이콘" src={IcoMail} />
              <span>이메일로 계속하기</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={styles.local_signup}
              onClick={() => {}}
            >
              회원가입 하러 가기
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
