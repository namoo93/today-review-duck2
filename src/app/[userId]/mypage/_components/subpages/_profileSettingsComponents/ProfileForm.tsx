"use client";
import { useState } from "react";
import styles from "../../../_css/profilesettings.module.css";
import { Button, Input } from "@/app/_components/atoms";
import { useRecoilState } from "recoil";
import TextArea from "@/app/_components/atoms/TextArea";

export default function ProfileForm({
  nickname,
  email,
  profile,
  provider,
  interest1,
  interest2,
}: {
  nickname: string;
  email: string;
  profile: string | null;
  provider: string;
  interest1: string | null;
  interest2: string | null;
}) {
  const [nicknameData, setNicknameData] = useState(nickname || "");
  const [emailData, setEmailData] = useState(email || "");
  const [introduction, setIntroduction] = useState(profile || "");
  const [interestOne, setInterestOne] = useState(interest1 || "");
  const [interestTwo, setInterestTwo] = useState(interest2 || "");

  const handleSubmit = () => {};
  return (
    <div className={styles.profile_form}>
      <div className={styles.row_wrap}>
        <Input
          type={"text"}
          name={"nickname"}
          label="닉네임"
          important
          placeholder="닉네임을 입력해주세요"
          subInfo="닉네임은 2 ~ 10글자 사이로 입력해주세요."
          value={nicknameData}
          onChange={(e) => setNicknameData(e.target.value)}
          padding="30px 0 0 0"
          lineStyle
          height="46px"
        />

        <Input
          type={"text"}
          name={"email"}
          label="이메일"
          disabled
          subInfo={
            provider == "local" ? "" : `${provider}로 가입한 계정이에요.`
          }
          value={emailData}
          onChange={(e) => {}}
          padding="30px 0 0 0"
          height="46px"
        />
      </div>
      <div className={`${styles.row_wrap} ${styles.padding_top}`}>
        <TextArea
          name="introduction"
          label="한 줄 소개"
          placeholder="한 줄 소개를 작성해주세요."
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          maxLength={100}
          height="100px"
        />

        <div className={styles.interest_wrap}>
          <Input
            type="text"
            name="interestOne"
            label="나의 관심사"
            placeholder="나의 첫 번째 관심사"
            value={interestOne}
            onChange={(e) => setInterestOne(e.target.value)}
            height="46px"
            lineStyle
          />
          <Input
            type="text"
            name="interestTwo"
            placeholder="나의 두 번째 관심사"
            value={interestTwo}
            onChange={(e) => setInterestTwo(e.target.value)}
            height="46px"
            lineStyle
            subInfo="관심사는 2 ~ 10글자 사이로 입력해주세요."
          />
        </div>
      </div>

      <Button
        buttonType="button"
        onClick={() => handleSubmit()}
        inlineText
        color="#FFB271"
        padding="15px 0"
      >
        프로필 수정하기
      </Button>
    </div>
  );
}
