"use client";

import { useRecoilState } from "recoil";
import { onSearchPageState, themeState } from "../_recoil";
import Banner from "./_components/Banner";
import MainList from "./_components/MainLIst";

export default function Main() {
  const [theme] = useRecoilState(themeState);
  const [onSearchPage] = useRecoilState(onSearchPageState);
  // console.log("theme -----", theme);

  return (
    <>
      <Banner />
      Main Page - Theme: {theme}
      <br />
      {onSearchPage ? <>-----search list</> : <MainList />}
    </>
  );
}
