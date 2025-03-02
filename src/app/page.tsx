import Gnb from "./_components/navigation/Gnb";
import Main from "./main/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Gnb />
      <Main></Main>
      <footer className={styles.footer}></footer>
    </>
  );
}
