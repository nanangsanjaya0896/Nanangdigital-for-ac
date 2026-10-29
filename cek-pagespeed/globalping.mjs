// SEMENTARA: ukur waktu respons (TTFB) nanangdigital.web.id dari beberapa negara lewat Globalping
import fs from "node:fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = [`# Waktu respons dari berbagai negara (Globalping) | ${new Date().toISOString()}`];

async function measure(label, path) {
  const body = {
    type: "http",
    target: "nanangdigital.web.id",
    locations: [
      { country: "ID", limit: 3 },
      { country: "SG", limit: 2 },
      { country: "TW", limit: 1 },
      { country: "JP", limit: 1 },
      { country: "HK", limit: 1 },
      { country: "US", limit: 2 },
    ],
    measurementOptions: { protocol: "HTTPS", request: { path, method: "GET" } },
  };
  const res = await fetch("https://api.globalping.io/v1/measurements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const created = await res.json();
  if (!created.id) {
    out.push(`\n## ${label}\nGagal membuat pengukuran: ${JSON.stringify(created).slice(0, 300)}`);
    return;
  }
  let data;
  for (let i = 0; i < 30; i++) {
    await sleep(2000);
    data = await (await fetch(`https://api.globalping.io/v1/measurements/${created.id}`)).json();
    if (data.status === "finished") break;
  }
  out.push(`\n## ${label} (${path})`);
  out.push(`| probe | kota | status | dns | tcp | tls | ttfb | download | total | colo |\n|---|---|---|---|---|---|---|---|---|---|`);
  for (const r of data.results || []) {
    const t = r.result.timings || {};
    const ray = (r.result.headers?.["cf-ray"] || "").split("-")[1] || "";
    out.push(
      `| ${r.probe.country} ${r.probe.network?.slice(0, 18) || ""} | ${r.probe.city} | ${r.result.statusCode ?? r.result.status} | ${t.dns ?? "-"} | ${t.tcp ?? "-"} | ${t.tls ?? "-"} | ${t.firstByte ?? "-"} | ${t.download ?? "-"} | ${t.total ?? "-"} | ${ray} |`
    );
    console.log(`::notice::${label} ${r.probe.country} ${r.probe.city}: status ${r.result.statusCode} dns ${t.dns} tcp ${t.tcp} tls ${t.tls} ttfb ${t.firstByte} total ${t.total} colo ${ray}`);
  }
}

await measure("putaran-1", "/");
await sleep(3000);
await measure("putaran-2", "/");
await measure("aset-js", "/assets/vendor-react-6RWF-rzJ.js");
fs.writeFileSync(`${process.env.OUT_DIR || "cek-pagespeed"}/globalping.md`, out.join("\n") + "\n");
console.log(out.join("\n"));
