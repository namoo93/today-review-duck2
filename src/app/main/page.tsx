"use client";

import { useRecoilState } from "recoil";
import { onSearchPageState } from "../_recoil";
import Banner from "./_components/Banner";
import MainList from "./_components/MainLIst";

export default function Main() {
  const [onSearchPage] = useRecoilState(onSearchPageState);

  return (
    <>
      <Banner />
      {onSearchPage ? <>-----search list</> : <MainList />}
    </>
  );
}
