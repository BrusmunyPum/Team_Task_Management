import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const sharp = require("sharp");

const port = Number(process.env.QA_VISUAL_PORT ?? 3020);
const base = `http://127.0.0.1:${port}`;
const outDir = path.resolve("qa-visual");

const routes = [
  { name: "dashboard", path: "/dashboard" },
  { name: "tasks", path: "/tasks" },
  { name: "members", path: "/members" },
  { name: "profile", path: "/settings/profile" },
  { name: "onboarding", path: "/onboarding" },
  { name: "reference", path: "/reference" },
];

const viewports = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "laptop", width: 1440, height: 900 },
];

function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now();

  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });

      req.on("error", () => {
        if (Date.now() - started > timeoutMs) {
          reject(new Error("server did not start"));
        } else {
          setTimeout(tick, 500);
        }
      });

      req.setTimeout(1200, () => req.destroy());
    };

    tick();
  });
}

function labelSvg(width, height, text) {
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f2f4f6"/><text x="10" y="22" font-family="Arial" font-size="15" font-weight="700" fill="#191c1e">${text}</text></svg>`,
  );
}

async function run() {
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const server = spawn(
    ".\\node_modules\\.bin\\next.CMD",
    ["start", "--hostname", "127.0.0.1", "--port", String(port)],
    { cwd: process.cwd(), shell: true, stdio: ["ignore", "ignore", "ignore"] },
  );

  try {
    await waitForServer(`${base}/dashboard`);

    const browser = await chromium.launch({
      headless: true,
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    });

    const shots = [];

    for (const viewport of viewports) {
      for (const route of routes) {
        const page = await browser.newPage({
          viewport: { width: viewport.width, height: viewport.height },
          deviceScaleFactor: 1,
        });
        await page.goto(`${base}${route.path}`, {
          waitUntil: "networkidle",
          timeout: 20000,
        });

        const file = path.join(outDir, `${viewport.name}-${route.name}.png`);
        await page.screenshot({ path: file, fullPage: false });
        shots.push({ ...viewport, route: route.name, file });
        await page.close();
      }
    }

    await browser.close();

    for (const viewport of viewports) {
      const viewportShots = shots.filter((shot) => shot.name === viewport.name);
      const thumbW =
        viewport.name === "laptop" ? 360 : viewport.name === "tablet" ? 260 : 195;
      const thumbH = Math.round((thumbW * viewport.height) / viewport.width);
      const labelH = 34;
      const gap = 16;
      const cols = 3;
      const rows = Math.ceil(viewportShots.length / cols);
      const sheetW = cols * thumbW + (cols + 1) * gap;
      const sheetH = rows * (thumbH + labelH) + (rows + 1) * gap;
      const composites = [];

      for (let i = 0; i < viewportShots.length; i += 1) {
        const shot = viewportShots[i];
        const x = gap + (i % cols) * (thumbW + gap);
        const y = gap + Math.floor(i / cols) * (thumbH + labelH + gap);
        const image = await sharp(shot.file)
          .resize(thumbW, thumbH, { fit: "cover", position: "top" })
          .png()
          .toBuffer();

        composites.push({
          input: labelSvg(thumbW, labelH, `${viewport.name} / ${shot.route}`),
          left: x,
          top: y,
        });
        composites.push({ input: image, left: x, top: y + labelH });
      }

      await sharp({
        create: {
          width: sheetW,
          height: sheetH,
          channels: 4,
          background: "#ffffff",
        },
      })
        .composite(composites)
        .png()
        .toFile(path.join(outDir, `contact-${viewport.name}.png`));
    }

    await fs.writeFile(
      path.join(outDir, "manifest.json"),
      JSON.stringify({ shots }, null, 2),
    );
  } finally {
    server.kill();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
