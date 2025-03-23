import Header from "./_components/navigation/Header";
import FixedButton from "./_components/fixedButton/FixedButton";
import Main from "./main/page";

export default function Home() {
  return (
    <>
      <Header />
      <Main></Main>
      <FixedButton />
      {/* <footer className={styles.footer}></footer> */}
    </>
  );
}
