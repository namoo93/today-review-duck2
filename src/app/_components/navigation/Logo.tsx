"use client";

import { themeState } from "@/app/_recoil";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Link from "next/link";
import ImgLogo from "@/../../public/images/logo.svg";
import ImgLogoDark from "@/../../public/images/logo-dark.svg";
// import { useState } from "react";

export default function Logo() {
  const [theme] = useRecoilState(themeState);

  return (
    <>
      {theme == "light" ? (
        <Link href={"./"}>
          <Image
            src={ImgLogo}
            alt="logo image"
            loading="lazy"
            property={"public/images/logo.svg"}
          />
        </Link>
      ) : (
        <Link href={"./"}>
          <Image
            src={ImgLogoDark}
            alt="logo image"
            loading="lazy"
            property={"public/images/logo.svg"}
          />
        </Link>
      )}
    </>
  );
}
