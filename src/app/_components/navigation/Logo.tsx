"use client";

import { activeItemState, themeState } from "@/app/_recoil";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Link from "next/link";
import ImgLogo from "@/../../public/images/logo.svg";
import ImgLogoDark from "@/../../public/images/logo-dark.svg";
import { useRouter } from "next/navigation";
// import { useState } from "react";

export default function Logo() {
  const router = useRouter();
  const [theme] = useRecoilState(themeState);
  const [, setActiveItem] = useRecoilState(activeItemState);

  const handleNavigation = () => {
    setActiveItem("트랜드");
    router.push("/"); // Next.js 페이지 이동
  };

  return (
    <button type="button" onClick={handleNavigation}>
      <Image
        src={theme == "light" ? ImgLogo : ImgLogoDark}
        alt="logo image"
        loading="lazy"
        property={"public/images/logo.svg"}
      />
    </button>
  );
}
