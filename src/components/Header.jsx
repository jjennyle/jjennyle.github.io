import { Link } from "../router.jsx";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo" aria-label="Jenny Le, home">
          <img src="/images/logo.webp" alt="" width="34" height="30" />
        </Link>
      </header>
      <a className="header__resume" href="/jenny-le-cv.pdf" target="_blank" rel="noreferrer">
        Resume
      </a>
    </>
  );
}
