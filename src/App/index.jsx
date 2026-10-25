/*
     FileName: index.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import PreloadMedia from "../Components/PreloadMedia";
import { media } from "../Constants/constants";
import App from "./App";
import "./index.css";
// "Font Awesome 6 Brands" webfont, drawn by the hero particles as glyphs.
// Pinned to v6 so the glyph codepoints in particlesOptions.js stay valid.
import "@fortawesome/fontawesome-free/css/brands.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PreloadMedia images={Object.values(media)}>
        <App />
      </PreloadMedia>
    </BrowserRouter>
  </React.StrictMode>
);
