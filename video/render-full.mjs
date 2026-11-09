import {bundle} from "@remotion/bundler";
import {renderMedia, selectComposition} from "@remotion/renderer";
import path from "path";
const [,, out="out/sirius.mp4", from, to] = process.argv;
const be = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const serveUrl = await bundle({entryPoint: path.resolve("src/index.ts")});
const comp = await selectComposition({serveUrl, id:"Film", browserExecutable:be});
let last=0;
await renderMedia({composition:comp, serveUrl, codec:"h264", outputLocation:out, browserExecutable:be, crf:18, concurrency:4, imageFormat:"jpeg", jpegQuality:92, pixelFormat:"yuv420p",
  frameRange: from!==undefined ? [Number(from), Number(to)] : null, chromiumOptions:{gl:"swiftshader"},
  onProgress:({renderedFrames,encodedFrames})=>{ if(renderedFrames-last>=60){last=renderedFrames;console.log("rendered",renderedFrames,"encoded",encodedFrames,new Date().toISOString().slice(11,19));}}});
console.log("DONE",out);
