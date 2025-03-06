import styles from "./css/tooltip.module.css";

type Props = { text: string };
export default function Tooltip({}: Props) {
  return <span className={styles.tooltip}></span>;
}
