"use client";
import { Icon } from "@/app/_components/atoms";
import styles from "../_css/reviewdetails.module.css";
import IcoBack from "@/../../public/icon/icon-back.svg";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";
import { useRef, useState } from "react";
import { useHorizontalScroll } from "@/app/_hooks/useHorizontalScroll";

export default function ReviewDetailContents() {
  const [theme] = useRecoilState(themeState);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState(["", "", "", ""]);
  useHorizontalScroll(containerRef, {
    width: "calc(100% + 4px)",
    height: "320px",
  });

  return (
    <div className={styles.review_detail_contents}>
      <strong className={styles.review_detail_title}>
        {`${"title title eee ee ekfdaj fa fda nfjsnd fja jf fjkd ajkfj lafkdj lfjd fjkdaj fjdk ajfkd jlk jkaj kl jdfjkl jkfj akljfskj sjfdsk jlk sk jfsdlj flsj ks sfsn"}`}
      </strong>
      <span className={styles.review_detail_user}>
        <span
          className={
            theme == "light"
              ? styles.review_detail_user_icon
              : styles.review_detail_user_icon_dark
          }
        >
          <Icon src="" alt="" width={24} height={24} />
        </span>
        <span
          className={styles.review_detail_user_text}
        >{`${"닉네임 명"} | ${"작성 날자"}`}</span>
      </span>
      <div ref={containerRef} className={styles.review_detail_images}>
        <div className={styles.image_box_wrap}>
          {images.map((image, idx) => (
            <span key={`${image} ${idx}`} className={styles.image_box}>
              <Icon width={300} height={300} src={image} alt="" />
            </span>
          ))}
        </div>
      </div>
      <div className={styles.review_detail_evaluation}>
        <span
          className={
            theme == "light"
              ? styles.review_evaluation
              : styles.review_evaluation_dark
          }
        >{`평가: ${"좋음"}`}</span>
      </div>
      <p className={styles.review_detail_text}>
        {`이 제품을 사용해본 후 매우 만족스러웠습니다. 디자인이 세련되고 사용법도 직관적이어서 처음 사용하는 사람도 쉽게 익힐 수 있었습니다.
기능 면에서도 기대 이상이었으며 특히 배터리 수명이 길어 자주 충전할 필요가 없어 편리했습니다.

단, 설명서가 조금 부족해서 처음 설치할 때 다소 시간이 걸렸지만 유튜브 튜토리얼을 참고하니 해결할 수 있었습니다. 가격 대비 성능이 훌륭하며 다른 사람들에게도 강력히 추천하고 싶습니다. 다만, 특정 기능에 대한 개선이 이루어진다면 더욱 완벽한 제품이 될 것 같습니다.

전반적으로 만족스러운 구매 경험이었고 다음에도 이 브랜드의 제품을 고려해볼 예정입니다.`}
      </p>
    </div>
  );
}
