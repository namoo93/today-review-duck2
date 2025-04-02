import Header from "./_components/navigation/Header";
import ToMobile from "./_components/navigation/ToMobile";
import Main from "./main/page";

export default function Home() {
  return (
    <>
      <Header />
      <Main></Main>

      {/* <footer className={styles.footer}></footer> */}
      <ToMobile />
    </>
  );
}
