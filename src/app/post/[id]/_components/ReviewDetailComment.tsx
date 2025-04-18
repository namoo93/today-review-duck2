"use client";
import { Button, Icon } from "@/app/_components/atoms";
import styles from "../_css/reviewdetails.module.css";
import IcoComment from "@/../../public/icon/icon-comment-thin.svg";
import IocMoreview from "@/../../public/icon/icon-moreview.svg";
import IocSend from "@/../../public/icon/icon-send-fill.svg";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";
import { useState } from "react";
import { useCreateComment } from "@/app/_hooks/useCreateComment";
import { useCommentList } from "@/app/_hooks/useCommentList";
import Pagination from "@/app/_components/pagination/Pagination";
import DataNone from "@/app/_components/atoms/DataNone";
import SkeletonCommentItem from "@/app/_components/skeleton/comment/SkeletonCommentItem";
import { formatDate } from "@/app/_utils/date";

export default function ReviewDetailComment({
  reviewIdx,
  commentCount,
}: {
  reviewIdx: number;
  commentCount: number;
}) {
  const [theme] = useRecoilState(themeState);
  const [comment, setComment] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data: commentData, isLoading } = useCommentList(
    reviewIdx,
    currentPage
  );
  const createComment = useCreateComment(reviewIdx);

  const totalPages = commentData?.totalPage ?? 1;
  const commentList = commentData?.comments ?? [];

  const handleSubmit = () => {
    if (!comment.trim()) return;

    const payload = {
      commentIdx: null,
      userIdxs: [],
      content: comment.trim(),
    };

    createComment.mutate(payload);
    setComment("");
  };

  const goToUserPage = (user: string) => {
    router.push(`/mypage/${user}`);
  };

  return (
    <div className={styles.review_comment_wrap}>
      <div className={styles.review_comment_header}>
        <Icon src={IcoComment} alt="댓글 아이콘" width={24} height={24} />
        <span className={styles.review_comment_info}>
          리뷰에 달린 댓글
          <strong
            className={styles.review_comment_info_num}
          >{`${commentCount}개`}</strong>
        </span>
      </div>
      <div className={styles.review_comment_body}>
        {/* 개별 댓글들 */}
        {isLoading && <SkeletonCommentItem />}
        {commentList.length == 0 && !isLoading && (
          <DataNone target="등록 된 댓글" />
        )}
        {commentList.length > 0 &&
          commentList.map((comment) => (
            <div className={`${styles.comment_box} ${styles.depth1} `}>
              <div className={`${styles.comment_user_box}`}>
                <div className={`${styles.comment_user}`}>
                  <button
                    type="button"
                    onClick={() => goToUserPage(comment.user.idx)}
                    className={`${
                      theme == "light"
                        ? styles.comment_user_profile
                        : styles.comment_user_profile_dark
                    }`}
                  >
                    <Icon
                      src={comment.user.profileImg || ""}
                      width={50}
                      height={50}
                      alt={`${comment.user.nickname} 프로필 이미지`}
                    />
                  </button>
                  <div className={`${styles.comment_user_name}`}>
                    <span className={`${styles.user_profile_name}`}>
                      {`${comment.user.nickname}`}
                      <span className={`${styles.user_profile_time}`}>
                        {formatDate(comment.createdAt)}
                      </span>
                      <Button
                        onClick={() => {}}
                        transparent
                        buttonType={"button"}
                        className={`${styles.user_profile_button}`}
                      >
                        <Icon
                          src={IocMoreview}
                          alt="더보기 버튼"
                          width={20}
                          height={20}
                        />
                      </Button>
                    </span>
                    <ul className={`${styles.comment_user_tags_list}`}>
                      <li>
                        <span className={`${styles.comment_user_tag_button}`}>
                          {comment.user.interest1}
                        </span>
                      </li>
                      <li>
                        <span className={`${styles.comment_user_tag_button}`}>
                          {comment.user.interest2}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <button type="button" className={`${styles.comment}`}>
                  {comment.content}
                </button>
              </div>
            </div>
          ))}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            margin="30px 0"
          />
        )}

        {/* 댓글 인풋 */}
        <div className={styles.comment_input_box}>
          <div className={styles.comment_input_wrap}>
            <textarea
              className={styles.comment_input}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="댓글을  작성해 주세요."
              maxLength={3000}
              minLength={1}
            />
            <Button
              transparent
              onClick={handleSubmit}
              buttonType="button"
              className={styles.comment_button}
            >
              <Icon
                src={IocSend}
                alt="보내기 버튼 아이콘"
                width={24}
                height={24}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
