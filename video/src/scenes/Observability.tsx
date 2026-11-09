import React from "react";
import {useCurrentFrame} from "remotion";
import {C, FPS, W, H, prog, eo, eio, kf, lerp, pop, fade, shadow, eoExpo} from "../theme";
import {SC} from "../timeline";
import {Shell, Ico, Spark, Check, UIP, Card} from "../ui";

const S0 = SC.obs[0];
const STAGES = [{l:"Ingest",v:"1,284"},{l:"Identity",v:"1,251"},{l:"Validation",v:"1,102"},{l:"Decision",v:"1,019"},{l:"Fulfil",v:"964"}];
const KPIS = [
  {l:"Cases in flight",v:1284,fmt:(n:number)=>Math.round(n).toLocaleString("en-GB"),d:"+6 today",c:C.p500,i:"data"},
  {l:"Avg. handling time",v:5,fmt:(n:number)=>`${Math.round(n)} min`,d:"▼ improving",c:C.green,i:"clock"},
  {l:"SLA at risk",v:3,fmt:(n:number)=>`${Math.round(n)}`,d:"+1 today",c:C.red,i:"warn"},
  {l:"Straight-through",v:82,fmt:(n:number)=>`${Math.round(n)}%`,d:"▲ 4 pts",c:C.blue,i:"pulse"},
];
const series = (x:number)=>0.5+0.22*Math.sin(x*6.2)+0.12*Math.sin(x*15+1)+0.2*x;

export const Observability:React.FC = () => {
  const f = useCurrentFrame(); const t = S0 + f/FPS;
  const enter = prog(t,102.2,102.9);
  const live = t>=113.2;
  const lineP = eo(prog(t,113.3,117.2));
  const ring = eo(prog(t,114.8,116.4));
  const barsP = eoExpo(prog(t,117.8,118.9));
  const improved = eo(prog(t,122.5,123.7));
  const bnPulse = t>118.4 && t<122.5 ? .5+.5*Math.sin((t-118.4)*7) : 0;
  const barVals = [{l:"Ingest",v:.18},{l:"Identity",v:.3},{l:"Business validation",v:lerp(.92,.34,improved),bn:true},{l:"Decision",v:.38},{l:"Fulfilment",v:.26}];
  const sig = [
    {s:"Processes",c:C.p500,t:110.9,l:"Stage time up in Validation"},
    {s:"Systems",c:C.blue,t:111.6,l:"CRM latency normal"},
    {s:"Data",c:C.pink,t:112.3,l:"3 records missing fields"},
    {s:"Processes",c:C.p500,t:113.2,l:"Throughput +6% vs. avg."},
    {s:"Systems",c:C.blue,t:114.4,l:"Payments queue steady"},
  ];
  const toast = pop(t,120.0,.5)*(1-prog(t,122.2,122.7));
  const improvedToast = pop(t,122.5,.5);
  const pts = Array.from({length:60}).map((_,i)=>{const x=i/59;return [x, series(x)] as [number,number];});
  const lx=190, ly=800, lw=790, lh=220;
  const path = pts.map((p,i)=>`${i?"L":"M"}${lx+p[0]*lw} ${ly+lh-(p[1]*lh*.95)}`).join(" ");
  const tipI = Math.min(59,Math.floor(lineP*59)); const tip = pts[tipI];
  return (
    <Shell active={1} title="Observability" t={t} enter={enter} right={
      <div style={{height:40,padding:"0 18px",borderRadius:20,display:"flex",alignItems:"center",gap:8,fontWeight:900,fontSize:14,letterSpacing:.8,background:live?"#E4F9E8":C.p50,color:live?"#1E9A39":C.n500,border:`2px solid ${live?C.green:C.p200}`}}>
        <span style={{width:10,height:10,borderRadius:5,background:live?C.green:C.p200,boxShadow:live?`0 0 ${8+8*Math.sin(t*8)}px ${C.green}`:"none"}}/>{live?"LIVE":"SIGNALS"}</div>}>
      {/* KPIs */}
      {KPIS.map((k,i)=>{
        const T0=103.0+i*.28; const s=pop(t,T0,.45); const n=eo(prog(t,T0+.2,T0+1.4));
        return (
        <Card key={i} style={{position:"absolute",left:160+i*424,top:300,width:398,height:130,transform:`scale(${s})`,opacity:Math.min(1,s*1.5),padding:"20px 26px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,fontWeight:800,fontSize:15,letterSpacing:1,color:C.n500}}><Ico n={k.i} size={20} color={k.c} sw={2}/>{k.l.toUpperCase()}</div>
          <div style={{display:"flex",alignItems:"baseline",gap:14,marginTop:10}}>
            <div style={{fontSize:54,fontWeight:900,color:k.i==="warn"&&improved>0?lerp(0,0,0)||C.red:C.n900,letterSpacing:-1.5}}>{k.fmt(k.i==="warn"&&t>123?lerp(3,1,improved):k.v*n)}</div>
            <div style={{fontWeight:800,fontSize:16,padding:"4px 12px",borderRadius:14,background:`${k.c}1f`,color:k.c}}>{k.d}</div>
          </div>
        </Card>);
      })}
      {/* process flow + chart */}
      <Card style={{position:"absolute",left:160,top:460,width:850,height:590,overflow:"hidden",opacity:fade(t,104.6,.4)}}>
        <div style={{padding:"20px 28px",fontWeight:800,fontSize:15,letterSpacing:1.2,color:C.n500}}>PROCESS FLOW · ALL MANDATES</div>
      </Card>
      {STAGES.map((s,i)=>{
        const T0=105.2+i*.28; const x=270+i*170, y=560; const p=pop(t,T0,.4);
        return <React.Fragment key={i}>
          {i>0 && <div style={{position:"absolute",left:270+(i-1)*170+46,top:y+3,width:78*eoExpo(prog(t,T0,T0+.4)),height:6,borderRadius:3,background:`linear-gradient(90deg,${C.p400},${C.p500})`}}/>}
          <div style={{position:"absolute",left:x-46,top:y-46,width:92,height:92,borderRadius:28,background:i===2&&t>118.4&&improved<1?"#FDE9E2":"#fff",border:`3px solid ${i===2&&t>118.4&&improved<.5?C.red:C.p400}`,display:"flex",alignItems:"center",justifyContent:"center",transform:`scale(${p})`,boxShadow:i===2&&bnPulse>0?`0 0 ${30*bnPulse}px ${C.red}`:shadow,fontWeight:900,fontSize:22,color:C.p700}}>{s.v}</div>
          <div style={{position:"absolute",left:x-70,top:y+58,width:140,textAlign:"center",fontWeight:800,fontSize:17,color:C.n900,opacity:fade(t,T0+.2,.3)}}>{s.l}</div>
        </React.Fragment>;
      })}
      {/* travelling dots */}
      {t>106.0 && [0,1,2,3,4,5].map(i=>{const k=((t*0.55+i*.17)%1);return <div key={i} style={{position:"absolute",left:270+k*680-6,top:560-6,width:12,height:12,borderRadius:6,background:i%4===3?C.pink:C.p500,boxShadow:`0 0 14px ${i%4===3?C.pink:C.p500}`,opacity:.9}}/>;})}
      {/* line chart */}
      <div style={{position:"absolute",left:190,top:735,fontWeight:900,fontSize:19,color:C.n900,opacity:fade(t,112.9,.3)}}>Throughput <span style={{color:C.n500,fontWeight:700,fontSize:15}}>· real time</span></div>
      <svg width={W} height={H} style={{position:"absolute",inset:0}}>
        {t>112.8 && <>
          {[0,1,2,3].map(i=><line key={i} x1={lx} x2={lx+lw} y1={ly+i*(lh/3)} y2={ly+i*(lh/3)} stroke="#EEE7F8" strokeWidth={2}/>)}
          <defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.p500} stopOpacity=".25"/><stop offset="1" stopColor={C.p500} stopOpacity="0"/></linearGradient><clipPath id="lc"><rect x={lx-4} y={ly-20} width={lw*lineP+4} height={lh+40}/></clipPath></defs>
          <g clipPath="url(#lc)"><path d={`${path} L${lx+lw} ${ly+lh} L${lx} ${ly+lh} Z`} fill="url(#ar)"/><path d={path} fill="none" stroke={C.p500} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"/></g>
          <circle cx={lx+tip[0]*lw} cy={ly+lh-tip[1]*lh*.95} r={9+3*Math.sin(t*8)} fill="#fff" stroke={C.p500} strokeWidth={5}/>
        </>}
      </svg>
      {/* health ring */}
      {t>114.6 && (
        <div style={{position:"absolute",left:840,top:710,width:150,height:150,transform:`scale(${pop(t,114.7,.5)})`}}>
          <svg width="150" height="150" viewBox="0 0 150 150"><circle cx="75" cy="75" r="60" stroke={C.p100} strokeWidth="14" fill="none"/><circle cx="75" cy="75" r="60" stroke={C.green} strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray={377} strokeDashoffset={377*(1-.94*ring)} transform="rotate(-90 75 75)"/></svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontWeight:900,fontSize:34,color:C.n900}}>{Math.round(94*ring)}%</div><div style={{fontWeight:800,fontSize:12,letterSpacing:1,color:C.n500}}>HEALTH</div></div>
        </div>)}

      {/* bottleneck bars */}
      <Card style={{position:"absolute",left:1034,top:460,width:430,height:590,opacity:fade(t,117.0,.4)}}>
        <div style={{padding:"20px 26px",fontWeight:800,fontSize:15,letterSpacing:1.2,color:C.n500}}>WAIT TIME BY STAGE</div>
      </Card>
      {t>117.5 && barVals.map((b,i)=>{
        const y=560+i*86; const w=300*b.v*barsP; const col=b.bn? (improved>.5?C.green:C.red):C.p400;
        return <React.Fragment key={i}>
          <div style={{position:"absolute",left:1062,top:y-6,fontWeight:800,fontSize:16,color:C.n900}}>{b.l}</div>
          <div style={{position:"absolute",left:1062,top:y+22,width:380,height:22,borderRadius:11,background:C.p50}}/>
          <div style={{position:"absolute",left:1062,top:y+22,width:Math.max(0,w)*1.2,height:22,borderRadius:11,background:col,boxShadow:b.bn&&bnPulse>0?`0 0 ${26*bnPulse}px ${C.red}`:"none"}}/>
        </React.Fragment>;
      })}
      {t>118.3 && t<122.6 && <div style={{position:"absolute",left:610,top:652,transform:`translateX(-50%) scale(${pop(t,118.4,.45)*(1-prog(t,122.0,122.5))})`,padding:"9px 18px",borderRadius:24,background:C.red,color:"#fff",fontWeight:900,fontSize:18,boxShadow:"0 10px 26px rgba(0,0,0,.25)",whiteSpace:"nowrap"}}>⚠ Bottleneck · Business validation</div>}
      {t>122.1 && <div style={{position:"absolute",left:610,top:652,transform:`translateX(-50%) scale(${pop(t,122.5,.45)})`,padding:"9px 18px",borderRadius:24,background:C.green,color:"#fff",fontWeight:900,fontSize:18,boxShadow:"0 10px 26px rgba(0,0,0,.25)",whiteSpace:"nowrap"}}>✓ Improved</div>}
      {t>121.9 && t<124.9 && (
        <div style={{position:"absolute",left:1034+215-60,top:935,transform:`scale(${pop(t,122.0,.5)})`,opacity:1-prog(t,124.2,124.8),display:"flex",alignItems:"center",gap:10,padding:"12px 20px",borderRadius:30,background:`linear-gradient(90deg,${UIP},${C.p500})`,color:"#fff",fontWeight:900,fontSize:19,whiteSpace:"nowrap",marginLeft:-90}}>
          <div style={{transform:`rotate(${(t-122)*220}deg)`,display:"flex"}}><Ico n="loop" size={26} color="#fff" sw={2.2}/></div>Continuously improving</div>)}

      {/* signals */}
      <Card style={{position:"absolute",left:1488,top:460,width:342,height:590,opacity:fade(t,109.0,.4),overflow:"hidden"}}>
        <div style={{padding:"20px 24px",fontWeight:800,fontSize:15,letterSpacing:1.2,color:C.n500,display:"flex",alignItems:"center",gap:8}}><Spark size={14} color={C.p500}/>SIGNALS</div>
      </Card>
      {t>109.9 && ["Processes","Systems","Data"].map((s,i)=>{
        const T0=110.9+i*.7; const col=[C.p500,C.blue,C.pink][i]; const p=eio(prog(t,T0-.5,T0+.1));
        return t>T0-.5 && t<T0+.3 ? <div key={i} style={{position:"absolute",left:lerp(1100+i*160,1650,p),top:lerp(250,520,p),padding:"8px 18px",borderRadius:24,background:col,color:"#fff",fontWeight:900,fontSize:18,opacity:1-prog(p,.85,1),zIndex:6}}>{s}</div>:null;
      })}
      {sig.map((s,i)=>{
        const y=520+i*98; const p=pop(t,s.t+.1,.4); if(t<s.t) return null;
        return <div key={i} style={{position:"absolute",left:1510,top:y,width:298,height:84,borderRadius:16,background:"#FBF9FE",border:"1px solid #EEE7F8",padding:"12px 16px",transform:`translateX(${(1-eo(prog(t,s.t,s.t+.4)))*80}px)`,opacity:Math.min(1,p*1.5)}}>
          <div style={{display:"flex",alignItems:"center",gap:8,fontWeight:900,fontSize:13,letterSpacing:1,color:s.c}}><span style={{width:8,height:8,borderRadius:4,background:s.c}}/>{s.s.toUpperCase()}</div>
          <div style={{marginTop:6,fontWeight:700,fontSize:16,color:C.n900,lineHeight:"20px"}}>{s.l}</div>
        </div>;
      })}
      {/* emerging issue toast */}
      {t>=119.9 && t<122.8 && (
        <div style={{position:"absolute",right:80,top:250,width:560,padding:"18px 24px",borderRadius:22,background:"#fff",border:`3px solid ${C.yellow}`,boxShadow:"0 24px 60px rgba(251,178,0,.35)",display:"flex",gap:16,alignItems:"center",transform:`translateY(${(1-toast)*-60}px) scale(${.9+.1*Math.min(1,toast)})`,opacity:Math.min(1,toast*1.4),zIndex:9}}>
          <div style={{width:54,height:54,borderRadius:16,background:"#FFF3CC",display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n="warn" size={32} color={C.yellow} sw={2.2}/></div>
          <div><div style={{fontWeight:900,fontSize:15,letterSpacing:1,color:"#B77C00"}}>EMERGING ISSUE</div><div style={{fontWeight:800,fontSize:20,color:C.n900,lineHeight:"24px"}}>SLA risk rising in Payments Investigation</div></div>
        </div>)}
      {t>=122.5 && t<124.9 && (
        <div style={{position:"absolute",right:80,top:250,width:560,padding:"18px 24px",borderRadius:22,background:"#fff",border:`3px solid ${C.green}`,boxShadow:"0 24px 60px rgba(58,211,86,.3)",display:"flex",gap:16,alignItems:"center",transform:`scale(${.9+.1*Math.min(1,improvedToast)})`,opacity:Math.min(1,improvedToast*1.4)*(1-prog(t,124.2,124.8)),zIndex:9}}>
          <Check size={54}/><div><div style={{fontWeight:900,fontSize:15,letterSpacing:1,color:"#1E9A39"}}>IMPROVED</div><div style={{fontWeight:800,fontSize:20,color:C.n900,lineHeight:"24px"}}>Workflow tuned · wait time down</div></div>
        </div>)}
    </Shell>
  );
};
