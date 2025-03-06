import styles from "./_css/header.module.css";
import Image from "next/image";
import Logo from "@/../public/images/logo.svg";
import Link from "next/link";
import Aside from "./Aside";
import Gnb from "./Gnb";

export default function Header() {
  return (
    <header className={styles.page}>
      <h1 className={styles.logo}>
        <Link href={"./"}>
          <Image
            src={Logo}
            alt="logo image"
            loading="lazy"
            property={"public/images/logo.svg"}
          />
        </Link>
      </h1>
      <Gnb />
      <Aside />
    </header>
  );
}
