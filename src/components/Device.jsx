/* Shows a set of mockups: phones fanned out, or a single laptop. */
export default function Device({ kind, items, alt = "", eager = false }) {
  const loading = eager ? "eager" : "lazy";
  if (kind === "laptop") {
    return (
      <div className="device device--laptop">
        <img src={`/images/${items[0]}.webp`} alt={alt} loading={loading} />
      </div>
    );
  }
  return (
    <div className={`device device--phones device--n${items.length}`}>
      {items.map((src, i) => (
        <img key={src} src={`/images/${src}.webp`} alt={i === 0 ? alt : ""} loading={loading} />
      ))}
    </div>
  );
}
