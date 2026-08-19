import { file } from "bun";

Bun.serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url);

    let pathname = decodeURIComponent(url.pathname);

    // Página inicial
    if (pathname === "/") {
      pathname = "/index.html";
    }

    const arquivo = file("." + pathname);

    if (!(await arquivo.exists())) {
      return new Response("404 - Página não encontrada", {
        status: 404,
      });
    }

    const headers = new Headers();

    // Cache inteligente
    if (
      pathname.endsWith(".png") ||
      pathname.endsWith(".jpg") ||
      pathname.endsWith(".jpeg") ||
      pathname.endsWith(".webp") ||
      pathname.endsWith(".avif") ||
      pathname.endsWith(".svg") ||
      pathname.endsWith(".gif") ||
      pathname.endsWith(".ico") ||
      pathname.endsWith(".css") ||
      pathname.endsWith(".js") ||
      pathname.endsWith(".woff") ||
      pathname.endsWith(".woff2")
    ) {
      // 1 ano
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      // HTML
      headers.set("Cache-Control", "no-cache");
    }

    headers.set("X-Content-Type-Options", "nosniff");

    return new Response(arquivo, {
      headers,
    });
  },

  development: true,
});

console.log("🚀 Fukuifilm rodando em http://localhost:3000");