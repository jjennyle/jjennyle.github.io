import { ArrowLeft, ArrowRight, Quote as QuoteIcon, Layers, LogIn, MessageCircle, BarChart3 } from "lucide-react";
import { projects } from "../data/projects.js";
import { Link } from "../router.jsx";
import Reveal from "../components/Reveal.jsx";
import Device from "../components/Device.jsx";
import Contact from "../components/Contact.jsx";
import Illustration from "../components/Illustrations.jsx";

const img = (name) => `/images/${name}.webp`;

const icons = {
  layers: Layers,
  login: LogIn,
  message: MessageCircle,
  chart: BarChart3,
};

function Gallery({ kind, items }) {
  return (
    <div className={`gallery gallery--${kind} gallery--n${items.length}`}>
      {items.map(({ src, caption }) => (
        <figure key={src}>
          <div className="gallery__frame">
            <img src={img(src)} alt={caption} loading="lazy" />
          </div>
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

function Section({ section }) {
  const split = Boolean(section.illustration || section.sideImage);
  return (
    <Reveal as="section" className={`cs-section ${section.title ? "" : "cs-section--continued"}`}>
      {/* A section without a title continues the one above it */}
      {section.title && (
        <>
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 className="section-title">{section.title}</h2>
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
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            {/* Beside an illustration, the quote stays in the text column */}
            {split && section.quote && <Quote quote={section.quote} />}
          </div>
          {section.illustration && <Illustration name={section.illustration} />}
          {section.sideImage && (
            <figure className="cs-side-image">
              <img src={img(section.sideImage.src)} alt={section.sideImage.caption} loading="lazy" />
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
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      )}
      {!split && section.quote && <Quote quote={section.quote} />}
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
                <div className="cs-card__image">
                  <img src={img(c.image)} alt={c.title} loading="lazy" />
                </div>
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
                <p className="fix__label">Problem</p>
                <p className="fix__problem">{f.problem}</p>
                <p className="fix__label fix__label--solution">{section.fixLabel ?? "What we did"}</p>
                <p className="fix__solution">{f.fix}</p>
              </div>
              <div className={`fix__images ${f.images.length === 1 ? "fix__images--single" : ""}`}>
                {f.images.map((src) => (
                  <img key={src} src={img(src)} alt="" loading="lazy" />
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}
      {section.images && <Gallery {...section.images} />}
    </Reveal>
  );
}

export default function Project({ project }) {
  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const t = project.theme;
  const style = {
    "--p-bg": t.bg,
    "--p-ink": t.ink,
    "--p-accent": t.accent,
    "--p-panel": t.panel,
    "--p-highlight": t.highlight ?? t.accent,
  };

  return (
    <main className={`page cs ${t.dark ? "cs--dark" : ""}`} style={style}>
      <section className="cs-hero grain">
        <div className="cs-hero__text">
          <Link to="/#work" className="cs-back">
            <ArrowLeft size={16} /> All projects
          </Link>
          <p className="cs-hero__name">
            <img src={img(project.flower)} alt="" />
            {project.name}
          </p>
          <h1 className="cs-hero__title">{project.headline}</h1>
          <p className="cs-hero__intro">{project.intro}</p>
          <span className="cs-badge">{project.badge}</span>
        </div>
        <div className="cs-hero__visual">
          <Device kind={project.cover.kind} items={project.cover.items} alt={`${project.name} screens`} eager />
        </div>
      </section>

      <Reveal as="section" className="cs-overview">
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
        </dl>
      </Reveal>

      {project.sections.map((s) => (
        <Section key={s.title ?? s.text?.[0]} section={s} />
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
