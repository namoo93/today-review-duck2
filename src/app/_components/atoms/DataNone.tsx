import styles from "./_css/datanone.module.css";

type Props = { target: string };
export default function DataNone({ target }: Props) {
  return <p className={styles.empty_text}>아직 {target}가 없어요</p>;
}
