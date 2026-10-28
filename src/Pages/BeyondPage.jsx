/*
     FileName: BeyondPage.jsx
     @version: I
     Creation: 10/27/2026
     Last modification: 10/27/2026
*/

// Everything off the career path, one tab over from the main page: the
// creative work (Studio) and shirts, life off the clock, and hot takes.
// The nav's Beyond menu links straight to each part.

import Beyond from "./Beyond";
import Hobbies from "./Hobbies";
import HotTakes from "./HotTakes";

// tabIndex -1 lets the page transition move focus here after a route change.
const BeyondPage = () => (
  <main id="main" tabIndex={-1} className="pt-16 outline-none">
    <Beyond />
    <Hobbies />
    <HotTakes />
  </main>
);

export default BeyondPage;
