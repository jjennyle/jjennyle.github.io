import { useEffect, useRef, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { Link, usePath } from "../router.jsx";

const links = [
  { label: "Work", to: "/#work" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "#contact" },
];

function Resume({ className = "" }) {
  return (
    <a className={`nav-resume ${className}`} href="/jenny-le-cv.pdf" target="_blank" rel="noreferrer">
      <FileText size={16} aria-hidden="true" />
      Resume
      <span className="visually-hidden"> (PDF, opens in a new tab)</span>
    </a>
  );
}

export default function Header() {
  const path = usePath();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);

  // Close the mobile menu when the page changes or Escape is pressed
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // A soft line under the bar once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = links.map((l) => (
    <li key={l.label}>
      <Link to={l.to} className="nav-link" onClick={() => setOpen(false)}>
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Link to="/" className="header__logo" aria-label="Jenny Le, home">
          <img src="/images/logo.webp" alt="" width="34" height="30" />
        </Link>

        <nav className="nav nav--desktop" aria-label="Main">
          <ul>{navLinks}</ul>
        </nav>
        <Resume className="nav-resume--desktop" />

        <button
          ref={menuButton}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          Menu
        </button>
      </div>

      <nav id="mobile-menu" className={`nav nav--mobile ${open ? "is-open" : ""}`} aria-label="Main" hidden={!open}>
        <ul>
          {navLinks}
          <li>
            <Resume />
          </li>
        </ul>
      </nav>
    </header>
  );
}
