/*
     FileName: Writing.jsx
     @version: I
     Creation: 10/28/2026
     Last modification: 10/28/2026
*/

// Articles I've published, as a compact two-column reading list: a small
// cover, the date, the headline and one line. Each opens the article on the
// SWA AI blog in a new tab. Rows rise in as the list scrolls into view.

import { useRef } from "react";
import SectionHeader from "../Components/SectionHeader";
import { articles } from "../Constants/constants";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const Writing = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".article-row", {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".article-list", start: "top 85%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="writing" className="field-ground w-full px-5 py-12 sm:px-8 lg:py-16">
      <SectionHeader kicker="Published" title="Writing" layout="split" className="mb-8 lg:mb-10">
        Articles I've written on AI agents and how teams actually use them, published on the SWA AI blog.
      </SectionHeader>
      <ul className="article-list grid grid-cols-1 gap-x-8 gap-y-1 lg:grid-cols-2">
        {articles.map((article) => (
          <li key={article.href} className="article-row">
            <a
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Read"
              className="group flex items-center gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/80 sm:gap-5"
            >
              <span className="aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-xl bg-white sm:w-36">
                <img
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 ${
                    article.fit === "contain" ? "object-contain p-2" : "object-cover object-left-top"
                  }`}
                />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-small font-semibold tracking-[0.12em] text-accent uppercase">{article.date}</span>
                <span className="line-clamp-2 text-compact leading-snug font-extrabold text-ink">{article.title}</span>
                <span className="hidden text-small text-muted sm:line-clamp-1">{article.blurb}</span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-lead text-accent transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Writing;
