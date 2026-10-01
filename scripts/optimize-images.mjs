import { mkdir, writeFile, stat } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "src", "assets");
const publicDir = join(root, "public");

const kb = (n) => `${(n / 1024).toFixed(1)}KB`;

async function encodePair(input, destBase, width, { webpQuality, jpegQuality }) {
  const pipeline = () =>
    sharp(input).rotate().resize({ width, withoutEnlargement: true });

  const webpBuf = await pipeline()
    .webp({ quality: webpQuality, effort: 6, smartSubsample: true })
    .toBuffer();
  const jpegBuf = await pipeline()
    .jpeg({ quality: jpegQuality, mozjpeg: true, progressive: true })
    .toBuffer();

  const webpPath = `${destBase}.webp`;
  const jpegPath = `${destBase}.jpg`;
  await writeFile(webpPath, webpBuf);
  await writeFile(jpegPath, jpegBuf);
  const meta = await sharp(webpBuf).metadata();
  console.log(
    `  ${basename(destBase)} ${meta.width}x${meta.height}  webp ${kb(webpBuf.length)}  jpeg ${kb(jpegBuf.length)}`,
  );
}

async function main() {
  await mkdir(assets, { recursive: true });

  const jobs = [
    {
      src: join(assets, "icamento-entre-predios.jpg"),
      dest: (w) => join(assets, `icamento-entre-predios-${w}`),
      widths: [480, 800, 1200, 1600],
      webpQuality: 80,
      jpegQuality: 72,
    },
    {
      src: join(assets, "icamento-fachada.jpg"),
      dest: (w) => join(assets, `icamento-fachada-${w}`),
      widths: [480, 800],
      webpQuality: 80,
      jpegQuality: 72,
    },
    {
      src: join(assets, "icamento-andar-alto.jpg"),
      dest: (w) => join(assets, `icamento-andar-alto-${w}`),
      widths: [480, 800],
      webpQuality: 80,
      jpegQuality: 72,
    },
    {
      src: join(assets, "piano-cauda.jpg"),
      dest: (w) => join(assets, `piano-cauda-${w}`),
      widths: [480, 800],
      webpQuality: 80,
      jpegQuality: 72,
    },
    {
      src: join(assets, "icamento-fachada-vidro.jpg"),
      dest: (w) => join(assets, `icamento-fachada-vidro-${w}`),
      widths: [480, 800],
      webpQuality: 80,
      jpegQuality: 72,
    },
  ];

  for (const job of jobs) {
    console.log(basename(job.src));
    for (const width of job.widths) {
      await encodePair(job.src, job.dest(width), width, job);
    }
  }

  const logoSrc = join(assets, "isale-logo-original-transparent.png");
  const logoWebp = await sharp(logoSrc)
    .resize({ width: 240, withoutEnlargement: true })
    .webp({ quality: 86, effort: 6, alphaQuality: 90 })
    .toBuffer();
  const logoPng = await sharp(logoSrc)
    .resize({ width: 240, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(join(assets, "isale-logo-240.webp"), logoWebp);
  await writeFile(join(assets, "isale-logo-240.png"), logoPng);
  console.log(`logo 240  webp ${kb(logoWebp.length)}  png ${kb(logoPng.length)}`);

  const ogSrc = join(assets, "og-image.jpg");
  const ogBefore = (await stat(ogSrc)).size;
  const ogJpeg = await sharp(ogSrc)
    .resize({ width: 1200, height: 630, fit: "cover" })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toBuffer();
  await writeFile(ogSrc, ogJpeg);
  await writeFile(join(publicDir, "og-image.jpg"), ogJpeg);
  console.log(`og-image  jpeg ${kb(ogJpeg.length)} (was ${kb(ogBefore)})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
