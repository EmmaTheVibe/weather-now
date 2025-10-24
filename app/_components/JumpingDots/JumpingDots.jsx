import React from "react";
import styles from "./JumpingDots.module.css";

export default function JumpingDots() {
  return (
    <div
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
}
