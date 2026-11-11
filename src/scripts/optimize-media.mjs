import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { constants as fsConstants } from "node:fs";
import sharp from "sharp";

const root = process.cwd();
const imageRoot = path.join(root, "public", "img");
const imageBackupRoot = path.join(root, ".media-originals", "img");
const videoOutputRoot = path.join(root, "public", "videos", "otimizados");
const imageThreshold = 250 * 1024;
const maxVideoBytes = 24 * 1024 * 1024;
const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";

const videoAssets = [
  ["videos/growth.mp4", "growth.mp4"],
  ["videos/intimoozoncare.mp4", "ozoncare-intimo.mp4"],
  ["videos/preozoncare.mp4", "ozoncare-pre.mp4"],
  ["videos/seucondevideos/1, 2, 3, 4..-.mp4", "seu-conde-1-2-3-4.mp4"],
  ["videos/seucondevideos/COMBO CASAL.mp4", "seu-conde-combo-casal.mp4"],
  ["videos/seucondevideos/COMBO CINE CONDE_V2.mp4", "seu-conde-combo-cine-conde.mp4"],
  ["videos/seucondevideos/HAPPY HOUR SEU CONDE.mp4", "seu-conde-happy-hour.mp4"],
  ["videos/seucondevideos/NADA É POR ACASO.mp4", "seu-conde-nada-por-acaso.mp4"],
  ["videos/academianovaelementofit.mp4", "academianovaelementofit.mp4"],
  ["videos/algunsplanoselementofit.mp4", "algunsplanoselementofit.mp4"],
  ["videos/novaoportunidadeelementofit.mp4", "novaoportunidadeelementofit.mp4"],
  ["videos/planoelementofit.mp4", "planoelementofit.mp4"],
  ["videos/treinargluetoselementofit.mp4", "treinargluetoselementofit.mp4"],
  ["videos/dentroeforamaunalani.mp4", "dentroeforamaunalani.mp4"],
  ["videos/feriasmaunalani.mp4", "feriasmaunalani.mp4"],
  ["videos/v1maunalani.mp4", "v1maunalani.mp4"],
  ["videos/dia1startupsummit.mp4", "dia1startupsummit.mp4"],
  ["videos/dia2startupsummit.mp4", "dia2startupsummit.mp4"],
  ["videos/dia3startupsummit.mp4", "dia3startupsummit.mp4"],
  ["videos/delassummit/DIA 1 DELAS.MP4", "dia-1-delas.mp4"],
  ["videos/delassummit/DIA 2 DELAS.mp4", "dia-2-delas.mp4"],
  ["videos/inticafevideos/27.09 WORKSHOP ENÓLOGA E PINTURA EM TAÇA_V3.mp4", "inti-workshop-enologa-pintura.mp4"],
  ["videos/inticafevideos/BROWNIE.mp4", "inti-brownie.mp4"],
  ["videos/inticafevideos/CEVICHE_V2.mp4", "inti-ceviche.mp4"],
  ["videos/inticafevideos/COFFEE PARTY_V3.mp4", "inti-coffee-party.mp4"],
  ["videos/inticafevideos/DRINKS_V2.mp4", "inti-drinks.mp4"],
  ["videos/inticafevideos/SAMUEL POMPEO 06.12.mp4", "inti-samuel-pompeo.mp4"],
  ["videos/inticafevideos/TACU TACU_V3.mp4", "inti-tacu-tacu.mp4"],
  ["videos/ctmonstros/ABS v2 (1).mp4", "ctmonstros-abs.mp4"],
  ["videos/ctmonstros/ATLETAS FABRICA CT (1).mp4", "ctmonstros-atletas-fabrica.mp4"],
  ["videos/ctmonstros/BIKE INDOOR (1).mp4", "ctmonstros-bike-indoor.mp4"],
  ["videos/ctmonstros/BOOTCAMP (1).mp4", "ctmonstros-bootcamp.mp4"],
  ["videos/ctmonstros/FABRICA DANCE (1).mp4", "ctmonstros-fabrica-dance.mp4"],
  ["videos/ctmonstros/FUNCIONA HIT V2 (1).mp4", "ctmonstros-funciona-hit.mp4"],
  ["videos/ctmonstros/FUNCIONAL HIT v1 (1).mp4", "ctmonstros-funcional-hit.mp4"],
  ["videos/ctmonstros/MUAY THAI (1).mp4", "ctmonstros-muay-thai.mp4"],
  ["videos/ctmonstros/PILATES (1).mp4", "ctmonstros-pilates.mp4"],
];

async function walkImages(directory) {
  const results = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      results.push(...await walkImages(fullPath));
    } else if (/\.(?:jpe?g|png|webp)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeImages() {
  let originalTotal = 0;
  let optimizedTotal = 0;
  let optimizedCount = 0;

  for (const inputPath of await walkImages(imageRoot)) {
    const original = await fs.stat(inputPath);
    if (original.size < imageThreshold) continue;

    const relativePath = path.relative(imageRoot, inputPath);
    const backupPath = path.join(imageBackupRoot, relativePath);
    try {
      const savedOriginal = await fs.stat(backupPath);
      if (original.size < savedOriginal.size * 0.9) continue;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    const temporaryPath = `${inputPath}.optimized-tmp${path.extname(inputPath)}`;
    await fs.mkdir(path.dirname(backupPath), { recursive: true });

    try {
      let pipeline = sharp(inputPath, { failOn: "none" })
        .rotate()
        .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true });
      const extension = path.extname(inputPath).toLowerCase();
      if (extension === ".jpg" || extension === ".jpeg") {
        pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
      } else if (extension === ".png") {
        pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 });
      } else {
        pipeline = pipeline.webp({ quality: 82, effort: 6, alphaQuality: 90 });
      }

      await pipeline.toFile(temporaryPath);
      const optimized = await fs.stat(temporaryPath);
      if (optimized.size >= original.size) {
        await fs.unlink(temporaryPath);
        continue;
      }

      try {
        await fs.copyFile(inputPath, backupPath, fsConstants.COPYFILE_EXCL);
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
      }
      let replaced = false;
      for (let attempt = 0; attempt < 6; attempt += 1) {
        try {
          await fs.unlink(inputPath);
          await fs.rename(temporaryPath, inputPath);
          replaced = true;
          break;
        } catch (error) {
          if (error.code !== "EBUSY" && error.code !== "EPERM" && error.code !== "UNKNOWN") throw error;
          if (attempt < 5) await new Promise(resolve => setTimeout(resolve, 150 * (attempt + 1)));
        }
      }
      if (!replaced) throw new Error("Arquivo bloqueado pelo sistema após várias tentativas; cópia original preservada.");
      originalTotal += original.size;
      optimizedTotal += optimized.size;
      optimizedCount += 1;
      console.log(`${relativePath}: ${(original.size / 1048576).toFixed(2)} → ${(optimized.size / 1048576).toFixed(2)} MiB`);
    } catch (error) {
      await fs.rm(temporaryPath, { force: true });
      console.error(`Falha ao otimizar ${relativePath}: ${error.message}`);
    }
  }

  console.log(`Imagens: ${optimizedCount} otimizadas; ${(originalTotal / 1048576).toFixed(1)} → ${(optimizedTotal / 1048576).toFixed(1)} MiB.`);
}

function optimizeVideo(source, destination) {
  const sourcePath = path.join(root, source);
  const destinationPath = path.join(videoOutputRoot, destination);
  const temporaryPath = `${destinationPath}.tmp.mp4`;

  if (!fsSync.existsSync(sourcePath)) {
    console.warn(`Vídeo de origem não encontrado, ignorado: ${source}`);
    return;
  }

  fsSync.mkdirSync(path.dirname(destinationPath), { recursive: true });
  if (fsSync.existsSync(destinationPath) && fsSync.statSync(destinationPath).size <= maxVideoBytes) {
    console.log(`Vídeo já otimizado: ${destination}`);
    return;
  }

  for (const crf of [25, 28, 31, 34, 37]) {
    fsSync.rmSync(temporaryPath, { force: true });
    const result = spawnSync(ffmpeg, [
      "-hide_banner", "-loglevel", "error", "-y", "-i", sourcePath,
      "-map", "0:v:0", "-map", "0:a?",
      "-vf", "scale=w='min(1280,iw)':h=-2",
      "-c:v", "libx264", "-preset", "medium", "-crf", String(crf),
      "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-ac", "2",
      "-movflags", "+faststart", "-map_metadata", "-1", temporaryPath,
    ], { stdio: "inherit" });

    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`FFmpeg terminou com código ${result.status}: ${source}`);
    const outputSize = fsSync.statSync(temporaryPath).size;
    console.log(`${destination}: ${(outputSize / 1048576).toFixed(2)} MiB (CRF ${crf})`);
    if (outputSize <= maxVideoBytes) {
      fsSync.rmSync(destinationPath, { force: true });
      fsSync.renameSync(temporaryPath, destinationPath);
      return;
    }
  }

  fsSync.rmSync(temporaryPath, { force: true });
  throw new Error(`${destination} não ficou abaixo de 24 MiB; não foi instalado.`);
}

if (process.env.MEDIA_VIDEOS_ONLY !== "1") {
  await optimizeImages();
}

const ffmpegCheck = spawnSync(ffmpeg, ["-version"], { stdio: "ignore" });
if (ffmpegCheck.error || ffmpegCheck.status !== 0) {
  throw new Error("FFmpeg não encontrado. Instale o FFmpeg ou defina FFMPEG_PATH para executar a otimização de vídeos.");
}

for (const [source, destination] of videoAssets) {
  optimizeVideo(source, destination);
}
