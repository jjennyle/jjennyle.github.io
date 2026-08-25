import { useOS } from "../context/OSContext.jsx";
import styles from "./Wallpaper.module.css";

/* Abstract, non-photographic wallpapers built from layered radial
   gradients + slow drifting blobs. Calm, dreamy, original. */

const VARIANTS = {
  fog: {
    base: "linear-gradient(160deg, #efeaf6 0%, #e4dcf0 45%, #ddd0ec 100%)",
    blobs: [
      { c: "#cbb8ec", x: "18%", y: "26%", s: 540 },
      { c: "#d9c8ee", x: "78%", y: "20%", s: 460 },
      { c: "#bfd2ee", x: "62%", y: "78%", s: 600 },
      { c: "#e7d6ec", x: "30%", y: "82%", s: 420 },
    ],
  },
  dawn: {
    base: "linear-gradient(165deg, #f6efe7 0%, #efe2dd 50%, #e7d8e4 100%)",
    blobs: [
      { c: "#f0d8c2", x: "22%", y: "24%", s: 520 },
      { c: "#e8cfd8", x: "80%", y: "30%", s: 440 },
      { c: "#d9c6ec", x: "55%", y: "80%", s: 560 },
      { c: "#f3e2c8", x: "12%", y: "78%", s: 400 },
    ],
  },
  ridge: {
    base: "linear-gradient(170deg, #e9e6f2 0%, #d8d3ea 55%, #c7c0e0 100%)",
    blobs: [
      { c: "#bcb2e2", x: "25%", y: "30%", s: 560 },
      { c: "#cdd2ee", x: "82%", y: "28%", s: 420 },
      { c: "#b3c6e6", x: "60%", y: "82%", s: 600 },
      { c: "#d6cdee", x: "10%", y: "76%", s: 440 },
    ],
  },
  aurora: {
    base: "linear-gradient(160deg, #e6ecf2 0%, #dde6ec 45%, #d8e0ea 100%)",
    blobs: [
      { c: "#b8e0d4", x: "20%", y: "28%", s: 520 },
      { c: "#c2d6ee", x: "78%", y: "24%", s: 480 },
      { c: "#d4c8ee", x: "58%", y: "80%", s: 580 },
      { c: "#bce2ec", x: "14%", y: "80%", s: 420 },
    ],
  },
};

export default function Wallpaper() {
  const { settings } = useOS();
  const v = VARIANTS[settings.wallpaper] || VARIANTS.fog;

  return (
    <div className={styles.wallpaper} style={{ background: v.base }}>
      {v.blobs.map((b, i) => (
        <span
          key={i}
          className={styles.blob}
          style={{
            "--c": b.c,
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            animationDelay: `${i * -7}s`,
          }}
        />
      ))}
      <div className={styles.grain} />
    </div>
  );
}
