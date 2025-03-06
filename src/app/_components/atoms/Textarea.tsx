import styles from "./_css/textarea.module.css";

type Props = { text: string };
export default function Textarea({}: Props) {
  return <span className={styles.textarea}></span>;
}
