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

writeFileSync(index, html);
console.log(`Static HTML pronto: ${index}`);
