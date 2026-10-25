/*
     FileName: index.jsx
     @version: III
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import SmoothScroll from "../Components/motion/SmoothScroll";
import { PageTransitionProvider } from "../Components/motion/PageTransition";
import App from "./App";
import "./index.css";
// "Font Awesome 6 Brands" webfont, drawn by the hero particles as glyphs.
// Pinned to v6 so the glyph codepoints in particlesOptions.js stay valid.
import "@fortawesome/fontawesome-free/css/brands.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <PageTransitionProvider>
          <App />
        </PageTransitionProvider>
      </SmoothScroll>
    </BrowserRouter>
  </React.StrictMode>
);
