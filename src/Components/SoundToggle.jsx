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
  // "playing", "paused", or "waiting" (wants to play, the browser needs a gesture first).
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

    const onGesture = (e) => {
      // A press on the button itself is handled by its own click.
      if (button.current?.contains(e.target)) return;
      play().catch(() => {});
      removeGestures();
    };
    // The events browsers accept as permission to start sound: a mouse press,
    // the end of a touch (touchstart does not count on phones), a click or a key.
    // Scrolling never counts.
    const events = ["pointerdown", "pointerup", "touchend", "click", "keydown"];
    const removeGestures = () => events.forEach((type) => window.removeEventListener(type, onGesture));

    play().catch(() => {
      setState("waiting");
      events.forEach((type) => window.addEventListener(type, onGesture, { passive: true }));
    });
    return removeGestures;
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
        className="group fixed bottom-5 left-5 z-[65] flex h-11 items-center gap-2.5 rounded-full bg-[#140d26]/75 pr-4 pl-3 text-white shadow-[0_10px_30px_-10px_rgba(20,13,38,0.6)] backdrop-blur-md transition-[background-color,translate] duration-300 hover:-translate-y-0.5 hover:bg-[#140d26]/90 sm:bottom-6 sm:left-6"
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
          {state === "waiting" ? "Tap for sound" : playing ? "Sound on" : "Sound off"}
        </span>
        {state === "waiting" && (
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full ring-2 ring-white/40 [animation-duration:2s]" />
        )}
      </button>
    </>
  );
};

export default SoundToggle;
