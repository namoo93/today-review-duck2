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
  const userIdFromUrl = decodeURIComponent(params.userId as string); // URL에서 userId 가져오기

  const isMyPage = loggedInUser.id === userIdFromUrl;

  console.log(
    "현재 로그인한 유저",
    loggedInUser,
    "URL에서 userId 가져오기",
    userIdFromUrl
  );

  return (
    <>
      <Header />
      <MyPageBanner />
      <h3 className="sr_only">{`${userIdFromUrl}의 마이 페이지`}</h3>

      {isMyPage ? <MyPage /> : <YourPage />}
    </>
  );
}
