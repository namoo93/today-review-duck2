import { getRatingText } from "@/app/_utils/ratingUtils";
import styles from "./list.module.css";

export default function RatingTag({ score }: { score: number }) {
  const ratingText = getRatingText(score);

  const ratingClass =
    score >= 1 && score <= 3
      ? styles.rating_tag_bad
      : score >= 4 && score <= 6
      ? styles.rating_tag_good
      : styles.none;

  return <span className={`${ratingClass}`}>평가: {ratingText}</span>;
}
