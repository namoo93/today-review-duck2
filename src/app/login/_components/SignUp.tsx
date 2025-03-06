"use client";
import styles from "../_css/signup.module.css";
import ImgLogo from "@/../../public/images/logo.svg";
import Image from "next/image";
// import Link from "next/link";

export default function SignUp() {
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
      </div>
    </section>
  );
}
