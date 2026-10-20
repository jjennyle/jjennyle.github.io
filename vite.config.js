import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { projects } from "./src/data/projects.js";

/* GitHub Pages only serves real files. Copy the built index.html to
   /work/<slug>/index.html so project links can be opened and refreshed
   directly, and to 404.html as a fallback for anything else. */
const staticRoutes = () => ({
  name: "static-routes",
  closeBundle() {
    const dist = resolve(__dirname, "dist");
    const index = resolve(dist, "index.html");
    for (const p of projects) {
      const dir = resolve(dist, "work", p.slug);
      mkdirSync(dir, { recursive: true });
      copyFileSync(index, resolve(dir, "index.html"));
    }
    copyFileSync(index, resolve(dist, "404.html"));
  },
});

export default defineConfig({
  plugins: [react(), staticRoutes()],
  server: { port: 5173 },
});
