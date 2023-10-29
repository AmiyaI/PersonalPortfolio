/*
   Template from Sara Echeverria
     @editor: Amiya Islam
     FileName: MarqueeCards.jsx
     @version: I
     Creation: 10/23/2023
     Last modification: 10/23/2023
*/

import Marquee from "react-fast-marquee";

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
