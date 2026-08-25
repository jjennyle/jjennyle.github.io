import { useState } from "react";
import { motion } from "framer-motion";
import { gallery, galleryFilters } from "../../data/gallery.js";
import styles from "./GalleryApp.module.css";

export default function GalleryApp() {
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? gallery : gallery.filter((g) => g.kind === filter);

  return (
    <div className={styles.wrap}>
      <div className={styles.filters}>
        {galleryFilters.map((f) => (
          <button
            key={f}
            className={`${styles.filter} ${filter === f ? styles.active : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.masonry}>
        {items.map((g, i) => (
          <motion.figure
            key={g.id}
            className={styles.tile}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (i % 8) * 0.04, duration: 0.35 }}
            whileHover={{ y: -4 }}
          >
            {g.src ? (
              <img
                src={g.src}
                alt={g.label}
                className={styles.img}
              />
            ) : (
              <div
                className={styles.img}
                style={{
                  height: g.h,
                  background: `linear-gradient(155deg, ${g.tint[0]}, ${g.tint[1]})`,
                }}
              />
            )}
            <figcaption className={styles.caption}>
              <span className={styles.kind}>{g.kind}</span>
              <span className={styles.label}>{g.label}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
