"use client";
import styles from "../_css/signup.module.css";
import Image from "next/image";
import ImgLogo from "@/../../public/images/logo.svg";
// import Link from "next/link";

export default function SignIn() {
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
        <strong className={styles.sns_title}>
          소셜 계정으로 빠르게 시작하기
        </strong>
      </div>
    </section>
  );
}
