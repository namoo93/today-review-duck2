import Skeleton from "../Skeleton";
import styles from "./skeleton.module.css";

interface SkeletonProps {
  width?: string;
}

export default function SkeletonUserItem({ width = "100%" }: SkeletonProps) {
  return (
    <div className={styles.skeleton_wrap} style={{ width }}>
      <Skeleton width="50px" height="50px" borderRadius="50%" />
      <div style={{ width: "190px" }}>
        <Skeleton height="20px" borderRadius="12px" margin="0 0 5px 0" />
        <Skeleton height="20px" borderRadius="12px" />
      </div>
      <Skeleton height="40px" width="75px" borderRadius="10px" />
    </div>
  );
}
