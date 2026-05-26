/*
     FileName: index.jsx
     @version: I
     Creation: 10/23/2023
     Last modification: 10/23/2023
*/


import React from "react";
import ReactDOM from "react-dom/client";
import PreloadMedia from "../Components/PreloadMedia";
import { media } from "../Constants/constants";
import App from "./App";
import "./index.css";
import "../../public/Fonts/Morganite/morganiteFont.css";
// Brands webfont used by the hero particle glyphs (Docker, Linux, AWS, etc.)
import "@fortawesome/fontawesome-free/css/brands.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PreloadMedia images={Object.values(media)}>
      <App />
    </PreloadMedia>
  </React.StrictMode>
);
