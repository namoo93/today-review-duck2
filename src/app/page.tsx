import Header from "./_components/navigation/Header";
import ThemeButton from "./_components/fixedButton/FixedButton";
import Main from "./main/page";

export default function Home() {
  return (
    <>
      <Header />
      <Main></Main>
      <ThemeButton />
      {/* <footer className={styles.footer}></footer> */}
    </>
  );
}
