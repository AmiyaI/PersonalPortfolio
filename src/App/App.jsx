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
      {/* b4ai.amiyaislam.com: the original 2023 site, kept as it was, pointing to the new one. */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-grayscale-950 text-grayscale-50 text-center py-2 px-4 text-xs sm:text-sm">
        <span className="hidden sm:inline">You're on my original 2023 site, built by hand before AI coding tools. The new one: </span>
        <span className="sm:hidden">My 2023 site, built before AI · new one: </span>
        <a
          href="https://amiyaislam.com"
          className="underline text-primary-400 font-medium"
        >
          amiyaislam.com
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
