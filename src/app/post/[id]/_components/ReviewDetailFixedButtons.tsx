"use client";
import { DropDown, Icon } from "@/app/_components/atoms";
import styles from "../_css/reviewdetails.module.css";
import { useRecoilValue } from "recoil";
import { themeState, userIdxState } from "@/app/_recoil";
import IcoLike from "@/../../public/icon/icon-like.svg";
import IcoLikeOn from "@/../../public/icon/icon-like-on.svg";
import IcoBookmark from "@/../../public/icon/icon-bookmark.svg";
import IcoBookmarkOn from "@/../../public/icon/icon-bookmark-on.svg";
import IcoShare from "@/../../public/icon/icon-share.svg";
import IcoMore from "@/../../public/icon/icon-my-more.svg";
import ShareSnsList from "@/app/_components/list/shareSnsList/ShareSnsList";
import { Dispatch, SetStateAction, useState } from "react";
import { ReviewDetailType } from "@/types";
import { useToggleLike } from "@/app/_hooks/useToggleLike";
import { useToggleBookmark } from "@/app/_hooks/useToggleBookmark";
import ToastContainer from "@/app/_components/toast/ToastContainer";
import { useToast } from "@/app/_hooks/useToast";
import TextButtonList from "@/app/_components/list/textButtonList/TextButtonList";
import { useDeleteReview } from "@/app/_hooks/useDeleteReview";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/modal/Modal";
import { useModal } from "@/app/_hooks/useModal";
import ReviewReportModal from "./ReviewReportModal";

export default function ReviewDetailFixedButtons({
  review,
  setReview,
}: {
  review: ReviewDetailType;
  setReview: Dispatch<SetStateAction<ReviewDetailType | null>>;
}) {
  const theme = useRecoilValue(themeState);
  const userIdx = useRecoilValue(userIdxState);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isListDropDownOpen, setIsListDropDownOpen] = useState(false);
  const { handleToggle: toggleLike } = useToggleLike();
  const { handleToggle: toggleBookmark } = useToggleBookmark();
  const { mutate: deleteReview } = useDeleteReview();
  const router = useRouter();
  const { openModal } = useModal();
  const { addToast } = useToast();

  const handleLike = () => {
    if (!userIdx) {
      addToast("로그인이 필요한 기능이에요 🐥", "error");
      return;
    }
    toggleLike(review.idx, review.isMyLike);
    // UI 동기화
    setReview((prev) =>
      prev
        ? {
            ...prev,
            isMyLike: !prev.isMyLike,
            likeCount: prev.isMyLike ? prev.likeCount - 1 : prev.likeCount + 1,
          }
        : prev
    );
  };

  const handleBookmark = () => {
    if (!userIdx) {
      addToast("로그인이 필요한 기능이에요 🐥", "error");
      return;
    }
    toggleBookmark(review.idx, review.isMyBookmark);
    // UI 동기화
    setReview((prev) =>
      prev ? { ...prev, isMyBookmark: !prev.isMyBookmark } : prev
    );
  };

  const handleDelete = () => {
    deleteReview(review.idx, {
      onSuccess: () => {
        addToast("리뷰가 삭제되었어요 🧼", "success");
        router.back();
      },
      onError: () => {
        addToast("삭제 중 오류가 발생했어요 😢", "error");
      },
    });
  };

  const handleEdit = () => {
    router.push(`/writing/${review.idx}`);
  };

  const handleReport = (idx: number) => {
    if (!userIdx) {
      addToast("로그인이 필요한 기능이에요 🐥", "error");
      return;
    }
    openModal(<ReviewReportModal reviewIdx={idx} />);
  };

  return (
    <div className={styles.review_fixed_button_wrap}>
      <ul className={styles.fixed_button_list}>
        <li>
          <button
            type="button"
            className={styles.fixed_button}
            onClick={handleLike}
          >
            <Icon
              src={review.isMyLike ? IcoLikeOn : IcoLike}
              alt=""
              width={32}
              height={32}
            />

            <span
              className={
                theme == "light" ? styles.like_num : styles.like_num_dark
              }
            >
              {review.likeCount}
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.fixed_button}
            onClick={handleBookmark}
          >
            <Icon
              src={review.isMyBookmark ? IcoBookmarkOn : IcoBookmark}
              alt=""
              width={32}
              height={32}
            />
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.fixed_button}
            onClick={() => setIsDropDownOpen((prev) => !prev)}
          >
            <Icon src={IcoShare} alt="" width={32} height={32} />
            <DropDown
              margin="-2px 0 0 60px"
              width="240px"
              position="left"
              isOpen={isDropDownOpen}
              onClose={() => setIsDropDownOpen(false)}
            >
              <ShareSnsList />
            </DropDown>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.fixed_button}
            onClick={() => setIsListDropDownOpen((prev) => !prev)}
          >
            <Icon src={IcoMore} alt="" width={32} height={32} />
            <DropDown
              margin="-2px 0 0 60px"
              width="170px"
              position="left"
              isOpen={isListDropDownOpen}
              onClose={() => setIsListDropDownOpen(false)}
            >
              <ul>
                {userIdx == review.user.idx ? (
                  <>
                    <TextButtonList onClkickList={handleDelete}>
                      게시글 삭제하기
                    </TextButtonList>
                    <TextButtonList onClkickList={handleEdit}>
                      게시글 수정하기
                    </TextButtonList>
                  </>
                ) : (
                  <TextButtonList onClkickList={() => handleReport(review.idx)}>
                    게시글 신고하기
                  </TextButtonList>
                )}
              </ul>
            </DropDown>
          </button>
        </li>
      </ul>
      <ToastContainer
        width="335px"
        top="100px"
        right="50%"
        transform="translateX(50%)"
      />
    </div>
  );
}
