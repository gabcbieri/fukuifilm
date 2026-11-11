import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
const inputDir = path.join(root, "public", "videos", "otimizados");
const outputDir = path.join(root, "public", "videos", "posters");

await fs.mkdir(outputDir, { recursive: true });

for (const filename of await fs.readdir(inputDir)) {
  if (!filename.toLowerCase().endsWith(".mp4")) continue;

  const source = path.join(inputDir, filename);
  const poster = path.join(outputDir, `${path.parse(filename).name}.jpg`);
  const result = spawnSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error", "-y", "-ss", "1", "-i", source,
    "-frames:v", "1", "-vf", "scale=720:-2", "-q:v", "3", poster,
  ], { stdio: "inherit" });

  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Não foi possível gerar a capa de ${filename}.`);

  const size = (await fs.stat(poster)).size;
  console.log(`${filename} → ${(size / 1024).toFixed(0)} KB`);
}
