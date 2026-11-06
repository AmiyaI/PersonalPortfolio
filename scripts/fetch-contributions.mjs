// Refreshes src/Constants/contributions.json from GitHub's public contribution
// calendar, the same data a logged-out visitor sees on the profile. Runs before
// every build (npm "prebuild"). No token: it reads the public calendar page.
// On any failure it keeps the existing file, so a build never breaks or ships
// an empty graph.

import { readFile, writeFile } from "node:fs/promises";

const USER = "AmiyaSWA";
const OUT = new URL("../src/Constants/contributions.json", import.meta.url);

const parse = (html) => {
  // Each day is a <td data-date data-level id>; its count lives in the
  // <tool-tip for="<td id>"> label ("12 contributions on ..." / "No contributions ...").
  const counts = new Map();
  for (const [, forId, text] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = text.match(/^([\d,]+) contribution/);
    counts.set(forId, n ? Number(n[1].replace(/,/g, "")) : 0);
  }
  const days = [];
  for (const [tag] of html.matchAll(/<td[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
    const date = tag.match(/data-date="([^"]+)"/)[1];
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    const level = Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0);
    days.push({ date, count: counts.get(id) ?? 0, level });
  }
  return days.sort((a, b) => a.date.localeCompare(b.date));
};

const main = async () => {
  try {
    const res = await fetch(`https://github.com/users/${USER}/contributions`, {
      headers: { "user-agent": "amiyaislam.com build" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
    const days = parse(await res.text());
    // A real calendar has a full year of days; anything less means the page changed.
    if (days.length < 360) throw new Error(`only ${days.length} days parsed`);
    const total = days.reduce((sum, d) => sum + d.count, 0);
    if (total === 0) throw new Error("parsed a year with no contributions");
    const data = { user: USER, updated: new Date().toISOString().slice(0, 10), total, days };
    await writeFile(OUT, JSON.stringify(data) + "\n");
    console.log(`contributions: ${total} over ${days.length} days for ${USER}`);
  } catch (error) {
    const existing = await readFile(OUT, "utf8").catch(() => null);
    if (!existing) throw error;
    console.warn(`contributions: kept the saved calendar (${error.message})`);
  }
};

main();
