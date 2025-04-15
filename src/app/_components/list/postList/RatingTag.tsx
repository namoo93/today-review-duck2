import { getRatingText } from "@/app/_utils/ratingUtils";
import styles from "./list.module.css";

export default function RatingTag({ score }: { score: number }) {
  const ratingText = getRatingText(score);

  const ratingClass =
    score >= 0 && score <= 2
      ? styles.rating_tag_bad
      : score >= 3 && score <= 5
      ? styles.rating_tag_good
      : styles.none;

  return <span className={`${ratingClass}`}>평가: {ratingText}</span>;
}
