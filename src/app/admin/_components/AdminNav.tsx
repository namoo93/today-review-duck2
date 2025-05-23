import { Dispatch, SetStateAction } from "react";
import styles from "../_css/admin.module.css";
import { Icon } from "@/app/_components/atoms";
import IcoArrowOff from "@/../public/icon/icon-arrow-off.svg";
import IcoArrowOn from "@/../public/icon/icon-arrow-on.svg";
import { useRouter } from "next/navigation";
import useLogout from "@/app/_hooks/useLogout";
import { activeItemState } from "@/app/_recoil";
import { useRecoilState } from "recoil";

export default function AdminNav({
  setCurrent,
  current,
}: {
  setCurrent: Dispatch<SetStateAction<string>>;
  current: string;
}) {
  const [, setActiveItem] = useRecoilState(activeItemState);
  const router = useRouter();
  const logout = useLogout();

  const getClass = (label: string) =>
    current === label
      ? `${styles.nav_subtitle} ${styles.on}`
      : styles.nav_subtitle;

  const getIcon = (label: string) =>
    current === label ? IcoArrowOn : IcoArrowOff;

  return (
    <div className={styles.admin_nav_wrap}>
      <nav aria-label="관리자 네비게이션" className={styles.admin_nav}>
        <ul>
          <li>
            <h2 className={styles.nav_title}>운영 관리</h2>
            <ul>
              <li className={styles.nav_list_item}>
                <button
                  className={getClass("announcement_list")}
                  onClick={() => setCurrent("announcement_list")}
                >
                  <h3>공지사항</h3>
                  <Icon
                    width={20}
                    height={20}
                    src={getIcon("announcement_list")}
                    alt="화살표 아이콘"
                  />
                </button>
              </li>
            </ul>
          </li>

          <li>
            <h2 className={styles.nav_title}>유저 관리</h2>
            <ul>
              <li className={styles.nav_list_item}>
                <button
                  className={getClass("user_list")}
                  onClick={() => setCurrent("user_list")}
                >
                  <h3>유저 리스트</h3>
                  <Icon
                    width={20}
                    height={20}
                    src={getIcon("user_list")}
                    alt="화살표 아이콘"
                  />
                </button>
              </li>
              <li className={styles.nav_list_item}>
                <button
                  className={getClass("opinion_list")}
                  onClick={() => setCurrent("opinion_list")}
                >
                  <h3>의견 리스트</h3>
                  <Icon
                    width={20}
                    height={20}
                    src={getIcon("opinion_list")}
                    alt="화살표 아이콘"
                  />
                </button>
              </li>
            </ul>
          </li>

          <li>
            <h2 className={styles.nav_title}>신고 관리</h2>
            <ul>
              <li className={styles.nav_list_item}>
                <button
                  className={getClass("report")}
                  onClick={() => setCurrent("report")}
                >
                  <h3>신고 내역</h3>
                  <Icon
                    width={20}
                    height={20}
                    src={getIcon("report")}
                    alt="화살표 아이콘"
                  />
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className={styles.button_box}>
        <button
          type="button"
          onClick={() => {
            router.push("/");
            setActiveItem("최신");
          }}
          className={styles.bottom_button}
        >
          메인으로
        </button>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
            setActiveItem("최신");
          }}
          className={styles.bottom_button}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
