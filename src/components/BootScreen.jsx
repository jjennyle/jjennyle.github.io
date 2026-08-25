import { motion } from "framer-motion";
import styles from "./BootScreen.module.css";

const lines = [
  "Initializing workspace...",
  "Loading projects...",
  "Restoring previous session...",
];

export default function BootScreen() {
  return (
    <motion.div
      className={styles.boot}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        className={styles.mark}
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.dot} />
        <h1 className={styles.title}>jnieOS</h1>
      </motion.div>

      <div className={styles.lines}>
        {lines.map((l, i) => (
          <motion.p
            key={l}
            className={styles.line}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.28, duration: 0.4 }}
          >
            {l}
          </motion.p>
        ))}
      </div>

      <motion.div
        className={styles.barTrack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className={styles.barFill}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.25, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
