import styles from "./_css/header.module.css";

import Aside from "./Aside";
import Gnb from "./Gnb";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className={styles.page}>
      <h1 className={styles.logo}>
        <Logo />
      </h1>
      <Gnb />
      <Aside />
    </header>
  );
}
