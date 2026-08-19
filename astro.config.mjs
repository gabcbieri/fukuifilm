import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: { format: "file" },
  server: { host: true, port: 4321 },
  vite: { plugins: [tailwindcss()] },
});
