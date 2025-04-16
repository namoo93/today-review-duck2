"use client";
import { DropDown, Icon } from "@/app/_components/atoms";
import styles from "../_css/reviewdetails.module.css";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";
import IcoLike from "@/../../public/icon/icon-like.svg";
import IcoLikeOn from "@/../../public/icon/icon-like-on.svg";
import IcoBookmark from "@/../../public/icon/icon-bookmark.svg";
import IcoBookmarkOn from "@/../../public/icon/icon-bookmark-on.svg";
import IcoShare from "@/../../public/icon/icon-share.svg";
import ShareSnsList from "@/app/_components/list/shareSnsList/ShareSnsList";
import { useState } from "react";

export default function ReviewDetailFixedButtons() {
  const [theme] = useRecoilState(themeState);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const isLike = true;
  const isBookmark = true;

  return (
    <div className={styles.review_fixed_button_wrap}>
      <ul className={styles.fixed_button_list}>
        <li>
          <button
            type="button"
            className={styles.fixed_button}
            onClick={() => {}}
          >
            <Icon
              src={isLike ? IcoLikeOn : IcoLike}
              alt=""
              width={32}
              height={32}
            />

            <span
              className={
                theme == "light" ? styles.like_num : styles.like_num_dark
              }
            >
              {`${99}`}
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.fixed_button}
            onClick={() => {}}
          >
            <Icon
              src={isBookmark ? IcoBookmarkOn : IcoBookmark}
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
      </ul>
    </div>
  );
}
