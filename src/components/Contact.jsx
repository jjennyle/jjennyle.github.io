import { profile } from "../data/profile.js";
import Reveal from "./Reveal.jsx";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <Reveal className="contact__card grain">
        <h2 className="contact__title">contact me</h2>
        <p className="contact__lead">I am happy to tell you more about how I work. Get in touch for a chat!</p>
        <dl className="contact__list">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={profile.linkedin.url} target="_blank" rel="noreferrer">
                {profile.linkedin.label}
              </a>
            </dd>
          </div>
        </dl>
      </Reveal>
      <p className="footer">© {new Date().getFullYear()} Jenny Le</p>
    </section>
  );
}
