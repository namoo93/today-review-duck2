"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import styles from "./slider.module.css";
import { Icon } from "../atoms";

export type SliderItem = {
  img: string;
  infoText?: string;
  titleText?: string;
};

export type SliderProps = {
  items: SliderItem[];
  autoPlay?: boolean;
  loop?: boolean;
  centered?: boolean;
  showPagination?: boolean;
  slidePerView?: number;
  width: number;
  height: number;
};

export default function Slider({
  items,
  autoPlay = false,
  loop = true,
  centered = false,
  showPagination = true,
  slidePerView = 1,
  width,
  height,
}: SliderProps) {
  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={autoPlay ? { delay: 3000 } : false}
        spaceBetween={30}
        slidesPerView={slidePerView}
        loop={loop}
        centeredSlides={centered}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className={styles.slide}>
              <Icon
                width={width}
                height={height}
                src={item.img}
                alt={`슬라이드 이미지 ${idx + 1}`}
                className={styles.image}
              />
              {item.titleText && (
                <p className={styles.text}>
                  <span className={styles.text_info}>{item.infoText}</span>
                  <span className={styles.text_title}>{item.titleText}</span>
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
