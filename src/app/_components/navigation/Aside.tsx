"use client";

import styles from "./_css/aside.module.css";
import Alarm from "@/../public/icon/alarm-icon.svg";
import AlarmDark from "@/../public/icon/alarm-icon-dark.svg";
import { themeState } from "@/app/_recoil";
import { useRecoilState } from "recoil";
import { DropDown, Icon } from "../atoms";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useState } from "react";

export default function Aside() {
  const [theme] = useRecoilState(themeState);
  const session = false;
  const router = useRouter();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const goToSignPage = () => {
    router.push(`/login`);
  };

  return (
    <aside className={styles.aside}>
      {session ? (
        <button type="button" onClick={() => goToSignPage()}>
          <span>로그인 및 회원가입</span>
        </button>
      ) : (
        <button
          type="button"
          className={styles.alaram_button}
          onClick={() => setIsDropDownOpen((prev) => !prev)}
        >
          {theme == "light" ? (
            <Icon src={Alarm} alt="alarm image" width={24} height={24} />
          ) : (
            <Icon src={AlarmDark} alt="alarm image" width={24} height={24} />
          )}

          <DropDown
            margin="30px 0 0 0"
            isOpen={isDropDownOpen}
            onClose={() => setIsDropDownOpen(false)}
            position="right"
            height="500px"
            width="428px"
          >
            <p>alaram</p>
          </DropDown>
        </button>
      )}
    </aside>
  );
}
