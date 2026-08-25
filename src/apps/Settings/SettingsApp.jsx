import { Sun, Moon, RotateCcw, Volume2, VolumeX, Check } from "lucide-react";
import { useOS, ACCENTS, WALLPAPERS } from "../../context/OSContext.jsx";
import styles from "./SettingsApp.module.css";

function Row({ title, desc, children }) {
  return (
    <div className={styles.row}>
      <div className={styles.rowText}>
        <span className={styles.rowTitle}>{title}</span>
        {desc && <span className={styles.rowDesc}>{desc}</span>}
      </div>
      <div className={styles.rowControl}>{children}</div>
    </div>
  );
}

export default function SettingsApp() {
  const { settings, set, reset } = useOS();

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Settings</h2>

      <section className={styles.group}>
        <Row title="Appearance" desc="Switch between light and dark.">
          <div className={styles.seg}>
            <button
              className={`${styles.segBtn} ${settings.theme === "light" ? styles.segOn : ""}`}
              onClick={() => set({ theme: "light" })}
            >
              <Sun size={15} /> Light
            </button>
            <button
              className={`${styles.segBtn} ${settings.theme === "dark" ? styles.segOn : ""}`}
              onClick={() => set({ theme: "dark" })}
            >
              <Moon size={15} /> Dark
            </button>
          </div>
        </Row>

        <Row title="Accent color">
          <div className={styles.swatches}>
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                className={styles.swatch}
                style={{ background: a.base }}
                onClick={() => set({ accent: a.id })}
                aria-label={a.id}
              >
                {settings.accent === a.id && <Check size={14} color="#fff" />}
              </button>
            ))}
          </div>
        </Row>
      </section>

      <section className={styles.group}>
        <Row title="Wallpaper">
          <div className={styles.walls}>
            {WALLPAPERS.map((w) => (
              <button
                key={w.id}
                className={`${styles.wall} ${settings.wallpaper === w.id ? styles.wallOn : ""}`}
                onClick={() => set({ wallpaper: w.id })}
              >
                <span className={`${styles.wallPreview} ${styles["wp_" + w.id]}`} />
                <span className={styles.wallLabel}>{w.label}</span>
              </button>
            ))}
          </div>
        </Row>
      </section>

      <section className={styles.group}>
        <Row title="Window transparency" desc={`${Math.round(settings.glassAlpha * 100)}% opaque`}>
          <input
            type="range"
            min="0.25"
            max="0.9"
            step="0.05"
            value={settings.glassAlpha}
            onChange={(e) => set({ glassAlpha: parseFloat(e.target.value) })}
            className={styles.range}
          />
        </Row>
        <Row title="Animation speed" desc={`${settings.speed.toFixed(1)}×`}>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.speed}
            onChange={(e) => set({ speed: parseFloat(e.target.value) })}
            className={styles.range}
          />
        </Row>
        <Row title="Interface sound" desc="A soft toggle for ambient clicks.">
          <button
            className={`${styles.toggle} ${settings.sound ? styles.toggleOn : ""}`}
            onClick={() => set({ sound: !settings.sound })}
          >
            <span className={styles.knob}>
              {settings.sound ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </span>
          </button>
        </Row>
      </section>

      <button className={styles.reset} onClick={reset}>
        <RotateCcw size={14} /> Reset to defaults
      </button>
      <p className={styles.note}>Preferences are saved to this browser.</p>
    </div>
  );
}
