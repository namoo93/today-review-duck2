"use client";

import { useRecoilState } from "recoil";
import { onSearchPageState } from "../_recoil";
import Banner from "./_components/Banner";
import MainListBox from "./_components/MainListBox";
import SearchListBox from "./_components/SearchListBox";
import FixedButton from "../_components/fixedButton/FixedButton";
import BannerSearch from "./_components/BannerSearch";
import Modal from "../_components/modal/Modal";

export default function Main() {
  const [onSearchPage] = useRecoilState(onSearchPageState);

  return (
    <>
      <Banner />
      <BannerSearch />
      <FixedButton />
      {onSearchPage ? <SearchListBox /> : <MainListBox />}
      <Modal width="400px" />
    </>
  );
}
