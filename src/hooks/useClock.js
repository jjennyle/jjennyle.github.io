import { useEffect, useState } from "react";

export function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 10);
    return () => clearInterval(t);
  }, []);
  return now;
}
