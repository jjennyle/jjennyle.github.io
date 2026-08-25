import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects.js";
import { useWindows } from "../../context/WindowContext.jsx";
import { projectDetailApp } from "../registry.js";
import styles from "./ProjectsApp.module.css";

export default function ProjectsApp() {
  const { open } = useWindows();

  return (
    <div className={styles.wrap}>
      <header className={styles.head}>
        <div>
          <h2 className={styles.title}>Selected work</h2>
          <p className={styles.sub}>Five projects · designed with purpose</p>
        </div>
        <span className={styles.count}>{projects.length}</span>
      </header>

      <div className={styles.grid}>
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            className={styles.card}
            onClick={() => open(projectDetailApp, { project: p, title: p.name })}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <div
              className={styles.thumb}
              style={p.heroImg ? {} : { background: `linear-gradient(150deg, ${p.tint[0]}, ${p.tint[1]})` }}
            >
              {p.heroImg ? (
                <img src={p.heroImg} alt={p.name} className={styles.thumbImg} />
              ) : (
                <span className={styles.thumbGlyph}>{p.name[0]}</span>
              )}
              <ArrowUpRight className={styles.open} size={18} />
            </div>
            <div className={styles.meta}>
              <div className={styles.row}>
                <h3 className={styles.name}>{p.name}</h3>
                <span className={styles.year}>{p.year}</span>
              </div>
              <p className={styles.tagline}>{p.tagline}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
