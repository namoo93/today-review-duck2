"use client";
import { Button, Icon, Input } from "@/app/_components/atoms";
import styles from "../_css/reviewdetails.module.css";
import IcoBack from "@/../../public/icon/icon-back.svg";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";

export default function ReviewDetails() {
  const [theme] = useRecoilState(themeState);
  const router = useRouter();

  return <section className={styles.page}></section>;
}
