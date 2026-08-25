import { Mail, Linkedin, MapPin } from "lucide-react";
import styles from "./ContactApp.module.css";

const channels = [
  { id: "email", icon: Mail, label: "Email", value: "jennyle2562@gmail.com", href: "mailto:jennyle2562@gmail.com" },
  { id: "linkedin", icon: Linkedin, label: "LinkedIn", value: "in/jjennyle", href: "https://linkedin.com/in/jjennyle" },
  { id: "location", icon: MapPin, label: "Location", value: "Oslo, Norway", href: null },
];

export default function ContactApp() {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Say hello</h2>
      <p className={styles.sub}>I usually reply within a day.</p>
      <ul className={styles.channels}>
        {channels.map((c) => (
          <li key={c.id}>
            {c.href ? (
              <a href={c.href} target="_blank" rel="noreferrer" className={styles.channel}>
                <span className={styles.cIcon}><c.icon size={16} /></span>
                <span className={styles.cText}>
                  <span className={styles.cLabel}>{c.label}</span>
                  <span className={styles.cValue}>{c.value}</span>
                </span>
              </a>
            ) : (
              <div className={styles.channel}>
                <span className={styles.cIcon}><c.icon size={16} /></span>
                <span className={styles.cText}>
                  <span className={styles.cLabel}>{c.label}</span>
                  <span className={styles.cValue}>{c.value}</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
