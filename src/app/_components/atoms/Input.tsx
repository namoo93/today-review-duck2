import styles from "./css/input.module.css";

type Props = { text: string };
export default function Input({}: Props) {
  return <span className={styles.input}></span>;
}
