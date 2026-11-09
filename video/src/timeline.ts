import {FPS} from "./theme";
export const T = (s:number)=>Math.round(s*FPS);
// scene windows in seconds (from voiceover word alignment)
export const SC = {
  intro:[0,24.6], logo:[23.3,27.7], wf:[26.6,48.8], hub:[48.5,69.6], sw:[69.4,102.5],
  obs:[102.2,125.2], ai:[124.2,157.6], impact:[156.9,193.2], close:[192.7,203.0],
} as const;
export const useS = (name:keyof typeof SC)=>SC[name];
