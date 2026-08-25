import styles from "./TrafficLights.module.css";

export default function TrafficLights({ onClose, onMinimize, onMaximize }) {
  return (
    <div className={styles.lights}>
      <button className={`${styles.light} ${styles.close}`} onClick={onClose} aria-label="Close">
        <span className={`${styles.icon} ${styles.iconSm}`}>✕</span>
      </button>
      <button className={`${styles.light} ${styles.min}`} onClick={onMinimize} aria-label="Minimize">
        <span className={styles.icon}>−</span>
      </button>
      <button className={`${styles.light} ${styles.max}`} onClick={onMaximize} aria-label="Maximize">
        <span className={styles.icon}>⤢</span>
      </button>
    </div>
  );
}
