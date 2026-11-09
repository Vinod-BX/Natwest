import {bundle} from "@remotion/bundler";
import {renderMedia, selectComposition} from "@remotion/renderer";
import path from "path";
const be="/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const serveUrl = await bundle({entryPoint: path.resolve("src/index.ts")});
for (const id of ["Clip1-Intro","Clip2-AI","Clip3-SelfService","Clip4-Impact"]) {
  const comp = await selectComposition({serveUrl,id,browserExecutable:be});
  await renderMedia({composition:comp,serveUrl,codec:"h264",outputLocation:`out/${id}.mp4`,browserExecutable:be,crf:18,concurrency:4,imageFormat:"jpeg",jpegQuality:92,pixelFormat:"yuv420p",chromiumOptions:{gl:"swiftshader"}});
  console.log("DONE",id,comp.durationInFrames);
}
