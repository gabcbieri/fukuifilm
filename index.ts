import { file } from "bun";
import { extname, resolve, sep } from "node:path";

const publicRoot = resolve(".");
const port = Number(Bun.env.PORT ?? 3000);
const production = Bun.env.NODE_ENV === "production";
const longCacheExtensions = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg", ".gif", ".ico",
  ".woff", ".woff2",
]);

Bun.serve({
  port,

  async fetch(req) {
    const url = new URL(req.url);
    let pathname: string;

    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return new Response("400 - Requisição inválida", { status: 400 });
    }

    if (pathname === "/") pathname = "/index.html";

    const requestedPath = resolve(publicRoot, `.${pathname}`);
    if (requestedPath !== publicRoot && !requestedPath.startsWith(publicRoot + sep)) {
      return new Response("403 - Acesso negado", { status: 403 });
    }

    const arquivo = file(requestedPath);
    if (!(await arquivo.exists())) {
      return new Response("404 - Página não encontrada", { status: 404 });
    }

    const headers = new Headers();
    const extension = extname(pathname).toLowerCase();

    if (longCacheExtensions.has(extension)) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else if (extension === ".css" || extension === ".js") {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    } else {
      headers.set("Cache-Control", "no-cache");
    }

    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "SAMEORIGIN");

    return new Response(arquivo, { headers });
  },

  development: !production,
});

console.log(`🚀 Fukuifilm rodando em http://localhost:${port}`);
