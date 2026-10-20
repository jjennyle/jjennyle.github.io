/* Flat illustrations in the same style as the busken app:
   light greens, a dark green outline, yellow, red and blue accents. */

const c = {
  ink: "#2b4423",
  blob: "#e3ebc8",
  green: "#8fb35e",
  greenLight: "#c4dc98",
  cream: "#fbf8ee",
  yellow: "#f2c94c",
  red: "#e0533f",
  blue: "#4a7fc8",
  skin: "#f3cba5",
  grey: "#d8d6cf",
  brown: "#b98a5a",
};

const stroke = { stroke: c.ink, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" };

function Blob({ fill = c.blob }) {
  return (
    <path
      d="M44 70c8-34 52-52 92-46s74 24 78 62-12 70-48 84-92 10-114-14S36 104 44 70z"
      fill={fill}
    />
  );
}

function Sparkle({ x, y, s = 1, color = c.yellow }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-8C1-3 3-1 8 0 3 1 1 3 0 8-1 3-3 1-8 0-3-1-1-3 0-8z"
      fill={color}
    />
  );
}

/* A senior who cannot get past the login screen, next to a heavy bag */
function Senior() {
  return (
    <>
      <Blob />
      <Sparkle x={196} y={42} />
      <Sparkle x={36} y={60} s={0.7} color={c.green} />
      {/* heavy bag */}
      <path d="M40 150h38l4 32H36z" fill={c.brown} {...stroke} />
      <path d="M50 150c0-10 18-10 18 0" fill="none" {...stroke} />
      <text x="59" y="174" textAnchor="middle" fontSize="13" fontWeight="700" fill={c.ink} fontFamily="Geist, sans-serif">
        kg
      </text>
      {/* body */}
      <path d="M78 186c0-34 12-54 34-54s34 20 34 54z" fill={c.green} {...stroke} />
      {/* head */}
      <circle cx="112" cy="104" r="24" fill={c.skin} {...stroke} />
      <path d="M88 100c0-18 12-26 24-26s24 8 24 26c-6-8-14-12-24-12s-18 4-24 12z" fill={c.grey} {...stroke} />
      <circle cx="112" cy="70" r="8" fill={c.grey} {...stroke} />
      {/* glasses */}
      <circle cx="103" cy="108" r="6" fill="none" stroke={c.ink} strokeWidth="2.5" />
      <circle cx="121" cy="108" r="6" fill="none" stroke={c.ink} strokeWidth="2.5" />
      <path d="M109 108h6" stroke={c.ink} strokeWidth="2.5" />
      <path d="M106 120c4 2 8 2 12 0" fill="none" stroke={c.ink} strokeWidth="2.5" strokeLinecap="round" />
      {/* phone */}
      <rect x="146" y="96" width="46" height="80" rx="9" fill={c.cream} {...stroke} />
      <rect x="158" y="134" width="22" height="18" rx="3" fill={c.yellow} {...stroke} />
      <path d="M162 134v-6a7 7 0 0 1 14 0v6" fill="none" {...stroke} />
      <path d="M156 114h26M156 122h18" stroke={c.greenLight} strokeWidth="4" strokeLinecap="round" />
      {/* hand */}
      <circle cx="148" cy="150" r="8" fill={c.skin} {...stroke} />
      {/* question bubble */}
      <circle cx="198" cy="82" r="15" fill="#fff" {...stroke} />
      <text x="198" y="89" textAnchor="middle" fontSize="20" fontWeight="800" fill={c.red} fontFamily="Geist, sans-serif">
        ?
      </text>
    </>
  );
}

/* A volunteer facing hard words and a slow start */
function Language() {
  return (
    <>
      <Blob />
      <Sparkle x={40} y={58} s={0.8} />
      <Sparkle x={212} y={150} s={0.6} color={c.green} />
      {/* speech bubble with hard-to-read words */}
      <path d="M120 34h86a12 12 0 0 1 12 12v44a12 12 0 0 1-12 12h-58l-16 14 2-14h-14a12 12 0 0 1-12-12V46a12 12 0 0 1 12-12z" fill="#fff" {...stroke} />
      <path d="M124 54l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6" fill="none" stroke={c.blue} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M124 72l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6" fill="none" stroke={c.red} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M124 88h40" stroke={c.greenLight} strokeWidth="4" strokeLinecap="round" />
      {/* person */}
      <path d="M38 186c0-32 12-50 34-50s34 18 34 50z" fill={c.blue} {...stroke} />
      <circle cx="72" cy="110" r="24" fill={c.skin} {...stroke} />
      <path d="M48 106c0-18 10-28 24-28s24 10 24 28c-8-6-12-14-12-14-6 8-20 12-36 14z" fill={c.ink} />
      <circle cx="64" cy="114" r="2.6" fill={c.ink} />
      <circle cx="80" cy="114" r="2.6" fill={c.ink} />
      <path d="M66 126c4-3 8-3 12 0" fill="none" stroke={c.ink} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 104l9 3M86 104l-9 3" stroke={c.ink} strokeWidth="2.5" strokeLinecap="round" />
      {/* slow clock */}
      <circle cx="170" cy="152" r="26" fill={c.yellow} {...stroke} />
      <path d="M170 136v16l11 7" fill="none" {...stroke} />
      <path d="M204 132c4 6 4 14 0 20M212 126c7 10 7 24 0 34" fill="none" stroke={c.ink} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    </>
  );
}

/* Volunteers wanting to see the difference their work made */
function Impact() {
  return (
    <>
      <Blob />
      <Sparkle x={52} y={48} />
      <Sparkle x={206} y={60} s={0.7} color={c.green} />
      <Sparkle x={40} y={150} s={0.6} color={c.blue} />
      {/* phone with a report */}
      <rect x="82" y="34" width="76" height="140" rx="12" fill={c.cream} {...stroke} />
      <rect x="96" y="52" width="48" height="30" rx="5" fill={c.greenLight} {...stroke} />
      <circle cx="132" cy="62" r="5" fill={c.yellow} />
      <path d="M96 76c10-8 20-8 28-2s14 4 20 0" fill="none" stroke={c.ink} strokeWidth="2.5" />
      <rect x="98" y="122" width="10" height="34" rx="2" fill={c.green} {...stroke} />
      <rect x="115" y="108" width="10" height="48" rx="2" fill={c.green} {...stroke} />
      <rect x="132" y="94" width="10" height="62" rx="2" fill={c.green} {...stroke} />
      {/* heart bubble */}
      <circle cx="186" cy="104" r="20" fill="#fff" {...stroke} />
      <path d="M186 114s-11-7-11-14a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 7-11 14-11 14z" fill={c.red} stroke={c.ink} strokeWidth="2" strokeLinejoin="round" />
      {/* trash bag with tick */}
      <path d="M40 176c-4-22 6-38 22-38s26 16 22 38z" fill={c.ink} />
      <path d="M54 138l8-8 8 8" fill="none" stroke={c.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="74" cy="148" r="11" fill={c.yellow} {...stroke} />
      <path d="M69 148l4 4 6-7" fill="none" stroke={c.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}


/* ---------- PAT: navy outline, lime and lavender ---------- */

const p = {
  ink: "#1b2147",
  blob: "#e2e5f6",
  navy: "#3a4794",
  lavender: "#b9c0ee",
  lime: "#dbe56e",
  cream: "#fbf9f2",
  box: "#d9b07a",
  red: "#e0533f",
};
const pStroke = { stroke: p.ink, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" };

function Box({ x, y, w = 40, h = 30 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={p.box} {...pStroke} />
      <path d={`M${x + w / 2 - 6} ${y}v${h * 0.45}h12V${y}`} fill={p.cream} stroke={p.ink} strokeWidth="2.5" strokeLinejoin="round" />
    </g>
  );
}

/* An open binder filled in by hand */
function Binder() {
  return (
    <>
      <Blob fill={p.blob} />
      <Sparkle x={48} y={52} color={p.lime} />
      <Sparkle x={208} y={150} s={0.7} color={p.navy} />
      <path d="M58 52h64v118H58a8 8 0 0 1-8-8V60a8 8 0 0 1 8-8z" fill={p.navy} {...pStroke} />
      <path d="M122 52h64a8 8 0 0 1 8 8v102a8 8 0 0 1-8 8h-64z" fill={p.navy} {...pStroke} />
      <rect x="62" y="60" width="56" height="102" rx="3" fill={p.cream} {...pStroke} />
      <rect x="126" y="60" width="56" height="102" rx="3" fill={p.cream} {...pStroke} />
      <circle cx="122" cy="84" r="4" fill={p.lime} stroke={p.ink} strokeWidth="2" />
      <circle cx="122" cy="136" r="4" fill={p.lime} stroke={p.ink} strokeWidth="2" />
      <path d="M70 76c6-3 10 3 16 0s10 3 16 0M70 92c6-3 10 3 16 0s10 3 16 0 8 2 10 0M70 108c6-3 10 3 16 0s10 3 16 0M70 124c6-3 10 3 16 0" fill="none" stroke={p.navy} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M134 76c6-3 10 3 16 0s10 3 16 0M134 92c6-3 10 3 16 0M134 108c6-3 10 3 16 0s8 2 12 0" fill="none" stroke={p.navy} strokeWidth="2.5" strokeLinecap="round" />
      {/* pen */}
      <path d="M150 150l44-44 10 10-44 44-14 4z" fill={p.lime} {...pStroke} />
      <path d="M188 112l10 10" {...pStroke} />
    </>
  );
}

/* One envelope after another */
function Emails() {
  return (
    <>
      <Blob fill={p.blob} />
      <Sparkle x={200} y={46} color={p.lime} />
      <Sparkle x={44} y={150} s={0.7} color={p.navy} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${52 + i * 20} ${118 - i * 30}) rotate(${-8 + i * 6})`}>
          <rect x="0" y="0" width="84" height="56" rx="6" fill={i === 2 ? p.cream : p.lavender} {...pStroke} />
          <path d="M4 6l38 28 38-28" fill="none" {...pStroke} />
        </g>
      ))}
      {/* counter badge */}
      <circle cx="186" cy="92" r="18" fill={p.red} {...pStroke} />
      <text x="186" y="99" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff" fontFamily="Geist, sans-serif">
        12
      </text>
      <path d="M150 150c10 4 22 4 32-2M162 166c8 2 16 2 24-2" fill="none" stroke={p.navy} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    </>
  );
}

/* Looking for one package in a pile */
function Search() {
  return (
    <>
      <Blob fill={p.blob} />
      <Sparkle x={210} y={60} s={0.8} color={p.lime} />
      <Box x={46} y={136} w={48} h={36} />
      <Box x={92} y={140} w={42} h={32} />
      <Box x={60} y={104} w={44} h={32} />
      <Box x={132} y={146} w={36} h={26} />
      <Box x={100} y={112} w={30} h={28} />
      {/* magnifying glass */}
      <circle cx="160" cy="88" r="30" fill="rgba(255,255,255,0.75)" {...pStroke} strokeWidth="5" />
      <path d="M182 110l26 26" stroke={p.ink} strokeWidth="9" strokeLinecap="round" />
      <path d="M182 110l26 26" stroke={p.navy} strokeWidth="4" strokeLinecap="round" />
      <text x="160" y="98" textAnchor="middle" fontSize="28" fontWeight="800" fill={p.navy} fontFamily="Geist, sans-serif">
        ?
      </text>
    </>
  );
}

/* A clipboard with nothing filled in, and loose question marks */
function Overview() {
  return (
    <>
      <Blob fill={p.blob} />
      <Sparkle x={46} y={58} color={p.lime} />
      <rect x="86" y="44" width="80" height="120" rx="8" fill={p.navy} {...pStroke} />
      <rect x="96" y="58" width="60" height="98" rx="4" fill={p.cream} {...pStroke} />
      <rect x="110" y="36" width="32" height="16" rx="5" fill={p.lime} {...pStroke} />
      {[76, 98, 120].map((y) => (
        <g key={y}>
          <rect x="104" y={y} width="12" height="12" rx="2" fill="#fff" stroke={p.ink} strokeWidth="2.5" />
          <path d={`M122 ${y + 6}h26`} stroke={p.lavender} strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      <Box x={40} y={140} w={38} h={30} />
      <Box x={176} y={136} w={40} h={32} />
      {[
        [62, 112, -12],
        [196, 96, 10],
        [182, 58, -6],
      ].map(([x, y, r]) => (
        <text key={x} x={x} y={y} transform={`rotate(${r} ${x} ${y})`} textAnchor="middle" fontSize="26" fontWeight="800" fill={p.red} fontFamily="Geist, sans-serif">
          ?
        </text>
      ))}
    </>
  );
}

/* Survey answers coming in, turned into a workflow */
function Survey() {
  return (
    <>
      <Blob fill={p.blob} />
      <Sparkle x={44} y={56} color={p.lime} />
      <Sparkle x={214} y={168} s={0.7} color={p.navy} />
      {/* stacked survey sheets */}
      <rect x="52" y="58" width="76" height="100" rx="6" fill={p.lavender} {...pStroke} transform="rotate(-10 90 108)" />
      <rect x="58" y="52" width="76" height="100" rx="6" fill={p.cream} {...pStroke} transform="rotate(-3 96 102)" />
      <g transform="rotate(-3 96 102)">
        <path d="M68 68h40" stroke={p.navy} strokeWidth="4" strokeLinecap="round" />
        {[84, 104, 124].map((y, i) => (
          <g key={y}>
            <rect x="68" y={y} width="12" height="12" rx="2" fill="#fff" stroke={p.ink} strokeWidth="2.5" />
            {i !== 1 && <path d={`M70 ${y + 6}l3 3 6-7`} fill="none" stroke={p.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
            <path d={`M86 ${y + 6}h36`} stroke={p.lavender} strokeWidth="4" strokeLinecap="round" />
          </g>
        ))}
      </g>
      {/* answer count */}
      <circle cx="128" cy="52" r="20" fill={p.lime} {...pStroke} />
      <text x="128" y="59" textAnchor="middle" fontSize="19" fontWeight="800" fill={p.ink} fontFamily="Geist, sans-serif">
        14
      </text>
      {/* arrow to a small workflow */}
      <path d="M140 112c10-2 16-2 24 2" fill="none" {...pStroke} />
      <path d="M158 106l7 8-9 5" fill="none" {...pStroke} />
      <rect x="170" y="70" width="40" height="22" rx="5" fill={p.navy} {...pStroke} />
      <rect x="170" y="112" width="40" height="22" rx="5" fill={p.cream} {...pStroke} />
      <rect x="170" y="154" width="40" height="22" rx="5" fill={p.lime} {...pStroke} />
      <path d="M190 92v20M190 134v20" {...pStroke} />
    </>
  );
}

/* ---------- OutsAIde: blues, sunny yellow ---------- */

const o = {
  ink: "#16304d",
  blob: "#d9e8f6",
  blue: "#2f6aa8",
  sky: "#a9cbea",
  cream: "#fbfaf4",
  yellow: "#f2c94c",
  skin: "#f3cba5",
  green: "#8fb35e",
};
const oStroke = { stroke: o.ink, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" };

function Badge({ x, y, n, fill = o.yellow }) {
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill={fill} {...oStroke} />
      <text x={x} y={y + 7} textAnchor="middle" fontSize="19" fontWeight="800" fill={o.ink} fontFamily="Geist, sans-serif">
        {n}
      </text>
    </g>
  );
}

/* Two people talking */
function Interviews() {
  return (
    <>
      <Blob fill={o.blob} />
      <Sparkle x={42} y={60} color={o.yellow} />
      <Sparkle x={214} y={150} s={0.7} color={o.blue} />
      {/* left person */}
      <path d="M42 186c0-30 12-46 32-46s32 16 32 46z" fill={o.blue} {...oStroke} />
      <circle cx="74" cy="116" r="22" fill={o.skin} {...oStroke} />
      <path d="M52 112c0-16 10-24 22-24s22 8 22 24c-6-6-14-10-22-10s-16 4-22 10z" fill={o.ink} />
      <circle cx="80" cy="118" r="2.5" fill={o.ink} />
      <path d="M78 128c3 2 6 2 9 0" fill="none" stroke={o.ink} strokeWidth="2.5" strokeLinecap="round" />
      {/* right person */}
      <path d="M150 186c0-30 12-46 32-46s32 16 32 46z" fill={o.green} {...oStroke} />
      <circle cx="182" cy="116" r="22" fill={o.skin} {...oStroke} />
      <path d="M160 110c2-16 12-24 24-22s20 12 18 26c-10-2-20-8-24-16-4 6-10 10-18 12z" fill="#8a5a3a" {...oStroke} />
      <circle cx="175" cy="120" r="2.5" fill={o.ink} />
      <path d="M170 129c3 2 6 2 9 0" fill="none" stroke={o.ink} strokeWidth="2.5" strokeLinecap="round" />
      {/* speech bubbles */}
      <path d="M78 44h46a10 10 0 0 1 10 10v16a10 10 0 0 1-10 10H96l-10 10v-10h-8a10 10 0 0 1-10-10V54a10 10 0 0 1 10-10z" fill={o.cream} {...oStroke} />
      <path d="M82 58h36M82 68h24" stroke={o.sky} strokeWidth="4" strokeLinecap="round" />
      <path d="M138 66h34a10 10 0 0 1 10 10v12a10 10 0 0 1-10 10h-4v10l-10-10h-20a10 10 0 0 1-10-10V76a10 10 0 0 1 10-10z" fill="#fff" {...oStroke} />
      <circle cx="146" cy="82" r="3" fill={o.blue} />
      <circle cx="156" cy="82" r="3" fill={o.blue} />
      <circle cx="166" cy="82" r="3" fill={o.blue} />
      <Badge x={206} y={50} n="6" />
    </>
  );
}

/* Survey answers on a phone, shown as a bar chart */
function SurveyAnswers() {
  return (
    <>
      <Blob fill={o.blob} />
      <Sparkle x={46} y={62} color={o.yellow} />
      <Sparkle x={212} y={160} s={0.7} color={o.blue} />
      <rect x="86" y="34" width="80" height="146" rx="14" fill={o.cream} {...oStroke} />
      <path d="M114 44h24" stroke={o.ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M100 62h40" stroke={o.blue} strokeWidth="4" strokeLinecap="round" />
      {[78, 96, 114].map((y, i) => (
        <g key={y}>
          <circle cx="104" cy={y + 5} r="5" fill={i === 0 ? o.blue : "#fff"} stroke={o.ink} strokeWidth="2.5" />
          <path d={`M116 ${y + 5}h34`} stroke={o.sky} strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      <path d="M100 166h52" stroke={o.ink} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="104" y="146" width="10" height="20" rx="2" fill={o.sky} {...oStroke} />
      <rect x="121" y="134" width="10" height="32" rx="2" fill={o.blue} {...oStroke} />
      <rect x="138" y="140" width="10" height="26" rx="2" fill={o.yellow} {...oStroke} />
      <Badge x={176} y={44} n="22" />
      {/* little sun */}
      <circle cx="52" cy="128" r="12" fill={o.yellow} {...oStroke} />
      <path d="M52 106v-6M52 156v-6M30 128h-6M80 128h-6" stroke={o.ink} strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

/* Four phone sketches, one picked as the favourite */
function Proposals() {
  return (
    <>
      <Blob fill={o.blob} />
      <Sparkle x={40} y={56} s={0.8} color={o.yellow} />
      {[0, 1, 2, 3].map((i) => {
        const x = 44 + i * 44;
        const picked = i === 0;
        return (
          <g key={i} transform={`rotate(${[-8, -3, 3, 8][i]} ${x + 18} 120)`}>
            <rect x={x} y={picked ? 60 : 74} width="40" height="80" rx="7" fill={picked ? "#fff" : o.cream} {...oStroke} />
            <rect x={x + 7} y={(picked ? 60 : 74) + 12} width="26" height="16" rx="3" fill={[o.sky, o.yellow, o.green, o.sky][i]} stroke={o.ink} strokeWidth="2" />
            <path d={`M${x + 7} ${(picked ? 60 : 74) + 38}h26M${x + 7} ${(picked ? 60 : 74) + 48}h18M${x + 7} ${(picked ? 60 : 74) + 58}h22`} stroke={o.sky} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        );
      })}
      {/* favourite star */}
      <path d="M62 34l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z" fill={o.yellow} {...oStroke} />
      <Badge x={212} y={60} n="4" fill={o.sky} />
    </>
  );
}

/* ---------- Avtalesystem: lavender and indigo ---------- */

const a = {
  ink: "#20255a",
  blob: "#e0e3fb",
  indigo: "#4b54bd",
  lavender: "#bfc5f3",
  cream: "#fbfaf4",
  yellow: "#f2c94c",
  pink: "#ef9fb4",
  green: "#8fb35e",
  red: "#e0533f",
};
const aStroke = { stroke: a.ink, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" };

/* One persona: body, head, hair and a prop that shows the role */
function Persona({ skin, hair, hairStyle, shirt, children }) {
  return (
    <>
      <Blob fill={a.blob} />
      {/* long hair sits behind the head and shoulders */}
      {hairStyle === "long" && <path d="M98 100c0-24 14-38 32-38s32 14 32 38v46h-64z" fill={hair} {...aStroke} />}
      <path d="M78 190c0-36 14-56 52-56s52 20 52 56z" fill={shirt} {...aStroke} />
      <circle cx="130" cy="102" r="28" fill={skin} {...aStroke} />
      {hairStyle === "long" && <path d="M102 98c2-20 14-30 28-30s26 10 28 30c-10-8-20-12-30-12-8 4-16 8-26 12z" fill={hair} {...aStroke} />}
      {hairStyle === "short" && <path d="M102 100c0-22 12-34 28-34s28 12 28 34c-10-10-18-14-28-14s-18 4-28 14z" fill={hair} {...aStroke} />}
      {hairStyle === "bun" && (
        <>
          <circle cx="130" cy="66" r="11" fill={hair} {...aStroke} />
          <path d="M102 100c0-22 12-32 28-32s28 10 28 32c-8-8-18-12-28-12s-20 4-28 12z" fill={hair} {...aStroke} />
        </>
      )}
      {hairStyle === "cap" && (
        <>
          <path d="M102 94c0-18 12-28 28-28s28 10 28 28z" fill={a.indigo} {...aStroke} />
          <path d="M156 94h20" {...aStroke} strokeWidth="5" />
        </>
      )}
      <circle cx="120" cy="106" r="2.8" fill={a.ink} />
      <circle cx="140" cy="106" r="2.8" fill={a.ink} />
      <path d="M124 118c4 3 8 3 12 0" fill="none" stroke={a.ink} strokeWidth="2.5" strokeLinecap="round" />
      {children}
    </>
  );
}

/* Shift leader: clipboard with the shift plan */
function ShiftLeader() {
  return (
    <Persona skin="#f3cba5" hair="#5a3a2a" hairStyle="bun" shirt={a.indigo}>
      <Sparkle x={52} y={60} color={a.yellow} />
      <rect x="160" y="118" width="42" height="56" rx="5" fill={a.cream} {...aStroke} />
      <rect x="171" y="112" width="20" height="10" rx="3" fill={a.yellow} {...aStroke} />
      <path d="M168 136h26M168 148h26M168 160h18" stroke={a.lavender} strokeWidth="4" strokeLinecap="round" />
      <path d="M196 134l-4 4" stroke={a.indigo} strokeWidth="3" strokeLinecap="round" />
    </Persona>
  );
}

/* IT-help staff member: headset and laptop */
function ItStaff() {
  return (
    <Persona skin="#e8b48c" hair="#20255a" hairStyle="short" shirt={a.lavender}>
      <Sparkle x={206} y={60} s={0.8} color={a.yellow} />
      <path d="M100 104c0-20 14-34 30-34s30 14 30 34" fill="none" {...aStroke} />
      <rect x="94" y="98" width="10" height="18" rx="4" fill={a.indigo} {...aStroke} />
      <path d="M100 116c0 10 8 14 18 14" fill="none" stroke={a.ink} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M150 152h56l-6 26h-44z" fill={a.ink} />
      <rect x="152" y="132" width="50" height="34" rx="4" fill={a.cream} {...aStroke} />
      <path d="M160 142h22M160 152h30" stroke={a.indigo} strokeWidth="3" strokeLinecap="round" />
    </Persona>
  );
}

/* Student: backpack and a book */
function Student() {
  return (
    <Persona skin="#f6d2b5" hair="#2b2b2b" hairStyle="long" shirt={a.pink}>
      <Sparkle x={48} y={62} s={0.8} color={a.indigo} />
      <rect x="60" y="140" width="34" height="44" rx="10" fill={a.yellow} {...aStroke} />
      <path d="M68 156h18" {...aStroke} />
      <path d="M160 140l36-8v38l-36 8z" fill={a.indigo} {...aStroke} />
      <path d="M166 146l24-5M166 156l24-5" stroke={a.lavender} strokeWidth="3" strokeLinecap="round" />
    </Persona>
  );
}

/* External user: no UiO account, so a guest badge and a question */
function External() {
  return (
    <Persona skin="#c98e6a" hair="#7a4a2a" hairStyle="long" shirt={a.green}>
      <rect x="114" y="150" width="32" height="22" rx="4" fill={a.cream} {...aStroke} />
      <path d="M120 158h20M120 165h12" stroke={a.indigo} strokeWidth="3" strokeLinecap="round" />
      <circle cx="190" cy="72" r="17" fill="#fff" {...aStroke} />
      <text x="190" y="80" textAnchor="middle" fontSize="22" fontWeight="800" fill={a.red} fontFamily="Geist, sans-serif">
        ?
      </text>
      <Sparkle x={52} y={70} color={a.yellow} />
    </Persona>
  );
}

/* Local IT: cap and a wrench */
function LocalIt() {
  return (
    <Persona skin="#f3cba5" hair="#20255a" hairStyle="cap" shirt="#6f78d0">
      <Sparkle x={206} y={58} s={0.8} color={a.yellow} />
      <g transform="rotate(-35 184 150)">
        <rect x="178" y="128" width="12" height="46" rx="4" fill={a.lavender} {...aStroke} />
        <path d="M172 122a14 14 0 1 0 24 0l-6 8h-12z" fill={a.lavender} {...aStroke} />
      </g>
      <rect x="54" y="140" width="38" height="40" rx="5" fill={a.cream} {...aStroke} />
      <circle cx="64" cy="152" r="3" fill={a.green} />
      <circle cx="64" cy="166" r="3" fill={a.yellow} />
      <path d="M72 152h12M72 166h12" stroke={a.ink} strokeWidth="2.5" strokeLinecap="round" />
    </Persona>
  );
}

/* OutsAIde user challenges */

/* Ideas and weather spread across many apps */
function ScatteredApps() {
  return (
    <>
      <Blob fill={o.blob} />
      <Sparkle x={42} y={60} color={o.yellow} />
      <g transform="rotate(-10 80 110)">
        <rect x="46" y="74" width="66" height="82" rx="8" fill={o.cream} {...oStroke} />
        <path d="M46 90h66" {...oStroke} />
        <circle cx="79" cy="122" r="14" fill={o.yellow} {...oStroke} />
      </g>
      <g transform="rotate(8 176 104)">
        <rect x="144" y="62" width="66" height="82" rx="8" fill={o.cream} {...oStroke} />
        <path d="M144 78h66" {...oStroke} />
        <path d="M160 116a12 12 0 0 1 22-6 10 10 0 0 1 14 10h-38a8 8 0 0 1 2-4z" fill={o.sky} {...oStroke} />
      </g>
      <rect x="96" y="104" width="66" height="78" rx="8" fill="#fff" {...oStroke} />
      <path d="M96 120h66" {...oStroke} />
      <path d="M108 140l12-14 12 14 10-8 10 8v18h-44z" fill={o.green} {...oStroke} />
      <path d="M120 50c6-8 18-8 24 0M114 40c10-12 26-12 36 0" fill="none" stroke={o.blue} strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

/* Not knowing if the weather fits the plan */
function UnsureWeather() {
  return (
    <>
      <Blob fill={o.blob} />
      <Sparkle x={210} y={150} s={0.7} color={o.blue} />
      {/* calendar */}
      <rect x="50" y="88" width="84" height="84" rx="8" fill={o.cream} {...oStroke} />
      <path d="M50 108h84" {...oStroke} />
      <rect x="50" y="88" width="84" height="20" rx="8" fill={o.blue} {...oStroke} />
      <path d="M70 80v14M114 80v14" {...oStroke} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={62 + c * 22} y={118 + r * 16} width="14" height="10" rx="2" fill={r === 1 && c === 1 ? o.yellow : o.sky} />)
      )}
      {/* sun behind a rain cloud */}
      <circle cx="180" cy="66" r="20" fill={o.yellow} {...oStroke} />
      <path d="M146 112a20 20 0 0 1 32-18 16 16 0 0 1 28 12 12 12 0 0 1-2 24h-50a12 12 0 0 1-8-18z" fill="#fff" {...oStroke} />
      <path d="M160 144l-4 10M176 144l-4 10M192 144l-4 10" stroke={o.blue} strokeWidth="3" strokeLinecap="round" />
      <text x="96" y="66" textAnchor="middle" fontSize="28" fontWeight="800" fill={o.blue} fontFamily="Geist, sans-serif">
        ?
      </text>
    </>
  );
}

/* Running out of ideas for what to do */
function NoIdeas() {
  return (
    <>
      <Blob fill={o.blob} />
      <Sparkle x={44} y={56} color={o.yellow} />
      <path d="M70 188c0-32 14-50 42-50s42 18 42 50z" fill={o.sky} {...oStroke} />
      <circle cx="112" cy="112" r="24" fill={o.skin} {...oStroke} />
      <path d="M88 108c0-18 10-28 24-28s24 10 24 28c-8-6-14-12-16-18-6 8-18 14-32 18z" fill="#8a5a3a" {...oStroke} />
      <circle cx="104" cy="116" r="2.6" fill={o.ink} />
      <circle cx="120" cy="116" r="2.6" fill={o.ink} />
      <path d="M106 128h12" stroke={o.ink} strokeWidth="2.5" strokeLinecap="round" />
      {/* thought bubble */}
      <circle cx="146" cy="84" r="4" fill="#fff" {...oStroke} strokeWidth="2.5" />
      <circle cx="158" cy="70" r="6" fill="#fff" {...oStroke} strokeWidth="2.5" />
      <path d="M160 34h40a14 14 0 0 1 14 14v8a14 14 0 0 1-14 14h-40a14 14 0 0 1-14-14v-8a14 14 0 0 1 14-14z" fill="#fff" {...oStroke} />
      <text x="180" y="62" textAnchor="middle" fontSize="22" fontWeight="800" fill={o.blue} fontFamily="Geist, sans-serif">
        ? ? ?
      </text>
      {/* hiking boot and ball as possible activities */}
      <circle cx="190" cy="162" r="14" fill={o.yellow} {...oStroke} />
      <path d="M178 156c8 4 16 4 24 0M178 168c8-4 16-4 24 0" fill="none" stroke={o.ink} strokeWidth="2" />
    </>
  );
}

/* Weather warnings that are easy to miss */
function Warning() {
  return (
    <>
      <Blob fill={o.blob} />
      <Sparkle x={210} y={58} s={0.8} color={o.blue} />
      {/* wind lines */}
      <path d="M40 92h56c10 0 12-14 2-14M44 112h74c12 0 14 16 2 16M52 136h40" fill="none" stroke={o.blue} strokeWidth="3.5" strokeLinecap="round" />
      {/* warning triangle */}
      <path d="M156 52l50 88h-100z" fill={o.yellow} {...oStroke} strokeWidth="4" />
      <path d="M156 84v28" stroke={o.ink} strokeWidth="6" strokeLinecap="round" />
      <circle cx="156" cy="126" r="4" fill={o.ink} />
      {/* small tent */}
      <path d="M58 182l26-34 26 34z" fill={o.green} {...oStroke} />
      <path d="M84 182v-20" {...oStroke} />
    </>
  );
}

const drawings = {
  senior: Senior,
  language: Language,
  impact: Impact,
  binder: Binder,
  emails: Emails,
  search: Search,
  overview: Overview,
  survey: Survey,
  interviews: Interviews,
  surveyAnswers: SurveyAnswers,
  proposals: Proposals,
  shiftLeader: ShiftLeader,
  itStaff: ItStaff,
  student: Student,
  external: External,
  localIt: LocalIt,
  scatteredApps: ScatteredApps,
  unsureWeather: UnsureWeather,
  noIdeas: NoIdeas,
  warning: Warning,
};

export default function Illustration({ name }) {
  const Drawing = drawings[name];
  if (!Drawing) return null;
  return (
    <svg viewBox="20 16 220 176" className="illustration" aria-hidden="true">
      <Drawing />
    </svg>
  );
}
