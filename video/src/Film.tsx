import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile} from "remotion";
import {T, SC} from "./timeline";
import {FONT} from "./theme";
import {Intro} from "./scenes/Intro";
import {LogoReveal} from "./scenes/Logo";
import {Workflow} from "./scenes/Workflow";
import {Hub} from "./scenes/Hub";
import {Single} from "./scenes/Single";
import {Observability} from "./scenes/Observability";
import {AIScene} from "./scenes/AI";
import {Impact} from "./scenes/Impact";
import {Close} from "./scenes/Close";

const seq = (k:keyof typeof SC, el:React.ReactNode) => (
  <Sequence from={T(SC[k][0])} durationInFrames={T(SC[k][1]-SC[k][0])} layout="none">{el}</Sequence>
);

export const Film:React.FC = () => (
  <AbsoluteFill style={{background:"#fff",fontFamily:FONT}}>
    <Audio src={staticFile("vo.m4a")}/>
    {seq("intro",<Intro/>)}
    {seq("wf",<Workflow/>)}
    {seq("logo",<LogoReveal/>)}
    {seq("hub",<Hub/>)}
    {seq("sw",<Single/>)}
    {seq("obs",<Observability/>)}
    {seq("ai",<AIScene/>)}
    {seq("impact",<Impact/>)}
    {seq("close",<Close/>)}
  </AbsoluteFill>
);
