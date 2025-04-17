"use client";
import Header from "@/app/_components/navigation/Header";
import WritingForm from "../_components/WritingForm";
import ToMobile from "@/app/_components/navigation/ToMobile";
import { useParams } from "next/navigation";

export default function Editing() {
  const { id } = useParams();
  const reviewIdx = Number(id);

  return (
    <>
      <Header />
      <WritingForm reviewIdx={reviewIdx} />
      <ToMobile />
    </>
  );
}
