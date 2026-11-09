import {interpolate, Easing} from "remotion";
export const FPS = 30;
export const W = 1920, H = 1080;
export const DURATION_S = 203.0;
export const C = {
  p50:"#F2EAF9", p100:"#E6D7F5", p200:"#D3B8F0", p400:"#A66BF0", p500:"#8138E0", p600:"#6A2EBF",
  p700:"#5A287D", p800:"#4A1C67", p900:"#3C1053",
  n0:"#FFFFFF", n50:"#F5F5F5", n100:"#E9E6EC", n300:"#B9B5BE", n500:"#646068", n900:"#2D2D2D",
  green:"#3AD356", blue:"#006FE6", pink:"#E51565", red:"#DB3700", yellow:"#FBB200",
};
export const FONT = `"Nunito Sans", "Nunito", Inter, system-ui, sans-serif`;
export const clamp = (v:number,a=0,b=1)=>Math.min(b,Math.max(a,v));
export const prog = (t:number,a:number,b:number)=>clamp((t-a)/(b-a));
export const eo = (x:number)=>1-Math.pow(1-x,3);
export const eoExpo = (x:number)=>x>=1?1:1-Math.pow(2,-10*x);
export const eio = (x:number)=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
export const eoBack = (x:number)=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
export const ei = (x:number)=>x*x*x;
// pop: 0 -> 1 with overshoot starting at t=a
export const pop = (t:number,a:number,d=0.45)=>eoBack(prog(t,a,a+d));
export const fade = (t:number,a:number,d=0.35)=>eo(prog(t,a,a+d));
export const lerp = (a:number,b:number,x:number)=>a+(b-a)*x;
export const bez = Easing.bezier(0.22,1,0.36,1);
export const mix = (t:number,a:number,b:number,v0:number,v1:number,ease=eio)=>lerp(v0,v1,ease(prog(t,a,b)));
// keyframes: [[t,value],...] with easing between
export const kf = (t:number,pts:[number,number][],ease=eio)=>{
  if(t<=pts[0][0])return pts[0][1];
  for(let i=1;i<pts.length;i++){ if(t<=pts[i][0]){const [t0,v0]=pts[i-1],[t1,v1]=pts[i];return lerp(v0,v1,ease(prog(t,t0,t1)));}}
  return pts[pts.length-1][1];
};
export const range = (t:number,a:number,b:number)=>t>=a&&t<b;
export const shadow = "0 18px 50px rgba(90,40,125,.14), 0 3px 10px rgba(90,40,125,.08)";
