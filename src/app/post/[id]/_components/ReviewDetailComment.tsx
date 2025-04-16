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

export default function ReviewDetailComment() {
  const [theme] = useRecoilState(themeState);
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  return (
    <div className={styles.review_comment_wrap}>
      <div className={styles.review_comment_header}>
        <Icon src={IcoComment} alt="댓글 아이콘" width={24} height={24} />
        <span className={styles.review_comment_info}>
          리뷰에 달린 댓글
          <strong className={styles.review_comment_info_num}>{`${0}개`}</strong>
        </span>
      </div>
      <div className={styles.review_comment_body}>
        {/* 개별 댓글들 */}
        <div className={`${styles.comment_box} ${styles.depth1} `}>
          <div className={`${styles.comment_user_box}`}>
            <div className={`${styles.comment_user}`}>
              <span
                className={`${
                  theme == "light"
                    ? styles.comment_user_profile
                    : styles.comment_user_profile_dark
                }`}
              >
                <Icon src="" width={50} height={50} alt="유저 아이콘" />
              </span>
              <div className={`${styles.comment_user_name}`}>
                <span className={`${styles.user_profile_name}`}>
                  {`${"user01 dsad dsad sd"}`}
                  <span
                    className={`${styles.user_profile_time}`}
                  >{`${2025}.01.01 23:12`}</span>
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
                    <button
                      type="button"
                      className={`${styles.comment_user_tag_button}`}
                    >
                      리뷰태그
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`${styles.comment_user_tag_button}`}
                    >
                      리뷰태그
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <p className={`${styles.comment}`}>
              좋은 질문 감사합니다! 개선이 필요하다고 느낀 부분은 앱과의
              연동성입니다. 가끔 앱이 기기를 인식하지 못하거나 연결이 끊기는
              경우가 있었어요. 소프트웨어 업데이트로 해결될 수 있을 것 같지만,
              이 부분만 개선된다면 더 완벽한 제품이 될 것 같습니다.
            </p>
          </div>
        </div>

        {/* 댓글 인풋 */}
        <div className={styles.comment_input_box}>
          <div className={styles.comment_input_wrap}>
            <input
              className={styles.comment_input}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="댓글을  작성해 주세요."
            />
            <Button
              transparent
              onClick={() => {}}
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
