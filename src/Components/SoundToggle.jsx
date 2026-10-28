/*
     FileName: SoundToggle.jsx
     @version: I
     Creation: 10/28/2026
     Last modification: 10/28/2026
*/

// Background music, on by default, with a small play/pause button in the
// bottom-left corner. Browsers block sound until the visitor interacts with
// the page, so if the first play() is refused the music starts on their first
// click, tap or key press instead. Pausing is remembered for the next visit.
// It lives outside the routes, so the track keeps playing across pages.

import { useEffect, useRef, useState } from "react";

const TRACK = { src: "/audio/free-mind.mp3", title: "Free Mind (Instrumental)", artist: "Tems" };
const VOLUME = 0.35;
const STORAGE_KEY = "amiya-sound";

const readChoice = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};
const saveChoice = (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Private mode or blocked storage: the choice just isn't remembered.
  }
};

const SoundToggle = () => {
  const audio = useRef(null);
  const button = useRef(null);
  // "playing", "paused", "waiting" (wants to play, the browser needs a gesture
  // first), or "nudge" (still waiting, and a scroll attempt was just refused).
  const [state, setState] = useState("paused");

  // Raise the volume gently instead of starting at full level.
  const fadeIn = () => {
    const el = audio.current;
    el.volume = 0;
    const step = () => {
      if (el.paused) return;
      el.volume = Math.min(VOLUME, el.volume + VOLUME / 30);
      if (el.volume < VOLUME) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const play = () =>
    audio.current.play().then(() => {
      fadeIn();
      setState("playing");
    });

  // On by default unless the visitor paused it last time.
  useEffect(() => {
    if (readChoice() === "off") return undefined;

    // Every interaction tries to start the music; the listeners only go away
    // once it is actually playing. A press, the end of a touch, a click or a
    // key always works. Scrolling only works where the browser already allows
    // sound for this site (e.g. Chrome for returning visitors); elsewhere a
    // refused scroll attempt just makes the button more noticeable.
    // One attempt at a time, since scroll and wheel fire continuously.
    let trying = false;
    const attempt = (e) => {
      // A press on the button itself is handled by its own click.
      if (trying || button.current?.contains(e.target)) return;
      trying = true;
      play()
        .then(removeListeners)
        .catch(() => setState("nudge"))
        .finally(() => {
          trying = false;
        });
    };
    const events = ["pointerdown", "pointerup", "touchend", "click", "keydown", "wheel", "scroll", "touchmove"];
    const removeListeners = () => events.forEach((type) => window.removeEventListener(type, attempt));

    play().catch(() => {
      setState("waiting");
      events.forEach((type) => window.addEventListener(type, attempt, { passive: true }));
    });
    return removeListeners;
  }, []);

  // Pause while the tab is hidden; pick up again when the visitor comes back.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) audio.current?.pause();
      else if (state === "playing") audio.current?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [state]);

  const toggle = () => {
    if (state === "playing") {
      audio.current.pause();
      setState("paused");
      saveChoice("off");
    } else {
      saveChoice("on");
      play().catch(() => setState("paused"));
    }
  };

  const playing = state === "playing";
  const label = playing ? "Pause music" : "Play music";
  const asking = state === "waiting" || state === "nudge";

  return (
    <>
      <audio ref={audio} src={TRACK.src} loop preload="none" />
      <button
        ref={button}
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={playing}
        title={`${label}: ${TRACK.title}, ${TRACK.artist}`}
        data-cursor={playing ? "Pause" : "Play"}
        className={`group fixed bottom-5 left-5 z-[65] flex h-11 origin-bottom-left items-center gap-2.5 rounded-full pr-4 pl-3 text-white shadow-[0_10px_30px_-10px_rgba(20,13,38,0.6)] backdrop-blur-md transition-[background-color,translate,scale] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-0.5 sm:bottom-6 sm:left-6 ${
          state === "nudge" ? "scale-110 bg-[#6a4ae8] hover:bg-[#5b3bd9]" : "bg-[#140d26]/75 hover:bg-[#140d26]/90"
        }`}
      >
        {/* Equalizer bars while playing, a play triangle otherwise. */}
        <span aria-hidden="true" className="flex h-4 w-4 items-end justify-center gap-[2px]">
          {playing ? (
            [0, 1, 2, 3].map((i) => (
              <span key={i} className="sound-bar w-[3px] rounded-full bg-white" style={{ animationDelay: `${i * -0.22}s` }} />
            ))
          ) : (
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M4 2.5v11l9.5-5.5z" />
            </svg>
          )}
        </span>
        <span className="text-small font-semibold whitespace-nowrap">
          {asking ? "Tap for sound" : playing ? "Sound on" : "Sound off"}
        </span>
        {asking && (
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full ring-2 ring-white/40 [animation-duration:2s]" />
        )}
      </button>
    </>
  );
};

export default SoundToggle;
