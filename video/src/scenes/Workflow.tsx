import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, FPS, W, H, prog, eo, eio, kf, lerp, pop, fade, shadow, eoExpo} from "../theme";
import {SC} from "../timeline";
import {Shell, Cursor, Ico, Spark, Check, PillBtn, UIP, Card, CK} from "../ui";

const S0 = SC.wf[0];
const NW = 196, NH = 84;
const AX=610, BX=870, CXp=1130, DX=1390, NY=540;
const P = [
  {id:"A",x:AX,y:NY,ico:"play",label:"Request received",sub:"Trigger",drag:[28.55,29.3],pal:395},
  {id:"B",x:BX,y:NY,ico:"controls",label:"Business validation",sub:"Check",drag:[30.0,30.7],pal:471},
  {id:"C",x:CXp,y:NY,ico:"people",label:"Approval",sub:"Decision",drag:[31.2,31.9],pal:547},
  {id:"D",x:DX,y:NY,ico:"rocket",label:"Fulfilment",sub:"Action",drag:[32.3,32.95],pal:623},
];
const PALETTE = [
  {ico:"play",l:"Trigger",y:395},{ico:"controls",l:"Validation",y:471},{ico:"people",l:"Decision",y:547},
  {ico:"rocket",l:"Fulfilment",y:623},{ico:"warn",l:"Exception path",y:699},{ico:"lock",l:"Control",y:775},{ico:"mail",l:"Notify",y:851},
];

const Node:React.FC<{x:number;y:number;s:number;ico:string;label:string;sub:string;state?:"idle"|"ok"|"warn"|"ai";glow?:number;lab?:string}> = ({x,y,s,ico,label,sub,state="idle",glow=0}) => {
  const col = state==="warn"?C.yellow:state==="ai"?C.p500:state==="ok"?C.green:C.p500;
  const bd = state==="warn"?"#F7D58A":state==="ai"?C.p400:state==="ok"?"#9BE6A9":"#E4D5F6";
  return (
    <div style={{position:"absolute",left:x-NW/2,top:y-NH/2,width:NW,height:NH,transform:`scale(${s})`,opacity:Math.min(1,s*1.4),borderRadius:18,background:state==="warn"?"#FFF8E6":"#fff",border:`2px solid ${bd}`,boxShadow:glow>0?`0 0 ${34*glow}px rgba(58,211,86,${.55*glow}), ${shadow}`:shadow,display:"flex",alignItems:"center",gap:12,padding:"0 14px"}}>
      <div style={{width:44,height:44,borderRadius:12,background:state==="warn"?"#FFEFC2":state==="ai"?"#EFE3FF":C.p50,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n={ico} size={26} color={col}/></div>
      <div><div style={{fontWeight:800,fontSize:16.5,color:C.n900,lineHeight:"19px"}}>{label}</div><div style={{fontWeight:600,fontSize:13,color:C.n500}}>{sub}</div></div>
    </div>);
};
const Conn:React.FC<{d:string;p:number;color?:string;dash?:boolean;w?:number}> = ({d,p,color=C.p400,dash,w=3.5}) => (
  <path d={d} pathLength={1} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash?"0.02 0.02":"1"} strokeDashoffset={dash?0:1-p} opacity={dash?(p>0?1:0):1} style={dash?{clipPath:`inset(0 ${(1-p)*100}% 0 0)`}:undefined}/>
);
const Badge:React.FC<{x:number;y:number;s:number;ico:string;label:string;color:string}> = ({x,y,s,ico,label,color}) => (
  <div style={{position:"absolute",left:x,top:y,transform:`translate(-50%,-50%) scale(${s})`,opacity:Math.min(1,s*1.5),display:"flex",alignItems:"center",gap:8,padding:"7px 14px 7px 10px",borderRadius:30,background:color,color:"#fff",fontWeight:800,fontSize:15,boxShadow:"0 8px 22px rgba(0,0,0,.18)"}}><Ico n={ico} size={18} color="#fff" sw={2.2}/>{label}</div>
);

export const Workflow:React.FC = () => {
  const f = useCurrentFrame(); const t = S0 + f/FPS;
  const enter = prog(t,26.85,27.55);
  const live = t>=43.9;
  const pulse = kf(t,[[48.0,0],[48.3,1],[48.8,0]]);
  const pos = (id:string)=>P.find(p=>p.id===id)!;
  const landed = (p:typeof P[0])=>pop(t,p.drag[1],.45);
  const connA = (a:number,b:number,t0:number)=>eoExpo(prog(t,t0,t0+.45));
  // token
  const tokenX = t>=36.0 && t<37.7 ? kf(t,[[36.0,AX],[36.6,BX],[37.1,CXp],[37.7,DX]],x=>x) : (t>=44.1? kf(((t-44.1)%2.4)+44.1,[[44.1,AX],[44.8,BX],[45.5,CXp],[46.4,DX],[46.6,DX]],x=>x):-1);
  const tokenOn = (t>=36.0&&t<37.8) || (t>=44.1&&t<48.6);
  const passed = (x:number)=>t>=44.1 && ((t-44.1)%2.4)>= (x===AX?0.0:x===BX?0.7:x===CXp?1.4:2.1)*0.0 + (x===AX?0.05:x===BX?0.72:x===CXp?1.42:2.1) ;
  const recT = 44.65;
  const rcard = pop(t,recT,.5);
  const rNode = pop(t,46.0,.5);
  const eNode = pop(t,40.85,.5);
  const compIn = pop(t,47.0,.5);
  const outLine = eoExpo(prog(t,47.6,48.6));
  // cursor
  const cur:CK[] = [
    [27.6,420,230],[28.4,300,395],[29.3,AX,NY+10],[29.95,300,471],[30.7,BX,NY+10],[31.1,300,547],[31.9,CXp,NY+10],
    [32.2,300,623],[32.95,DX,NY+10],[33.4,BX,NY+6],[34.4,980,420],[38.6,980,430],[39.2,BX+60,NY-52],[40.5,CXp+60,NY-52],[40.9,CXp+30,NY+70],
    [42.0,1250,420],[43.2,1700,268],[43.9,1700,268],[44.9,1690,700],[45.95,1690,708],[46.8,300,880],[47.6,1300,400],[48.05,83,382],[48.5,83,382],
  ];
  const clicks=[33.4,43.85,45.95,48.25];
  // ghost being dragged
  const ghost = P.map(p=>{
    const [a,b]=p.drag; if(t<a||t>=b) return null;
    const k=eio(prog(t,a,b)); const sx=300, sy=p.pal;
    return <div key={p.id} style={{position:"absolute",left:lerp(sx,p.x,k)-NW/2,top:lerp(sy,p.y,k)-NH/2,width:NW,height:NH,borderRadius:18,background:"#fff",border:`2px dashed ${C.p500}`,boxShadow:shadow,opacity:.92,transform:`scale(${lerp(.75,1,k)}) rotate(${(1-k)*-4}deg)`,display:"flex",alignItems:"center",gap:12,padding:"0 14px",zIndex:20}}>
      <Ico n={p.ico} size={26}/><span style={{fontWeight:800,fontSize:16.5,color:C.n900}}>{p.label}</span></div>;
  });
  return (
    <Shell fadeBg={false} active={3} title="Workflow Studio" t={t} enter={enter} logoOpacity={t>=27.45?1:0} pulse={pulse}
      right={<>
        <div style={{height:40,padding:"0 18px",borderRadius:20,display:"flex",alignItems:"center",gap:8,fontWeight:800,fontSize:14,letterSpacing:.5,background:live?"#E4F9E8":"#FFF4D6",color:live?"#1E9A39":"#B77C00",border:`2px solid ${live?C.green:C.yellow}`}}>
          <span style={{width:9,height:9,borderRadius:5,background:live?C.green:C.yellow}}/>{live?"LIVE":"DRAFT"}</div>
        <PillBtn label="VALIDATE" w={110}/>
        <PillBtn label="PUBLISH" filled w={120} glow={kf(t,[[42.8,0],[43.5,1],[44.0,0]])}/>
      </>}>
      {/* palette */}
      <Card style={{position:"absolute",left:160,top:300,width:250,height:750}}>
        <div style={{padding:"18px 20px",fontWeight:800,fontSize:14,letterSpacing:1.2,color:C.n500}}>COMPONENTS</div>
        {PALETTE.map((it,i)=>(
          <div key={i} style={{position:"absolute",left:16,top:it.y-300-28,width:218,height:56,borderRadius:14,background:C.p50,display:"flex",alignItems:"center",gap:12,padding:"0 14px",fontWeight:700,fontSize:16,color:C.n900,opacity:fade(t,27.4+i*.06,.3),outline:(t>38.6&&t<39.6&&i===1)||(t>39.5&&t<40.4&&i===5)?`3px solid ${C.p500}`:"none"}}>
            <Ico n={it.ico} size={22}/>{it.l}
          </div>))}
        {/* reusable component appears */}
        <div style={{position:"absolute",left:16,top:927-300-28,width:218,height:56,borderRadius:14,background:"#EFE3FF",border:`2px solid ${C.p500}`,display:"flex",alignItems:"center",gap:12,padding:"0 14px",fontWeight:800,fontSize:15.5,color:UIP,transform:`scale(${compIn})`,opacity:Math.min(1,compIn*1.5)}}>
          <Spark size={20} color={C.p500}/>Document check</div>
        {t>46.3 && <div style={{position:"absolute",left:-14,top:-14,width:278,height:778,borderRadius:26,border:`3px solid ${C.p500}`,opacity:.9*kf(t,[[46.3,0],[46.6,1],[48.3,1],[48.7,0]]),boxShadow:`0 0 40px rgba(129,56,224,.4)`}}/>}
      </Card>
      {t>46.4 && <div style={{position:"absolute",left:300,top:268,transform:`translateX(-50%) scale(${pop(t,46.4,.4)})`,opacity:kf(t,[[46.4,0],[46.7,1],[48.3,1],[48.7,0]]),padding:"8px 18px",borderRadius:30,background:C.p700,color:"#fff",fontWeight:800,fontSize:16,boxShadow:shadow,whiteSpace:"nowrap"}}>♻ Reusable components</div>}

      {/* canvas */}
      <Card style={{position:"absolute",left:430,top:300,width:1090,height:750,background:"#FCFAFF",backgroundImage:"radial-gradient(rgba(129,56,224,.18) 1.6px, transparent 2px)",backgroundSize:"28px 28px",overflow:"hidden"}}>
        <div style={{position:"absolute",left:24,top:18,fontWeight:800,fontSize:14,letterSpacing:1.2,color:C.n500}}>MANDATE ONBOARDING · v2</div>
      </Card>
      <svg width={W} height={H} style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <Conn d={`M${AX+NW/2} ${NY} L${BX-NW/2} ${NY}`} p={connA(0,0,29.45)}/>
        <Conn d={`M${BX+NW/2} ${NY} L${CXp-NW/2} ${NY}`} p={connA(0,0,31.0)}/>
        <Conn d={`M${CXp+NW/2} ${NY} L${DX-NW/2} ${NY}`} p={connA(0,0,32.0)}/>
        <Conn d={`M${CXp+30} ${NY+NH/2} C${CXp+40} ${NY+170} ${CXp+110} ${NY+190} ${CXp+130} ${NY+205}`} p={eoExpo(prog(t,40.65,41.35))} color={C.yellow} w={4}/>
        <Conn d={`M${BX} ${NY+NH/2} L${BX} ${NY+205}`} p={eoExpo(prog(t,46.2,46.55))} color={C.p500}/>
        <Conn d={`M${BX+98} ${NY+250} C${BX+170} ${NY+250} ${CXp-70} ${NY+120} ${CXp-60} ${NY+NH/2}`} p={eoExpo(prog(t,46.45,46.9))} color={C.p500}/>
        <Conn d={`M${DX+NW/2} ${NY} L1880 ${NY}`} p={outLine} color={C.p500} w={6}/>
        {outLine>0.9 && <path d={`M1862 ${NY-14} L1884 ${NY} L1862 ${NY+14}`} fill="none" stroke={C.p500} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round"/>}
      </svg>
      {P.map(p=>{
        const s=landed(p);
        const done = t>=44.1 && ((t-44.1)%2.4) > (p.id==="A"?0.1:p.id==="B"?0.75:p.id==="C"?1.45:2.15);
        const lbl = p.id==="C" && t>=34.5 ? "Approval" : p.label;
        return t>=p.drag[1]? <Node key={p.id} x={p.x} y={p.y} s={s} ico={p.ico} label={lbl} sub={p.sub} state={done?"ok":"idle"} glow={done?1:0}/>:null;
      })}
      {t>=46.0 && <Node x={BX} y={NY+250} s={rNode} ico="doc" label="Document check" sub="AI · recommended" state="ai"/>}
      {t>=40.85 && <Node x={CXp+130} y={NY+250} s={eNode} ico="warn" label="Manual review" sub="Exception path" state="warn"/>}
      {ghost}
      {/* badges */}
      <Badge x={BX+70} y={NY-62} s={pop(t,39.2,.4)} ico="controls" label="Validation" color={C.p500}/>
      <Badge x={CXp+66} y={NY-62} s={pop(t,39.75,.4)} ico="lock" label="Control" color={C.p700}/>
      {t>=40.85 && <Badge x={CXp+130} y={NY+185} s={pop(t,41.2,.4)} ico="flag" label="Exception" color={C.red}/>}
      {t>=34.2 && <Badge x={BX} y={NY-62} s={kf(t,[[34.2,0],[34.5,1],[35.2,1],[35.6,0]])*pop(t,34.2,.35)} ico="loop" label="v2 · updated" color={C.blue}/>}
      {/* edit popover (adapt) */}
      {t>33.45 && t<34.5 && (
        <div style={{position:"absolute",left:BX-90,top:NY+54,width:230,padding:10,borderRadius:16,background:"#fff",boxShadow:shadow,border:"1px solid #E8DDF6",transform:`scale(${pop(t,33.5,.3)})`,transformOrigin:"top center",opacity:1-prog(t,34.2,34.5),zIndex:10}}>
          {["Edit step","Reorder","Duplicate"].map((l,i)=><div key={i} style={{padding:"9px 12px",fontWeight:700,fontSize:15,color:i===0?UIP:C.n900,background:i===0?C.p50:"transparent",borderRadius:10}}>{l}</div>)}
        </div>)}
      {/* token */}
      {tokenOn && <div style={{position:"absolute",left:tokenX-14,top:NY-14,width:28,height:28,borderRadius:14,background:"#fff",border:`5px solid ${C.p500}`,boxShadow:`0 0 24px ${C.p500}`,zIndex:12}}/>}
      {/* flow caption */}
      {t>35.5 && t<37.9 && <div style={{position:"absolute",left:880,top:380,transform:`translateX(-50%) scale(${pop(t,35.6,.4)})`,padding:"10px 22px",borderRadius:30,background:C.p700,color:"#fff",fontWeight:800,fontSize:20,opacity:1-prog(t,37.4,37.9)}}>How work flows</div>}

      {/* recommendations panel */}
      <Card style={{position:"absolute",left:1550,top:300,width:280,height:750,overflow:"hidden"}}>
        <div style={{padding:"18px 20px",fontWeight:800,fontSize:14,letterSpacing:1.2,color:C.n500,display:"flex",gap:8,alignItems:"center"}}><Spark size={16} color={C.p500}/>RECOMMENDATIONS</div>
        <div style={{margin:"10px 16px",padding:18,borderRadius:18,background:"linear-gradient(160deg,#F7F0FF,#EFE3FF)",border:`2px solid ${C.p400}`,transform:`translateY(${(1-rcard)*50}px) scale(${.9+.1*Math.min(1,rcard)})`,opacity:Math.min(1,rcard*1.5),boxShadow:`0 0 ${30*kf(t,[[44.7,0],[45.2,1],[46.0,1],[46.5,0]])}px rgba(129,56,224,.45)`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,color:UIP,fontWeight:900,fontSize:15}}><Spark size={18} color={C.p500}/>AI SUGGESTION</div>
          <div style={{marginTop:10,fontWeight:800,fontSize:20,color:C.n900,lineHeight:"24px"}}>Add a document check before approval</div>
          <div style={{marginTop:8,fontWeight:600,fontSize:14,color:C.n500,lineHeight:"19px"}}>Reduces exceptions by 32% in similar mandate flows</div>
          <div style={{marginTop:16}}><div style={{height:42,borderRadius:21,background:t>=45.95?C.green:`linear-gradient(90deg,${UIP},${C.p500})`,color:"#fff",fontWeight:800,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>{t>=45.95?<><Check size={20} color="#fff"/>Added to flow</>:"ADD TO FLOW"}</div></div>
        </div>
      </Card>
      <Cursor t={t} path={cur} clicks={clicks}/>
    </Shell>
  );
};
