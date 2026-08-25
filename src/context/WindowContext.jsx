import { createContext, useContext, useState, useCallback, useRef } from "react";

const WindowContext = createContext(null);
export const useWindows = () => useContext(WindowContext);

let uid = 1;

/* Stagger spawn position so stacked windows cascade. */
function spawnPosition(count) {
  const step = 28;
  return { x: 220 + (count % 6) * step, y: 96 + (count % 6) * step };
}

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const topZ = useRef(100);

  const focus = useCallback((id) => {
    topZ.current += 1;
    const z = topZ.current;
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, z, minimized: false } : w))
    );
  }, []);

  const open = useCallback((app, props = {}) => {
    setWindows((ws) => {
      // If a singleton app is already open, just focus it.
      const existing = ws.find((w) => w.appId === app.id && app.singleton);
      if (existing) {
        topZ.current += 1;
        return ws.map((w) =>
          w.id === existing.id
            ? { ...w, z: topZ.current, minimized: false }
            : w
        );
      }
      topZ.current += 1;
      const pos = spawnPosition(ws.length);
      return [
        ...ws,
        {
          id: uid++,
          appId: app.id,
          title: props.title || app.title,
          icon: app.icon,
          props,
          z: topZ.current,
          minimized: false,
          maximized: false,
          pos,
          size: app.size || { w: 880, h: 600 },
        },
      ];
    });
  }, []);

  const close = useCallback((id) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const minimize = useCallback((id) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  }, []);

  const toggleMaximize = useCallback((id) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
  }, []);

  const update = useCallback((id, patch) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }, []);

  return (
    <WindowContext.Provider
      value={{ windows, open, close, focus, minimize, toggleMaximize, update }}
    >
      {children}
    </WindowContext.Provider>
  );
}
