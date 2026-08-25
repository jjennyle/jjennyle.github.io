import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { apps } from "../../apps/registry.js";
import { about } from "../../data/about.js";
import { useClock } from "../../hooks/useClock.js";
import styles from "./MobileShell.module.css";

export default function MobileShell() {
  const [active, setActive] = useState(null);
  const now = useClock();
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const Body = active?.component;

  return (
    <div className={styles.shell}>
      <header className={styles.top}>
        <span className={styles.os}><span className={styles.dot} /> jnieOS</span>
        <span className={styles.time}>{time}</span>
      </header>

      <div className={styles.hero}>
        <p className={styles.hi}>Welcome back,</p>
        <h1 className={styles.name}>{about.name.split(" ")[0]}</h1>
        <p className={styles.role}>{about.role}</p>
      </div>

      <div className={styles.cards}>
        {apps.map((app, i) => {
          const Icon = app.icon;
          return (
            <motion.button
              key={app.id}
              className={styles.appCard}
              onClick={() => setActive(app)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className={styles.cardIcon}><Icon size={24} strokeWidth={1.6} /></span>
              <span className={styles.cardTitle}>{app.title}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className={styles.sheet}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <header className={styles.sheetTop}>
              <button className={styles.back} onClick={() => setActive(null)}>
                <ChevronLeft size={18} /> Home
              </button>
              <span className={styles.sheetTitle}>{active.title}</span>
              <span style={{ width: 60 }} />
            </header>
            <div className={styles.sheetBody}>{Body && <Body />}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
