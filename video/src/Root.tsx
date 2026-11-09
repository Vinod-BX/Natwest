import React from "react";
import {Composition} from "remotion";
import {Film} from "./Film";
import {Clip1,Clip2,Clip3,Clip4,CLIPS} from "./Clips";
import {FPS, W, H, DURATION_S} from "./theme";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/800.css";
import "@fontsource/nunito-sans/900.css";

const dur=(c:{start:number;end:number})=>Math.round((c.end-c.start)*FPS);
export const Root:React.FC = () => (
  <>
  <Composition id={CLIPS.intro.id} component={Clip1} durationInFrames={dur(CLIPS.intro)} fps={FPS} width={W} height={H}/>
  <Composition id={CLIPS.ai.id} component={Clip2} durationInFrames={dur(CLIPS.ai)} fps={FPS} width={W} height={H}/>
  <Composition id={CLIPS.selfsvc.id} component={Clip3} durationInFrames={dur(CLIPS.selfsvc)} fps={FPS} width={W} height={H}/>
  <Composition id={CLIPS.impact.id} component={Clip4} durationInFrames={dur(CLIPS.impact)} fps={FPS} width={W} height={H}/>
  <Composition id="Film" component={Film} durationInFrames={Math.round(DURATION_S*FPS)} fps={FPS} width={W} height={H}/>
  </>
);
