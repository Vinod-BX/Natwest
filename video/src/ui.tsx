import React from "react";
import {AbsoluteFill} from "remotion";
import {C, FONT, W, H, clamp, prog, eo, eio, kf, lerp, pop, fade, shadow} from "./theme";
import {SiriusMark, SiriusWord, SiriusLockup, CapIcon} from "./logo";

export const UIP = "#5C14AC"; // UI title purple sampled from screens

export const PageBg: React.FC<{children?:React.ReactNode; o?:number}> = ({children,o=1}) => (
  <AbsoluteFill style={{opacity:o,background:`radial-gradient(1400px 500px at 50% -120px, #FBF9FE 0%, rgba(251,249,254,0) 70%), linear-gradient(135deg,#F2EAF9 0%, #F6F0FB 55%, #EDE0F8 100%)`, fontFamily:FONT}}>
    {children}
  </AbsoluteFill>
);

// sidebar order: [SW, OBS, INT, WF] -> CapIcon index [0,1,3,2]
export const SIDE = [{cap:0,y:259,name:"Single Window"},{cap:1,y:321,name:"Observability"},{cap:3,y:382,name:"Integration Hub"},{cap:2,y:444,name:"Workflow Studio"}];
export const sidePos = (k:number)=>({x:83,y:SIDE[k].y});

const OutlineCircle:React.FC<{y:number; g:React.ReactNode}> = ({y,g}) => (
  <div style={{position:"absolute",left:38-17,top:y-138-17,width:34,height:34,borderRadius:17,border:"2px solid rgba(255,255,255,.35)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.55)",fontSize:16,fontWeight:700}}>{g}</div>
);

export const Sidebar:React.FC<{active:number; pulse?:number}> = ({active,pulse=0}) => (
  <div style={{position:"absolute",left:45,top:138,width:76,height:860,borderRadius:38,background:"linear-gradient(180deg,#5D10AE 0%,#4C0F84 50%,#3E1058 100%)",boxShadow:"0 20px 50px rgba(60,16,83,.25)"}}>
    <div style={{position:"absolute",left:38-22,top:186-138-22,width:44,height:44,borderRadius:22,background:"#3C1053",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <SiriusMark size={30} color={C.p200} dot="#3C1053"/>
    </div>
    {SIDE.map((s,k)=>{
      const on = k===active;
      return (
        <div key={k} style={{position:"absolute",left:38-(on?30:22),top:s.y-138-(on?30:22),width:on?60:44,height:on?60:44,borderRadius:on?30:22,background:on?"rgba(255,255,255,.12)":"transparent",border:on?"2px solid rgba(255,255,255,.35)":"none",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:on&&pulse>0?`0 0 ${30*pulse}px rgba(211,184,240,${.8*pulse})`:"none"}}>
          <CapIcon i={s.cap} size={on?44:38} style={{borderRadius:on?12:10}}/>
        </div>);
    })}
    <OutlineCircle y={816} g="?"/>
    <OutlineCircle y={883} g="▤"/>
    <OutlineCircle y={951} g="↺"/>
  </div>
);

export const Header:React.FC<{logoOpacity?:number}> = ({logoOpacity=1}) => (
  <>
    <div style={{position:"absolute",left:135,top:139,width:1720,height:83,borderBottom:"1px solid #E4E0EF"}}/>
    <div style={{position:"absolute",left:471,top:139,width:1,height:83,background:"#E4E0EF"}}/>
    <div style={{position:"absolute",left:158,top:158,opacity:logoOpacity}}><SiriusLockup h={46}/></div>
    <div style={{position:"absolute",left:497,top:155,width:553,height:50,borderRadius:25,background:"#F1F1F1",display:"flex",alignItems:"center",gap:14,paddingLeft:18,color:C.n500,fontSize:17,fontWeight:500}}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke={UIP} strokeWidth="2.2"><circle cx="8.5" cy="8.5" r="6"/><path d="M13 13l5 5"/></svg>
      Global Search for BIN / Case ID / Reference Number
    </div>
    <div style={{position:"absolute",left:1593,top:155,width:52,height:52,borderRadius:26,border:`2px solid ${C.p500}`,display:"flex",alignItems:"center",justifyContent:"center",background:"#FDF8FB"}}>
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none" stroke={C.p500} strokeWidth="2"><path d="M4 17V10a7 7 0 0114 0v7l2 2H2z"/><path d="M9 21a2 2 0 004 0"/></svg>
      <div style={{position:"absolute",right:2,top:-2,width:11,height:11,borderRadius:6,background:C.red}}/>
    </div>
    <div style={{position:"absolute",left:1672,top:162,width:32,height:32,borderRadius:16,background:"linear-gradient(135deg,#F3C9A8,#B97B5A)",border:"2px solid #fff"}}/>
    <div style={{position:"absolute",left:1715,top:162,color:UIP,fontWeight:800,fontSize:16,lineHeight:"18px"}}>John Doe<div style={{fontWeight:500,fontSize:14,color:C.p700}}>Analyst</div></div>
    <svg style={{position:"absolute",left:1801,top:172}} width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="#444" strokeWidth="1.6"><path d="M1 2l6 6 6-6"/></svg>
  </>
);

export const Shell:React.FC<{fadeBg?:boolean; active:number; title:string; t:number; right?:React.ReactNode; children?:React.ReactNode; pulse?:number; logoOpacity?:number; enter?:number}> = ({active,title,t,right,children,pulse,logoOpacity=1,enter=1,fadeBg=true}) => (
  <PageBg o={fadeBg?eo(enter):1}>
    <div style={{position:"absolute",inset:0,transform:`translateY(${(1-eo(enter))*40}px)`,opacity:eo(enter)}}>
      <div style={{position:"absolute",left:135,top:139,width:1720,height:1000,borderRadius:26,background:"#fff",boxShadow:"0 0 0 1px rgba(129,56,224,.08), 0 30px 80px rgba(129,56,224,.18)"}}/>
      <Sidebar active={active} pulse={pulse}/>
      <Header logoOpacity={logoOpacity}/>
      <div style={{position:"absolute",left:159,top:240,fontSize:34,fontWeight:800,color:UIP,letterSpacing:-.3}}>{title}</div>
      <div style={{position:"absolute",right:90,top:243,display:"flex",gap:12}}>{right}</div>
      {children}
    </div>
  </PageBg>
);

export const PillBtn:React.FC<{label:string; filled?:boolean; w?:number; glow?:number; color?:string}> = ({label,filled,w,glow=0,color=C.p500}) => (
  <div style={{height:40,minWidth:w,padding:"0 22px",borderRadius:20,border:`2px solid ${filled?"transparent":color}`,background:filled?`linear-gradient(90deg,${UIP},${color})`:"#F8F4FD",color:filled?"#fff":UIP,fontWeight:700,fontSize:15,letterSpacing:.5,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:glow>0?`0 0 ${40*glow}px rgba(129,56,224,${.7*glow})`:"none"}}>{label}</div>
);

export const Card:React.FC<{style?:React.CSSProperties; children?:React.ReactNode}> = ({style,children}) => (
  <div style={{background:"#fff",borderRadius:20,boxShadow:shadow,border:"1px solid #EEE7F8",...style}}>{children}</div>
);

// ---------- Cursor ----------
export type CK = [number,number,number]; // t,x,y
export const Cursor:React.FC<{t:number; path:CK[]; clicks?:number[]; hideBefore?:number}> = ({t,path,clicks=[],hideBefore}) => {
  const x = kf(t,path.map(p=>[p[0],p[1]] as [number,number]));
  const y = kf(t,path.map(p=>[p[0],p[2]] as [number,number]));
  if(t<path[0][0]-0.2||(hideBefore!==undefined&&t<hideBefore)) return null;
  const last = clicks.filter(c=>c<=t).slice(-1)[0];
  const cp = last!==undefined? prog(t,last,last+0.55):1;
  const press = last!==undefined && t-last<0.12 ? 0.86 : 1;
  const op = fade(t,path[0][0]-0.2,0.2);
  return (
    <div style={{position:"absolute",left:0,top:0,width:W,height:H,pointerEvents:"none",opacity:op}}>
      {last!==undefined && cp<1 && (
        <div style={{position:"absolute",left:x-6,top:y-6,width:12,height:12,marginLeft:-0,borderRadius:"50%",border:`3px solid ${C.p500}`,transform:`translate(-50%,-50%) scale(${1+cp*5})`,opacity:(1-cp)*.9,left:x,top:y}}/>
      )}
      <svg width="34" height="40" viewBox="0 0 34 40" style={{position:"absolute",left:x-4,top:y-3,transform:`scale(${press})`,transformOrigin:"4px 3px",filter:"drop-shadow(0 4px 6px rgba(0,0,0,.3))"}}>
        <path d="M4 3v28l7-7 5 12 6-3-5-11h10z" fill="#fff" stroke="#2D2D2D" strokeWidth="2.2" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export const Typewriter:React.FC<{text:string; t:number; start:number; cps?:number; style?:React.CSSProperties}> = ({text,t,start,cps=38,style}) => {
  const n = Math.max(0,Math.floor((t-start)*cps));
  const s = text.slice(0,n);
  const caret = n<text.length && t>start;
  return <span style={style}>{s}{caret && <span style={{display:"inline-block",width:3,height:"1em",background:C.p500,marginLeft:2,verticalAlign:"-0.12em"}}/>}</span>;
};

export const Spark:React.FC<{size?:number; color?:string; style?:React.CSSProperties}> = ({size=24,color="#fff",style}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}><path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" fill={color}/></svg>
);

export const Check:React.FC<{size?:number; color?:string}> = ({size=24,color=C.green}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill={color}/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

// Generic outline icons used across scenes (24 viewBox)
export const Ico:React.FC<{n:string; size?:number; color?:string; sw?:number}> = ({n,size=28,color=C.p500,sw=1.8}) => {
  const p: Record<string,React.ReactNode> = {
    people:<><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.5" cy="9" r="2.4"/><path d="M17 14c3 .2 4.8 2 4.8 5"/></>,
    process:<><rect x="2.5" y="4" width="6" height="5" rx="1.4"/><rect x="15.5" y="15" width="6" height="5" rx="1.4"/><path d="M8.5 6.5h4a3 3 0 013 3v5"/><path d="M13.5 12.5l2 2.5 2-2.5"/></>,
    data:<><ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></>,
    systems:<><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></>,
    controls:<><path d="M12 2.5l8 3v6c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10v-6z"/><path d="M8.2 12l2.8 2.8 5-5.3"/></>,
    shield:<><path d="M12 2.5l8 3v6c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10v-6z"/></>,
    lock:<><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 018 0v3"/></>,
    pulse:<><path d="M2 12h4l2.5-6 4 12 2.5-6H22"/></>,
    web:<><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19"/></>,
    mobile:<><rect x="6.5" y="2.5" width="11" height="19" rx="2.6"/><path d="M10.5 18.5h3"/></>,
    branch:<><path d="M3 10l9-6.5 9 6.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></>,
    mail:<><rect x="2.5" y="5" width="19" height="14" rx="2.4"/><path d="M3 7l9 6.5L21 7"/></>,
    api:<><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15"/></>,
    bank:<><path d="M3 9.5L12 4l9 5.5"/><path d="M5 11v7M10 11v7M14 11v7M19 11v7M3 20h18"/></>,
    crm:<><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></>,
    pay:<><rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/></>,
    kyc:<><rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="9" cy="11" r="2.4"/><path d="M5.5 16.5c.5-2 2-3 3.5-3s3 1 3.5 3M15 10h3.5M15 13.5h3.5"/></>,
    doc:<><path d="M6 2.5h8l5 5V21a.5.5 0 01-.5.5h-12A.5.5 0 016 21z"/><path d="M14 2.5V8h5M9 13h7M9 17h7"/></>,
    chat:<><path d="M4 5h16a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0120 17h-8l-5 4v-4H4a1.5 1.5 0 01-1.5-1.5v-9A1.5 1.5 0 014 5z"/></>,
    warn:<><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></>,
    bulb:<><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.7.6 1 1.3 1 2.1h5c0-.8.3-1.5 1-2.1A6 6 0 0012 3z"/></>,
    loop:<><path d="M20 12a8 8 0 01-14 5.3M4 12a8 8 0 0114-5.3"/><path d="M18 2.5v4.5h-4.5M6 21.5V17h4.5"/></>,
    play:<><path d="M7 4.5v15l12-7.5z"/></>,
    rocket:<><path d="M14 4c4 0 6 2 6 6-2 4-5 7-8 8l-6-6c1-3 4-6 8-8z"/><circle cx="14.5" cy="9.5" r="1.6"/><path d="M6 14c-2 .5-3 2-3.5 5 3-.5 4.5-1.5 5-3.5"/></>,
    clock:<><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/></>,
    users:<><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 5.2a3 3 0 010 5.6M18 14.5c2 .8 3.5 2.6 3.5 5.5"/></>,
    coin:<><circle cx="12" cy="12" r="9.5"/><path d="M14.5 8.5c-.5-1-1.5-1.5-2.7-1.5-1.6 0-2.8.8-2.8 2.1 0 3 5.8 1.5 5.8 4.6 0 1.4-1.3 2.3-3 2.3-1.3 0-2.5-.6-3-1.8M12 5.5v1.5M12 17v1.5"/></>,
    target:<><circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.5"/></>,
    search:<><circle cx="10.5" cy="10.5" r="7"/><path d="M16 16l5.5 5.5"/></>,
    arrow:<><path d="M4 12h15M13 6l6 6-6 6"/></>,
    plus:<><path d="M12 4v16M4 12h16"/></>,
    flag:<><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{p[n]}</svg>;
};

export const Tile:React.FC<{icon:string; label:string; sub?:string; color?:string; w?:number; h?:number; glow?:number; style?:React.CSSProperties}> = ({icon,label,sub,color=C.p500,w=190,h=86,glow=0,style}) => (
  <div style={{width:w,height:h,borderRadius:18,background:"#fff",border:"1px solid #E8DDF6",boxShadow:glow>0?`0 0 ${36*glow}px rgba(129,56,224,${.55*glow}), ${shadow}`:shadow,display:"flex",alignItems:"center",gap:14,padding:"0 18px",...style}}>
    <div style={{width:44,height:44,borderRadius:12,background:C.p50,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n={icon} size={26} color={color}/></div>
    <div><div style={{fontWeight:800,fontSize:19,color:C.n900,lineHeight:"22px"}}>{label}</div>{sub&&<div style={{fontWeight:600,fontSize:14,color:C.n500,marginTop:2}}>{sub}</div>}</div>
  </div>
);
