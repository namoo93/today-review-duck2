"use client";
import styles from "../_css/signup.module.css";
import ImgLogo from "@/../../public/images/logo.svg";
import IcoNaver from "@/../../public/icon/icon-sns-naver.svg";
import IcoKakao from "@/../../public/icon/icon-sns-kakao.svg";
import IcoGoogle from "@/../../public/icon/icon-sns-google.svg";
import IcoAple from "@/../../public/icon/icon-sns-aple.svg";
import { Button, Icon } from "@/app/_components/atoms";
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
        <ul className={styles.sns_list}>
          <li>
            <Button buttonType="button" padding="0" onClick={() => {}}>
              <Icon
                alt="네이버 소셜 로그인 버튼"
                width={60}
                height={60}
                src={IcoNaver}
              />
            </Button>
          </li>
          <li>
            <Button buttonType="button" padding="0" onClick={() => {}}>
              <Icon
                alt="카카오 소셜 로그인 버튼"
                width={60}
                height={60}
                src={IcoKakao}
              />
            </Button>
          </li>
          <li>
            <Button
              buttonType="button"
              height="60px"
              border
              borderRadius="60px"
              onClick={() => {}}
            >
              <Icon
                alt="구글 소셜 로그인 버튼"
                height={24}
                width={24}
                src={IcoGoogle}
              />
            </Button>
          </li>
          <li>
            <Button
              buttonType="button"
              height="60px"
              border
              borderRadius="60px"
              onClick={() => {}}
            >
              <Icon
                alt="애플 소셜 로그인 버튼"
                height={22}
                width={18}
                src={IcoAple}
              />
            </Button>
          </li>
        </ul>
        <span>또는</span>
        <Button buttonType="button" border onClick={() => {}}>
          이메일로 계속하기
        </Button>
        <Button buttonType="button" border onClick={() => {}}>
          회원가입 하러 가기
        </Button>
      </div>
    </section>
  );
}
