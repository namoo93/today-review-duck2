import styles from "./_css/avatar.module.css";
// import profileDefault from "@/../../public/image/img-default-profile.svg";

type Props = {
  src?: string | null | undefined;
  width?: string | number;
  height?: string | number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function Avatar({
  // src,
  width = "40px",
  height = "40px",
  onClick,
}: Props) {
  return (
    <button
      className={styles.avatar}
      style={{ width: width, height: height }}
      onClick={onClick}
    >
      {/* <Icon src={src ? src : profileDefault} alt={"프로필 이미지"} /> */}
    </button>
  );
}
