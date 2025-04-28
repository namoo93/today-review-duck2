import Skeleton from "../Skeleton";
import styles from "./skeleton.module.css";

interface SkeletonProps {
  width?: string;
}

export default function SkeletonListItem({ width = "100%" }: SkeletonProps) {
  return (
    <div className={styles.skeleton_wrap} style={{ width }}>
      <Skeleton width="210px" height="210px" borderRadius="12px" />
      <div style={{ width: "calc(100% - 210px)" }}>
        <Skeleton height="40px" borderRadius="12px" margin="0 0 10px 0" />
        <Skeleton
          width="100px"
          height="30px"
          borderRadius="12px"
          margin="20px 0 30px 0"
        />
        <Skeleton height="25px" borderRadius="12px" margin="0 0 5px 0" />
        <Skeleton height="25px" borderRadius="12px" margin="0 0 5px 0" />
        <Skeleton height="25px" borderRadius="12px" margin="0 0 5px 0" />
      </div>
    </div>
  );
}
