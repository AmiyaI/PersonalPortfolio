/*
     FileName: features.js
     @version: I
     Creation: 11/06/2026
     Last modification: 11/06/2026
*/

// Parts of the site that are finished on staging but not yet public.
// vite.config.js sets the flag per build: off for main (amiyaislam.com),
// on for staging and local dev. Flip it there when Beyond is ready to launch.

// Beyond and everything behind it (Studio, Shirts, Off the clock, Hot takes,
// AI Slop). When off, those routes show a "Coming soon" page and links into
// them are hidden.
export const SHOW_BEYOND = __SHOW_BEYOND__;
