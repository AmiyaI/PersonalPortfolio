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
import Hero from "../Pages/Hero";
import About from "../Pages/About";
import Experience from "../Pages/Experience";
import Projects from "../Pages/Projects";
import Skills from "../Pages/Skills";
import Beyond from "../Pages/Beyond";
import Hobbies from "../Pages/Hobbies";
import Contact from "../Pages/Contact";

// The creative pages carry their own media and code, so they load on demand.
const Studio = lazy(() => import("../Pages/Studio"));
const AiSlop = lazy(() => import("../Pages/AiSlop"));

const Home = () => (
  <main>
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Skills />
    <Beyond />
    <Hobbies />
    <Contact />
  </main>
);

const TITLES = {
  "/": "Who's Amiya ?",
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
    document.title = TITLES[pathname] ?? TITLES["/"];
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
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
