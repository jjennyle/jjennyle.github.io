import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { journal } from "../../data/journal.js";
import styles from "./JournalApp.module.css";

export default function JournalApp() {
  const [active, setActive] = useState(journal[0]);

  return (
    <div className={styles.wrap}>
      <aside className={styles.list}>
        <div className={styles.listHead}>
          <h2 className={styles.listTitle}>Journal</h2>
          <span className={styles.listCount}>{journal.length} notes</span>
        </div>
        {journal.map((e) => (
          <button
            key={e.id}
            className={`${styles.item} ${active.id === e.id ? styles.itemActive : ""}`}
            onClick={() => setActive(e)}
          >
            <span
              className={styles.swatch}
              style={{ background: `linear-gradient(150deg, ${e.tint[0]}, ${e.tint[1]})` }}
            />
            <span className={styles.itemText}>
              <span className={styles.itemTitle}>{e.title}</span>
              <span className={styles.itemDate}>{e.date}</span>
            </span>
          </button>
        ))}
      </aside>

      <section className={styles.reader}>
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <span className={styles.tag}>#{active.tag}</span>
            <h1 className={styles.readTitle}>{active.title}</h1>
            <p className={styles.readDate}>{active.date}</p>
            {active.img ? (
              <img src={active.img} alt={active.title} className={styles.coverImg} />
            ) : (
              <div
                className={styles.cover}
                style={{ background: `linear-gradient(150deg, ${active.tint[0]}, ${active.tint[1]})` }}
              />
            )}
            <p className={styles.readBody}>{active.body}</p>
          </motion.article>
        </AnimatePresence>
      </section>
    </div>
  );
}
