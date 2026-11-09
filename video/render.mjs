import {bundle} from "@remotion/bundler";
import {renderStill, selectComposition} from "@remotion/renderer";
import path from "path";
const frames = process.argv.slice(2).map(Number);
const serveUrl = await bundle({entryPoint: path.resolve("src/index.ts"), webpackOverride:c=>c});
const comp = await selectComposition({serveUrl, id:"Film", browserExecutable:"/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell"});
for (const f of frames){
  await renderStill({composition:comp, serveUrl, frame:f, output:`out/still_${f}.png`, browserExecutable:"/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell", scale:0.5, chromiumOptions:{gl:"swiftshader"}});
  console.log("still",f);
}
