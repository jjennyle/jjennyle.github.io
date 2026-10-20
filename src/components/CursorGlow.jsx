import { useEffect, useRef } from "react";

/* A soft light in the background that follows the mouse.
   Only on devices with a mouse; touch screens keep the static glow. */
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let frame;

    const draw = () => {
      // Ease towards the mouse so the light trails slightly behind it
      pos.x += (target.x - pos.x) * (still ? 1 : 0.12);
      pos.y += (target.y - pos.y) * (still ? 1 : 0.12);
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(target.x - pos.x) > 0.5 || Math.abs(target.y - pos.y) > 0.5) {
        frame = requestAnimationFrame(draw);
      } else {
        frame = null;
      }
    };
    const move = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.classList.add("is-on");
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const leave = () => el.classList.remove("is-on");

    document.documentElement.classList.add("has-cursor-glow");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor-glow");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
