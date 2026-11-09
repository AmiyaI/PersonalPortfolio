// Writes a plain-HTML version of the home page into index.html's #root at
// build time, from the same data the React app renders (src/Constants).
// Crawlers that don't run JavaScript (link previews, some search and AI bots)
// read real text instead of an empty page. It is visually hidden, and React
// replaces #root's contents as soon as the app mounts, so visitors never see it.

import { createServer } from "vite";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const list = (items, render) => `<ul>${items.map((x) => `<li>${render(x)}</li>`).join("")}</ul>`;

const renderFallback = (c) => {
  const site = "https://www.amiyaislam.com";
  const link = (href, text) => `<a href="${esc(href.startsWith("/") ? site + href : href)}">${esc(text)}</a>`;
  return [
    `<header><h1>Amiya Islam</h1><p>${esc(c.roles.join(" · "))}</p></header>`,
    `<main>`,
    `<section><h2>About me</h2><p>${esc(c.introduction.statement)}</p>${c.introduction.text.map((t) => `<p>${esc(t)}</p>`).join("")}</section>`,
    `<section><h2>Early to generative AI</h2>${list(c.aiJourney, (s) => `<strong>${esc(s.when)}: ${esc(s.title)}</strong>. ${esc(s.text)}`)}</section>`,
    `<section><h2>Experience</h2>${list(
      c.experience,
      (j) => `<h3>${esc(j.company)}, ${esc(j.role)} (${esc(j.period)})</h3><p>${esc(j.chapter)}</p>${list(j.points, esc)}`
    )}</section>`,
    `<section><h2>Education</h2>${list(c.education, (e) => `${esc(e.school)}: ${esc(e.degree)} (${esc(e.period)})`)}</section>`,
    `<section><h2>Projects</h2>${list(c.projects, (p) => {
      const links = [p.demo_link && !p.demo_link.startsWith("/studio") && link(p.demo_link, p.demo_label ?? "See it live"), p.source_code_link && link(p.source_code_link, "Code")].filter(Boolean);
      return `<h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>${links.length ? `<p>${links.join(" · ")}</p>` : ""}`;
    })}</section>`,
    `<section><h2>Writing</h2>${list(c.articles, (a) => `${link(a.href, a.title)} (${esc(a.date)})`)}</section>`,
    `<section><h2>Skills</h2>${list(c.skills, (s) => `${esc(s.name)}: ${esc(s.fact)}`)}<p>Certifications: ${esc(c.certifications.join(", "))}</p></section>`,
    `<section><h2>Contact</h2><p>${link("mailto:iamiya@vt.edu", "iamiya@vt.edu")}</p>${list(c.socials, (s) => link(s.href, s.title ?? s.label))}</section>`,
    `</main>`,
  ].join("");
};

// Vite plugin: loads src/Constants/constants.js through Vite (so its image
// imports resolve) and injects the fallback during the production build.
export const seoFallback = () => {
  let html = "";
  return {
    name: "seo-fallback",
    apply: "build",
    async buildStart() {
      const server = await createServer({ configFile: false, logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
      try {
        const constants = await server.ssrLoadModule("/src/Constants/constants.js");
        html = renderFallback(constants);
      } finally {
        await server.close();
      }
    },
    transformIndexHtml(page) {
      if (!html) return page;
      const hidden = "position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0";
      return page.replace('<div id="root"></div>', `<div id="root"><div style="${hidden}">${html}</div></div>`);
    },
  };
};
