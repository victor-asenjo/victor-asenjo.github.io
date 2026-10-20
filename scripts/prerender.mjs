// Injects the server-rendered app into dist/index.html (run after `vite build` and the SSR build).
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const dist = resolve("dist/index.html");
const { render } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);
const html = readFileSync(dist, "utf8");
const app = render();
const start = html.indexOf('<div id="root">');
const end = html.indexOf("</div>", html.indexOf("</noscript>", start)) + "</div>".length;
if (start < 0 || end <= start) throw new Error("root container not found in dist/index.html");
writeFileSync(dist, html.slice(0, start) + `<div id="root" data-prerendered>${app}</div>` + html.slice(end));
rmSync(resolve("dist-ssr"), { recursive: true, force: true });
console.log(`prerendered ${Math.round(app.length / 1024)} KB of HTML into dist/index.html`);
