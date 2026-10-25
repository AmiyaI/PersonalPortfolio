/*
     FileName: MediaViewer.jsx
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Hover-preview cards and the full-screen viewer behind them. Cards play
// their silent loop while hovered (or while on screen, on touch devices)
// and open the viewer on click. The viewer plays the full video when an
// entry has a `src`, otherwise its preview loop, and shows any stills.

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "../motion/SmoothScroll";
import { hasFinePointer, prefersReducedMotion } from "../../lib/gsap";

const ViewerContext = createContext(() => {});

export const useMediaViewer = () => useContext(ViewerContext);

const ASPECT = { "16:9": "aspect-video", "9:16": "aspect-[9/16]", "4:5": "aspect-[4/5]", "1:1": "aspect-square" };

export const aspectClass = (aspect) => ASPECT[aspect] ?? "aspect-video";

export const formatDuration = (sec) =>
  sec ? `${Math.floor(sec / 60)}:${String(Math.round(sec % 60)).padStart(2, "0")}` : null;

export const MediaViewerProvider = ({ children, theme = "dark" }) => {
  const [item, setItem] = useState(null);
  const [index, setIndex] = useState(0);
  const lenis = useLenis();
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const returnFocus = useRef(null);
  const open = useCallback((entry, start = 0) => {
    returnFocus.current = document.activeElement;
    setIndex(start);
    setItem(entry);
  }, []);
  const close = useCallback(() => setItem(null), []);

  // Slot 0 is the video when there is one; stills follow in order.
  const hasVideo = Boolean(item && (item.src || item.preview));
  const slots = item
    ? [
        ...(hasVideo ? [{ type: "video", thumb: item.poster }] : []),
        ...(item.images ?? []).map((src) => ({ type: "image", src, thumb: src })),
      ]
    : [];
  if (item && !slots.length) slots.push({ type: "image", src: item.poster, thumb: item.poster });
  const slot = slots[index] ?? slots[0];
  const slotCount = useRef(1);
  slotCount.current = Math.max(slots.length, 1);

  // While open: lock page scrolling, move focus in, keep Tab inside, and hand
  // focus back to whatever opened the viewer when it closes.
  const isOpen = Boolean(item);
  useEffect(() => {
    if (!isOpen) return undefined;
    const html = document.documentElement;
    lenis?.stop();
    html.style.overflow = "hidden";
    requestAnimationFrame(() => closeButton.current?.focus());
    const onKey = (e) => {
      if (e.key === "Escape") close();
      // Leave arrow keys to video controls when they have focus.
      const inVideo = e.target instanceof HTMLVideoElement;
      if (!inVideo && e.key === "ArrowRight") setIndex((i) => (i + 1) % slotCount.current);
      if (!inVideo && e.key === "ArrowLeft") setIndex((i) => (i - 1 + slotCount.current) % slotCount.current);
      if (e.key === "Tab" && dialog.current) {
        const focusable = dialog.current.querySelectorAll("button, video[controls], a[href]");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen, lenis, close]);

  const light = theme === "light";

  return (
    <ViewerContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {item && (
          <motion.div
            key="viewer"
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            className={`fixed inset-0 z-[120] flex flex-col ${light ? "bg-[#d2ff00]/95 text-[#111112]" : "bg-[#0d0b10]/95 text-[#f2ead8]"} backdrop-blur-md`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <div
              className="flex items-center justify-between gap-4 px-6 pt-20 pb-4 md:pt-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] opacity-60">{item.tags?.join(" · ")}</p>
                <h2 className="text-5xl leading-none sm:text-6xl" style={{ fontFamily: "Morganite Black" }}>
                  {item.title}
                </h2>
              </div>
              <button
                ref={closeButton}
                type="button"
                onClick={close}
                className={`shrink-0 rounded-full border px-5 py-2 text-sm ${light ? "border-[#111112]" : "border-[#f2ead8]/40"}`}
              >
                Close ✕
              </button>
            </div>
            <motion.div
              className="flex min-h-0 flex-1 items-center justify-center px-6 pb-4"
              initial={{ y: 40, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.96 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            >
              <div className="relative flex h-full max-h-full w-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {slot?.type === "video" ? (
                  <video
                    key={item.src ?? item.preview}
                    src={item.src ?? item.preview}
                    poster={item.poster}
                    className="max-h-full max-w-full rounded-xl shadow-2xl"
                    autoPlay
                    playsInline
                    loop={!item.src}
                    muted={!item.src}
                    controls={Boolean(item.src)}
                  />
                ) : (
                  <img
                    key={slot.src}
                    src={slot.src}
                    alt={`${item.title}, image ${index + 1} of ${slots.length}`}
                    className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                  />
                )}
              </div>
            </motion.div>
            <div className="flex flex-col gap-3 px-6 pb-6" onClick={(e) => e.stopPropagation()} style={{ fontFamily: "Poppins, sans-serif" }}>
              <p className="max-w-2xl text-sm opacity-80">
                {item.blurb}
                {hasVideo && !item.src && <span className="opacity-60"> Full cut coming soon; this is the preview loop.</span>}
              </p>
              {slots.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {slots.map((entry, i) => (
                    <button
                      type="button"
                      key={entry.thumb + i}
                      onClick={() => setIndex(i)}
                      aria-label={entry.type === "video" ? "Play the video" : `Show image ${i + 1}`}
                      className={`h-16 shrink-0 overflow-hidden rounded-md border-2 ${index === i ? "border-current" : "border-transparent opacity-60"}`}
                    >
                      <img src={entry.thumb} alt="" loading="lazy" className="h-full w-auto" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ViewerContext.Provider>
  );
};

export const PreviewCard = ({ item, className = "", children, cursor = "Play" }) => {
  const video = useRef(null);
  const card = useRef(null);
  const open = useMediaViewer();
  const fine = hasFinePointer();

  // Touch screens can't hover, so loops play while the card is on screen.
  useEffect(() => {
    if (fine || !video.current || prefersReducedMotion()) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.current?.play().catch(() => {});
      else video.current?.pause();
    }, { threshold: 0.6 });
    observer.observe(card.current);
    return () => observer.disconnect();
  }, [fine]);

  const play = () => fine && video.current?.play().catch(() => {});
  const stop = () => {
    if (!fine || !video.current) return;
    video.current.pause();
    video.current.currentTime = 0;
  };

  return (
    <button
      ref={card}
      type="button"
      onClick={() => open(item)}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      data-cursor={item.preview ? cursor : "View"}
      aria-label={`Open ${item.title}`}
      className={`group relative block w-full overflow-hidden text-left ${aspectClass(item.aspect)} ${className}`}
    >
      <img
        src={item.poster}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
      />
      {item.preview && (
        <video
          ref={video}
          src={item.preview}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(pointer:coarse)]:opacity-100"
        />
      )}
      {children}
    </button>
  );
};
