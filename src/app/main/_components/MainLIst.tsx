"use client";
import styles from "../_css/mainlist.module.css";
import { useRecoilState } from "recoil";
import { themeState } from "@/app/_recoil";

import List from "@/app/_components/list/postList/List";

export default function MainList() {
  const [theme] = useRecoilState(themeState);

  return (
    <section className={styles.page}>
      <ul>
        <li>tab</li>
      </ul>
      <ul className={styles.list_wrap}>
        <List
          isManager
          alt={""}
          src={""}
          title={
            "xkdlxmf fjdakfj a fdkajf  fkdlak lfdak lfksdak ;lfdl kfldks;afklsfk kldakf jalfjdslf lsaklflsj sfjdklsfaj"
          }
          user={"fdajj kafkas lkf | 2024.05.05"}
          value={"good"}
          contents={
            "fjdlsajf lasjfjfjkjfk jjskfj lf ksdkfsklfjie. eijfefjslfjdfjs fksfjskfjsdk fkdfsl f fjksdf sk ldskfklkf lskfkskd ksdk ksfkskf lkskfk slfk kfksdlfksk.  kdfks lfksl ksfksflksekfk ksf kekfk sfkdl kfslkf kfk ksfdsfffe f wff. f wefefwff f. fe fwf. f. fefwfwfwfef f f f f ewfwfefwfwfw f fefw f f wf. fw fe fwfwfefw f ffwfew fwfewfwefw fwfwfweff wef fwf wf w f we f fw askfjsklj fsajf lskj lfksjf lsjfl sjkf jdslkajf lsj flsjflsd dsad adsdjkdjdjdsj jdjdajdjdsj jdsajdjdjsa jdsjadjas djadjajdj jdja djsdjsajd jdsj jajdjdjs jdsjdajdaj fda fdsafsa ds"
          }
        />
        <List
          alt={""}
          src={""}
          title={
            "xkdlxmf fjdakfj a fdkajf  fkdlak lfdak lfksdak ;lfdl kfldks;afklsfk kldakf jalfjdslf lsaklflsj sfjdklsfaj"
          }
          user={"fdajj kafkas lkf | 2024.05.05"}
          value={"good"}
          contents={
            "fjdlsajf lasjfjfjkjfk jjskfj lf ksdkfsklfjie. eijfefjslfjdfjs fksfjskfjsdk fkdfsl f fjksdf sk ldskfklkf lskfkskd ksdk ksfkskf lkskfk slfk kfksdlfksk.  kdfks lfksl ksfksflksekfk ksf kekfk sfkdl kfslkf kf"
          }
        />
        <List
          alt={""}
          src={""}
          title={
            "xkdlxmf fjdakfj a fdkajf kldakf jalfjdslf lsaklflsj sfjdklsfaj"
          }
          user={"fdajj kafkas lkf | 2024.05.05"}
          value={"good"}
          contents={
            "fjdlsajf lasjfjaskfjsklj fsajf lskj lfksjf lsjfl sjkf jdslkajf lsj flsjflsd"
          }
        />
      </ul>
    </section>
  );
}
