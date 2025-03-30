"use client";

import { useRecoilState } from "recoil";
import { onSearchPageState } from "../_recoil";
import Banner from "./_components/Banner";
import MainList from "./_components/MainList";
import SearchList from "./_components/SearchList";
import FixedButton from "../_components/fixedButton/FixedButton";

export default function Main() {
  const [onSearchPage] = useRecoilState(onSearchPageState);

  return (
    <>
      <Banner />
      <FixedButton />
      {onSearchPage ? <SearchList /> : <MainList />}
    </>
  );
}
