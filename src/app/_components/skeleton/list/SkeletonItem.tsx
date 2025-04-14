import Skeleton from "../Skeleton";
import styles from "./skeleton.module.css";

interface SkeletonProps {
  width?: string;
}

export default function SkeletonItem({ width = "100%" }: SkeletonProps) {
  return (
    <div className={styles.skeleton_wrap} style={{ width }}>
      <Skeleton width="300px" height="300px" borderRadius="12px" />
      <div style={{ width: "calc(100% - 300px)" }}>
        <Skeleton height="60px" borderRadius="12px" margin="0 0 30px 0" />
        <Skeleton
          width="100px"
          height="30px"
          borderRadius="12px"
          margin="20px 0 30px 0"
        />
        <Skeleton height="25px" borderRadius="12px" margin="0 0 5px 0" />
        <Skeleton height="25px" borderRadius="12px" margin="0 0 5px 0" />
        <Skeleton height="25px" borderRadius="12px" margin="0 0 5px 0" />
        <Skeleton height="25px" borderRadius="12px" margin="0 0 5px 0" />
        <Skeleton height="25px" borderRadius="12px" margin="0 0 5px 0" />
      </div>
    </div>
  );
}
