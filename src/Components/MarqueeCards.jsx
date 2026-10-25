/*
     FileName: MarqueeCards.jsx
     @version: II
     Creation: 10/23/2023
     Last modification: 10/25/2026
*/

import MarqueeModule from "react-fast-marquee";

// react-fast-marquee ships CommonJS; Vite 8 hands back its default export
// wrapped in another { default }, so unwrap it.
const Marquee = MarqueeModule.default ?? MarqueeModule;

const MarqueeCards = ({children, direction}) => {

  return (
    <Marquee
      direction={direction}
      gradient={false}
      speed={100}
      pauseOnHover={true}
    >
      {children}
    </Marquee>
  );
};

export default MarqueeCards;
