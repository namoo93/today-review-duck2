"use client";
import { ThemeProvider } from "@/app/_theme/ThemeProvider";
import Header from "./_components/navigation/Header";
import Main from "./main/page";
import styles from "./page.module.css";
import ThemeToggle from "./_components/themeButton/\bThemeToggle";

export default function Home() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Main></Main>
        <ThemeToggle />
        <footer className={styles.footer}></footer>
      </ThemeProvider>
    </>
  );
}
