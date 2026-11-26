const http = require("node:http");

const PORT = Number(process.env.PORT || 3000);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  });
  response.end(JSON.stringify(payload));
}

function createServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url, "http://localhost");

    if (request.method === "GET" && url.pathname === "/health") {
      return sendJson(response, 200, {
        status: "ok",
        service: "code-fuxion-node-api-demo"
      });
    }

    if (request.method === "GET" && url.pathname === "/api/profile") {
      return sendJson(response, 200, {
        name: "Code Fuxion",
        focus: ["full-stack development", "cybersecurity", "AI and product building"]
      });
    }

    return sendJson(response, 404, { error: "Route not found" });
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => {
    process.stdout.write(`Demo API listening on port ${PORT}\n`);
  });
}

module.exports = { createServer };
