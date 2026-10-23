import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MapPin, Briefcase, Mail, Sparkles, ArrowRight, ArrowDown } from "lucide-react";
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
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 1700);
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
    <section className="hero grain" aria-labelledby="hero-title">
      <p className="hero__eyebrow">Jenny Le · UX &amp; Interaction Designer · Oslo</p>
      <h1 id="hero-title" className="hero__title" tabIndex={-1}>
        {/* Screen readers get the whole sentence once, instead of a changing word */}
        <span className="visually-hidden">Jenny's portfolio of {profile.heroWords.join(", ")}</span>
        <span className="hero__line" aria-hidden="true">
          <span>jenny's portfolio</span>
          <span className="hero__row">
            of <RotatingWord words={profile.heroWords} />
          </span>
        </span>
      </h1>
      <p className="hero__intro">{profile.heroIntro}</p>
      <div className="hero__actions">
        <Link to="#work" className="btn btn--primary">
          View my work <ArrowDown size={18} aria-hidden="true" />
        </Link>
        <Link to="#contact" className="btn btn--ghost">
          Get in touch
        </Link>
      </div>
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
  const role = project.facts.find((f) => f.label === "My role")?.value;
  return (
    <Reveal
      as="article"
      className={`work ${project.theme.dark ? "work--dark" : ""}`}
      style={{ "--p-bg": project.theme.bg, "--p-accent": project.theme.accent }}
    >
      <div className="work__text">
        <p className="eyebrow">Project {String(index + 1).padStart(2, "0")}</p>
        <h3 className="work__name">
          <img src={`/images/${project.flower}.webp`} alt="" />
          {/* The link covers the whole card, so the card is one clear click target */}
          <Link to={to} className="work__link">
            {project.name}
          </Link>
        </h3>
        <p className="work__summary">{project.summary}</p>
        {role && (
          <p className="work__role">
            <span>My role</span>
            {role}
          </p>
        )}
        <ul className="chips" aria-label="Focus areas">
          {project.categories.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="work__tools">
          <span>Tools</span>
          {project.tools.join(" · ")}
        </p>
        <span className="work__more" aria-hidden="true">
          Read the case study <ArrowRight size={16} />
        </span>
      </div>
      <div className="work__visual">
        <Device kind={project.cover.kind} items={project.cover.items} alt="" />
      </div>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="work-list" aria-labelledby="work-title">
      <div className="work-list__head">
        <p className="eyebrow">Selected work</p>
        <h2 id="work-title" className="section-title">
          Projects
        </h2>
        <p className="work-list__lead">Case studies from school, work and hobbies.</p>
      </div>
      {projects.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about" aria-label="About me">
      <Reveal className="about__text">
        <p className="eyebrow">About me</p>
        <h2 className="section-title">A bit more about me</h2>
        {profile.about.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </Reveal>
      <Reveal className="about__photo" delay={80}>
        <img src="/images/happy.webp" alt="Happy, a grey and white cat, peeking out of a paper bag" loading="lazy" />
        <p>Happy</p>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <main id="main" className="page">
      <Hero />
      <Intro />
      <Work />
      <About />
      <Contact />
    </main>
  );
}
