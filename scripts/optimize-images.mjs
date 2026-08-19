import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const imageDirectory = "img";
const sourcePattern = /\.(?:jpe?g|png)$/i;
const codeFiles = [
  "index.html",
  "projetos.html",
  "script.js",
  "projetos.js",
  "styles.css",
  "responsive.css",
  "index.ts",
];

const sourceImages = (await fs.readdir(imageDirectory))
  .filter((file) => sourcePattern.test(file));

let sourceBytes = 0;
let webpBytes = 0;

for (const file of sourceImages) {
  const source = path.join(imageDirectory, file);
  const destination = path.join(
    imageDirectory,
    file.replace(sourcePattern, ".webp"),
  );
  const metadata = await sharp(source).metadata();
  const shouldResize = Math.max(metadata.width ?? 0, metadata.height ?? 0) > 2400;

  let pipeline = sharp(source).rotate();
  if (shouldResize) {
    pipeline = pipeline.resize({
      width: 2400,
      height: 2400,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: 82, effort: 5, smartSubsample: true }).toFile(destination);
  sourceBytes += (await fs.stat(source)).size;
  webpBytes += (await fs.stat(destination)).size;
}

const replacements = sourceImages
  .sort((a, b) => b.length - a.length)
  .map((file) => [
    `img/${file}`,
    `img/${file.replace(sourcePattern, ".webp")}`,
  ]);

for (const file of codeFiles) {
  let content = await fs.readFile(file, "utf8");
  for (const [source, destination] of replacements) {
    content = content.replaceAll(source, destination);
  }
  await fs.writeFile(file, content, "utf8");
}

const savedPercent = Math.round((1 - webpBytes / sourceBytes) * 100);
console.log(`Converted ${sourceImages.length} images.`);
console.log(`Originals: ${(sourceBytes / 1024 / 1024).toFixed(1)} MB`);
console.log(`WebP: ${(webpBytes / 1024 / 1024).toFixed(1)} MB`);
console.log(`Reduction: ${savedPercent}%`);
