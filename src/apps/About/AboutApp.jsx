import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { about } from "../../data/about.js";
import styles from "./AboutApp.module.css";

export default function AboutApp() {
  return (
    <div className={styles.wrap}>
      <motion.header
        className={styles.profile}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <img src="/jenny-about.jpg" alt={about.name} className={styles.avatar} />
        <div>
          <h1 className={styles.name}>{about.name}</h1>
          <p className={styles.role}>{about.role}</p>
          <p className={styles.loc}>
            <MapPin size={13} /> {about.location}
          </p>
        </div>
      </motion.header>

      <p className={styles.intro}>{about.intro}</p>

      <div className={styles.cols3}>
        <section className={styles.card}>
          <h3 className={styles.h}>Skills</h3>
          <div className={styles.chips}>
            {about.skills.map((s) => (
              <span key={s} className={styles.chip}>{s}</span>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <h3 className={styles.h}>Tools</h3>
          <div className={styles.chips}>
            {about.tools.map((t) => (
              <span key={t} className={`${styles.chip} ${styles.chipAlt}`}>{t}</span>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <h3 className={styles.h}>Education</h3>
          {about.education.map((e) => (
            <div key={e.detail} className={styles.edu}>
              <strong>{e.school}</strong>
              <span>{e.detail}</span>
              <span className={styles.years}>{e.years}</span>
            </div>
          ))}
          <h3 className={styles.h} style={{ marginTop: "var(--s4)" }}>Languages</h3>
          <ul className={styles.langs}>
            {about.languages.map((l) => (
              <li key={l.name}>
                <span>{l.name}</span>
                <span className={styles.level}>{l.level}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className={styles.card}>
        <h3 className={styles.h}>Fun facts</h3>
        <ul className={styles.facts}>
          {about.funFacts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
