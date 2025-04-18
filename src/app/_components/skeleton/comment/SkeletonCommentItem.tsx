import Skeleton from "../Skeleton";
import styles from "./skeleton.module.css";

interface SkeletonProps {
  width?: string;
}

export default function SkeletonCommentItem({ width = "100%" }: SkeletonProps) {
  return (
    <div className={styles.skeleton_wrap} style={{ width }}>
      <div className={styles.row}>
        <Skeleton
          width="50px"
          height="50px"
          borderRadius="50px"
          margin="20px 0 20px 0"
        />
        <div>
          <Skeleton
            width="300px"
            height="24px"
            borderRadius="24px"
            margin="0 0 5px 10px"
          />
          <Skeleton
            width="200px"
            height="24px"
            borderRadius="24px"
            margin="0 0 0 10px"
          />
        </div>
      </div>
      <Skeleton width="100%" height="24px" borderRadius="24px" />
      <Skeleton
        width="100%"
        height="24px"
        borderRadius="24px"
        margin="5px 0 5px 0 "
      />
      <Skeleton width="100%" height="24px" borderRadius="24px" />
    </div>
  );
}
