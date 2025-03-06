import styles from "./css/radio.module.css";

type Props = { text: string };
export default function Radio({}: Props) {
  return <span className={styles.radio}></span>;
}
