import Link from "next/link";

export default function ToMobile() {
  return (
    <div className="mobile_only">
      <p>모바일 앱으로 더 편하게 이용해보세요!</p>
      <Link
        href="https://play.google.com/store/apps/details?id=site.mylittlereviewduck"
        target="_blank"
        className="mobile_only_button"
      >
        안드로이드 앱 다운로드
      </Link>
    </div>
  );
}
