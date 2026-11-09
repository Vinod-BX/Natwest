import React from "react";
import {Composition} from "remotion";
import {Film} from "./Film";
import {FPS, W, H, DURATION_S} from "./theme";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/800.css";
import "@fontsource/nunito-sans/900.css";

export const Root:React.FC = () => (
  <Composition id="Film" component={Film} durationInFrames={Math.round(DURATION_S*FPS)} fps={FPS} width={W} height={H}/>
);
