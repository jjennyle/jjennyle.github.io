import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, ArrowRight } from "lucide-react";
import { useClock } from "../../hooks/useClock.js";
import { useWeather } from "../../hooks/useWeather.js";
import { useWindows } from "../../context/WindowContext.jsx";
import { about } from "../../data/about.js";
import { journal } from "../../data/journal.js";
import { projects } from "../../data/projects.js";
import { getApp, projectDetailApp } from "../../apps/registry.js";
import styles from "./HomeWidgets.module.css";
import jennyPhoto from "../../jenny.jpg";

function Card({ className = "", delay = 0, children, ...rest }) {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 + delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function Welcome({ open }) {
  return (
    <Card className={styles.welcome} delay={0}>
      <img src={jennyPhoto} alt="" className={styles.welcomePhoto} />
      <div className={styles.dotsRow}>
        <span /><span /><span />
      </div>
      <p className={styles.hi}>Hello,</p>
      <h1 className={styles.signature}>
        <span style={{ color: "var(--ink)", fontFamily: "inherit" }}>I'm </span>
        {about.name.split(" ")[0]}
      </h1>
      <p className={styles.tagline}>
        UX/UI designer<br />Informatics & UX Design student at UiO<br />Designing with purpose.
      </p>
      <p className={styles.welcomeQuote}>
        "I care most about designing for everyone — because a product that excludes someone isn't finished."
      </p>
    </Card>
  );
}

function NowPlaying() {
  const audioRef = useState(() => new Audio("/nemuko.mp3"))[0];
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useState(() => {
    audioRef.loop = true;
    const update = () => {
      if (audioRef.duration) setProgress(audioRef.currentTime / audioRef.duration);
    };
    audioRef.addEventListener("timeupdate", update);
    return () => audioRef.removeEventListener("timeupdate", update);
  });

  const toggle = () => {
    if (playing) { audioRef.pause(); setPlaying(false); }
    else { audioRef.play(); setPlaying(true); }
  };

  return (
    <Card className={styles.np} delay={0.05}>
      <span className={styles.npLabel}>Now playing</span>
      <div className={styles.npRow}>
        <div className={styles.npArt}>
          <span className={`${styles.eq} ${playing ? styles.eqOn : ""}`}>
            <i /><i /><i /><i />
          </span>
        </div>
        <div className={styles.npMeta}>
          <span className={styles.npTitle}>Hadar</span>
          <span className={styles.npArtist}>Nemuko</span>
        </div>
      </div>
      <div className={styles.npControls}>
        <button aria-label="Previous" onClick={() => { audioRef.currentTime = 0; }}><SkipBack size={16} /></button>
        <button className={styles.npPlay} onClick={toggle} aria-label="Play/Pause">
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button aria-label="Next" onClick={() => { audioRef.currentTime = 0; }}><SkipForward size={16} /></button>
      </div>
      <div className={styles.npTrack}>
        <motion.div className={styles.npFill} animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.5 }} />
      </div>
    </Card>
  );
}

function WeatherIcon({ symbol, size = 16 }) {
  const s = symbol || "";
  if (s.includes("rain") || s.includes("sleet")) return <CloudRain size={size} />;
  if (s.includes("snow")) return <CloudSnow size={size} />;
  if (s.includes("thunder")) return <CloudLightning size={size} />;
  if (s.includes("fair") || s.includes("clearsky")) return <Sun size={size} />;
  if (s.includes("fog")) return <Wind size={size} />;
  return <Cloud size={size} />;
}

function Weather() {
  const w = useWeather();
  const details = w ? [
    { label: "Feels like", value: `${w.feelsLike}°` },
    { label: "Humidity", value: `${w.humidity}%` },
    { label: "Wind", value: `${w.wind} km/h` },
  ] : [
    { label: "Feels like", value: "—" },
    { label: "Humidity", value: "—" },
    { label: "Wind", value: "—" },
  ];

  return (
    <Card className={styles.weather} delay={0.1}>
      <div className={styles.wTop}>
        <div>
          <span className={styles.wCity}>Oslo</span>
          <span className={styles.wCond}>{w?.condition ?? "Loading…"}</span>
        </div>
        <div className={styles.wTemp}>
          <WeatherIcon symbol={w?.symbol} size={26} />
          <span>{w ? `${w.temp}°` : "—"}</span>
        </div>
      </div>
      <div className={styles.wDetails}>
        {details.map((d) => (
          <div key={d.label} className={styles.wDetail}>
            <span className={styles.wDetailLabel}>{d.label}</span>
            <span className={styles.wDetailValue}>{d.value}</span>
          </div>
        ))}
      </div>
      <div className={styles.wDays}>
        {(w?.forecast ?? Array(4).fill(null)).map((x, i) => (
          <div key={i} className={styles.wDay}>
            <span>{x?.day ?? "—"}</span>
            <WeatherIcon symbol={x?.symbol} size={15} />
            <span className={styles.wDayT}>{x ? `${x.temp}°` : "—"}</span>
          </div>
        ))}
      </div>
      <span className={styles.wSource}>Powered by Yr / MET Norway</span>
    </Card>
  );
}

function Clock() {
  const now = useClock();
  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const hourDeg = h * 30 + m * 0.5;
  const minDeg = m * 6;
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return (
    <Card className={styles.clock} delay={0.12}>
      <div className={styles.face}>
        {[...Array(12)].map((_, i) => (
          <span key={i} className={styles.tick} style={{ transform: `rotate(${i * 30}deg)` }} />
        ))}
        <span className={styles.hHand} style={{ transform: `rotate(${hourDeg}deg)` }} />
        <span className={styles.mHand} style={{ transform: `rotate(${minDeg}deg)` }} />
        <span className={styles.pin} />
      </div>
      <span className={styles.digital}>{time}</span>
    </Card>
  );
}

function Calendar({ open }) {
  const now = useClock();
  const day = now.getDate();
  const month = now.toLocaleDateString("en-US", { month: "long" });
  return (
    <Card className={styles.cal} delay={0.16}>
      <div className={styles.calHead}>
        <span>Today</span>
        <span className={styles.calDate}>
          {now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
        </span>
      </div>
      <span className={styles.calBig}>{day}</span>
      <div className={styles.calEvents}>
        <div className={styles.event}>
          <span className={styles.eTime}>10:00</span>
          <span>Design review</span>
        </div>
        <div className={styles.event}>
          <span className={styles.eTime}>14:00</span>
          <span>Studio time</span>
        </div>
      </div>
      <button className={styles.calLink} onClick={() => open(getApp("journal"))}>
        Open journal <ArrowRight size={13} />
      </button>
    </Card>
  );
}

function ViewWork({ open }) {
  return (
    <Card className={styles.work} delay={0.18}>
      <div className={styles.workHead}>
        <span className={styles.workHeadLabel}>Recent works</span>
        <span className={styles.peekCount}>{projects.length} case studies</span>
      </div>
      <div className={styles.workGrid}>
        {["maid", "vibely", "outsaide", "pawtential"].map(id => projects.find(p => p.id === id)).filter(Boolean).map((p, i) => (
          <motion.button
            key={p.id}
            className={styles.workCard}
            onClick={() => open(projectDetailApp, { project: p, title: p.name })}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <span
              className={styles.workThumb}
              style={{ background: `linear-gradient(150deg, ${p.tint[0]}, ${p.tint[1]})` }}
            >
              {p.thumb
                ? <img src={p.thumb} alt={p.name} className={styles.workThumbImg} />
                : <span className={styles.workGlyph}>{p.name[0]}</span>
              }
            </span>
            <span className={styles.workCardMeta}>
              <span className={styles.workCardName}>{p.name}</span>
              <span className={styles.workCardTag}>{p.tagline}</span>
              <span className={styles.workCardYear}>{p.year}</span>
            </span>
            <ArrowRight size={14} className={styles.workArrow} />
          </motion.button>
        ))}
      </div>
    </Card>
  );
}

const GOALS = [
  { id: 1, text: "Finalize portfolio" },
  { id: 2, text: "Start UX master at UiO" },
  { id: 3, text: "Create a project using AI" },
];

function Goals() {
  const [done, setDone] = useState({});
  const toggle = (id) => setDone((d) => ({ ...d, [id]: !d[id] }));
  return (
    <Card className={styles.peek} delay={0.2}>
      <div className={styles.goalsHead}>
        <span className={styles.goalsTitle}>Goals for 2026</span>
        <span className={styles.goalsBadge}>{Object.values(done).filter(Boolean).length}/{GOALS.length}</span>
      </div>
      <div className={styles.goalsList}>
        {GOALS.map((g) => (
          <button key={g.id} className={styles.goalItem} onClick={() => toggle(g.id)}>
            <span className={`${styles.goalDot} ${done[g.id] ? styles.goalDotDone : ""}`}>
              {done[g.id] && <span className={styles.goalCheck} />}
            </span>
            <span className={`${styles.goalText} ${done[g.id] ? styles.goalTextDone : ""}`}>{g.text}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function Thought() {
  return (
    <Card className={styles.thought} delay={0.22}>
      <span className={styles.quoteMark}>“</span>
      <p className={styles.quote}>
        Your primary role should be to share what you know, not to tell people how things should be done.
      </p>
      <span className={styles.quoteBy}>— Steve Krug</span>
    </Card>
  );
}

export default function HomeWidgets() {
  const { open } = useWindows();
  return (
    <div className={styles.grid}>
      <Welcome open={open} />
      <NowPlaying />
      <Weather />
      <Clock />
      <Goals />
      <ViewWork open={open} />
      <Thought />
    </div>
  );
}
