import { useEffect, useLayoutEffect } from "react";
import { usePath } from "./router.jsx";
import { findProject } from "./data/projects.js";
import Header from "./components/Header.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Home from "./pages/Home.jsx";
import Project from "./pages/Project.jsx";

export default function App() {
  const path = usePath();
  const slug = path.match(/^\/work\/([^/]+)\/?$/)?.[1];
  const project = slug ? findProject(slug) : null;

  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    document.title = project ? `${project.name} · Jenny Le` : "Jenny Le · UX/UI Designer";
  }, [project]);

  return (
    <>
      <CursorGlow />
      <Header />
      {project ? <Project key={project.slug} project={project} /> : <Home />}
    </>
  );
}
