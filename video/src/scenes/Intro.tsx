import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, FONT, FPS, W, H, clamp, prog, eo, eio, ei, kf, lerp, pop, fade, shadow, eoBack, eoExpo} from "../theme";
import {SC} from "../timeline";
import {PageBg, Ico, Spark} from "../ui";
import {SiriusMark} from "../logo";

const CX = 960, CY = 575;
const NODES = [
  {k:"people",   label:"People",    t:1.6, a:-90},
  {k:"process",  label:"Processes", t:2.1, a:-18},
  {k:"data",     label:"Data",      t:2.9, a:54},
  {k:"systems",  label:"Systems",   t:3.3, a:126},
  {k:"controls", label:"Controls",  t:4.1, a:198},
];
const RX = 560, RY = 262;
const base = (i:number)=>{const a=NODES[i].a*Math.PI/180;return {x:CX+RX*Math.cos(a), y:CY+RY*Math.sin(a)};};
const LINKS:[number,number][] = [[0,1],[1,2],[2,3],[3,4],[4,0],[0,2],[1,3],[2,4],[3,0],[4,1]];

const Abs:React.FC<{x:number;y:number;s?:number;o?:number;r?:number;children?:React.ReactNode;z?:number}> = ({x,y,s=1,o=1,r=0,children,z}) => (
  <div style={{position:"absolute",left:x,top:y,transform:`translate(-50%,-50%) scale(${s}) rotate(${r}deg)`,opacity:o,zIndex:z}}>{children}</div>
);

const Word:React.FC<{t:number; at:number; children:React.ReactNode; color?:string}> = ({t,at,children,color}) => (
  <span style={{display:"inline-block",opacity:fade(t,at,.18),transform:`translateY(${(1-eo(prog(t,at,at+.35)))*30}px)`,marginRight:"0.28em",color}}>{children}</span>
);

export const Intro:React.FC = () => {
  const f = useCurrentFrame(); const t = f/FPS;
  // ---- node positions through the three beats
  const conv = eio(prog(t,15.95,17.7));            // converge to centre
  const strain = kf(t,[[7.2,0],[9.5,5],[11.3,13],[11.9,0]]);
  const node = (i:number) => {
    const b = base(i);
    const fl = Math.sin(t*1.3+i*1.7)*8, fl2 = Math.cos(t*1.1+i*2.3)*7;
    const jx = Math.sin(t*37+i*5)*strain, jy = Math.cos(t*41+i*3)*strain;
    // drift apart during beat 2, regroup at 12.6
    const drift = kf(t,[[7.2,0],[11.6,1],[12.6,1],[14.2,0]]) ;
    const dx = (b.x-CX)*0.22*drift*(i%2?1:-0.6), dy=(b.y-CY)*0.2*drift;
    const x = lerp(b.x+fl+jx+dx, CX, conv), y = lerp(b.y+fl2+jy+dy, CY, conv);
    return {x,y};
  };
  const pts = NODES.map((_,i)=>node(i));
  // link drawing / breaking
  const linkDraw = (i:number)=>eoExpo(prog(t,4.75+i*0.09,5.55+i*0.09));
  const linkBreak = (i:number)=>eio(prog(t,10.6+i*0.08,11.4+i*0.08));
  const linkRe = (i:number)=>eio(prog(t,13.0+i*0.1,14.4+i*0.1));
  const stressed = t>8.8 && t<11.4;
  const star = pop(t,17.5,0.7);
  const fadeNodes = 1-prog(t,16.8,17.7);
  const nodeScale = lerp(1,0.35,conv);
  const wave = prog(t,17.5,18.9);
  const grow = kf(t,[[17.5,0],[18.2,1],[22.4,1.0],[23.7,2.6]]);
  const bgDots = t*14;
  return (
    <PageBg>
      <AbsoluteFill style={{backgroundImage:`radial-gradient(rgba(129,56,224,.16) 2px, transparent 2.5px)`,backgroundSize:"64px 64px",backgroundPosition:`${bgDots}px ${bgDots*.6}px`,opacity:.55}}/>
      <div style={{position:"absolute",left:CX-700,top:CY-500,width:1400,height:1000,borderRadius:"50%",background:"radial-gradient(closest-side, rgba(129,56,224,.14), rgba(129,56,224,0))",opacity:fade(t,0.2,1)}}/>

      {/* beat 1 headline */}
      {t<5.1 && (
        <div style={{position:"absolute",left:0,top:CY-150+kf(t,[[1.0,0],[1.75,-372]]),width:W,textAlign:"center",fontSize:kf(t,[[1.0,104],[1.75,58]]),fontWeight:900,letterSpacing:-2,color:C.p700,opacity:1-prog(t,4.5,5.0),lineHeight:1.05}}>
          <Word t={t} at={0.02}>Delivering</Word><Word t={t} at={0.5}>outcomes</Word><Word t={t} at={1.0} color={C.p500}>requires…</Word>
        </div>
      )}

      {/* links */}
      <svg width={W} height={H} style={{position:"absolute",inset:0,opacity:fadeNodes}}>
        <defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stopColor={C.p400}/><stop offset="1" stopColor={C.p500}/></linearGradient></defs>
        {LINKS.map(([a,b],i)=>{
          const A=pts[a],B=pts[b]; const d1=linkDraw(i), br=linkBreak(i), re=linkRe(i);
          const reborn = t>13?re:0;
          const vis = t<10.6 ? d1 : (t<13 ? 1-br : reborn);
          if(vis<=0.001) return null;
          const col = stressed ? C.pink : (t>=13?C.p500:"url(#lg)");
          const mx=(A.x+B.x)/2,my=(A.y+B.y)/2;
          const x2=lerp(A.x,B.x,t<10.6||t>=13?vis:1), y2=lerp(A.y,B.y,t<10.6||t>=13?vis:1);
          // break: two halves retract
          if(t>=10.6&&t<13){
            const g=br; const p1x=lerp(A.x,mx,1-g),p1y=lerp(A.y,my,1-g),p2x=lerp(B.x,mx,1-g),p2y=lerp(B.y,my,1-g);
            return <g key={i} stroke={C.pink} strokeWidth={3.5} strokeLinecap="round" strokeDasharray="10 10"><line x1={A.x} y1={A.y} x2={p1x} y2={p1y}/><line x1={B.x} y1={B.y} x2={p2x} y2={p2y}/></g>;
          }
          return <line key={i} x1={A.x} y1={A.y} x2={x2} y2={y2} stroke={col} strokeWidth={i<5?4:2.5} strokeLinecap="round" strokeDasharray={stressed?"10 10":undefined} opacity={i<5?1:.55}/>;
        })}
        {/* travelling sparks (beat 1) */}
        {t>5.0&&t<7.1&&LINKS.slice(0,5).map(([a,b],i)=>{const k=((t*1.1+i*.2)%1);const A=pts[a],B=pts[b];return <circle key={i} cx={lerp(A.x,B.x,k)} cy={lerp(A.y,B.y,k)} r={7} fill="#fff" stroke={C.p500} strokeWidth={3}/>;})}
        {t>13.4&&t<15.9&&LINKS.slice(0,5).map(([a,b],i)=>{const k=((t*.9+i*.2)%1);const A=pts[a],B=pts[b];return <circle key={i} cx={lerp(A.x,B.x,k)} cy={lerp(A.y,B.y,k)} r={7} fill="#fff" stroke={C.p500} strokeWidth={3}/>;})}
      </svg>

      {/* nodes */}
      {NODES.map((n,i)=>{
        const p=pts[i]; const s=pop(t,n.t,0.5)*nodeScale; const o=fadeNodes;
        const warn = stressed?1:0;
        return (
          <Abs key={n.k} x={p.x} y={p.y} s={s} o={o}>
            <div style={{width:196,height:214,borderRadius:38,background:"#fff",boxShadow:warn?`0 0 0 3px ${C.pink}55, ${shadow}`:shadow,border:"1px solid #EADFF7",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
              <div style={{width:92,height:92,borderRadius:28,background:warn?"#FDE7F0":C.p50,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n={n.k} size={54} color={warn?C.pink:C.p500} sw={1.7}/></div>
              <div style={{fontSize:30,fontWeight:800,color:C.p700,letterSpacing:-.3}}>{n.label}</div>
            </div>
          </Abs>);
      })}

      {/* centre hub (outcomes) */}
      {t>=5.4 && t<16.5 && (
        <Abs x={CX} y={CY} s={pop(t,5.5,.6)*(1-prog(t,15.95,17.2))} o={1}>
          <div style={{width:210,height:210,borderRadius:105,background:`radial-gradient(circle at 35% 30%, ${C.p400}, ${C.p500} 55%, ${C.p700})`,boxShadow:`0 0 ${60+20*Math.sin(t*4)}px rgba(129,56,224,.5)`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",color:"#fff"}}>
            <Spark size={44}/><div style={{fontWeight:900,fontSize:30,marginTop:6,letterSpacing:-.3}}>Outcomes</div>
          </div>
        </Abs>)}

      {/* bottom caption beat 1 */}
      {t>4.6 && t<7.0 && (
        <div style={{position:"absolute",left:0,top:955,width:W,textAlign:"center",fontSize:60,fontWeight:900,color:C.p700,letterSpacing:-1,opacity:1-prog(t,6.5,7.0)}}>
          <Word t={t} at={4.7}>working</Word><Word t={t} at={5.1}>together</Word><Word t={t} at={5.5} color={C.p500}>seamlessly.</Word>
        </div>)}

      {/* beat 2 chips */}
      {[
        {x:430,y:190,t:7.4,text:"Customer expectations",ico:"↑"},
        {x:1480,y:170,t:8.8,text:"Business priorities",ico:"⇄"},
        {x:1500,y:975,t:9.9,text:"Ways of working",ico:"↻"},
        {x:400,y:985,t:10.6,text:"…evolve",ico:"⚡"},
      ].map((c,i)=>{
        const s=pop(t,c.t,.45), o=1-prog(t,12.0,12.6);
        const sh = Math.sin(t*30+i)*kf(t,[[c.t,0],[c.t+1,3],[11.6,3],[12,0]]);
        return t>=c.t&&t<12.7 ? (
          <Abs key={i} x={c.x+sh} y={c.y} s={s} o={o}>
            <div style={{padding:"16px 30px",borderRadius:40,background:"#fff",border:`3px solid ${C.pink}`,color:C.pink,fontWeight:900,fontSize:38,boxShadow:`0 14px 40px ${C.pink}33`,display:"flex",gap:14,alignItems:"center",letterSpacing:-.5}}>
              <span style={{fontSize:40}}>{c.ico}</span>{c.text}
            </div>
          </Abs>):null;
      })}
      {t>12.5 && t<15.9 && (
        <div style={{position:"absolute",left:0,top:64,width:W,textAlign:"center",fontSize:70,fontWeight:900,color:C.p700,letterSpacing:-1.6,lineHeight:1.05,whiteSpace:"nowrap",opacity:1-prog(t,15.4,15.9)}}>
          <Word t={t} at={12.7}>A more</Word><Word t={t} at={13.2} color={C.p500}>connected</Word><Word t={t} at={13.8}>and</Word><Word t={t} at={13.9} color={C.p500}>adaptable</Word><Word t={t} at={14.5}>way of working</Word>
        </div>)}

      {/* beat 3: Sirius enables that shift */}
      {t>15.9 && t<18.4 && (
        <div style={{position:"absolute",left:0,top:130,width:W,textAlign:"center",fontSize:96,fontWeight:900,color:C.p700,letterSpacing:-2.5,opacity:1-prog(t,17.9,18.4)}}>
          <Word t={t} at={15.95} color={C.p500}>Sirius</Word><Word t={t} at={16.5}>enables</Word><Word t={t} at={16.9}>that</Word><Word t={t} at={17.1}>shift</Word>
        </div>)}
      {/* shockwave + star */}
      {t>17.4 && (
        <>
          {[0,0.18,0.36].map((d,i)=>{const p=prog(t,17.5+d,18.9+d);return p>0&&p<1?<div key={i} style={{position:"absolute",left:CX-1,top:CY-1,width:2,height:2,borderRadius:"50%",boxShadow:`0 0 0 ${p*700}px rgba(129,56,224,${(1-p)*.18})`}}/>:null;})}
          <Abs x={CX} y={CY} s={star*grow*(t>23?1:1)} o={1}>
            <div style={{position:"relative",width:300,height:300}}>
              <div style={{position:"absolute",inset:-120,borderRadius:"50%",background:"radial-gradient(closest-side, rgba(129,56,224,.5), rgba(129,56,224,0))"}}/>
              <div style={{position:"absolute",inset:0,transform:`scale(${1+0.03*Math.sin(t*5)})`}}><SiriusMark size={300} color={C.p500} dot="#fff"/></div>
            </div>
          </Abs>
        </>)}

      {/* orbit ring + labels */}
      {t>18.0 && t<23.9 && (
        <svg width={W} height={H} style={{position:"absolute",inset:0,opacity:1-prog(t,23.1,23.9)}}>
          <circle cx={CX} cy={CY} r={300} fill="none" stroke={C.p400} strokeWidth={3} strokeDasharray={`${1885*eo(prog(t,18.1,19.6))} 3000`} transform={`rotate(-90 ${CX} ${CY})`} opacity={.9}/>
          {t>20.0 && [0,1,2,3,4,5,6,7].map(i=>{const a=(t*0.5+i*Math.PI/4);const s=pop(t,20.0+i*0.06,.4);return <circle key={i} cx={CX+300*Math.cos(a)} cy={CY+300*Math.sin(a)} r={9*s} fill={i%3===0?C.p500:C.p200} />;})}
        </svg>)}
      {t>19.0 && t<23.9 && (
        <>
          <Abs x={CX} y={CY-300} s={pop(t,19.1,.5)} o={1-prog(t,23.1,23.9)}>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 28px",borderRadius:40,background:`linear-gradient(90deg,${C.p700},${C.p500})`,color:"#fff",fontWeight:900,fontSize:34,boxShadow:shadow}}><Spark size={30}/>AI-enabled environment</div>
          </Abs>
          {[{x:CX-560,y:CY-110,t:21.3,l:"Set up",i:"plus"},{x:CX+560,y:CY-110,t:21.9,l:"Managed",i:"controls"},{x:CX,y:CY+340,t:22.6,l:"Continuously improved",i:"loop"}].map((p,i)=>(
            <Abs key={i} x={p.x} y={p.y} s={pop(t,p.t,.45)} o={1-prog(t,23.1,23.9)}>
              <div style={{display:"flex",alignItems:"center",gap:14,padding:"16px 30px",borderRadius:44,background:"#fff",border:`2px solid ${C.p200}`,color:C.p700,fontWeight:900,fontSize:38,boxShadow:shadow}}>
                <Ico n={p.i} size={40} color={C.p500} sw={2}/>{p.l}
              </div>
            </Abs>))}
        </>)}
    </PageBg>
  );
};
