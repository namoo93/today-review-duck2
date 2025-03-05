import Header from "./_components/navigation/Header";
import Providers from "./_providers/providers";
import Main from "./main/page";

export default function Home() {
  return (
    <Providers>
      <Header />
      <Main></Main>
      {/* <footer className={styles.footer}></footer> */}
    </Providers>
  );
}
