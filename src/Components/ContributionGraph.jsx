/*
     FileName: ContributionGraph.jsx
     @version: I
     Creation: 11/06/2026
     Last modification: 11/06/2026
*/

// The GitHub contribution calendar for the last year, redrawn in the site's
// colours (quiet violet days, orange for the busiest). The data is refreshed
// from GitHub's public profile before every build (scripts/fetch-contributions.mjs).
// The headline and the ramp line are computed from that data. The calendar can
// be frozen ("frozen": true in the JSON), so the wording avoids dates that age. Hovering a day shows its count; the columns sweep
// in left to right as the card scrolls into view.

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import calendar from "../Constants/contributions.json";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const LEVEL_COLOURS = ["#ddd6ef", "#cdbff6", "#a184f1", "#6a4ae8", "#ee8458"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const format = (n) => n.toLocaleString("en-US");
const describe = (day) => {
  const [y, m, d] = day.date.split("-").map(Number);
  const when = `${MONTHS[m - 1]} ${d}, ${y}`;
  return `${day.count ? format(day.count) : "No"} contribution${day.count === 1 ? "" : "s"} on ${when}`;
};

const ContributionGraph = () => {
  const scope = useRef(null);
  const scroller = useRef(null);
  const [hovered, setHovered] = useState(null);

  // Columns of seven days (Sunday at the top), padded so the first column
  // starts on its real weekday, plus month labels where a month begins.
  const { weeks, months, ramp } = useMemo(() => {
    const days = calendar.days;
    const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const cells = [...Array(lead).fill(null), ...days];
    const columns = [];
    for (let i = 0; i < cells.length; i += 7) columns.push(cells.slice(i, i + 7));
    const labels = [];
    columns.forEach((week, i) => {
      const first = week.find((d) => d && d.date.endsWith("-01")) ?? (i === 0 ? week.find(Boolean) : null);
      if (first) labels.push({ col: i, name: MONTHS[Number(first.date.slice(5, 7)) - 1] });
    });
    // The ramp line: January's total against the busiest month in the data.
    const byMonth = {};
    for (const d of days) byMonth[d.date.slice(0, 7)] = (byMonth[d.date.slice(0, 7)] ?? 0) + d.count;
    const [peakKey, peak] = Object.entries(byMonth).sort((a, b) => b[1] - a[1])[0];
    const january = Object.entries(byMonth).find(([k]) => k.endsWith("-01"))?.[1] ?? 0;
    return { weeks: columns, months: labels, ramp: { january, peak, peakMonth: MONTH_NAMES[Number(peakKey.slice(5, 7)) - 1] } };
  }, []);

  // On narrow screens the calendar scrolls sideways; start at the latest weeks.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".cg-week", {
          opacity: 0,
          y: 6,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.012,
          scrollTrigger: { trigger: scope.current, start: "top 85%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <figure
      ref={scope}
      className="rounded-2xl bg-white/85 p-6 text-ink shadow-[0_24px_60px_-30px_rgba(20,10,80,0.6)] backdrop-blur-md sm:p-7"
    >
      <figcaption className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="mb-2 text-small font-semibold tracking-[0.14em] text-accent uppercase">Work GitHub</p>
          <p className="text-title leading-none font-extrabold tracking-[-0.03em]">
            {format(calendar.total)} contributions in a year of building AI agents
          </p>
          <p className="mt-2 text-compact text-muted">
            From {format(ramp.january)} in January to {format(ramp.peak)} in {ramp.peakMonth}, once agentic coding became how I work.
          </p>
        </div>
        {/* Work and personal accounts, labelled, since the site links to both. */}
        <div className="flex shrink-0 flex-col gap-1 text-small sm:items-end">
          <a href={`https://github.com/${calendar.user}`} target="_blank" rel="noopener noreferrer" className="nav-link self-start pb-0.5 font-semibold text-accent sm:self-end">
            Work: github.com/{calendar.user} ↗
          </a>
          <a href="https://github.com/AmiyaI" target="_blank" rel="noopener noreferrer" className="nav-link self-start pb-0.5 font-semibold text-muted sm:self-end">
            Personal: github.com/AmiyaI ↗
          </a>
        </div>
      </figcaption>

      <div ref={scroller} className="mt-6 overflow-x-auto pb-1">
        {/* Fills the card's width on desktop; below ~740px the cells stop at
            11px and the calendar scrolls sideways instead. */}
        <div className="min-w-[740px]" role="img" aria-label={`GitHub contribution calendar: ${format(calendar.total)} contributions in a year of building AI agents`}>
          <div className="relative mb-2 h-4 text-[11px] text-muted" aria-hidden="true">
            {months.map((m) => (
              <span key={`${m.name}-${m.col}`} className="absolute" style={{ left: `${(m.col / weeks.length) * 100}%` }}>
                {m.name}
              </span>
            ))}
          </div>
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
            aria-hidden="true"
            onMouseLeave={() => setHovered(null)}
          >
            {weeks.map((week, w) => (
              <div key={w} className="cg-week grid grid-rows-7 gap-[3px]">
                {week.map((day, d) =>
                  day ? (
                    <span
                      key={day.date}
                      onMouseEnter={() => setHovered(day)}
                      className="block aspect-square w-full rounded-[3px] transition-transform duration-150 hover:scale-125"
                      style={{ backgroundColor: LEVEL_COLOURS[day.level] }}
                    />
                  ) : (
                    <span key={`pad-${d}`} className="block aspect-square w-full" />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 text-small text-muted">
        <span aria-live="polite" className="min-h-[1.25em]">
          {hovered ? describe(hovered) : "Hover a day to see its count"}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          Less
          {LEVEL_COLOURS.map((c) => (
            <span key={c} className="block h-[10px] w-[10px] rounded-[3px]" style={{ backgroundColor: c }} />
          ))}
          More
        </span>
      </div>
    </figure>
  );
};

export default ContributionGraph;
