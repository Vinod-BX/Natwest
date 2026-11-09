import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile} from "remotion";
import {T, SC} from "./timeline";
import {FONT, FPS} from "./theme";
import {Intro} from "./scenes/Intro";
import {LogoReveal} from "./scenes/Logo";
import {AIScene} from "./scenes/AI";
import {Impact} from "./scenes/Impact";
import {Close} from "./scenes/Close";

// a scene played from `clipStart` (seconds on the master timeline); scene's own start is SC[k][0]
const at = (k:keyof typeof SC, clipStart:number, el:React.ReactNode) => (
  <Sequence from={T(SC[k][0]) - T(clipStart)} durationInFrames={T(SC[k][1]-SC[k][0])} layout="none">{el}</Sequence>
);
const Wrap:React.FC<{bg:string; start:number; children:React.ReactNode}> = ({bg,start,children}) => (
  <AbsoluteFill style={{background:bg,fontFamily:FONT}}>
    <Audio src={staticFile("vo.m4a")} startFrom={T(start)}/>
    {children}
  </AbsoluteFill>
);
export const CLIPS = {
  intro:   {id:"Clip1-Intro",       start:0,     end:26.6,  bg:"#F6F0FB"},
  ai:      {id:"Clip2-AI",          start:124.2, end:145.8, bg:"#3C1053"},
  selfsvc: {id:"Clip3-SelfService", start:145.6, end:156.9, bg:"#3C1053"},
  impact:  {id:"Clip4-Impact",      start:156.9, end:203.0, bg:"#F2EAF9"},
};
export const Clip1:React.FC = () => <Wrap bg={CLIPS.intro.bg} start={0}>{at("intro",0,<Intro/>)}{at("logo",0,<LogoReveal/>)}</Wrap>;
export const Clip2:React.FC = () => <Wrap bg={CLIPS.ai.bg} start={CLIPS.ai.start}>{at("ai",CLIPS.ai.start,<AIScene/>)}</Wrap>;
export const Clip3:React.FC = () => <Wrap bg={CLIPS.selfsvc.bg} start={CLIPS.selfsvc.start}>{at("ai",CLIPS.selfsvc.start,<AIScene/>)}</Wrap>;
export const Clip4:React.FC = () => <Wrap bg={CLIPS.impact.bg} start={CLIPS.impact.start}>{at("impact",CLIPS.impact.start,<Impact/>)}{at("close",CLIPS.impact.start,<Close/>)}</Wrap>;
