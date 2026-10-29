// SEMENTARA: ukur skor PageSpeed (Lighthouse, simulated throttling seperti PageSpeed Insights) dari GitHub Actions.
// Format cek-pagespeed/urls.txt: label|url|jumlah_run|mobile atau desktop|pengali_cpu (opsional)
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

md.push(`# Hasil cek Lighthouse (sementara)`);
md.push(`Commit: ${process.env.GITHUB_SHA?.slice(0, 7)} | Lighthouse ${execFileSync("lighthouse", ["--version"]).toString().trim()} | ${new Date().toISOString()}`);

for (const line of lines) {
  const [label, url, runsStr = "5", form = "mobile", cpu] = line.split("|");
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
    if (cpu) args.push(`--throttling.cpuSlowdownMultiplier=${cpu}`);
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
  md.push(`\n## ${label} (${form}${cpu ? `, cpu x${cpu}` : ""}) ${url}`);
  md.push(`Skor tiap run: ${rows.map((r) => r.score).join(", ")} | median **${medScore}**`);
  md.push(`\n| run | skor | FCP | LCP | TBT | CLS | SI | BI |\n|---|---|---|---|---|---|---|---|`);
  rows.forEach((r, i) =>
    md.push(`| ${i + 1} | ${r.score} | ${ms(r.fcp)} | ${ms(r.lcp)} | ${ms(r.tbt)} | ${r.cls.toFixed(3)} | ${ms(r.si)} | ${Math.round(r.bi)} |`)
  );
  notice(`${label} ${form}${cpu ? " cpu x" + cpu : ""}: skor ${rows.map((r) => r.score).join(",")} median ${medScore} | LCP ${ms(med.lcp)} TBT ${ms(med.tbt)} FCP ${ms(med.fcp)} SI ${ms(med.si)} CLS ${med.cls.toFixed(3)}`);

  const a = med.lhr.audits;
  const items = (id) => a[id]?.details?.items ?? [];
  md.push(`\n**Elemen LCP dan rinciannya (run median):**`);
  for (const it of items("lcp-breakdown-insight")) {
    if (it.type === "node") md.push(`- elemen: \`${it.selector}\` \`${(it.snippet || "").slice(0, 140)}\``);
    if (it.type === "table") for (const x of it.items) md.push(`- ${x.label}: ${ms(x.duration)} ms`);
  }
  for (const it of items("largest-contentful-paint-element")) {
    if (it.items) for (const x of it.items) if (x.node) md.push(`- elemen (audit lama): \`${(x.node.snippet || "").slice(0, 140)}\``);
  }
  md.push(`\n**Layout shift:**`);
  for (const it of items("layout-shifts").slice(0, 6)) md.push(`- ${JSON.stringify(it).slice(0, 300)}`);
  for (const it of items("cls-culprits-insight").slice(0, 6)) md.push(`- ${JSON.stringify(it).slice(0, 300)}`);
  md.push(`\n**Long tasks:**`);
  for (const t of items("long-tasks").slice(0, 10)) md.push(`- ${t.url} mulai ${ms(t.startTime)} durasi ${ms(t.duration)}`);
  md.push(`\n**Main thread:**`);
  for (const t of items("mainthread-work-breakdown").slice(0, 8)) md.push(`- ${t.groupLabel}: ${ms(t.duration)}`);
  md.push(`\n**Request (urutan):**`);
  for (const r of items("network-requests").slice(0, 25))
    md.push(
      `- ${r.url.slice(0, 110)} | ${Math.round((r.transferSize || 0) / 1024)} KB | ${r.priority} | ${ms(r.networkRequestTime)}-${ms(r.networkEndTime)} | ${r.statusCode}`
    );
  md.push(`\n**Audit lain yang skornya di bawah 0,9:**`);
  for (const [id, au] of Object.entries(a)) {
    if (au.score !== null && au.score < 0.9 && au.scoreDisplayMode !== "informative" && au.scoreDisplayMode !== "notApplicable")
      md.push(`- ${id}: ${au.displayValue ?? ""} (skor ${au.score})`);
  }
}

fs.writeFileSync("cek-pagespeed/hasil.md", md.join("\n") + "\n");
console.log(md.join("\n"));
