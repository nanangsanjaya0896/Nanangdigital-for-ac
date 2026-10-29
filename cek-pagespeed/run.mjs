// SEMENTARA: ukur skor PageSpeed (Lighthouse mobile, sama seperti PageSpeed Insights) dari GitHub Actions.
// Format cek-pagespeed/urls.txt: label|url|jumlah_run|mobile atau desktop
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const lines = fs
  .readFileSync("cek-pagespeed/urls.txt", "utf8")
  .split("\n")
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith("#"));

const md = [];
const notice = (msg) => console.log(`::notice::${msg.replace(/\n/g, " ")}`);
const ms = (v) => (v == null ? "-" : `${Math.round(v)}`);
const median = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

md.push(`# Hasil cek PageSpeed (sementara)`);
md.push(`Commit: ${process.env.GITHUB_SHA?.slice(0, 7)} | Lighthouse ${execFileSync("lighthouse", ["--version"]).toString().trim()} | ${new Date().toISOString()}`);

for (const line of lines) {
  const [label, url, runsStr = "5", form = "mobile"] = line.split("|");
  const runs = [];
  for (let i = 0; i < Number(runsStr); i++) {
    const file = `/tmp/lh-${label}-${i}.json`;
    const args = [
      url,
      "--output=json",
      `--output-path=${file}`,
      "--only-categories=performance",
      "--quiet",
      "--max-wait-for-load=60000",
      "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
    ];
    if (form === "desktop") args.push("--preset=desktop");
    try {
      execFileSync("lighthouse", args, { stdio: "inherit", timeout: 240000 });
      runs.push(JSON.parse(fs.readFileSync(file, "utf8")));
    } catch (e) {
      console.log(`gagal ${label} run ${i}: ${e.message}`);
    }
  }
  if (!runs.length) {
    md.push(`\n## ${label} (${form})\nSemua run gagal.`);
    continue;
  }
  const rows = runs.map((lhr) => {
    const a = lhr.audits;
    return {
      score: Math.round(lhr.categories.performance.score * 100),
      fcp: a["first-contentful-paint"].numericValue,
      lcp: a["largest-contentful-paint"].numericValue,
      tbt: a["total-blocking-time"].numericValue,
      cls: a["cumulative-layout-shift"].numericValue,
      si: a["speed-index"].numericValue,
      bi: lhr.environment.benchmarkIndex,
      lhr,
    };
  });
  const medScore = median(rows.map((r) => r.score));
  const med = rows.find((r) => r.score === medScore);
  md.push(`\n## ${label} (${form}) ${url}`);
  md.push(`Skor tiap run: ${rows.map((r) => r.score).join(", ")} | median **${medScore}**`);
  md.push(`\n| run | skor | FCP | LCP | TBT | CLS | SI | BI |\n|---|---|---|---|---|---|---|---|`);
  rows.forEach((r, i) =>
    md.push(`| ${i + 1} | ${r.score} | ${ms(r.fcp)} | ${ms(r.lcp)} | ${ms(r.tbt)} | ${r.cls.toFixed(3)} | ${ms(r.si)} | ${Math.round(r.bi)} |`)
  );
  notice(`${label} ${form}: skor ${rows.map((r) => r.score).join(",")} median ${medScore} | LCP ${ms(med.lcp)} TBT ${ms(med.tbt)} FCP ${ms(med.fcp)} SI ${ms(med.si)}`);

  const a = med.lhr.audits;
  const items = (id) => a[id]?.details?.items ?? [];
  const lcpEl = items("largest-contentful-paint-element");
  md.push(`\n**Elemen LCP (run median):**`);
  for (const it of lcpEl) {
    if (it.items) {
      for (const x of it.items) {
        if (x.node) md.push(`- \`${(x.node.snippet || "").slice(0, 160)}\``);
        else if (x.subpart || x.phase) md.push(`- ${x.label || x.phase}: ${ms(x.duration ?? x.timing)} ms`);
      }
    }
  }
  const lcpBreak = a["lcp-breakdown-insight"]?.details?.items ?? [];
  for (const it of lcpBreak) {
    if (it.type === "table") for (const x of it.items) md.push(`- ${x.label}: ${ms(x.duration)} ms`);
  }
  md.push(`\n**Long tasks:**`);
  for (const t of items("long-tasks").slice(0, 10)) md.push(`- ${t.url} mulai ${ms(t.startTime)} durasi ${ms(t.duration)}`);
  md.push(`\n**Bootup JS:**`);
  for (const t of items("bootup-time").slice(0, 8)) md.push(`- ${t.url} total ${ms(t.total)} script ${ms(t.scripting)}`);
  md.push(`\n**Main thread:**`);
  for (const t of items("mainthread-work-breakdown").slice(0, 8)) md.push(`- ${t.groupLabel}: ${ms(t.duration)}`);
  md.push(`\n**Request (urutan):**`);
  for (const r of items("network-requests").slice(0, 30))
    md.push(
      `- ${r.url.slice(0, 110)} | ${Math.round((r.transferSize || 0) / 1024)} KB | ${r.priority} | ${ms(r.networkRequestTime)}-${ms(r.networkEndTime)} | ${r.statusCode}`
    );
  md.push(`\n**Pihak ketiga:**`);
  for (const t of items("third-party-summary").slice(0, 8))
    md.push(`- ${t.entity?.text ?? t.entity} | ${Math.round((t.transferSize || 0) / 1024)} KB | main thread ${ms(t.mainThreadTime)} | blocking ${ms(t.blockingTime)}`);
  md.push(`\n**Unused JS:**`);
  for (const t of items("unused-javascript").slice(0, 6)) md.push(`- ${t.url} total ${Math.round(t.totalBytes / 1024)} KB, terbuang ${Math.round(t.wastedBytes / 1024)} KB`);
}

fs.writeFileSync("cek-pagespeed/hasil.md", md.join("\n") + "\n");
console.log(md.join("\n"));
