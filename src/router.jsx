import { useEffect, useState } from "react";

/* A tiny router: the site only has the home page and /work/<slug>. */

const listeners = new Set();

/* Where the page should scroll to so a section's first line (its small label
   or heading) sits just below the sticky header. Sections have different
   amounts of empty space at the top, so this measures the first child
   instead of the section itself. offsetTop is used because it ignores the
   fade-in movement on sections that have not been shown yet. */
const GAP = 20;
function pageTop(node) {
  let y = 0;
  for (let n = node; n; n = n.offsetParent) y += n.offsetTop;
  return y;
}
function landingY(el) {
  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 0;
  // Walk down to the first visible line: the label, heading or paragraph
  let first = el;
  while (first.firstElementChild && !first.matches(".eyebrow, h1, h2, h3, p, img, svg")) {
    first = first.firstElementChild;
  }
  return Math.max(0, pageTop(first) - headerHeight - GAP);
}

/* Smooth scroll written by hand instead of the browser's built-in one.
   The built-in version stops and then jumps when images above the target
   finish loading and push the page down. This one looks up the target again
   on every frame, so the motion stays smooth even if the page changes. */
let current = null;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function stopScroll() {
  if (!current) return;
  cancelAnimationFrame(current.frame);
  clearTimeout(current.fallback);
  ["wheel", "touchstart", "keydown"].forEach((e) => window.removeEventListener(e, stopScroll));
  current = null;
}

export function scrollToSection(el, smooth = true) {
  stopScroll();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const target = () => Math.min(landingY(el), document.documentElement.scrollHeight - window.innerHeight);
  const jump = () => window.scrollTo({ top: target(), behavior: "instant" });
  if (!smooth || reduce) return jump();

  const startY = window.scrollY;
  // Longer distances get a little more time, within limits
  const duration = Math.min(1300, Math.max(650, Math.abs(target() - startY) * 0.4));
  let startTime = null;

  const step = (now) => {
    if (startTime === null) startTime = now;
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo({ top: startY + (target() - startY) * ease(t), behavior: "instant" });
    if (t < 1) current.frame = requestAnimationFrame(step);
    else stopScroll();
  };

  current = { frame: requestAnimationFrame(step) };
  // If the tab is in the background, animation frames do not run: just jump
  current.fallback = setTimeout(() => {
    if (startTime === null) {
      stopScroll();
      jump();
    }
  }, 200);
  // The visitor can take over by scrolling or using the keyboard
  ["wheel", "touchstart", "keydown"].forEach((e) => window.addEventListener(e, stopScroll, { passive: true, once: true }));
}

/* Scrolls to an element on the current page and moves keyboard focus to it,
   so screen reader and keyboard users land in the same place as everyone else. */
export function focusElement(el) {
  if (!el) return;
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  // Wait one tick so a closing menu or a new page has finished its layout
  setTimeout(() => scrollToSection(el), 0);
}

export function navigate(to) {
  const url = new URL(to, window.location.href);
  const samePage = url.pathname === window.location.pathname;
  if (samePage && url.hash) {
    window.history.pushState({}, "", to);
    focusElement(document.getElementById(url.hash.slice(1)));
    return;
  }
  if (to === window.location.pathname + window.location.hash) return;
  window.history.pushState({}, "", to);
  listeners.forEach((fn) => fn());
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, []);
  return path;
}

export function Link({ to, onClick, ...props }) {
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handle} {...props} />;
}
