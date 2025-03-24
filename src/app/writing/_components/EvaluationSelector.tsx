"use client";

import { Icon, Button } from "@/app/_components/atoms";
import styles from "../_css/evaluationselector.module.css";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";

import IcoRange0Btn from "@/../../public/icon/icon-range-0.svg";
import IcoRange1Btn from "@/../../public/icon/icon-range-1.svg";
import IcoRange2Btn from "@/../../public/icon/icon-range-2.svg";
import IcoRange3Btn from "@/../../public/icon/icon-range-3.svg";
import IcoRange4Btn from "@/../../public/icon/icon-range-4.svg";
import IcoRange5Btn from "@/../../public/icon/icon-range-5.svg";

type EvaluationSelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function EvaluationSelector({
  value,
  onChange,
}: EvaluationSelectorProps) {
  const [theme] = useRecoilState(themeState);
  const states = [
    { label: "매우 화남", src: IcoRange0Btn },
    { label: "많이 화남", src: IcoRange1Btn },
    { label: "조금 화남", src: IcoRange2Btn },
    { label: "좋음", src: IcoRange3Btn },
    { label: "아주 좋음", src: IcoRange4Btn },
    { label: "매우 좋음", src: IcoRange5Btn },
  ];

  return (
    <div className={styles.selector_wrapper}>
      {states.map((state, index) => {
        const isDark = theme !== "light";
        const buttonClass = `${styles.select_button} ${
          isDark ? styles.select_button_dark : ""
        } ${
          value === index ? (isDark ? styles.active_dark : styles.active) : ""
        }`;

        return (
          <span key={`등록 폼 평가 ${state.label}`}>
            <button
              type="button"
              className={buttonClass}
              onClick={() => onChange(index)}
            >
              <Icon
                src={state.src}
                alt={`${state.label} 아이콘`}
                width={40}
                height={40}
              />
            </button>
            <span className={styles.label}>{state.label}</span>
          </span>
        );
      })}
    </div>
  );
}
