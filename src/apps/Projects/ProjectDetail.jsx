import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import styles from "./ProjectDetail.module.css";

function Section({ label, children, delay }) {
  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <span className={styles.eyebrow}>{label}</span>
      <div className={styles.body}>{children}</div>
    </motion.section>
  );
}

export default function ProjectDetail({ project: p }) {
  if (!p) return null;
  return (
    <div className={styles.wrap}>
      <motion.div
        className={`${styles.hero} ${p.heroImg ? styles.heroFull : ""}`}
        style={p.heroImg ? {} : { background: `linear-gradient(150deg, ${p.tint[0]}, ${p.tint[1]})` }}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {p.heroImg ? (
          <img src={p.heroImg} alt={p.name} className={styles.heroImg} />
        ) : (
          <>
            <span className={styles.heroGlyph}>{p.name}</span>
            <div className={styles.heroMeta}>
              <span>{p.role}</span>
              <span>·</span>
              <span>{p.year}</span>
            </div>
          </>
        )}
      </motion.div>

      <p className={styles.summary}>{p.summary}</p>

      <Section label="Problem" delay={0.05}>
        <p>{p.problem}</p>
      </Section>
      {p.myRole && (
        <Section label="My role" delay={0.1}>
          <p>{p.myRole}</p>
        </Section>
      )}
      <Section label="Process" delay={0.15}>
        <p>{p.process}</p>
      </Section>

      <Section label={p.photos ? "In the wild" : "Screens"} delay={0.2}>
        <div className={styles.shots}>
          {(p.screens || p.photos) ? (p.screens || p.photos).map((src, n) => (
            <img key={n} src={src} alt={`${p.name} ${n + 1}`} className={styles.shotImg} />
          )) : [0, 1, 2].map((n) => (
            <div
              key={n}
              className={styles.shot}
              style={{
                background: `linear-gradient(160deg, ${p.tint[0]}, ${p.tint[1]})`,
                opacity: 0.85 - n * 0.12,
              }}
            />
          ))}
        </div>
      </Section>

      {p.result && (
        <Section label="Result" delay={0.25}>
          <p>{p.result}</p>
        </Section>
      )}

      <div className={styles.stack}>
        {p.stack.map((s) => (
          <span key={s} className={styles.chip}>
            {s}
          </span>
        ))}
      </div>

      <div className={styles.btnRow}>
        {p.report && (
          <a href={p.report} target="_blank" rel="noreferrer" className={styles.reportBtn}>
            <FileText size={15} /> Read the full report
          </a>
        )}
        {p.site && (
          <a href={p.site} target="_blank" rel="noreferrer" className={styles.siteBtn}>
            <ExternalLink size={15} /> View project site
          </a>
        )}
      </div>
    </div>
  );
}
