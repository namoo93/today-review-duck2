import Skeleton from "../Skeleton";
import styles from "./skeleton.module.css";

interface SkeletonProps {
  width?: string;
}

export default function SkeletonItem({ width = "100%" }: SkeletonProps) {
  return (
    <div className={styles.skeleton_wrap} style={{ width }}>
      <div className={styles.row}>
        <Skeleton
          width="48px"
          height="48px"
          borderRadius="8px"
          margin="0 0 20px 0"
        />
        <Skeleton
          width="48px"
          height="48px"
          borderRadius="8px"
          margin="0 0 20px 0"
        />
        <Skeleton width="48px" height="48px" borderRadius="8px" />
      </div>

      <div style={{ width: "963px" }}>
        <Skeleton height="60px" borderRadius="12px" margin="0 0 30px 0" />
        <Skeleton
          width="200px"
          height="30px"
          borderRadius="12px"
          margin="20px 0 30px 0"
        />
        <div className={styles.skeleton_wrap}>
          <Skeleton width="300px" height="300px" borderRadius="12px" />
          <Skeleton width="300px" height="300px" borderRadius="12px" />
          <Skeleton width="300px" height="300px" borderRadius="12px" />
        </div>
        <Skeleton
          width="100px"
          height="30px"
          borderRadius="12px"
          margin="30px 0"
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
