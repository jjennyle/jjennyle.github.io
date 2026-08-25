import { createContext, useContext, useEffect, useState, useCallback } from "react";

const OSContext = createContext(null);
export const useOS = () => useContext(OSContext);

const STORAGE_KEY = "jnieos.settings.v1";

export const ACCENTS = [
  { id: "lavender", soft: "#c9bee9", base: "#9b8bd6", deep: "#7a68c4" },
  { id: "sky", soft: "#bcd6ec", base: "#7fa9d6", deep: "#5d86bd" },
  { id: "sage", soft: "#c3ddca", base: "#84b596", deep: "#5f9474" },
  { id: "blush", soft: "#eccdd6", base: "#d68fa6", deep: "#bd6c87" },
  { id: "amber", soft: "#ecdcbf", base: "#d6ab74", deep: "#bd8e54" },
  { id: "graphite", soft: "#cdccd2", base: "#8d8b97", deep: "#6c6a77" },
];

export const WALLPAPERS = [
  { id: "fog", label: "Lavender Fog" },
  { id: "dawn", label: "Paper Dawn" },
  { id: "ridge", label: "Soft Ridge" },
  { id: "aurora", label: "Quiet Aurora" },
];

const DEFAULTS = {
  theme: "light",
  accent: "lavender",
  wallpaper: "fog",
  glassAlpha: 0.55,
  speed: 1,
  sound: false,
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export function OSProvider({ children }) {
  const [settings, setSettings] = useState(load);

  // Persist + apply CSS variables whenever settings change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage unavailable — run in-memory */
    }
    const root = document.documentElement;
    const accent = ACCENTS.find((a) => a.id === settings.accent) || ACCENTS[0];
    root.setAttribute("data-theme", settings.theme);
    root.style.setProperty("--accent", accent.base);
    root.style.setProperty("--accent-soft", accent.soft);
    root.style.setProperty("--accent-deep", accent.deep);
    root.style.setProperty("--glass-alpha", String(settings.glassAlpha));
    root.style.setProperty("--speed", String(settings.speed));
  }, [settings]);

  const set = useCallback((patch) => {
    setSettings((s) => ({ ...s, ...patch }));
  }, []);

  const reset = useCallback(() => setSettings(DEFAULTS), []);

  return (
    <OSContext.Provider value={{ settings, set, reset }}>
      {children}
    </OSContext.Provider>
  );
}
