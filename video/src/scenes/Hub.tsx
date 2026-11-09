import React from "react";
import {useCurrentFrame} from "remotion";
import {C, FPS, W, H, prog, eo, eio, kf, lerp, pop, fade, shadow, eoExpo} from "../theme";
import {SC} from "../timeline";
import {Shell, Cursor, Ico, Spark, Check, UIP, Card, Tile, CK} from "../ui";

const S0 = SC.hub[0];
const CHANNELS = [{i:"web",l:"Web portal"},{i:"mobile",l:"Mobile app"},{i:"branch",l:"Branch"},{i:"mail",l:"Email"},{i:"api",l:"Partner API"}];
const SYSTEMS = [{i:"bank",l:"Core banking"},{i:"crm",l:"CRM"},{i:"pay",l:"Payments"},{i:"kyc",l:"KYC & identity"}];
const DATA = [{i:"data",l:"Customer"},{i:"doc",l:"Documents"},{i:"clock",l:"Accounts"}];
const HX=1000, HY=640;
const chPos = (i:number)=>({x:360,y:390+i*128});
const syPos = (i:number)=>({x:1640,y:420+i*152});
const dtPos = (i:number)=>({x:640+i*360,y:940});

export const Hub:React.FC = () => {
  const f = useCurrentFrame(); const t = S0 + f/FPS;
  const enter = prog(t,48.5,49.1);
  // zoom out for ih2
  const z = kf(t,[[57.6,1],[59.4,0.62]]);
  const zy = kf(t,[[57.6,0],[59.4,40]]);
  const panX = kf(t,[[57.6,0],[59.4,60]]);
  const tiles:{x:number;y:number;t:number;i:string;l:string;c:string;k:string}[] = [
    ...CHANNELS.map((c,i)=>({...chPos(i),t:51.4+i*.14,i:c.i,l:c.l,c:C.p500,k:"ch"})),
    ...SYSTEMS.map((c,i)=>({...syPos(i),t:51.95+i*.12,i:c.i,l:c.l,c:C.blue,k:"sy"})),
    ...DATA.map((c,i)=>({...dtPos(i),t:52.55+i*.12,i:c.i,l:c.l,c:C.pink,k:"dt"})),
  ];
  const chips = [
    {from:0,t:53.9,l:"Customer profile",c:C.p500},{from:3,t:54.4,l:"Case request",c:C.p500},{from:5,t:54.8,l:"KYC status ✓",c:C.blue},
    {from:6,t:55.3,l:"Account 5266…",c:C.pink},{from:7,t:55.7,l:"Mandate docs",c:C.pink},{from:8,t:56.1,l:"Payments ref",c:C.blue},
  ];
  const tilePos=(k:number)=>({x:tiles[k].x,y:tiles[k].y});
  const hubGlow = kf(t,[[53.9,0],[54.6,1],[57.2,1],[57.8,0.4]]);
  const progress = eo(prog(t,53.9,57.1));
  // ih2 pieces
  const wfCard = pop(t,59.2,.6);
  const link = eoExpo(prog(t,59.3,60.1));
  const cur:CK[] = [
    [49.4,300,300],[51.0,520,560],[52.2,1500,470],[53.0,960,860],[54.0,1000,640],[57.0,1000,640],[57.5,1000,640],
    [68.4,700,600],[69.0,83,259],[69.35,83,259],
  ];
  const sidePulse = kf(t,[[68.9,0],[69.2,1],[69.8,0]]);
  const scaleG = z;
  return (
    <Shell active={2} title="Integration Hub" t={t} enter={enter} pulse={sidePulse}>
      <div style={{position:"absolute",inset:0,transform:`translate(${panX}px,${zy}px) scale(${scaleG})`,transformOrigin:"1000px 640px"}}>
        {/* incoming workflow line from Workflow Studio */}
        <svg width={W} height={H} style={{position:"absolute",inset:0}}>
          <path d={`M-20 540 L${HX-120} ${HY-60}`} stroke={C.p500} strokeWidth={6} strokeLinecap="round" fill="none" strokeDasharray={1} pathLength={1} strokeDashoffset={1-eoExpo(prog(t,48.6,49.5))} opacity={1-prog(t,50,51)}/>
          {tiles.map((tl,k)=>{
            const p=eoExpo(prog(t,tl.t+.25,tl.t+.8));
            const col = tl.k==="ch"?C.p400:tl.k==="sy"?C.blue:C.pink;
            const sx = tl.k==="ch"?tl.x+95:tl.k==="sy"?tl.x-95:tl.x;
            const sy = tl.k==="dt"?tl.y-43:tl.y;
            const ex = tl.k==="ch"?HX-115:tl.k==="sy"?HX+115:HX;
            const ey = tl.k==="dt"?HY+115:HY;
            const mx=(sx+ex)/2;
            const d = tl.k==="dt"?`M${sx} ${sy} C${sx} ${sy-90} ${ex} ${ey+90} ${ex} ${ey}`:`M${sx} ${sy} C${mx} ${sy} ${mx} ${ey} ${ex} ${ey}`;
            return <path key={k} d={d} fill="none" stroke={col} strokeWidth={3.5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-p} opacity={.75}/>;
          })}
        </svg>
        {/* tiles */}
        {tiles.map((tl,k)=>(
          <div key={k} style={{position:"absolute",left:tl.x-100,top:tl.y-43,transform:`scale(${pop(t,tl.t,.45)})`,opacity:Math.min(1,pop(t,tl.t,.45)*1.5)}}>
            <Tile icon={tl.i} label={tl.l} color={tl.c} w={200} h={86} glow={t>tl.t+.2&&t<tl.t+.9?1:0}/>
          </div>))}
        {/* group labels */}
        {[{x:360,y:318,l:"CHANNELS",t:51.4},{x:1640,y:340,l:"SYSTEMS",t:51.95},{x:1000,y:868,l:"DATA",t:52.55}].map((g,i)=>(
          <div key={i} style={{position:"absolute",left:g.x,top:g.y,transform:"translateX(-50%)",fontWeight:900,fontSize:16,letterSpacing:2.2,color:C.p500,opacity:fade(t,g.t,.3)}}>{g.l}</div>))}
        {/* hub node */}
        <div style={{position:"absolute",left:HX-115,top:HY-115,width:230,height:230,borderRadius:60,background:`linear-gradient(150deg,${C.p500},${C.p700})`,boxShadow:`0 0 ${40+50*hubGlow}px rgba(129,56,224,${.35+.35*hubGlow}), ${shadow}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,color:"#fff",transform:`scale(${pop(t,50.3,.6)})`}}>
          <Ico n="process" size={62} color="#fff" sw={1.7}/>
          <div style={{fontWeight:900,fontSize:26}}>Workflow</div>
          <div style={{width:150,height:8,borderRadius:4,background:"rgba(255,255,255,.28)",overflow:"hidden"}}><div style={{width:`${progress*100}%`,height:"100%",background:"#fff"}}/></div>
          <div style={{fontWeight:700,fontSize:14,opacity:.9}}>{progress<1?"Enriching case…":"Case ready ✓"}</div>
        </div>
        {/* info chips travelling */}
        {chips.map((c,i)=>{
          const T0=c.t, p=eio(prog(t,T0,T0+.9)); if(t<T0||t>T0+.95) return null;
          const s=tilePos(c.from);
          const x=lerp(s.x,HX,p), y=lerp(s.y,HY,p);
          return <div key={i} style={{position:"absolute",left:x,top:y,transform:`translate(-50%,-50%) scale(${1-p*.25})`,opacity:1-prog(p,.8,1),padding:"7px 14px",borderRadius:20,background:"#fff",border:`2px solid ${c.c}`,color:c.c,fontWeight:800,fontSize:16,whiteSpace:"nowrap",boxShadow:shadow}}>{c.l}</div>;
        })}
        {/* ih2: workflow studio card + governance + resilience */}
        {t>59.0 && (
          <>
            <svg width={W} height={H} style={{position:"absolute",inset:0}}>
              <path d={`M${HX-115} ${HY-30} C ${HX-300} ${HY-30} ${HX-300} 205 560 205`} fill="none" stroke={C.p500} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-link} style={{transform:"scale(1)"}}/>
            </svg>
            <div style={{position:"absolute",left:310,top:130,width:260,height:150,borderRadius:26,background:"#fff",border:`3px solid ${C.p500}`,boxShadow:shadow,transform:`scale(${wfCard})`,opacity:Math.min(1,wfCard*1.5),display:"flex",alignItems:"center",gap:18,padding:"0 24px"}}>
              <div style={{width:70,height:70,borderRadius:20,background:C.p50,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n="rocket" size={40}/></div>
              <div><div style={{fontWeight:900,fontSize:25,color:UIP,lineHeight:"28px"}}>Workflow Studio</div><div style={{fontWeight:700,fontSize:16,color:C.n500}}>Design & run</div></div>
            </div>
          </>)}
      </div>

      {/* ih2 overlays in screen space */}
      {t>60.2 && t<62.9 && (
        <div style={{position:"absolute",left:960,top:250,transform:`translateX(-50%) scale(${pop(t,60.4,.45)})`,opacity:1-prog(t,62.4,62.9),display:"flex",gap:18}}>
          {[{i:"rocket",l:"Faster to go live",c:C.p500},{i:"clock",l:"Up & running in days",c:C.blue}].map((c,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 26px",borderRadius:40,background:"#fff",border:`2px solid ${c.c}`,fontWeight:900,fontSize:28,color:c.c,boxShadow:shadow,whiteSpace:"nowrap"}}><Ico n={c.i} size={32} color={c.c} sw={2}/>{c.l}</div>))}
        </div>)}
      {t>62.7 && t<67.8 && (
        <div style={{position:"absolute",left:960,top:250,transform:`translateX(-50%) scale(${pop(t,62.9,.45)})`,opacity:1-prog(t,67.3,67.8),display:"flex",gap:18}}>
          {[{i:"check",l:"Consistent",c:C.green,k:63.2},{i:"shield",l:"Governance",c:C.p700,k:65.3},{i:"pulse",l:"Resilience",c:C.p500,k:66.0},{i:"systems",l:"At scale",c:C.blue,k:66.8}].map((c,i)=>{
            const s=pop(t,c.k,.4); if(t<c.k-.05) return null;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"14px 24px",borderRadius:40,background:"#fff",border:`2px solid ${c.c}`,fontWeight:900,fontSize:28,color:c.c,boxShadow:shadow,whiteSpace:"nowrap",transform:`scale(${s})`}}>
              {c.i==="check"?<Check size={30} color={c.c}/>:<Ico n={c.i} size={32} color={c.c} sw={2}/>}{c.l}</div>;})}
        </div>)}
      {/* governance shield + lock lock-on to hub */}
      {t>65.2 && t<68.2 && (
        <>
          <div style={{position:"absolute",left:850,top:540,transform:`scale(${pop(t,65.4,.5)*0.62})`,transformOrigin:"center",opacity:1-prog(t,67.7,68.2)}}>
            <div style={{width:160,height:160,borderRadius:50,background:`linear-gradient(150deg,${C.p700},${C.p900})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:shadow}}><Ico n="shield" size={90} color="#fff" sw={1.6}/></div>
          </div>
          <div style={{position:"absolute",left:1110,top:540,transform:`scale(${pop(t,65.9,.5)*0.62})`,transformOrigin:"center",opacity:1-prog(t,67.7,68.2)}}>
            <div style={{width:160,height:160,borderRadius:50,background:`linear-gradient(150deg,${C.p500},${C.p400})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:shadow}}><Ico n="pulse" size={90} color="#fff" sw={1.6}/></div>
          </div>
        </>)}
      {/* case token runs into Single Window */}
      {t>67.3 && t<69.5 && (
        <div style={{position:"absolute",left:kf(t,[[67.3,960],[69.1,160]]),top:kf(t,[[67.3,820],[69.1,259]]),transform:`translate(-50%,-50%) scale(${pop(t,67.3,.35)})`,padding:"10px 20px",borderRadius:28,background:`linear-gradient(90deg,${UIP},${C.p500})`,color:"#fff",fontWeight:900,fontSize:22,boxShadow:`0 0 40px ${C.p500}`,display:"flex",gap:10,alignItems:"center"}}><Spark size={20}/>SIR-MAN-12453</div>)}
      <Cursor t={t} path={cur} clicks={[68.95]}/>
    </Shell>
  );
};
