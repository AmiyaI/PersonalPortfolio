/*
     FileName: WavingFlags.jsx
     @version: I
     Creation: 11/06/2026
     Last modification: 11/06/2026
*/

// The Bangladeshi and American flags, gently waving. Each flag is drawn as an
// SVG and cut into thin vertical strips; every strip rises and falls a little
// behind its neighbour, which reads as cloth rippling in the wind. The shading
// on each strip follows the same wave. Still for reduced-motion visitors.

const svg = (body, w, h) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${body}</svg>`)}")`;

// Bangladesh: bottle green with a red disc set slightly toward the hoist.
const BANGLADESH = svg('<rect width="10" height="6" fill="#006a4e"/><circle cx="4.5" cy="3" r="2" fill="#f42a41"/>', 10, 6);

// United States: 13 stripes and a canton of 50 stars (rows of 6 and 5).
const UNITED_STATES = (() => {
  const W = 7410;
  const H = 3900;
  const stripe = H / 13;
  let body = `<rect width="${W}" height="${H}" fill="#b22234"/>`;
  for (let i = 1; i < 13; i += 2) body += `<rect y="${i * stripe}" width="${W}" height="${stripe}" fill="#fff"/>`;
  const cw = 2964;
  const ch = 7 * stripe;
  body += `<rect width="${cw}" height="${ch}" fill="#3c3b6e"/>`;
  const r = 0.0616 * H / 2;
  const star = (cx, cy) => {
    const pts = [];
    for (let k = 0; k < 10; k++) {
      const a = -Math.PI / 2 + (k * Math.PI) / 5;
      const rad = k % 2 ? r * 0.382 : r;
      pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
    }
    return `<polygon points="${pts.join(" ")}" fill="#fff"/>`;
  };
  const dx = cw / 12;
  const dy = ch / 10;
  for (let row = 0; row < 9; row++) {
    const even = row % 2 === 0;
    for (let col = 0; col < (even ? 6 : 5); col++) body += star(dx * (even ? 1 + col * 2 : 2 + col * 2), dy * (1 + row));
  }
  return svg(body, W, H);
})();

// Pixel-exact strips that overlap by a pixel, so no seams show between them.
const WIDTH = 64;
const HEIGHT = 40;
const STRIPS = 16;
const STRIP = WIDTH / STRIPS;

const Flag = ({ image, label }) => (
  <span
    role="img"
    aria-label={label}
    title={label}
    className="relative block drop-shadow-[0_6px_10px_rgba(20,13,38,0.35)]"
    style={{ width: WIDTH, height: HEIGHT }}
  >
    {Array.from({ length: STRIPS }, (_, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="flag-strip absolute top-0 h-full"
        style={{
          left: i * STRIP,
          width: STRIP + 1,
          backgroundImage: image,
          backgroundSize: `${WIDTH}px ${HEIGHT}px`,
          backgroundPosition: `${-i * STRIP}px 0`,
          animationDelay: `${i * -0.1}s`,
        }}
      />
    ))}
  </span>
);

const WavingFlags = () => (
  <span className="flex items-center gap-3">
    <Flag image={BANGLADESH} label="Flag of Bangladesh" />
    <Flag image={UNITED_STATES} label="Flag of the United States" />
  </span>
);

export default WavingFlags;
