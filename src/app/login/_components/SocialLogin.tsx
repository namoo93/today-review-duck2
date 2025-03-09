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

  // 로그인 버튼 클릭 핸들러
  const handleLogin = (provider: string) => {
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
