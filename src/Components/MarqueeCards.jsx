// CSS-based marquee (replaced react-fast-marquee, which is not React 19 compatible).
// Renders two identical groups and translates the track by -50% for a seamless loop.
const MarqueeCards = ({ children, direction = "left" }) => {
  return (
    <div className="marquee">
      <div className={`marquee__track marquee__track--${direction}`}>
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

export default MarqueeCards;
