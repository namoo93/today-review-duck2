"use client";

import styles from "./_css/aside.module.css";
import Image from "next/image";
import Alarm from "@/../public/icon/alarm_icon.svg";
// import { useState } from "react";

export default function Aside() {
  const session = false;
  return (
    <aside className={styles.aside}>
      {session ? (
        <button
          type="button"
          onClick={() => {
            console.log("go to login");
          }}
        >
          <span>로그인 및 회원가입</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            console.log("alaram");
          }}
        >
          <Image src={Alarm} alt="alarm image" loading="lazy" />
        </button>
      )}
    </aside>
  );
}
