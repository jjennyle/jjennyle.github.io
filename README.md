# jnieOS

A portfolio that behaves like a small, calm operating system — not a macOS clone. Boot ritual, floating glass windows, a cursor-magnifying dock, live home widgets, and a Settings app that re-skins everything and remembers your choices.

Built with **React + Vite + Framer Motion + Lucide + CSS Modules**. No Tailwind.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

Requires Node 18+.

## What's inside

- **Boot sequence** — staggered `jnieOS` init, then the desktop fades in (~1.3s).
- **Wallpaper** — animated, non-photographic fog/dawn/ridge/aurora (drifting blurred blobs + paper grain), switchable in Settings.
- **Menu bar** — live clock + date, fake weather/wifi/battery, and interactive dropdown menus.
- **Desktop icons** — Projects · Journal · About · Resume · Contact.
- **Home widgets** — Welcome, Now Playing (play/pause + equalizer), Weather, analog Clock, Calendar, Journal peek, and a daily thought.
- **Window system** — open / close / minimize / maximize, drag by the title bar, focus brings a window forward (z-index), multiple windows at once, spring open/close animations.
- **Dock** — floating glass bar with true cursor-distance magnification, tooltips, and running indicators.
- **Apps** — Projects (+ per-project case-study windows), Journal, Gallery (filterable masonry), About, Resume (document viewer + print/download), Contact (messaging with a working composer), Settings.
- **Settings** — accent color, wallpaper, window transparency, animation speed, light/dark, interface sound, reset. Persists to `localStorage` and re-themes live.
- **Responsive** — full OS on desktop; below 880px it collapses into a stack of app cards that open as full-screen sheets.
- **Accessibility** — keyboard-focusable controls and `prefers-reduced-motion` respected.

## Structure

```
src/
├─ main.jsx  App.jsx
├─ styles/        tokens.css (all design tokens) · global.css
├─ data/          projects.js · journal.js · gallery.js · about.js
├─ context/       OSContext.jsx (settings + persistence) · WindowContext.jsx (window stack)
├─ hooks/         useClock.js · useMediaQuery.js
├─ components/
│  ├─ Wallpaper.jsx
│  ├─ BootScreen.jsx
│  ├─ MenuBar/    Desktop/    Widgets/    Window/    Dock/    Mobile/
└─ apps/          registry.js + Projects/ Journal/ Gallery/ About/ Resume/ Contact/ Settings/
```

## Making it yours

- **Content** lives in `src/data/*`. Edit `about.js`, `projects.js`, `journal.js`, `gallery.js`.
- **Real images**: the cards use CSS gradient placeholders (`tint` arrays). Swap them for `<img>` tags pointing at files in `public/`.
- **Theme defaults**: change starting accent/wallpaper in `OSContext.jsx` (`DEFAULTS`). All colors derive from `styles/tokens.css`.
- **Resume PDF**: `Resume.app` renders an inline document and uses the browser print dialog for download; drop in a real embedded PDF if you prefer.
