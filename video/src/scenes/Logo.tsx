import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, FONT, FPS, W, H, clamp, prog, eo, eio, ei, kf, lerp, pop, fade, eoExpo, eoBack} from "../theme";
import {SC} from "../timeline";
import {SiriusMark, SiriusWord} from "../logo";
import {Spark} from "../ui";

const S0 = SC.logo[0];
// final header-logo placement (matches Header: left 158, top 158, h=46)
export const HDR = {x:158, y:158, h:46};

export const LogoReveal:React.FC = () => {
  const f = useCurrentFrame(); const t = S0 + f/FPS;
  // dark circle wipe grows from the centre
  const wipe = eio(prog(t,23.3,24.45));
  const R = wipe*1500;
  // light flare (reveal UI) : circle that expands from centre to cover dark
  const flare = eio(prog(t,26.55,27.35));
  const lightR = flare*1500;
  // mark build
  const ring = eoExpo(prog(t,24.35,25.0));
  const star = eoBack(prog(t,24.55,25.1));
  const inner = eoBack(prog(t,24.8,25.3));
  const core = eoBack(prog(t,25.1,25.5));
  const rot = kf(t,[[24.5,-90],[25.2,0]],eo);
  const word = eoExpo(prog(t,25.35,26.0));
  // lockup layout: big centred -> flies to header
  const bigH = 230;
  const fly = eio(prog(t,26.55,27.5));
  const h = lerp(bigH,HDR.h,fly);
  // centre of lockup (width ~ h*(1+0.12+0.63*140/38))
  const wRatio = 1+0.12+0.63*(140/38);
  const lw = h*wRatio;
  const wordE = eio(prog(t,25.35,26.1));
  const lockCx = lerp(W/2, W/2, 0);
  const cx = lerp(lockCx, HDR.x + (HDR.h*wRatio)/2, fly);
  const cy = lerp(H/2 - 30, HDR.y + HDR.h/2, fly);
  const colWord = lerp(0,1,fly); // 0 = white/lavender on dark, 1 = purple on light
  const mixc=(k:number)=>{const a=[255,255,255],b=[129,56,224];return `rgb(${a.map((v,i)=>Math.round(lerp(v,b[i],k))).join(",")})`;};
  const col = mixc(clamp(fly*1.8)); const markCol = col;
  const flash = kf(t,[[24.9,0],[25.15,1],[25.8,0]]);
  const spark = prog(t,25.1,26.0);
  return (
    <AbsoluteFill style={{pointerEvents:"none"}}>
      {/* dark world */}
      <AbsoluteFill style={{clipPath:`circle(${R}px at 50% 50%)`,WebkitMaskImage:`radial-gradient(circle at 50% 50%, transparent ${lightR}px, #000 ${lightR+3}px)`,maskImage:`radial-gradient(circle at 50% 50%, transparent ${lightR}px, #000 ${lightR+3}px)`,background:`radial-gradient(1200px 800px at 50% 45%, ${C.p800} 0%, ${C.p900} 70%)`}}>
        {/* star field */}
        {Array.from({length:46}).map((_,i)=>{
          const a=(i*137.5)%360, r=300+((i*97)%700); const x=W/2+Math.cos(a)*r*1.5, y=H/2+Math.sin(a)*r*.8;
          const tw=.35+.35*Math.sin(t*2+i);
          return <div key={i} style={{position:"absolute",left:x,top:y,width:i%5?3:5,height:i%5?3:5,borderRadius:"50%",background:"#E6D7F5",opacity:tw*fade(t,24.4,0.6)}}/>;
        })}
        <div style={{position:"absolute",left:W/2-600,top:H/2-420,width:1200,height:840,borderRadius:"50%",background:`radial-gradient(closest-side, rgba(129,56,224,${.55*(fade(t,24.4,.8))}), rgba(129,56,224,0))`}}/>
        {flash>0 && <div style={{position:"absolute",left:W/2-500,top:H/2-500,width:1000,height:1000,borderRadius:"50%",background:`radial-gradient(closest-side, rgba(255,255,255,${.65*flash}), rgba(230,215,245,0))`}}/>}
      </AbsoluteFill>
      {/* lockup */}
      <div style={{position:"absolute",left:lerp(W/2-h/2, cx-lw/2, wordE>0?Math.max(wordE,fly):0),top:cy-h/2,width:lw,height:h,display:"flex",alignItems:"center",gap:h*0.12,opacity:wipe>0.4?1:0}}>
        <div style={{position:"relative",width:h,height:h}}>
          <SiriusMark size={h} color={markCol} dot={fly>0.5?"#fff":C.p900} ring={ring} star={star} inner={inner} core={core} rot={rot}/>
        </div>
        <div style={{opacity:word>0?1:0}}><SiriusWord height={h*0.63} color={col} reveal={word}/></div>
      </div>
      {/* tagline */}
      {t>25.3 && t<27.0 && (
        <div style={{position:"absolute",left:0,top:H/2+170,width:W,textAlign:"center",color:C.p100,fontSize:58,fontWeight:800,letterSpacing:-1,opacity:fade(t,25.5,.3)*(1-prog(t,26.5,27.0)),transform:`translateY(${(1-eo(prog(t,25.5,26.0)))*26}px)`}}>
          Getting started is <span style={{color:"#fff"}}>simple.</span>
        </div>)}
    </AbsoluteFill>
  );
};
