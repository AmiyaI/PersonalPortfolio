/*
     FileName: app.jsx
     @version: I
     Creation: 10/23/2023
     Last modification: 10/23/2023
*/

import NavBar from "../Components/nav/NavBar";
import Hero from "../Pages/Hero";
import Projects from "../Pages/Projects";
import About from "../Pages/About";
import Skills from "../Pages/Skills";
import Contact from "../Pages/Contact";

function App() {
  return (
    <>
      {/* TEMP: stale-content banner — remove once the site is refreshed */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-grayscale-950 text-grayscale-50 text-center py-2 px-4 text-xs sm:text-sm">
        <span className="hidden sm:inline">Heads up — site last updated <strong>Feb 2025</strong>, currently being refreshed. For my latest: </span>
        <span className="sm:hidden">Last updated Feb 2025 · latest: </span>
        <a
          href="https://linkedin.com/in/amiya-islam"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary-400 font-medium"
        >
          linkedin.com/in/amiya-islam
        </a>
      </div>
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}

export default App;
