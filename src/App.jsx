import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OSProvider } from "./context/OSContext.jsx";
import { WindowProvider } from "./context/WindowContext.jsx";
import { useMediaQuery } from "./hooks/useMediaQuery.js";
import Wallpaper from "./components/Wallpaper.jsx";
import BootScreen from "./components/BootScreen.jsx";
import Desktop from "./components/Desktop/Desktop.jsx";
import MobileShell from "./components/Mobile/MobileShell.jsx";

export default function App() {
  const [booted, setBooted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 880px)");

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <OSProvider>
      <WindowProvider>
        <Wallpaper />

        <AnimatePresence>{!booted && <BootScreen key="boot" />}</AnimatePresence>

        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {isMobile ? <MobileShell /> : <Desktop />}
          </motion.div>
        )}
      </WindowProvider>
    </OSProvider>
  );
}
