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
	// 구글 인증
  const REDIRECT_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const REDIRECT_GOOGLE_URI = process.env
    .NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string;

  console.log(REDIRECT_GOOGLE_CLIENT_ID, "google id");
  console.log(REDIRECT_GOOGLE_URI, "google uri");
  // 로그인 버튼 클릭 핸들러
  const handleLogin = (provider: string) => {
    if (provider == "google") {
      const url =
        "https://accounts.google.com/o/oauth2/auth?client_id=" +
        REDIRECT_GOOGLE_CLIENT_ID +
        "&redirect_uri=" +
        encodeURIComponent(REDIRECT_GOOGLE_URI) +
        "&response_type=code" +
        "&scope=email%20profile";

      window.location.href = url;
    }

    //TODO : 로컬스토리지에 저장
    setLastLogin(provider); // 마지막 로그인한 소셜 업데이트
  };

  return (
    <ul className={styles.sns_list}>
      <li>
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
      </li>

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
