import React from "react";
import {Img, staticFile} from "remotion";
import {C} from "./theme";

export const WORD_D = "M75.1124 19.6698C75.1124 25.0611 91.1021 22.9414 91.1021 34.5536C91.1021 40.3136 86.7245 44.6451 80.089 44.6451C76.7713 44.6451 73.9604 43.3549 72.1633 41.2813V44H66.1729V33.4016H71.7946C72.7162 36.6272 75.2045 38.9312 78.6605 38.9312C81.0567 38.9312 82.6695 37.4566 82.6695 35.4291C82.6695 29.6691 66.6797 31.6966 66.6797 20.2688C66.6797 15.1078 70.8269 11.0989 76.6791 11.0989C79.5361 11.0989 81.9783 12.2509 83.6833 14.1402V11.744H89.6737V21.513H84.1441C83.4068 18.6099 81.2871 16.6285 78.338 16.6285C76.4948 16.6285 75.1124 17.8726 75.1124 19.6698ZM100.923 16.905C98.3421 16.905 96.6371 15.2 96.6371 12.8499C96.6371 10.5459 98.4343 8.88704 100.923 8.88704C103.457 8.88704 105.208 10.5459 105.208 12.8499C105.208 15.2 103.457 16.905 100.923 16.905ZM105.024 19.7158V39.2998H108.065V44H94.241V39.2998H97.2823V24.416H94.241V19.7158H105.024ZM128.498 19.0707C129.558 19.0707 130.71 19.209 131.723 19.4394L130.571 27.5955C129.189 27.1347 127.576 26.7661 126.148 26.7661C123.245 26.7661 121.494 28.3789 121.494 31.0054V39.2998H125.134V44H110.711V39.2998H113.752V24.416H110.711V19.7158H121.355V25.1533C122.554 21.8816 125.134 19.0707 128.498 19.0707ZM140.208 16.905C137.627 16.905 135.922 15.2 135.922 12.8499C135.922 10.5459 137.719 8.88704 140.208 8.88704C142.742 8.88704 144.493 10.5459 144.493 12.8499C144.493 15.2 142.742 16.905 140.208 16.905ZM144.309 19.7158V39.2998H147.35V44H133.526V39.2998H136.567V24.416H133.526V19.7158H144.309ZM176.169 19.7158V39.2998H179.211V44H168.566V40.3136C167.138 42.7098 164.189 44.4608 160.594 44.4608C155.387 44.4608 152.438 41.0509 152.438 35.7517V24.416H149.397V19.7158H160.18V34.5075C160.18 36.9498 161.47 38.6086 163.866 38.6086C166.677 38.6086 168.428 36.7654 168.428 34.185V24.416H165.387V19.7158H176.169ZM189.92 25.7984C189.92 29.7152 203.928 27.1347 203.928 36.6733C203.928 41.3274 200.058 44.6451 194.804 44.6451C191.994 44.6451 189.505 43.6774 187.754 42.0186V44.0461H182.317V36.0282H187.293C188.353 38.24 190.427 39.7606 193.376 39.7606C195.173 39.7606 196.371 38.793 196.371 37.3645C196.371 33.3094 182.409 35.8438 182.455 26.4896C182.455 22.2502 185.865 19.0707 190.888 19.0707C193.56 19.0707 195.818 20.0384 197.569 21.6051V19.5776H203.007V27.0426H198.122C197.155 25.0611 194.943 23.6787 192.5 23.6787C190.98 23.6787 189.92 24.6003 189.92 25.7984Z";
export const STAR8_D = "M29.0121 6.28857C29.1891 5.16215 30.8109 5.16216 30.9879 6.28857L33.9599 25.2074C34.0273 25.6363 34.3637 25.9727 34.7926 26.0401L53.7114 29.0121C54.8378 29.1891 54.8378 30.8109 53.7114 30.9879L34.7926 33.9599C34.3637 34.0273 34.0273 34.3637 33.9599 34.7926L30.9879 53.7114C30.8109 54.8378 29.1891 54.8378 29.0121 53.7114L26.0401 34.7926C25.9727 34.3637 25.6363 34.0273 25.2074 33.9599L6.28857 30.9879C5.16215 30.8109 5.16216 29.1891 6.28857 29.0121L25.2074 26.0401C25.6363 25.9727 25.9727 25.6363 26.0401 25.2074L29.0121 6.28857Z";
export const X4_D = "M18.5786 19.8141C18.0568 18.9252 19.0583 17.9237 19.9473 18.4455L29.6269 24.1279C29.9394 24.3114 30.3268 24.3114 30.6394 24.1279L40.319 18.4455C41.2079 17.9237 42.2095 18.9252 41.6876 19.8141L36.0052 29.4937C35.8217 29.8063 35.8217 30.1937 36.0052 30.5063L41.6876 40.1859C42.2095 41.0748 41.2079 42.0763 40.319 41.5545L30.6394 35.8721C30.3268 35.6886 29.9394 35.6886 29.6269 35.8721L19.9473 41.5545C19.0583 42.0763 18.0568 41.0748 18.5786 40.1859L24.261 30.5063C24.4445 30.1937 24.4445 29.8063 24.261 29.4937L18.5786 19.8141Z";

// Mark = ring + 8-point star + inner X + white core. viewBox 0 0 60 60
export const SiriusMark: React.FC<{size:number; color?:string; dot?:string; ring?:number; star?:number; inner?:number; core?:number; rot?:number}> = ({size,color=C.p500,dot="#fff",ring=1,star=1,inner=1,core=1,rot=0}) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{overflow:"visible"}}>
    <circle cx="30" cy="30" r="19" stroke={color} strokeWidth="2" strokeDasharray={119.4} strokeDashoffset={119.4*(1-ring)} transform="rotate(-90 30 30)" opacity={ring>0?1:0}/>
    <g style={{transformOrigin:"30px 30px",transform:`rotate(${rot}deg) scale(${star})`}} opacity={star>0?1:0}><path d={STAR8_D} fill={color}/></g>
    <g style={{transformOrigin:"30px 30px",transform:`rotate(${-rot*1.6}deg) scale(${inner})`}} opacity={inner>0?1:0}><path d={X4_D} fill={color}/></g>
    <circle cx="29.6328" cy="30.5" r={3.5*core} fill={dot}/>
  </svg>
);

// Wordmark only. viewBox crops 66..206 x 8..46
export const SiriusWord: React.FC<{height:number; color?:string; reveal?:number}> = ({height,color=C.p500,reveal=1}) => {
  const w = height*(140/38);
  return (
  <svg width={w} height={height} viewBox="66 8 140 38" style={{overflow:"hidden",display:"block"}}>
    <defs><clipPath id="wr"><rect x="66" y="8" width={140*reveal} height="38"/></clipPath></defs>
    <g clipPath="url(#wr)"><path d={WORD_D} fill={color}/></g>
  </svg>);
};

export const SiriusLockup: React.FC<{h:number; color?:string; dot?:string; reveal?:number}> = ({h,color=C.p500,dot="#fff",reveal=1}) => (
  <div style={{display:"flex",alignItems:"center",gap:h*0.12}}>
    <SiriusMark size={h} color={color} dot={dot}/>
    <SiriusWord height={h*0.63} color={color} reveal={reveal}/>
  </div>
);

// Capability icon tiles cropped out of the supplied SVG. i: 0 SingleWindow 1 Observability 2 WorkflowStudio 3 Integration 4 AI
export const CAP_NAMES = ["Single Window","Observability","Workflow Studio","Channel and Data Integration","AI Capabilities"];
export const CapIcon: React.FC<{i:number; size:number; style?:React.CSSProperties}> = ({i,size,style}) => {
  const k = size/172;
  return (
    <div style={{width:size,height:size,borderRadius:22*k,overflow:"hidden",position:"relative",flexShrink:0,...style}}>
      <Img src={staticFile("brand/capabilities.svg")} style={{position:"absolute",width:1256*k,height:340*k,left:-(236+196*i)*k,top:-70*k,maxWidth:"none"}}/>
    </div>
  );
};
