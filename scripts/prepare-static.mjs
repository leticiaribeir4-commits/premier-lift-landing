import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(root, "dist", "client");
const shell = join(clientDir, "_shell.html");
const index = join(clientDir, "index.html");

if (!existsSync(clientDir)) {
  console.error("dist/client não encontrado. Rode o Vite build primeiro.");
  process.exit(1);
}

const source = existsSync(index) ? index : shell;
if (!existsSync(source)) {
  console.error("Nenhum HTML prerenderizado encontrado em dist/client.");
  process.exit(1);
}

let html = readFileSync(source);
html = Buffer.from(
  html
    .toString("utf8")
    .replaceAll("/./assets/", "./assets/")
    .replaceAll('"/./', '"./'),
);

let text = html.toString("utf8");
const imagePreloads = [];
text = text.replace(/<link rel="preload" as="image"[^>]*>/g, (tag) => {
  imagePreloads.push(tag);
  return "";
});
const fontPreloads = [];
text = text.replace(/<link rel="preload" href="[^"]+\.woff2"[^>]*>/g, (tag) => {
  fontPreloads.push(tag);
  return "";
});
text = text.replace(/<link rel="modulepreload"[^>]*>/g, "");

const earlyHints = [...fontPreloads, ...imagePreloads].join("");
const viewportMeta = text.match(/<meta name="viewport"[^>]*>/);
if (viewportMeta && earlyHints) {
  text = text.replace(viewportMeta[0], `${viewportMeta[0]}${earlyHints}`);
} else if (earlyHints) {
  text = text.replace("<head>", `<head>${earlyHints}`);
}

text = text.replace(
  /<script type="module" async="" src="(\.\/assets\/[^"]+)"><\/script>/,
  `<script>addEventListener("load",function(){var s=document.createElement("script");s.type="module";s.src="$1";document.body.appendChild(s)});</script>`,
);

writeFileSync(index, text);

const sitemapPath = join(clientDir, "sitemap.xml");
if (existsSync(sitemapPath)) {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
  const sitemap = readFileSync(sitemapPath, "utf8").replace(
    /<lastmod>[^<]*<\/lastmod>/,
    `<lastmod>${today}</lastmod>`,
  );
  writeFileSync(sitemapPath, sitemap);
}
const shellFile = join(clientDir, "_shell.html");
if (existsSync(shellFile)) rmSync(shellFile);
console.log(`Static HTML pronto: ${index}`);
