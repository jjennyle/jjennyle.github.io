import { useEffect, useRef } from "react";
import { motion, useMotionValue, useDragControls, animate, usePresence } from "framer-motion";
import { useWindows } from "../../context/WindowContext.jsx";
import { useOS } from "../../context/OSContext.jsx";
import { getApp } from "../../apps/registry.js";
import TrafficLights from "./TrafficLights.jsx";
import styles from "./Window.module.css";

const TOP = 46; // below menu bar
const BOTTOM = 116; // above dock

export default function Window({ win }) {
  const { close, minimize, toggleMaximize, focus } = useWindows();
  const { settings } = useOS();
  const dragControls = useDragControls();
  const [isPresent] = usePresence();

  const app = getApp(win.appId);
  const Body = app?.component;

  const x = useMotionValue(win.pos.x);
  const y = useMotionValue(win.pos.y);
  const width = useMotionValue(win.size.w);
  const height = useMotionValue(win.size.h);
  const prev = useRef(null);

  // Animate maximize / restore
  useEffect(() => {
    const dur = 0.34 / settings.speed;
    const opts = { duration: dur, ease: [0.22, 1, 0.36, 1] };
    if (win.maximized) {
      prev.current = { x: x.get(), y: y.get(), w: width.get(), h: height.get() };
      const pad = 14;
      animate(x, pad, opts);
      animate(y, TOP, opts);
      animate(width, window.innerWidth - pad * 2, opts);
      animate(height, window.innerHeight - TOP - BOTTOM, opts);
    } else if (prev.current) {
      animate(x, prev.current.x, opts);
      animate(y, prev.current.y, opts);
      animate(width, prev.current.w, opts);
      animate(height, prev.current.h, opts);
      prev.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.maximized]);

  const constraints = {
    left: -40,
    top: TOP - 6,
    right: typeof window !== "undefined" ? window.innerWidth - 140 : 1200,
    bottom: typeof window !== "undefined" ? window.innerHeight - 90 : 700,
  };

  return (
    <motion.div
      className={styles.window}
      style={{ x, y, width, height, zIndex: win.z, pointerEvents: isPresent ? "auto" : "none" }}
      drag={!win.maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={constraints}
      onMouseDown={() => focus(win.id)}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      <header
        className={styles.titlebar}
        onPointerDown={(e) => {
          focus(win.id);
          if (!win.maximized) dragControls.start(e);
        }}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        <TrafficLights
          onClose={() => close(win.id)}
          onMinimize={() => minimize(win.id)}
          onMaximize={() => toggleMaximize(win.id)}
        />
        <span className={styles.title}>
          {app?.icon && <app.icon size={14} strokeWidth={1.8} />}
          {win.title}
        </span>
        <span className={styles.spacer} />
      </header>

      <div className={styles.body}>{Body && <Body {...win.props} />}</div>
    </motion.div>
  );
}
