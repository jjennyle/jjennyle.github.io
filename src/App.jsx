import { useEffect, useLayoutEffect, useRef } from "react";
import { usePath, focusElement, scrollToSection } from "./router.jsx";
import { findProject } from "./data/projects.js";
import Header from "./components/Header.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import { LightboxProvider } from "./components/Lightbox.jsx";
import Home from "./pages/Home.jsx";
import Project from "./pages/Project.jsx";

export default function App() {
  const path = usePath();
  const slug = path.match(/^\/work\/([^/]+)\/?$/)?.[1];
  const project = slug ? findProject(slug) : null;
  const firstLoad = useRef(true);

  // On a new page: go to the requested section, or to the top. After the first
  // load, also move focus to the page heading so keyboard and screen reader
  // users start at the new content.
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (target) {
      if (firstLoad.current) scrollToSection(target, false);
      else {
        // Start the new page at the top, then glide down to the section
        window.scrollTo({ top: 0, behavior: "instant" });
        focusElement(target);
      }
    } else {
      // "instant" overrides the smooth scrolling set in CSS, so a new page starts at the top
      window.scrollTo({ top: 0, behavior: "instant" });
      if (!firstLoad.current) document.querySelector("main h1")?.focus({ preventScroll: true });
    }
    firstLoad.current = false;
  }, [path]);

  useEffect(() => {
    document.title = project ? `${project.name} case study · Jenny Le` : "Jenny Le · UX & Interaction Designer";
  }, [project]);

  return (
    <LightboxProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <CursorGlow />
      <Header />
      {project ? <Project key={project.slug} project={project} /> : <Home />}
    </LightboxProvider>
  );
}
