import { ArrowLeft, ArrowRight, Quote as QuoteIcon, Layers, LogIn, MessageCircle, BarChart3 } from "lucide-react";
import { projects } from "../data/projects.js";
import { Link } from "../router.jsx";
import Reveal from "../components/Reveal.jsx";
import Device from "../components/Device.jsx";
import Contact from "../components/Contact.jsx";
import Illustration from "../components/Illustrations.jsx";
import { Zoomable } from "../components/Lightbox.jsx";

const img = (name) => `/images/${name}.webp`;
/* Turns **text** in a paragraph into bold text */
const rich = (text) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
const slugify = (text) => text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* Notes about missing content. Only shown on the local dev server, never on the live site. */
const DEV = import.meta.env.DEV;
function Todo({ children }) {
  if (!DEV) return null;
  return (
    <p className="todo" role="note">
      <strong>To fill in (only visible locally):</strong> {children}
    </p>
  );
}

const icons = {
  layers: Layers,
  login: LogIn,
  message: MessageCircle,
  chart: BarChart3,
};

function Gallery({ kind, items }) {
  const group = items.map(({ src, caption }) => ({ src: img(src), caption }));
  return (
    <div className={`gallery gallery--${kind} gallery--n${items.length}`}>
      {items.map(({ src, caption }, i) => (
        <figure key={src}>
          <Zoomable group={group} index={i} className="gallery__frame">
            <img src={img(src)} alt={caption} loading="lazy" />
          </Zoomable>
          <figcaption>{caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Quote({ quote }) {
  return (
    <blockquote className="cs-quote">
      <QuoteIcon size={22} aria-hidden="true" />
      <p>{quote.text}</p>
      <cite>{quote.by}</cite>
    </blockquote>
  );
}

function Compare({ compare }) {
  return (
    <div className="compare">
      {[
        ["before", compare.beforeLabel, compare.before],
        ["after", compare.afterLabel, compare.after],
      ].map(([key, label, list]) => (
        <div key={key} className={`compare__col compare__col--${key}`}>
          <h3>{label}</h3>
          <ul>
            {list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Section({ section }) {
  const split = Boolean(section.illustration || section.sideImage);
  // A placeholder section only holds a note about missing content
  if (section.placeholder && !DEV) return null;
  const fixGroup = (f) => f.images.map((src) => ({ src: img(src), caption: f.fix }));
  return (
    <Reveal
      as="section"
      id={section.title ? slugify(section.eyebrow) : undefined}
      aria-labelledby={section.title ? `${slugify(section.eyebrow)}-title` : undefined}
      className={`cs-section ${section.title ? "" : "cs-section--continued"} ${section.placeholder ? "cs-section--placeholder" : ""}`}
    >
      {/* A section without a title continues the one above it */}
      {section.title && (
        <>
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id={`${slugify(section.eyebrow)}-title`} className="section-title">
            {section.title}
          </h2>
          <div className="cs-rule" aria-hidden="true">
            <i />
            <span />
            <span />
            <span />
          </div>
        </>
      )}
      {section.text && (
        <div className={split ? "cs-split" : undefined}>
          <div>
            <div className="cs-text">
              {section.text.map((p) => (
                <p key={p.slice(0, 24)}>{rich(p)}</p>
              ))}
            </div>
            {/* Beside an illustration, the quote stays in the text column */}
            {split && section.quote && <Quote quote={section.quote} />}
          </div>
          {section.illustration && <Illustration name={section.illustration} />}
          {section.sideImage && (
            <figure className="cs-side-image">
              <Zoomable group={[{ src: img(section.sideImage.src), caption: section.sideImage.caption }]} index={0}>
                <img src={img(section.sideImage.src)} alt={section.sideImage.caption} loading="lazy" />
              </Zoomable>
              <figcaption>{section.sideImage.caption}</figcaption>
            </figure>
          )}
        </div>
      )}
      {section.stats && (
        <dl className="cs-stats">
          {section.stats.map((st) => (
            <div key={st.label}>
              <dt>{st.label}</dt>
              <dd>{st.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {section.challenges && (
        <ul className={`challenges ${section.challenges.some((c) => c.illustration) ? "challenges--illustrated" : ""}`}>
          {section.challenges.map((c) => {
            const Icon = icons[c.icon];
            return (
              <li key={c.title}>
                {c.illustration ? (
                  <Illustration name={c.illustration} />
                ) : (
                  <span className="challenges__icon">
                    <Icon size={24} strokeWidth={1.75} />
                  </span>
                )}
                <h3>{c.title}</h3>
                {c.text && <p>{c.text}</p>}
              </li>
            );
          })}
        </ul>
      )}
      {section.textAfter && (
        <div className="cs-text cs-text--after">
          {section.textAfter.map((p) => (
            <p key={p.slice(0, 24)}>{rich(p)}</p>
          ))}
        </div>
      )}
      {!split && section.quote && <Quote quote={section.quote} />}
      {section.compare && <Compare compare={section.compare} />}
      {section.cards && (
        <div
          className={`cs-cards ${section.cards.some((c) => c.image) ? "cs-cards--images" : ""} ${
            section.cards.some((c) => c.illustration) ? "cs-cards--illustrated" : ""
          }`}
        >
          {section.cards.map((c, i) => (
            <div key={c.title} className="cs-card">
              {c.illustration ? (
                <Illustration name={c.illustration} />
              ) : c.image ? (
                <Zoomable group={[{ src: img(c.image), caption: c.title }]} index={0} className="cs-card__image">
                  <img src={img(c.image)} alt={c.title} loading="lazy" />
                </Zoomable>
              ) : (
                <span className="cs-card__num">{String(i + 1).padStart(2, "0")}</span>
              )}
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      )}
      {section.fixes && (
        <ol className="fixes">
          {section.fixes.map((f, i) => (
            <li key={f.fix} className="fix">
              <div className="fix__text">
                <span className="fix__num">{String(i + 1).padStart(2, "0")}</span>
                <p className="fix__label">{section.problemLabel ?? "Problem"}</p>
                <p className="fix__problem">{f.problem}</p>
                <p className="fix__label fix__label--solution">{section.fixLabel ?? "What we did"}</p>
                <p className="fix__solution">{f.fix}</p>
              </div>
              <div className={`fix__images ${f.images.length === 1 ? "fix__images--single" : ""}`}>
                {f.images.map((src, n) => (
                  <Zoomable key={src} group={fixGroup(f)} index={n}>
                    <img src={img(src)} alt={`Screen: ${f.fix}`} loading="lazy" />
                  </Zoomable>
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}
      {section.images && <Gallery {...section.images} />}
      {section.todo && <Todo>{section.todo}</Todo>}
    </Reveal>
  );
}

export default function Project({ project }) {
  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const t = project.theme;
  const sections = project.sections.filter((s) => DEV || !s.placeholder);
  const style = {
    "--p-bg": t.bg,
    "--p-ink": t.ink,
    "--p-accent": t.accent,
    "--p-panel": t.panel,
    "--p-highlight": t.highlight ?? t.accent,
  };

  return (
    <main id="main" className={`page cs ${t.dark ? "cs--dark" : ""}`} style={style}>
      <section className="cs-hero grain">
        <div className="cs-hero__text">
          <Link to="/#work" className="cs-back">
            <ArrowLeft size={16} /> All projects
          </Link>
          <p className="cs-hero__name">
            <img src={img(project.flower)} alt="" />
            {project.name}
          </p>
          <h1 className="cs-hero__title" tabIndex={-1}>
            {project.headline}
          </h1>
          <p className="cs-hero__intro">{project.intro}</p>
          <span className="cs-badge">{project.badge}</span>
        </div>
        <div className="cs-hero__visual">
          <Device kind={project.cover.kind} items={project.cover.items} alt={`${project.name} screens`} eager />
        </div>
      </section>

      <Reveal as="section" className="cs-overview" aria-labelledby="overview-title">
        <h2 id="overview-title" className="visually-hidden">
          Project overview and my role
        </h2>
        <p className="cs-question">
          <span className="eyebrow">Problem statement</span>
          {project.question}
        </p>
        <dl className="cs-facts">
          {project.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
          <div>
            <dt>Tools</dt>
            <dd>{project.tools.join(", ")}</dd>
          </div>
        </dl>
        {project.contribution && (
          <div className="contribution">
            <div>
              <h3>What I did</h3>
              <ul>
                {project.contribution.me.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>What the team did</h3>
              <ul>
                {project.contribution.team.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <nav className="cs-toc" aria-label="On this page">
          <span>On this page</span>
          <ul>
            {sections
              .filter((s) => s.title)
              .map((s) => (
                <li key={s.eyebrow}>
                  <Link to={`#${slugify(s.eyebrow)}`}>{s.eyebrow}</Link>
                </li>
              ))}
          </ul>
        </nav>
      </Reveal>

      {sections.map((s, n) => (
        <Section key={s.title ?? `${s.eyebrow}-${n}`} section={s} />
      ))}

      <Reveal as="section" className="cs-next" style={{ "--n-bg": next.theme.bg, "--n-ink": next.theme.ink }}>
        <Link to={`/work/${next.slug}`} className="cs-next__card">
          <span className="eyebrow eyebrow--plain">Next project</span>
          <span className="cs-next__name">
            <img src={img(next.flower)} alt="" />
            {next.name}
          </span>
          <span className="cs-next__summary">{next.summary}</span>
          <ArrowRight className="cs-next__arrow" size={26} />
        </Link>
      </Reveal>

      <Contact />
    </main>
  );
}
