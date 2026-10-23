import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* Opens project images in a larger view. Uses the native <dialog>, which
   traps focus, closes on Escape and returns focus to the image afterwards.
   Arrow keys move between images in the same group. */

const LightboxContext = createContext(() => {});
export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }) {
  const dialog = useRef(null);
  const [state, setState] = useState({ items: [], index: 0 });

  const open = useCallback((items, index = 0) => {
    setState({ items, index });
    dialog.current?.showModal();
  }, []);

  const close = () => dialog.current?.close();
  const step = (d) => setState((s) => ({ ...s, index: (s.index + d + s.items.length) % s.items.length }));

  useEffect(() => {
    const el = dialog.current;
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  const item = state.items[state.index];
  const many = state.items.length > 1;

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={item ? `Image: ${item.caption || "project image"}` : "Image"}
        onClick={(e) => e.target === dialog.current && close()}
      >
        {item && (
          <figure className="lightbox__figure">
            <img src={item.src} alt={item.alt ?? item.caption ?? ""} />
            {(item.caption || many) && (
              <figcaption>
                {item.caption}
                {many && (
                  <span className="lightbox__count">
                    {state.index + 1} / {state.items.length}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        )}
        <button type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close image">
          <X size={22} aria-hidden="true" />
        </button>
        {many && (
          <>
            <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Previous image">
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Next image">
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </>
        )}
      </dialog>
    </LightboxContext.Provider>
  );
}

/* An image that opens in the lightbox. `group` is the list it belongs to. */
export function Zoomable({ group, index, className = "", children }) {
  const open = useLightbox();
  const item = group[index];
  return (
    <button
      type="button"
      className={`zoomable ${className}`}
      onClick={() => open(group, index)}
      aria-label={`Open larger image: ${item.caption || item.alt || "project image"}`}
    >
      {children}
    </button>
  );
}
