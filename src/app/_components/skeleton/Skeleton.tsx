import styles from "./skeleton.module.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
}

export default function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  margin,
  padding,
}: SkeletonProps) {
  return (
    <div
      className={styles.skeleton}
      style={{ width, height, borderRadius, margin, padding }}
    />
  );
}
