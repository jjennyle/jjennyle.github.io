import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wifi, BatteryMedium, Search, Cloud, CloudRain, CloudSnow, CloudLightning, Sun, Wind } from "lucide-react";
import { useClock } from "../../hooks/useClock.js";
import { useWindows } from "../../context/WindowContext.jsx";
import { getApp } from "../../apps/registry.js";
import { useWeather } from "../../hooks/useWeather.js";
import styles from "./MenuBar.module.css";

function WeatherIcon({ symbol, size = 14 }) {
  const s = symbol || "";
  if (s.includes("rain") || s.includes("sleet")) return <CloudRain size={size} />;
  if (s.includes("snow")) return <CloudSnow size={size} />;
  if (s.includes("thunder")) return <CloudLightning size={size} />;
  if (s.includes("fair") || s.includes("clearsky")) return <Sun size={size} />;
  if (s.includes("fog")) return <Wind size={size} />;
  return <Cloud size={size} />;
}

const MENUS = {
  jnieOS: ["About jnieOS", "System Settings…", "Sleep", "Restart"],
  File: ["New Window", "Open…", "Close Window"],
  View: ["Show Dock", "Show Widgets", "Enter Full Screen"],
  Window: ["Minimize", "Zoom", "Bring All to Front"],
  Help: ["jnieOS Help", "Keyboard Shortcuts"],
};

export default function MenuBar() {
  const now = useClock();
  const { open, windows } = useWindows();
  const weather = useWeather();
  const [active, setActive] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setActive(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleItem = (menu, item) => {
    setActive(null);
    if (menu === "jnieOS" && item === "System Settings…") open(getApp("settings"));
    if (menu === "jnieOS" && item === "About jnieOS") open(getApp("about"));
    if (menu === "File" && item === "New Window") open(getApp("projects"));
    if (menu === "View" && item === "Show Widgets") {
      window.dispatchEvent(new CustomEvent("jnieos:toggle-widgets"));
    }
  };

  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const date = now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });

  const focused = windows.length
    ? windows.reduce((a, b) => (a.z > b.z ? a : b))
    : null;
  const focusedTitle = focused ? getApp(focused.appId)?.title || "jnieOS" : "Finder";

  return (
    <div className={styles.bar} ref={ref}>
      <div className={styles.left}>
        <button
          className={`${styles.brand} ${active === "jnieOS" ? styles.on : ""}`}
          onClick={() => setActive(active === "jnieOS" ? null : "jnieOS")}
        >
          <span className={styles.logoDot} />
          jnieOS
        </button>
        <span className={styles.appName}>{focusedTitle}</span>
        {Object.keys(MENUS).filter((m) => m !== "jnieOS").map((m) => (
          <div key={m} className={styles.menuWrap}>
            <button
              className={`${styles.menu} ${active === m ? styles.on : ""}`}
              onClick={() => setActive(active === m ? null : m)}
              onMouseEnter={() => active && setActive(m)}
            >
              {m}
            </button>
            <AnimatePresence>
              {active === m && <Dropdown items={MENUS[m]} onPick={(i) => handleItem(m, i)} />}
            </AnimatePresence>
          </div>
        ))}
        <AnimatePresence>
          {active === "jnieOS" && (
            <div className={styles.brandDrop}>
              <Dropdown items={MENUS.jnieOS} onPick={(i) => handleItem("jnieOS", i)} />
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.right}>
        <span className={styles.tray}>
          <WeatherIcon symbol={weather?.symbol} size={15} />
          {weather ? `${weather.temp}°` : "—"}
        </span>
        <Wifi size={15} className={styles.icon} />
        <BatteryMedium size={17} className={styles.icon} />
        <Search size={15} className={styles.icon} />
        <span className={styles.date}>{date}</span>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
}

function Dropdown({ items, onPick }) {
  return (
    <motion.div
      className={styles.dropdown}
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.16 }}
    >
      {items.map((it) => (
        <button key={it} className={styles.dropItem} onClick={() => onPick(it)}>
          {it}
        </button>
      ))}
    </motion.div>
  );
}
