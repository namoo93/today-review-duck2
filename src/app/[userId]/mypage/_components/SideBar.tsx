import styles from "../_css/sidebar.module.css";
import Lnb from "./Lnb";

export default function SideBar() {
  return (
    <div className={styles.page}>
      <dl>
        <dt id="post-label">게시글</dt>
        <dd aria-labelledby="post-label">
          <button type="button" onClick={() => {}}>
            10개
          </button>
        </dd>

        <dt id="follower-label">덕후</dt>
        <dd aria-labelledby="follower-label">
          <button type="button" onClick={() => {}}>
            82명
          </button>
        </dd>

        <dt id="follow-label">덕질</dt>
        <dd aria-labelledby="follow-label">
          <button type="button" onClick={() => {}}>
            42명
          </button>
        </dd>
      </dl>

      <Lnb />
    </div>
  );
}
