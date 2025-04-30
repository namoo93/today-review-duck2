import Link from "next/link";

export default function ToMobile() {
  return (
    <div className="mobile_only desktop_none">
      <p>모바일 앱으로 더 편하게 이용해보세요!</p>
      <div className="button_group">
        <Link
          href="https://play.google.com/store/apps/details?id=site.mylittlereviewduck"
          target="_blank"
          className="mobile_only_button"
        >
          Google Play 에서 다운로드
        </Link>
        <Link
          href="https://apps.apple.com/kr/app/오늘도-리뷰/id6744454725?l=en-GB"
          target="_blank"
          className="mobile_only_button"
        >
          App Store 에서 다운로드
        </Link>
      </div>
    </div>
  );
}
