/*
   Template from Sara Echeverria
     @editor: Amiya Islam
     FileName: Loader.jsx
     @version: I
     Creation: 10/23/2023
     Last modification: 10/23/2023
*/
import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-grayscale-950 flex items-center justify-center relative">
      <span
        style={{ fontFamily: "SuperMario" }}
        className="absolute text-primary-400 text-xl"
      >
        b
      </span>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
