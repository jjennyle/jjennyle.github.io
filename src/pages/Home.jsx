import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MapPin, Briefcase, Mail, Sparkles, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { Link } from "../router.jsx";
import Reveal from "../components/Reveal.jsx";
import Device from "../components/Device.jsx";
import Contact from "../components/Contact.jsx";

function RotatingWord({ words }) {
  const [i, setI] = useState(0);
  const [width, setWidth] = useState(null);
  const refs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);

  // The pill grows and shrinks to fit the word that is showing
  useLayoutEffect(() => {
    const measure = () => setWidth(refs.current[i]?.offsetWidth ?? null);
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [i]);

  return (
    <span className="hero__pill" style={width ? { width: `calc(${width}px + 1em)` } : undefined}>
      {words.map((w, n) => (
        <span
          key={w}
          ref={(el) => (refs.current[n] = el)}
          className={`hero__word ${n === i ? "is-on" : ""}`}
          aria-hidden={n !== i}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

function Hero() {
  return (
    <section className="hero grain">
      <h1 className="hero__title">
        <span>jenny's portfolio</span>
        <span className="hero__row">
          of <RotatingWord words={profile.heroWords} />
        </span>
      </h1>
    </section>
  );
}

function Intro() {
  const facts = [
    { icon: Sparkles, label: "Focus", value: profile.focus },
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: Briefcase, label: "Experience", value: profile.experience },
    {
      icon: Mail,
      label: "Contact",
      value: <a href={`mailto:${profile.email}`}>{profile.email}</a>,
    },
  ];
  return (
    <Reveal as="section" className="intro">
      <div className="intro__dots" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
      </div>
      <div className="intro__top">
        <div>
          <h2 className="intro__name">Hi, I am Jenny Le</h2>
          <p className="eyebrow eyebrow--plain">{profile.role}</p>
          <p className="intro__tagline">{profile.tagline}</p>
        </div>
        <div className="intro__edu">
          <p className="eyebrow eyebrow--plain">Education</p>
          <div className="intro__school">
            <img className="intro__school-logo" src="/images/uio.webp" alt="University of Oslo logo" />
            <div>
              <strong>{profile.education.school}</strong>
              <span>{profile.education.degree}</span>
              <span>{profile.education.field}</span>
            </div>
          </div>
        </div>
      </div>
      <dl className="intro__facts">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <dt>
              <Icon size={15} strokeWidth={1.75} /> {label}
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function ProjectRow({ project, index }) {
  const to = `/work/${project.slug}`;
  return (
    <Reveal as="article" className="work" style={{ "--p-bg": project.theme.bg, "--p-accent": project.theme.accent }}>
      <div className="work__text">
        <p className="eyebrow">Project {String(index + 1).padStart(2, "0")}</p>
        <h3 className="work__name">
          <img src={`/images/${project.flower}.webp`} alt="" />
          <Link to={to}>{project.name}</Link>
        </h3>
        <p className="work__summary">{project.summary}</p>
        <p className="work__label">Scope of responsibilities</p>
        <ul className="chips">
          {project.scope.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="work__label">Tools</p>
        <ul className="chips chips--tools">
          {project.tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <Link to={to} className="work__more">
          Read the case study <ArrowUpRight size={16} />
        </Link>
      </div>
      <Link to={to} className="work__visual" aria-label={`Open ${project.name}`} tabIndex={-1}>
        <Device kind={project.cover.kind} items={project.cover.items} alt={`${project.name} screens`} />
      </Link>
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="about">
      <Reveal className="about__photos">
        <figure className="about__photo about__photo--me">
          <img src="/images/jenny.webp" alt="Jenny at a football match" loading="lazy" />
        </figure>
      </Reveal>
      <Reveal className="about__text" delay={80}>
        <p className="eyebrow">About me</p>
        <h2 className="section-title">A bit more about me</h2>
        {profile.about.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <Intro />
      <section id="work" className="work-list" aria-label="Projects">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </section>
      <About />
      <Contact />
    </main>
  );
}
