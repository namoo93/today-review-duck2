"use client"; // ✅ 클라이언트 컴포넌트로 변환

import { useRecoilState } from "recoil";
import { themeState } from "../_recoil/themeAtom";

export default function Main() {
  const [theme] = useRecoilState(themeState);

  console.log("theme -----", theme);

  return <div>Main Page - Theme: {"theme"}</div>;
}
