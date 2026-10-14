import { access, mkdir, writeFile, stat } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "src", "assets");
const publicDir = join(root, "public");

const kb = (n) => `${(n / 1024).toFixed(1)}KB`;

async function encodePair(input, destBase, width, { webpQuality, jpegQuality, flattenBackground, webpAlphaQuality }) {
  const pipeline = () =>
    sharp(input).rotate().resize({ width, withoutEnlargement: true });

  const webpOpts = { quality: webpQuality, effort: 6, smartSubsample: true };
  if (webpAlphaQuality != null) webpOpts.alphaQuality = webpAlphaQuality;

  const webpBuf = await pipeline().webp(webpOpts).toBuffer();
  const jpegBuf = await (flattenBackground
    ? pipeline().flatten({ background: flattenBackground })
    : pipeline()
  )
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

async function extractCircularSeal(inputPath) {
  const { data, info } = await sharp(inputPath).rotate().ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const { width, height, channels } = info;

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      if (data[i + 3] > 200 && lum > 18) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 2;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const size = Math.min(Math.max(cropW, cropH), width, height);
  let left = minX - Math.floor((size - cropW) / 2);
  let top = minY - Math.floor((size - cropH) / 2);
  left = Math.max(0, Math.min(left, width - size));
  top = Math.max(0, Math.min(top, height - size));

  const cropped = await sharp(inputPath)
    .rotate()
    .ensureAlpha()
    .extract({ left, top, width: size, height: size })
    .toBuffer();

  const r = size / 2 - 1;
  const circle = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="white"/></svg>`,
  );

  return sharp(cropped)
    .ensureAlpha()
    .composite([{ input: circle, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
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
    {
      src: join(assets, "icamento-sofas.jpg"),
      dest: (w) => join(assets, `icamento-sofas-${w}`),
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

  const creaRaw = join(root, "..", "IMG_0727.PNG");
  const creaPng = join(assets, "crea-sp.png");
  let creaSrc = creaPng;
  try {
    await access(creaRaw);
    const creaBuf = await extractCircularSeal(creaRaw);
    await writeFile(creaPng, creaBuf);
    const creaMeta = await sharp(creaBuf).metadata();
    console.log(`crea-sp.png  ${creaMeta.width}x${creaMeta.height}  png ${kb(creaBuf.length)}`);
    creaSrc = creaPng;
  } catch (err) {
    if (err && err.code === "ENOENT") {
      await access(creaPng);
      console.log("crea-sp.png  (usando versão já processada em src/assets)");
    } else {
      throw err;
    }
  }
  for (const width of [240, 400]) {
    await encodePair(creaSrc, join(assets, `crea-sp-${width}`), width, {
      webpQuality: 80,
      jpegQuality: 72,
      flattenBackground: "#f9f8fa",
      webpAlphaQuality: 90,
    });
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
