"use client";

import { useParams } from "next/navigation";
import MyPage from "./_components/MyPage";
import YourPage from "./_components/YourPage";
import { useRecoilValue } from "recoil";
import { userState } from "@/app/_recoil";
import Header from "@/app/_components/navigation/Header";
import MyPageBanner from "./_components/MyPageBanner";

export default function UserPage() {
  const params = useParams();
  const loggedInUser = useRecoilValue(userState); // 현재 로그인한 유저
  const userIdFromUrl = params.userId; // URL에서 userId 가져오기
  const isMyPage = loggedInUser.id === userIdFromUrl;

  return (
    <>
      <Header />
      <MyPageBanner />
      {isMyPage ? <MyPage /> : <YourPage />}
    </>
  );
}
