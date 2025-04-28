"use client";
import styles from "../_css/sociallogin.module.css";
import IcoNaver from "@/../../public/icon/icon-sns-naver.svg";
import IcoKakao from "@/../../public/icon/icon-sns-kakao.svg";
import IcoGoogle from "@/../../public/icon/icon-sns-google.svg";
import IcoApple from "@/../../public/icon/icon-sns-aple.svg";
import { useState } from "react";
import { Button, Icon, Tooltip } from "@/app/_components/atoms";

export default function SocialLogin() {
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI as string;
  // 구글 인증
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env
    .NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string;
  // 네이버 인증
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  //kakao 인증
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;

  // 로그인 버튼 클릭 핸들러
  const handleLogin = (provider: string) => {
    if (provider == "google") {
      const url =
        "https://accounts.google.com/o/oauth2/v2/auth" +
        "?client_id=" +
        GOOGLE_CLIENT_ID +
        "&redirect_uri=" +
        encodeURIComponent(GOOGLE_REDIRECT_URI) +
        "&response_type=code" +
        "&scope=" +
        encodeURIComponent("email profile openid");

      window.location.href = url;
    }

    if (provider == "naver") {
      const url =
        "https://nid.naver.com/oauth2.0/authorize" +
        "?response_type=code" +
        "&client_id=" +
        NAVER_CLIENT_ID +
        "&redirect_uri=" +
        encodeURIComponent(REDIRECT_URI) +
        "&state=test";
      window.location.href = url;
    }

    if (provider == "kakao") {
      const url =
        "https://kauth.kakao.com/oauth/authorize" +
        "?client_id=" +
        KAKAO_CLIENT_ID +
        "&redirect_uri=" +
        encodeURIComponent(REDIRECT_URI) +
        "&response_type=code";

      window.location.href = url;
    }

    //TODO : 로컬스토리지에 저장
    setLastLogin(provider); // 마지막 로그인한 소셜 업데이트
  };

  return (
    <ul className={styles.sns_list}>
      {/* <li>
        <Tooltip
          text="마지막으로 로그인한 방법이에요"
          position="left"
          isVisible={lastLogin === "naver"}
          margin="10px 0 0 20px"
        >
          <Button
            buttonType="button"
            padding="0"
            onClick={() => handleLogin("naver")}
          >
            <Icon
              alt="네이버 소셜 로그인 버튼"
              width={60}
              height={60}
              src={IcoNaver}
            />
          </Button>
        </Tooltip>
      </li> */}
      <li>
        <Tooltip
          text="마지막으로 로그인한 방법이에요"
          position="center"
          isVisible={lastLogin === "kakao"}
          margin="10px 0 0 0"
        >
          <Button
            buttonType="button"
            padding="0"
            onClick={() => handleLogin("kakao")}
          >
            <Icon
              alt="카카오 소셜 로그인 버튼"
              width={60}
              height={60}
              src={IcoKakao}
            />
          </Button>
        </Tooltip>
      </li>
      <li>
        <Tooltip
          text="마지막으로 로그인한 방법이에요"
          position="center"
          isVisible={lastLogin === "google"}
          margin="10px 0 0 0"
        >
          <Button
            buttonType="button"
            height="60px"
            border
            borderRadius="60px"
            onClick={() => handleLogin("google")}
          >
            <Icon
              alt="구글 소셜 로그인 버튼"
              height={24}
              width={24}
              src={IcoGoogle}
            />
          </Button>
        </Tooltip>
      </li>
      <li>
        <Tooltip
          text="마지막으로 로그인한 방법이에요"
          position="right"
          isVisible={lastLogin === "apple"}
          margin="10px 20px 0 0"
        >
          <Button
            buttonType="button"
            height="60px"
            border
            borderRadius="60px"
            onClick={() => handleLogin("apple")}
          >
            <Icon
              alt="애플 소셜 로그인 버튼"
              height={22}
              width={18}
              src={IcoApple}
            />
          </Button>
        </Tooltip>
      </li>
    </ul>
  );
}
