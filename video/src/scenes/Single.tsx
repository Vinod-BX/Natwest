import React from "react";
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from "remotion";
import {C, FPS, W, H, prog, eo, eio, kf, lerp, pop, fade, shadow, eoExpo} from "../theme";
import {SC} from "../timeline";
import {Cursor, Ico, Spark, Check, UIP, Typewriter, CK} from "../ui";
import {CapIcon} from "../logo";

const S0 = SC.sw[0];
// camera keyframes: [t, scale, cx, cy]
const CAM:[number,number,number,number][] = [
  [69.4,.9,960,540],[70.4,1,960,540],[73.0,1,960,540],[74.4,1.45,1190,440],[79.6,1.45,1190,440],[80.6,1,960,540],
  [82.6,1,960,540],[83.8,1.33,1160,560],[86.6,1.33,1160,560],[87.5,1.3,740,690],[89.3,1.3,740,690],[89.9,1.35,1160,690],
  [91.1,1.35,1160,690],[91.8,1.5,1250,330],[93.0,1.5,1250,330],[94.2,.84,960,540],[101.8,.84,960,540],
];
const cam = (t:number)=>({
  s:kf(t,CAM.map(c=>[c[0],c[1]] as [number,number])),
  cx:kf(t,CAM.map(c=>[c[0],c[2]] as [number,number])),
  cy:kf(t,CAM.map(c=>[c[0],c[3]] as [number,number])),
});
const toScreen=(t:number,x:number,y:number)=>{const c=cam(t);return {x:960+c.s*(x-c.cx),y:540+c.s*(y-c.cy)};};

const Spot:React.FC<{x:number;y:number;w:number;h:number;o:number;r?:number;ring?:string}> = ({x,y,w,h,o,r=18,ring=C.p500}) => (
  <div style={{position:"absolute",left:x,top:y,width:w,height:h,borderRadius:r,boxShadow:`0 0 0 4000px rgba(60,16,83,${.5*o}), 0 0 0 ${o>0?4:0}px ${ring}`,opacity:1,pointerEvents:"none"}}/>
);
const Ring:React.FC<{x:number;y:number;w:number;h:number;t:number;t0:number;color:string;r?:number}> = ({x,y,w,h,t,t0,color,r=16}) => {
  const out=[0,0.45].map((d,i)=>{const p=prog(t,t0+d,t0+d+1.1);return p>0&&p<1?<div key={i} style={{position:"absolute",left:x-p*26,top:y-p*26,width:w+p*52,height:h+p*52,borderRadius:r+p*20,border:`4px solid ${color}`,opacity:1-p}}/>:null;});
  return <>{out}</>;
};
const Tag:React.FC<{x:number;y:number;t:number;t0:number;label:string;color:string;ico?:string;t1?:number}> = ({x,y,t,t0,label,color,ico,t1=999}) => {
  const s=pop(t,t0,.4)*(1-prog(t,t1,t1+.3)); if(t<t0) return null;
  return <div style={{position:"absolute",left:x,top:y,transform:`translate(-50%,-100%) scale(${s})`,transformOrigin:"bottom center",display:"flex",alignItems:"center",gap:8,padding:"8px 16px",borderRadius:24,background:color,color:"#fff",fontWeight:900,fontSize:18,whiteSpace:"nowrap",boxShadow:"0 10px 26px rgba(0,0,0,.25)"}}>{ico&&<Ico n={ico} size={20} color="#fff" sw={2.2}/>}{label}</div>;
};

export const Single:React.FC = () => {
  const f = useCurrentFrame(); const t = S0 + f/FPS;
  const c = cam(t);
  const intro = eio(prog(t,69.4,70.4));
  const tilt = (1-intro);
  const caseO = eo(prog(t,80.95,81.5));
  const sceneO = eo(prog(t,69.4,70.05));
  // stage transform
  const tx = 960 - c.s*c.cx, ty = 540 - c.s*c.cy;
  // ---- spotlight windows (stage coords)
  const kpiSpot = kf(t,[[74.3,0],[74.9,1],[76.6,1],[77.0,0]]);
  const errSpot = kf(t,[[77.0,0],[77.4,1],[78.5,1],[78.8,0]]);
  const slaSpot = kf(t,[[78.8,0],[79.1,1],[80.2,1],[80.6,0]]);
  const excSpot = kf(t,[[83.9,0],[84.4,1],[86.4,1],[86.8,0]]);
  const navSpot = kf(t,[[87.4,0],[87.8,1],[89.4,1],[89.8,0]]);
  const reqSpot = kf(t,[[89.9,0],[90.3,1],[90.9,0]]);
  const verSpot = kf(t,[[90.3,0],[90.6,1],[91.3,1],[91.6,0]]);
  const apprSpot = kf(t,[[91.9,0],[92.3,1],[93.3,1],[93.6,0]]);
  const resolved = t>=86.0;
  // AI panel
  const panelO = (kf(t,[[82.2,0],[82.55,1],[86.7,1],[87.1,0]]));
  const panelS = pop(t,82.2,.5);
  const approved = t>=100.55;
  const cur:CK[] = [
    [70.4,1500,300],[73.5,760,430],[77.3,680,440],[78.8,1520,440],[80.3,640,640],[80.95,268,684],
    [81.6,1380,250],[82.2,1423,258],[83.0,1500,420],[85.2,1580,640],[86.0,1590,642],[86.9,330,830],[88.2,290,880],[89.9,320,940],
    [91.3,1620,330],[92.3,1708,262],[93.7,1708,262],[96.5,1500,420],[100.2,1708,262],[100.6,1708,262],[101.7,83,321],[102.1,83,321],
  ];
  const clicks=[80.95,82.2,86.0,100.55,102.0];
  const sx0 = kf(t,cur.map(p=>[p[0],p[1]] as [number,number])), sy0 = kf(t,cur.map(p=>[p[0],p[2]] as [number,number]));
  const sp = toScreen(t,sx0,sy0);
  const cs:CK[] = [[70.2,sp.x,sp.y]];
  // callouts (screen-space) for the unified-view beat
  const callouts = [
    {t:94.3,x:150,y:330,l:"Work",i:"process",c:C.p500},
    {t:94.8,x:1770,y:420,l:"Context",i:"doc",c:C.blue},
    {t:95.25,x:230,y:880,l:"History",i:"clock",c:C.p700},
    {t:95.65,x:1700,y:880,l:"Insights",i:"pulse",c:C.pink},
  ];
  const unified = pop(t,96.0,.5);
  const hist = [
    {t:"12:05",l:"Request ingested",ok:true,k:87.7},{t:"12:06",l:"Identity verified",ok:true,k:88.0},
    {t:"12:07",l:"Validation: account not in scope",ok:false,k:88.3},{t:"12:08",l:"AI summary generated",ok:true,k:88.6},{t:"12:41",l:"Routed to analyst",ok:true,k:88.9},
  ];
  return (
    <AbsoluteFill style={{background:"#F2EAF9",opacity:sceneO}}>
      <AbsoluteFill style={{transform:`perspective(2600px) rotateY(${-9*tilt}deg) rotateX(${5*tilt}deg)`,transformOrigin:"center"}}>
      <div style={{position:"absolute",left:0,top:0,width:W,height:H,transform:`translate(${tx}px,${ty}px) scale(${c.s})`,transformOrigin:"0 0"}}>
        {/* shadow card for zoom-out */}
        <div style={{position:"absolute",left:0,top:0,width:W,height:H,boxShadow:"0 40px 120px rgba(90,40,125,.35)",borderRadius:0}}/>
        <Img src={staticFile("ui/list.jpg")} style={{position:"absolute",left:0,top:0,width:W,height:H}}/>
        {/* cover the open Mandates dropdown with the closed state from the zoomed capture */}
        <div style={{position:"absolute",left:158,top:348,width:414,height:212,backgroundImage:`url(${staticFile("ui/list_zoom.jpg")})`,backgroundSize:`${1920/1.41}px ${1080/1.41}px`,backgroundPosition:`-${158-39}px -${348-39.7}px`,backgroundRepeat:"no-repeat"}}/>
        <Img src={staticFile("ui/case.jpg")} style={{position:"absolute",left:0,top:0,width:W,height:H,opacity:caseO}}/>
        {/* email swap on case view */}
        <div style={{position:"absolute",left:1170,top:1021,width:170,height:28,background:"#fff",opacity:caseO,fontFamily:"inherit",fontSize:17,fontWeight:500,color:C.n900,display:"flex",alignItems:"center",paddingLeft:3}}>john@gmail.com</div>

        {/* ---------- list-view overlays ---------- */}
        {t>=73.3&&t<80.7 && <>
          <Spot x={575} y={385} w={1262} h={106} o={kpiSpot} r={18}/>
          <Spot x={577} y={388} w={204} h={100} o={errSpot} ring={C.pink}/>
          <Spot x={1421} y={388} w={204} h={100} o={slaSpot} ring={C.red}/>
          <Ring x={577} y={388} w={204} h={100} t={t} t0={77.4} color={C.pink}/>
          <Ring x={1421} y={388} w={204} h={100} t={t} t0={79.1} color={C.red}/>
          <Tag x={680} y={372} t={t} t0={77.6} t1={78.8} label="12 in error" color={C.pink} ico="warn"/>
          <Tag x={1523} y={372} t={t} t0={79.3} t1={80.5} label="3 SLA breached · needs attention" color={C.red} ico="flag"/>
        </>}

        {/* ---------- case-view overlays ---------- */}
        {t>=82.0 && (
          <div style={{position:"absolute",left:1005,top:290,width:830,height:410,borderRadius:26,background:"#fff",border:`3px solid ${C.p500}`,boxShadow:`0 30px 80px rgba(60,16,83,.35), 0 0 0 6px rgba(129,56,224,.12)`,transform:`scale(${panelS})`,transformOrigin:"top right",opacity:panelO,padding:"26px 32px",zIndex:5}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:44,height:44,borderRadius:14,background:`linear-gradient(135deg,${UIP},${C.p500})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Spark size={26}/></div>
              <div style={{fontWeight:900,fontSize:26,color:UIP}}>AI case summary</div>
              <div style={{marginLeft:"auto",padding:"6px 14px",borderRadius:20,background:"#EAF2FF",color:C.blue,fontWeight:800,fontSize:15}}>Explainable</div>
            </div>
            <div style={{marginTop:18,fontSize:24,fontWeight:600,color:C.n900,lineHeight:"34px",minHeight:100}}>
              <Typewriter t={t} start={82.7} cps={44} text="Account 52662346 was flagged out of scope for automated batch mandate processing. 2 blocking errors at Business Validation; 4 items need review."/>
            </div>
            <div style={{display:"flex",gap:10,marginTop:10,opacity:fade(t,84.3,.3)}}>
              {["Account not in scope","Partnership mandate","Batch processing"].map((l,i)=><div key={i} style={{padding:"7px 14px",borderRadius:18,background:C.p50,color:UIP,fontWeight:800,fontSize:15}}>{l}</div>)}
            </div>
            <div style={{position:"absolute",left:32,right:32,bottom:26,height:72,borderRadius:20,background:resolved?"#E7F9EB":C.p50,border:`2px solid ${resolved?C.green:C.p200}`,display:"flex",alignItems:"center",gap:14,padding:"0 22px",opacity:fade(t,85.0,.3)}}>
              <Ico n="bulb" size={30} color={resolved?C.green:C.p500} sw={2}/>
              <div style={{fontWeight:800,fontSize:20,color:C.n900}}>{resolved?"Routed to mandate analyst · exceptions resolved":"Recommended: route to mandate analyst"}</div>
              <div style={{marginLeft:"auto",height:44,padding:"0 22px",borderRadius:22,background:resolved?C.green:`linear-gradient(90deg,${UIP},${C.p500})`,color:"#fff",fontWeight:900,fontSize:16,display:"flex",alignItems:"center",gap:8,boxShadow:resolved?"none":"0 0 20px rgba(129,56,224,.5)"}}>{resolved?<><Check size={22} color="#fff"/>DONE</>:"ROUTE"}</div>
            </div>
          </div>)}
        {t>=86.0 && t<93.7 && <>
          <div style={{position:"absolute",left:512,top:461,width:424,height:115,borderRadius:14,background:"rgba(58,211,86,.2)",border:`3px solid ${C.green}`,opacity:fade(t,86.0,.3)}}/>
          <div style={{position:"absolute",left:952,top:461,width:424,height:115,borderRadius:14,background:"rgba(58,211,86,.2)",border:`3px solid ${C.green}`,opacity:fade(t,86.15,.3)}}/>
          <div style={{position:"absolute",left:845,top:473,width:84,height:28,borderRadius:6,background:C.green,color:"#fff",fontWeight:900,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",opacity:fade(t,86.1,.2)}}>RESOLVED</div>
          <div style={{position:"absolute",left:1285,top:473,width:84,height:28,borderRadius:6,background:C.green,color:"#fff",fontWeight:900,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",opacity:fade(t,86.25,.2)}}>RESOLVED</div>
        </>}
        {t>=84 && t<86.9 && <Spot x={495} y={398} w={1337} h={322} o={excSpot*0.6} r={20}/>}
        {t>=87.3 && t<89.9 && <>
          <Spot x={135} y={445} w={336} h={470} o={navSpot} r={0}/>
          <div style={{position:"absolute",left:500,top:430,width:470,height:380,borderRadius:24,background:"#fff",border:`2px solid ${C.p200}`,boxShadow:"0 30px 70px rgba(60,16,83,.35)",padding:"22px 28px",transform:`scale(${pop(t,87.6,.4)})`,transformOrigin:"left center",opacity:1-prog(t,89.5,89.9),zIndex:5}}>
            <div style={{display:"flex",alignItems:"center",gap:10,fontWeight:900,fontSize:22,color:UIP,marginBottom:12}}><Ico n="clock" size={26} color={C.p500} sw={2}/>Case history</div>
            {hist.map((h,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:14,height:54,opacity:fade(t,h.k,.25),transform:`translateX(${(1-eo(prog(t,h.k,h.k+.3)))*30}px)`}}>
                <div style={{width:14,height:14,borderRadius:7,background:h.ok?C.green:C.red,boxShadow:`0 0 0 5px ${h.ok?"rgba(58,211,86,.2)":"rgba(219,55,0,.2)"}`}}/>
                <div style={{fontWeight:700,fontSize:15,color:C.n500,width:48}}>{h.t}</div>
                <div style={{fontWeight:800,fontSize:18,color:C.n900}}>{h.l}</div>
              </div>))}
          </div>
          <Tag x={420} y={780} t={t} t0={88.8} t1={89.8} label="3 files · 2 messages · 12 logs" color={C.blue} ico="doc"/>
        </>}
        {t>=89.8 && t<91.7 && <>
          <Spot x={495} y={848} w={1337} h={212} o={reqSpot} r={20}/>
          <Spot x={135} y={915} w={336} h={60} o={verSpot} r={0}/>
          <Tag x={330} y={900} t={t} t0={90.4} t1={91.5} label="Mandate Service v2.1 · Live" color={C.green} ico="pulse"/>
          <Tag x={1160} y={845} t={t} t0={90.0} t1={91.0} label="Supporting context" color={UIP} ico="doc"/>
        </>}
        {t>=91.8 && t<93.8 && <>
          <Spot x={1640} y={236} w={140} h={46} o={apprSpot} r={24}/>
          <Ring x={1643} y={238} w={136} h={42} t={t} t0={92.3} color={C.p500} r={22}/>
          <Tag x={1710} y={222} t={t} t0={92.2} t1={93.5} label="Confident decision" color={C.p700} ico="controls"/>
        </>}
        {/* approve */}
        {approved && <>
          <div style={{position:"absolute",left:484,top:239,width:146,height:40,borderRadius:8,background:"#E7F9EB",border:`2px solid ${C.green}`,color:"#1E9A39",fontWeight:900,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transform:`scale(${pop(t,100.55,.4)})`}}><span style={{width:10,height:10,borderRadius:5,background:C.green}}/>APPROVED</div>
          <Ring x={1643} y={238} w={136} h={42} t={t} t0={100.55} color={C.green} r={22}/>
        </>}
      </div>
      </AbsoluteFill>

      {/* lower-third */}
      {t>71.0 && t<73.2 && (
        <div style={{position:"absolute",left:150,bottom:70,display:"flex",alignItems:"center",gap:20,padding:"14px 34px 14px 16px",borderRadius:30,background:"rgba(255,255,255,.96)",boxShadow:shadow,transform:`translateY(${(1-eo(prog(t,71.0,71.5)))*60}px) scale(${.95+.05*eo(prog(t,71.0,71.5))})`,opacity:fade(t,71.0,.3)*(1-prog(t,72.8,73.2))}}>
          <CapIcon i={0} size={92}/>
          <div><div style={{fontWeight:900,fontSize:42,color:UIP,letterSpacing:-.8,lineHeight:"44px"}}>Single Window</div><div style={{fontWeight:700,fontSize:22,color:C.n500}}>Work in action, in one view</div></div>
        </div>)}

      {/* unified view callouts */}
      {t>=94.2 && t<101.8 && callouts.map((k,i)=>(
        <div key={i} style={{position:"absolute",left:k.x,top:k.y,transform:`translate(-50%,-50%) scale(${pop(t,k.t,.45)})`,opacity:Math.min(1,pop(t,k.t,.45)*1.5)*(1-prog(t,100.3,100.8)),display:"flex",alignItems:"center",gap:12,padding:"14px 26px 14px 16px",borderRadius:40,background:"#fff",border:`3px solid ${k.c}`,boxShadow:shadow,zIndex:8}}>
          <div style={{width:46,height:46,borderRadius:23,background:k.c,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n={k.i} size={26} color="#fff" sw={2.1}/></div>
          <div style={{fontWeight:900,fontSize:30,color:k.c}}>{k.l}</div>
        </div>))}
      {t>=96.0 && t<100.8 && (
        <div style={{position:"absolute",left:960,top:90,transform:`translateX(-50%) scale(${unified})`,opacity:Math.min(1,unified*1.5)*(1-prog(t,100.3,100.8)),padding:"16px 40px",borderRadius:44,background:`linear-gradient(90deg,${UIP},${C.p500})`,color:"#fff",fontWeight:900,fontSize:40,letterSpacing:-.5,boxShadow:shadow,display:"flex",gap:14,alignItems:"center",whiteSpace:"nowrap"}}><Spark size={34}/>One unified view</div>)}
      {t>=96.9 && t<100.8 && (
        <div style={{position:"absolute",left:960,top:985,transform:"translateX(-50%)",display:"flex",gap:16,opacity:1-prog(t,100.3,100.8)}}>
          {[{l:"Coordinate",i:"users",k:97.3,c:C.p500},{l:"Reduce delays",i:"clock",k:98.8,c:C.blue},{l:"Outcomes on track",i:"target",k:100.1,c:C.green}].map((p,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 24px",borderRadius:34,background:"#fff",border:`2px solid ${p.c}`,color:p.c,fontWeight:900,fontSize:26,boxShadow:shadow,transform:`scale(${pop(t,p.k,.4)})`,opacity:t>=p.k?1:0}}><Ico n={p.i} size={28} color={p.c} sw={2.1}/>{p.l}</div>))}
        </div>)}
      {t>=100.55 && t<101.9 && (
        <div style={{position:"absolute",left:960,top:540,transform:`translate(-50%,-50%) scale(${pop(t,100.6,.5)})`,opacity:1-prog(t,101.4,101.9)}}><Check size={190} color={C.green}/></div>)}
      <Cursor t={t} path={cs} clicks={clicks}/>
    </AbsoluteFill>
  );
};
