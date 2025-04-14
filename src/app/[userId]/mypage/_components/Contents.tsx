import { useRecoilValue } from "recoil";
import styles from "../_css/mypage.module.css";
import BlockedAccounts from "./subpages/BlockedAccounts";
import Notices from "./subpages/Notices";
import ProfileSettings from "./subpages/ProfileSettings";
import ReviewListSection from "./subpages/ReviewListSection";
import { myInfoState } from "@/app/_recoil/myInfoAtom";

export default function Contents({ selectedMenu }: { selectedMenu: string }) {
  const myInfo = useRecoilValue(myInfoState);
  const myIdx = myInfo?.idx as string;

  const renderComponent = () => {
    switch (selectedMenu) {
      case "기본 프로필 설정":
        return <ProfileSettings />;
      case "차단한 계정":
        return <BlockedAccounts />;
      case "작성한 리뷰":
        return (
          <ReviewListSection
            userIdx={myIdx}
            type="written"
            title="작성한 리뷰"
          />
        );
      case "댓글단 리뷰":
        return (
          <ReviewListSection
            userIdx={myIdx}
            type="commented"
            title="댓글 단 리뷰"
          />
        );
      case "좋아요 누른 리뷰":
        return (
          <ReviewListSection
            userIdx={myIdx}
            type="like"
            title="좋아요 누른 리뷰"
          />
        );
      case "북마크한 리뷰":
        return (
          <ReviewListSection
            userIdx={myIdx}
            type="bookmark"
            title="북마크 된 리뷰"
          />
        );
      case "공지사항":
        return <Notices />;
      case "약관":
        return <>새창으로 링크 열기</>;
      case "정책":
        return <>새창으로 링크 열기</>;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className={styles.contents}>
      <h4
        className={
          selectedMenu == "기본 프로필 설정"
            ? `sr_only ${styles.contents_title}`
            : `${styles.contents_title}`
        }
      >{`${selectedMenu}`}</h4>
      <div>{renderComponent()}</div>
    </div>
  );
}
