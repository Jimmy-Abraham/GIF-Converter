// Copies ffmpeg.wasm into public/vendor so it loads from your own domain
// (browsers block cross-origin workers, so a CDN import won't work).
import { cpSync, rmSync } from "node:fs";
rmSync("public/vendor", { recursive: true, force: true });
cpSync("node_modules/@ffmpeg/ffmpeg/dist/esm", "public/vendor/ffmpeg", { recursive: true });
cpSync("node_modules/@ffmpeg/core/dist/esm", "public/vendor/core", { recursive: true });
console.log("ffmpeg.wasm copied to public/vendor");
