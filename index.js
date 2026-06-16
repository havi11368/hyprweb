//Modified from Ultraviolet Wiki script: https://github.com/titaniumnetwork-dev/Ultraviolet/wiki/Installing
import express from "express";
import { createServer } from "node:http";
import { scramjetPath } from "@mercuryworkshop/scramjet/path"
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { createBareServer } from '@tomphttp/bare-server-node';
import { bareModulePath } from "@mercuryworkshop/bare-as-module3";
import { fileURLToPath } from "url";
import { join } from "node:path";
import { hostname } from "node:os";
import wisp from "wisp-server-node"
import cors from 'cors';

const server = createServer();
const bare = createBareServer("/bare/");
const publicPath = fileURLToPath(new URL("./src/", import.meta.url));
const app = express(server);
// Load our publicPath first and prioritize it over UV.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

// Load vendor files last.
// The vendor's uv.config.js won't conflict with our uv.config.js inside the publicPath directory.
app.use("/scram/", express.static(scramjetPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/libcurl/", express.static(libcurlPath));
app.use("/bareasmodule/", express.static(bareModulePath));
app.use("/baremux/", express.static(baremuxPath));
app.use(cors());

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    res.setHeader("Service-Worker-Allowed", "/");
    bare.routeRequest(req, res);
  } else {
    res.setHeader("Service-Worker-Allowed", "/");
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head)
  } else
  {
	  if (bare.shouldRoute(req)) {
		bare.routeUpgrade(req, socket, head);
	  } else {
		socket.end();
	  }
  }
});

// Error for everything else
app.use((req, res) => {
  res.setHeader("Service-Worker-Allowed", "/");
  res.status(404);
  res.sendFile(join(publicPath, "404.html"));
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8000;

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
  port,
});