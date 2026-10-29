// SEMENTARA: buka pagespeed.web.dev di Chrome (seperti pengguna biasa), tunggu hasil lab selesai,
// lalu simpan teks laporannya. Dipakai untuk melihat rincian skor persis seperti yang dilihat pemilik website.
import puppeteer from "puppeteer-core";
import fs from "node:fs";

// Format PSI_RUNS: url>form,url>form
const runs = (process.env.PSI_RUNS || "https://nanangdigital.web.id>desktop").split(",").map((x) => {
  const [url, form] = x.split(">");
  return { url, form };
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = [`# Hasil PageSpeed Insights (pagespeed.web.dev) | ${new Date().toISOString()}`];

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--lang=en-US"],
});

for (let i = 0; i < runs.length; i++) {
  const { url: TARGET, form } = runs[i];
  const label = `psi-${form}-${i + 1}`;
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1100 });
  await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
  const url = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(TARGET)}&form_factor=${form}`;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForFunction(
      () => {
        const panels = [...document.querySelectorAll('[role="tabpanel"]')].filter((p) => p.offsetParent !== null);
        const root = panels[0] || document.body;
        return (
          root.querySelectorAll(".lh-metric__value").length >= 5 ||
          /Unable to resolve|Something went wrong|error occurred|Lighthouse returned error|timed out/i.test(document.body.innerText)
        );
      },
      { timeout: 180000, polling: 2000 }
    );
    await sleep(3000);
    const data = await page.evaluate(() => {
      document.querySelectorAll("details").forEach((d) => (d.open = true));
      const panels = [...document.querySelectorAll('[role="tabpanel"]')].filter((p) => p.offsetParent !== null);
      const root = panels[0] || document.body;
      const metrics = [...root.querySelectorAll(".lh-metric")].map((m) => m.innerText.replace(/\s+/g, " ").trim());
      const gauge = root.querySelector(".lh-gauge__percentage")?.textContent;
      return { href: location.href, gauge, metrics, text: root.innerText };
    });
    out.push(`\n## ${label} (${TARGET})\n${data.href}\nSkor: ${data.gauge}\n${data.metrics.map((m) => "- " + m).join("\n")}`);
    console.log(`::notice::${label}: skor ${data.gauge} | ${data.metrics.join(" ; ").slice(0, 900)}`);
    out.push("\n```\n" + data.text.slice(0, 45000) + "\n```");
    await page.screenshot({ path: `${process.env.OUT_DIR || "cek-pagespeed"}/${label}.png`, fullPage: false });
  } catch (e) {
    out.push(`\n## ${label}\nGagal: ${e.message}`);
    console.log(`::notice::${label} gagal: ${e.message}`);
    try {
      await page.screenshot({ path: `${process.env.OUT_DIR || "cek-pagespeed"}/${label}-gagal.png` });
    } catch {}
  }
  await page.close();
  await sleep(5000);
}

fs.writeFileSync(`${process.env.OUT_DIR || "cek-pagespeed"}/psi.md`, out.join("\n") + "\n");
await browser.close();
