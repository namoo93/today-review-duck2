import styles from "./progressbar.module.css";

interface StepProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

export default function StepProgressBar({
  totalSteps,
  currentStep,
}: StepProgressBarProps) {
  return (
    <div className={styles.progress_bar}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`${styles.step} ${
            index == currentStep - 1 ? styles.active : styles.inactive
          }`}
        />
      ))}
    </div>
  );
}
