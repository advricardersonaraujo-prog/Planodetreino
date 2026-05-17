const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "dist");
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || "0.0.0.0";
const publicOrigin = process.env.PUBLIC_ORIGIN || "";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

function sendHeaders(res, filePath) {
  const ext = path.extname(filePath);

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (publicOrigin) {
    res.setHeader("Access-Control-Allow-Origin", publicOrigin);
  }

  if (ext === ".html") {
    res.setHeader("Cache-Control", "no-cache");
  } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    res.setHeader("Cache-Control", "public, max-age=3600");
  }
}

http
  .createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, app: "planos-treino" }));
      return;
    }

    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const requested = path.normalize(urlPath === "/" ? "/index.html" : urlPath);
    const filePath = path.join(root, requested);
    const safePath = filePath.startsWith(root) ? filePath : path.join(root, "index.html");
    const finalPath = fs.existsSync(safePath) && fs.statSync(safePath).isFile() ? safePath : path.join(root, "index.html");

    fs.readFile(finalPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Server error");
        return;
      }

      sendHeaders(res, finalPath);
      res.writeHead(200, { "Content-Type": types[path.extname(finalPath)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(port, host, () => {
    console.log(`Planos de Treino running at http://${host}:${port}/`);
  });
