"use client";

import { useRecoilState } from "recoil";
import { onSearchPageState } from "../_recoil";
import Banner from "./_components/Banner";
import MainListBox from "./_components/MainListBox";
import SearchListBox from "./_components/SearchListBox";
import FixedButton from "../_components/fixedButton/FixedButton";

export default function Main() {
  const [onSearchPage] = useRecoilState(onSearchPageState);

  return (
    <>
      <Banner />
      <FixedButton />
      {onSearchPage ? <SearchListBox /> : <MainListBox />}
    </>
  );
}
