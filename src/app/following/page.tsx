"use client";

import { useRecoilState } from "recoil";
import { onSearchPageState } from "../_recoil";
import Banner from "../main/_components/Banner";
import BannerSearch from "../main/_components/BannerSearch";
import FixedButton from "../_components/fixedButton/FixedButton";
import SearchListBox from "../main/_components/SearchListBox";
import MainListBox from "../main/_components/MainListBox";
import Header from "../_components/navigation/Header";
import ToMobile from "../_components/navigation/ToMobile";

export default function Main() {
  const [onSearchPage] = useRecoilState(onSearchPageState);

  return (
    <>
      <Header />
      <Banner />
      <BannerSearch />
      <FixedButton />
      {onSearchPage ? <SearchListBox /> : <MainListBox />}
      <ToMobile />
    </>
  );
}
