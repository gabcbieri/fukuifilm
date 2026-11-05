
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const inputDir = "public/img";
const outputDir = "public/img/otimizadas";

const images = [
  "yohana.webp",
  "etrevertical.png",
  "mauna-lani-placeholder.webp",
  "element-fit-placeholder.webp",
  "athome.webp",
  "cadafalsocapa].webp",
  "cadamobile.webp",
  "ozoncarevertical.jpg",
  "fatoduorumolhar.webp",
];

await fs.mkdir(outputDir, { recursive: true });

for (const filename of images) {
  const inputPath = path.join(inputDir, filename);

  try {
    await fs.access(inputPath);

    const outputName = `${path.parse(filename).name}.webp`;
    const outputPath = path.join(outputDir, outputName);

    await sharp(inputPath)
      .rotate()
      .resize({
        width: 1920,
        height: 1920,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
        effort: 6,
        alphaQuality: 90,
      })
      .toFile(outputPath);

    const originalSize = (await fs.stat(inputPath)).size / 1024 / 1024;
    const optimizedSize = (await fs.stat(outputPath)).size / 1024 / 1024;
    const reduction = (1 - optimizedSize / originalSize) * 100;

    console.log(
      `${filename}: ${originalSize.toFixed(2)} MB → ${optimizedSize.toFixed(2)} MB (${reduction.toFixed(1)}% menor)`
    );
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : String(error);

    console.error(`Erro ao processar ${filename}:`, message);
  }
}

console.log("\nOtimização concluída.");
console.log(`Imagens salvas em: ${outputDir}`);
