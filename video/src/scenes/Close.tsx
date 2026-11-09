import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, FPS, W, H, prog, eo, eio, kf, lerp, pop, fade, eoExpo, eoBack} from "../theme";
import {SC} from "../timeline";
import {SiriusMark, SiriusWord, CapIcon, CAP_NAMES} from "../logo";

const S0 = SC.close[0];
const ORDER = [2,3,0,1,4];
const LABEL = ["Workflow Studio","Integration Hub","Single Window","Observability","AI Capabilities"];
const TY = 775, TS = 170, GAP = 270;

export const Close:React.FC = () => {
  const f = useCurrentFrame(); const t = S0 + f/FPS;
  const wipe = eio(prog(t,192.7,193.6));
  const ring = eoExpo(prog(t,193.4,194.0));
  const star = eoBack(prog(t,193.55,194.1));
  const inner = eoBack(prog(t,193.8,194.3));
  const core = eoBack(prog(t,194.1,194.5));
  const word = eoExpo(prog(t,194.3,195.0));
  const h = 170; const wRatio = 1+0.12+0.63*(140/38); const lw=h*wRatio;
  const lockLeft = lerp(W/2-h/2, W/2-lw/2, eio(prog(t,194.3,195.0)));
  const burst = (i:number)=>eoBack(prog(t,195.1+i*.12,195.9+i*.12));
  const flash = kf(t,[[193.7,0],[194.0,1],[194.8,0]]);
  const stars = Array.from({length:60}).map((_,i)=>{const a=(i*137.5)%360,r=200+((i*113)%820);return {x:W/2+Math.cos(a)*r*1.6,y:H/2+Math.sin(a)*r*.9,s:i%6?3:5,ph:i};});
  // wave of pulses
  const wave = (i:number)=>{ // returns glow 0..1 for tile i at wave times
    let g=0; for(const w0 of [196.5,198.3,200.1,201.9]){const p=t-(w0+i*.14); if(p>0&&p<.7) g=Math.max(g,Math.sin(p/.7*Math.PI));} return g; };
  const final = fade(t,202.0,.8);
  return (
    <AbsoluteFill style={{clipPath:`circle(${wipe*1500}px at 50% 50%)`,background:`radial-gradient(1300px 900px at 50% 40%, ${C.p800} 0%, ${C.p900} 72%)`}}>
      {stars.map((s,i)=><div key={i} style={{position:"absolute",left:s.x,top:s.y,width:s.s,height:s.s,borderRadius:"50%",background:"#E6D7F5",opacity:(.25+.3*Math.sin(t*1.6+s.ph))}}/>)}
      <div style={{position:"absolute",left:W/2-700,top:H/2-560,width:1400,height:900,borderRadius:"50%",background:`radial-gradient(closest-side,rgba(129,56,224,${.35+.2*final}),rgba(129,56,224,0))`}}/>
      {flash>0 && <div style={{position:"absolute",left:W/2-450,top:375-450,width:900,height:900,borderRadius:"50%",background:`radial-gradient(closest-side, rgba(255,255,255,${.7*flash}), rgba(230,215,245,0))`}}/>}
      {/* connectors lockup -> tiles */}
      <svg width={W} height={H} style={{position:"absolute",inset:0}}>
        {ORDER.map((c,i)=>{const x=W/2+(i-2)*GAP; const p=eoExpo(prog(t,195.6+i*.1,196.5+i*.1)); const g=wave(i);
          return <path key={i} d={`M${W/2} 500 C${W/2} 600 ${x} 580 ${x} ${TY-TS/2-10}`} fill="none" stroke={C.p400} strokeWidth={3+3*g} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-p} opacity={.55+.4*g}/>;})}
      </svg>
      {/* lockup */}
      <div style={{position:"absolute",left:lockLeft,top:375-h/2,width:lw,height:h,display:"flex",alignItems:"center",gap:h*0.12,opacity:wipe>.3?1:0}}>
        <SiriusMark size={h} color="#fff" dot={C.p900} ring={ring} star={star} inner={inner} core={core} rot={kf(t,[[193.5,-90],[194.2,0]],eo)}/>
        <div style={{opacity:word>0?1:0}}><SiriusWord height={h*.63} color="#fff" reveal={word}/></div>
      </div>
      {/* tiles */}
      {ORDER.map((c,i)=>{
        const b=burst(i); const x=lerp(W/2, W/2+(i-2)*GAP, Math.min(1,b)); const y=lerp(375, TY, Math.min(1,b));
        const g=wave(i); const sc=lerp(.2,1,Math.min(1,b))*(1+.08*g);
        return t>=195.05 && (
          <div key={i} style={{position:"absolute",left:x-TS/2,top:y-TS/2,width:TS,height:TS,transform:`scale(${sc}) rotate(${(1-Math.min(1,b))*(i%2?-90:90)}deg)`,opacity:Math.min(1,b*2),boxShadow:`0 0 ${30+50*g+30*final}px rgba(166,107,240,${.35+.5*g})`,borderRadius:22*TS/172}}>
            <CapIcon i={c} size={TS}/>
            <div style={{position:"absolute",top:TS+22,left:-50,width:TS+100,textAlign:"center",color:"#fff",fontWeight:800,fontSize:25,lineHeight:"29px",opacity:fade(t,196.3+i*.12,.4)}}>{LABEL[i]}</div>
          </div>);
      })}
    </AbsoluteFill>
  );
};
