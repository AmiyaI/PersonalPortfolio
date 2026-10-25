/*
     FileName: routes.js
     @version: I
     Creation: 10/25/2026
     Last modification: 10/25/2026
*/

// Loaders for the lazily split pages. App.jsx builds its lazy() routes from
// these, and links call prefetchRoute() on hover so the chunk is usually
// ready before a page transition swaps it in.

export const routeLoaders = {
  "/studio": () => import("../Pages/Studio"),
  "/ai-slop": () => import("../Pages/AiSlop"),
};

export const prefetchRoute = (path) => routeLoaders[path]?.().catch(() => {});
