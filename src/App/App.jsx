/*
     FileName: app.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import NavBar from "../Components/nav/NavBar";
import Footer from "../Components/Footer";
import Cursor from "../Components/motion/Cursor";
import { ScrollTrigger } from "../lib/gsap";
import { routeLoaders } from "./routes";
import { TransitionLink } from "../Components/motion/PageTransition";
import Hero from "../Pages/Hero";
import About from "../Pages/About";
import EarlyAI from "../Pages/EarlyAI";
import Experience from "../Pages/Experience";
import Projects from "../Pages/Projects";
import Skills from "../Pages/Skills";
import Beyond from "../Pages/Beyond";
import Hobbies from "../Pages/Hobbies";
import HotTakes from "../Pages/HotTakes";
import Contact from "../Pages/Contact";

// The creative pages carry their own media and code, so they load on demand.
const Studio = lazy(routeLoaders["/studio"]);
const AiSlop = lazy(routeLoaders["/ai-slop"]);

// tabIndex -1 lets the page transition move focus here after a route change.
const Home = () => (
  <main id="main" tabIndex={-1} className="outline-none">
    <Hero />
    <About />
    <EarlyAI />
    <Experience />
    <Projects />
    <Skills />
    <Beyond />
    <Hobbies />
    <HotTakes />
    <Contact />
  </main>
);

const NotFound = () => (
  <main id="main" tabIndex={-1} className="field-ground flex min-h-[80svh] flex-col items-start justify-center gap-6 px-5 pt-24 outline-none sm:px-8">
    <h1 className="text-head leading-[0.95] font-extrabold tracking-[-0.035em]">This page wandered off.</h1>
    <p className="max-w-[40ch] text-body">The link might be old or mistyped. Everything I've made is one click away.</p>
    <TransitionLink to="/" label="Amiya" className="rounded-full bg-night px-6 py-3.5 text-body font-extrabold text-white">
      Back home →
    </TransitionLink>
  </main>
);

const TITLES = {
  "/": "Amiya Islam · AI and cloud engineer",
  "/studio": "Studio · Amiya Islam",
  "/ai-slop": "AI Slop · Amiya Islam",
};

function App() {
  const { pathname } = useLocation();

  // Cabinet Grotesk arrives after first paint and changes section heights.
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    document.title = TITLES[pathname] ?? "Not found · Amiya Islam";
    // New page, new layout: let every ScrollTrigger re-measure.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <Cursor />
      <NavBar />
      <Suspense fallback={<div className="h-[100svh]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/ai-slop" element={<AiSlop />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
