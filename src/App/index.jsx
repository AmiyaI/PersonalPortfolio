/*
     FileName: index.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Preloader from "../Components/Preloader";
import SmoothScroll from "../Components/motion/SmoothScroll";
import { PageTransitionProvider } from "../Components/motion/PageTransition";
import { media } from "../Constants/constants";
import App from "./App";
import "./index.css";
// "Font Awesome 6 Brands" webfont, drawn by the hero particles as glyphs.
// Pinned to v6 so the glyph codepoints in particlesOptions.js stay valid.
import "@fortawesome/fontawesome-free/css/brands.min.css";

const preloadImages = Object.values(media);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <PageTransitionProvider>
          <Preloader images={preloadImages}>
            <App />
          </Preloader>
        </PageTransitionProvider>
      </SmoothScroll>
    </BrowserRouter>
  </React.StrictMode>
);
