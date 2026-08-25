import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useWindows } from "../../context/WindowContext.jsx";
import { dockApps, getApp } from "../../apps/registry.js";
import styles from "./Dock.module.css";

const BASE = 50;
const MAX = 78;
const RANGE = 130;

function DockItem({ mouseX, app, onOpen, running }) {
  const ref = useRef(null);
  const Icon = app.icon;

  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: BASE };
    return val - (b.x + b.width / 2);
  });
  const sizeT = useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]);
  const size = useSpring(sizeT, { stiffness: 320, damping: 20, mass: 0.4 });

  return (
    <motion.button
      ref={ref}
      className={styles.item}
      style={{ width: size, height: size }}
      onClick={() => onOpen(app)}
      whileTap={{ scale: 0.9 }}
      aria-label={app.title}
    >
      <span className={styles.tile}>
        <Icon size={26} strokeWidth={1.6} />
      </span>
      <span className={styles.tooltip}>{app.title}</span>
      {running && <span className={styles.dot} />}
    </motion.button>
  );
}

export default function Dock() {
  const { open, windows } = useWindows();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      className={`${styles.dock} glass`}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {dockApps.map((id) => {
        const app = getApp(id);
        const running = windows.some((w) => w.appId === id);
        return (
          <DockItem
            key={id}
            app={app}
            mouseX={mouseX}
            running={running}
            onOpen={open}
          />
        );
      })}
    </motion.nav>
  );
}
