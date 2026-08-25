import { AnimatePresence } from "framer-motion";
import { useWindows } from "../../context/WindowContext.jsx";
import Window from "./Window.jsx";
import styles from "./WindowManager.module.css";

export default function WindowManager() {
  const { windows } = useWindows();

  return (
    <div className={styles.layer}>
      <AnimatePresence>
        {windows
          .filter((w) => !w.minimized)
          .map((w) => (
            <Window key={w.id} win={w} />
          ))}
      </AnimatePresence>
    </div>
  );
}
