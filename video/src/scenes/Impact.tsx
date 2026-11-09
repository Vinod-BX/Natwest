import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, FPS, W, H, prog, eo, eio, kf, lerp, pop, fade, shadow, eoExpo} from "../theme";
import {SC} from "../timeline";
import {PageBg, Ico, Spark, UIP} from "../ui";
import {CapIcon} from "../logo";

const S0 = SC.impact[0];
const Word:React.FC<{t:number;at:number;children:React.ReactNode;color?:string}> = ({t,at,children,color}) => (
  <span style={{display:"inline-block",opacity:fade(t,at,.18),transform:`translateY(${(1-eo(prog(t,at,at+.35)))*34}px)`,marginRight:"0.26em",color}}>{children}</span>);

const CardShell:React.FC<{cx:number;cy:number;s:number;o:number;tag:string;tagIco:string;title:string;children:React.ReactNode;crmV:string;sirV:string;crmT:number;sirT:number;t:number;pill:string;pillT:number;pillIco:string}> = ({cx,cy,s,o,tag,tagIco,title,children,crmV,sirV,crmT,sirT,t,pill,pillT,pillIco}) => (
  <div style={{position:"absolute",left:cx-270,top:cy-320,width:540,height:640,transform:`scale(${s})`,opacity:o,borderRadius:34,background:"#fff",border:"1px solid #EADFF7",boxShadow:`0 30px 80px rgba(90,40,125,.18)`,padding:"32px 36px"}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"8px 18px 8px 12px",borderRadius:24,background:C.p50,color:UIP,fontWeight:900,fontSize:17,letterSpacing:1.2}}><Ico n={tagIco} size={22} color={C.p500} sw={2.1}/>{tag}</div>
    <div style={{marginTop:14,fontWeight:900,fontSize:36,color:C.n900,letterSpacing:-.8,lineHeight:"40px"}}>{title}</div>
    <div style={{display:"flex",marginTop:26,gap:0}}>
      <div style={{flex:1}}><div style={{fontWeight:900,fontSize:17,letterSpacing:1.4,color:C.n500}}>WITH CRM</div></div>
      <div style={{flex:1}}><div style={{fontWeight:900,fontSize:17,letterSpacing:1.4,color:C.p500}}>WITH SIRIUS</div></div>
    </div>
    <div style={{position:"relative",height:196,marginTop:4}}>{children}</div>
    <div style={{display:"flex",marginTop:6,alignItems:"baseline"}}>
      <div style={{flex:1,whiteSpace:"nowrap",fontWeight:900,fontSize:crmV.length>5?44:68,letterSpacing:-2,color:C.n300,opacity:fade(t,crmT,.25),transform:`translateY(${(1-eo(prog(t,crmT,crmT+.4)))*24}px)`,textDecoration:t>=pillT-.8?"line-through":"none",textDecorationThickness:5}}>{crmV}</div>
      <div style={{flex:1,fontWeight:900,fontSize:sirV.length>5?44:68,letterSpacing:-2,color:C.p500,opacity:fade(t,sirT,.25),transform:`translateY(${(1-eo(prog(t,sirT,sirT+.4)))*24}px)`}}>{sirV}</div>
    </div>
    <div style={{position:"absolute",left:36,right:36,bottom:30,height:70,borderRadius:35,background:`linear-gradient(90deg,#1FA13F,${C.green})`,color:"#fff",fontWeight:900,fontSize:34,letterSpacing:-.4,display:"flex",alignItems:"center",justifyContent:"center",gap:12,transform:`scale(${pop(t,pillT,.5)})`,opacity:Math.min(1,pop(t,pillT,.5)*1.6),boxShadow:`0 0 ${40*kf(t,[[pillT,0],[pillT+.2,1],[pillT+1,0]])}px rgba(58,211,86,.8)`}}><Ico n={pillIco} size={32} color="#fff" sw={2.4}/>{pill}</div>
  </div>
);

export const Impact:React.FC = () => {
  const f = useCurrentFrame(); const t = S0 + f/FPS;
  const wipe = eio(prog(t,156.9,157.9));
  const toTop = eio(prog(t,159.0,159.8));
  const shrink = eio(prog(t,186.2,187.2));
  const cs = lerp(1,.6,shrink);
  const cy = lerp(570,305,shrink);
  const cxs = [lerp(380,628,shrink),960,lerp(1540,1292,shrink)];
  const o = (a:number)=>Math.min(1,pop(t,a,.5)*1.4);
  const pm = (k:number,x:number)=>pop(t,k,.35);
  const dots = (n:number,t0:number,col:string,cols=3,size=46)=>Array.from({length:n}).map((_,i)=>{
    const p=pop(t,t0+i*.09,.35);
    return <div key={i} style={{position:"absolute",left:24+(i%cols)*72,top:20+Math.floor(i/cols)*72,width:size,height:size,borderRadius:"50%",background:col,transform:`scale(${p})`,opacity:Math.min(1,p*1.6)}}/>;
  });
  const sys = (n:number,t0:number,col:string)=>Array.from({length:n}).map((_,i)=>{
    const p=pop(t,t0+i*.09,.35);
    return <div key={i} style={{position:"absolute",left:24+(i%3)*72,top:20+Math.floor(i/3)*72,width:58,height:58,borderRadius:14,background:C.n100,display:"flex",alignItems:"center",justifyContent:"center",transform:`scale(${p})`,opacity:Math.min(1,p*1.6)}}><Ico n="systems" size={30} color={col} sw={1.8}/></div>;
  });
  // searching chips
  const SRC = [{l:"CRM",x:-520,y:60,k:187.1},{l:"Email",x:-260,y:150,k:187.5},{l:"Spreadsheets",x:300,y:90,k:187.9},{l:"Documents",x:-60,y:120,k:188.3},{l:"Portal",x:140,y:190,k:188.6},{l:"Reports",x:540,y:170,k:188.8}];
  const merge = eio(prog(t,189.1,189.9));
  const pillars = [{i:"users",l:"Colleague",s:"experience",k:190.7,c:C.p500},{i:"target",l:"Customer",s:"time to serve",k:191.05,c:C.blue},{i:"shield",l:"Control",s:"lower risk",k:191.4,c:C.p700},{i:"coin",l:"Cost",s:"to serve",k:191.75,c:C.green}];
  return (
    <AbsoluteFill style={{clipPath:`circle(${wipe*1500}px at 50% 50%)`}}>
    <PageBg>
      <AbsoluteFill style={{backgroundImage:`radial-gradient(rgba(129,56,224,.14) 2px, transparent 2.5px)`,backgroundSize:"64px 64px",opacity:.5}}/>
      {/* title */}
      <div style={{position:"absolute",left:0,top:lerp(440,80,toTop),width:W,textAlign:"center",fontWeight:900,fontSize:lerp(120,64,toTop),letterSpacing:-3,color:C.p700,lineHeight:1.05,opacity:1-prog(t,185.9,186.4)}}>
        {t<159.0 ? <><Word t={t} at={157.1}>And</Word><Word t={t} at={157.25}>the</Word><Word t={t} at={157.4} color={C.p500}>impact</Word><Word t={t} at={157.9}>is</Word><Word t={t} at={158.1} color={C.p500}>clear.</Word></> : <span>The <span style={{color:C.p500}}>impact</span></span>}
      </div>

      {/* card 1 — touchpoints */}
      <CardShell cx={cxs[0]} cy={cy} s={cs*pop(t,159.3,.5)} o={o(159.3)} tag="COLLEAGUE EXPERIENCE" tagIco="users" title="Manual touchpoints per case" crmV="5–6" sirV="1–2" crmT={161.9} sirT={164.5} t={t} pill="80% fewer" pillT={166.9} pillIco="arrow">
        <div style={{position:"absolute",left:0,top:0,width:240,height:240}}>{dots(6,161.1,C.n300)}</div>
        <div style={{position:"absolute",left:260,top:0,width:240,height:240}}>{dots(2,163.8,C.p500)}<div style={{position:"absolute",left:24,top:112,fontWeight:800,fontSize:18,color:C.p500,opacity:fade(t,164.6,.3)}}>per case</div></div>
        <div style={{position:"absolute",left:228,top:84,opacity:fade(t,163.4,.3)}}><Ico n="arrow" size={34} color={C.n300} sw={2.4}/></div>
      </CardShell>
      {/* card 2 — systems */}
      <CardShell cx={cxs[1]} cy={cy} s={cs*pop(t,168.4,.5)} o={o(168.4)} tag="CONTROL & RISK" tagIco="shield" title="Systems touched per request" crmV="3–6" sirV="1" crmT={171.2} sirT={173.4} t={t} pill="One Single Window" pillT={174.0} pillIco="systems">
        <div style={{position:"absolute",left:0,top:0,width:240,height:240}}>{sys(6,170.4,C.n300)}</div>
        <div style={{position:"absolute",left:260,top:0,width:240,height:240}}>
          <div style={{position:"absolute",left:50,top:30,transform:`scale(${pop(t,173.1,.5)})`,opacity:Math.min(1,pop(t,173.1,.5)*1.6),filter:`drop-shadow(0 12px 24px rgba(129,56,224,.4))`}}><CapIcon i={0} size={150}/></div>
        </div>
        <div style={{position:"absolute",left:228,top:84,opacity:fade(t,172.9,.3)}}><Ico n="arrow" size={34} color={C.n300} sw={2.4}/></div>
      </CardShell>
      {/* card 3 — effort */}
      <CardShell cx={cxs[2]} cy={cy} s={cs*pop(t,175.3,.5)} o={o(175.3)} tag="TIME & COST TO SERVE" tagIco="clock" title="Agent effort per case" crmV="12–45 min" sirV="~5 min" crmT={178.7} sirT={181.5} t={t} pill="75–90% faster" pillT={184.3} pillIco="rocket">
        <div style={{position:"absolute",left:60,bottom:0,width:110,height:190*eoExpo(prog(t,177.4,178.7)),borderRadius:"18px 18px 0 0",background:`linear-gradient(180deg,${C.n300},#D9D5DD)`}}/>
        <div style={{position:"absolute",left:320,bottom:0,width:110,height:38*eoExpo(prog(t,180.8,181.7)),borderRadius:"14px 14px 0 0",background:`linear-gradient(180deg,${C.p400},${C.p500})`,boxShadow:`0 0 ${30*kf(t,[[181.5,0],[181.8,1],[182.6,0]])}px ${C.p400}`}}/>
        <div style={{position:"absolute",left:0,right:0,bottom:-2,height:3,background:"#EADFF7"}}/>
      </CardShell>

      {/* ---- less time searching / more time serving ---- */}
      {t>=186.4 && (
        <>
          <div style={{position:"absolute",left:0,top:620,width:W,textAlign:"center",fontWeight:900,fontSize:84,letterSpacing:-2,color:C.n900,opacity:(1-prog(t,190.0,190.4))}}>
            <span style={{position:"relative",display:"inline-block",textDecoration:t>=189.0?"line-through":"none",textDecorationColor:C.pink,textDecorationThickness:7}}>
              <Word t={t} at={186.5}>Less</Word><Word t={t} at={186.8}>time</Word><Word t={t} at={187.1} color={C.p500}>searching</Word>
            </span>
          </div>
          {SRC.map((s,i)=>{
            const p=pop(t,s.k,.4);
            const x=lerp(960+s.x,960,merge), y=lerp(800+s.y,860,merge);
            return t>=s.k-.05 && t<190.3 ? <div key={i} style={{position:"absolute",left:x,top:y+Math.sin(t*3+i)*6*(1-merge),transform:`translate(-50%,-50%) scale(${p*(1-merge*.7)}) rotate(${(i%2?4:-4)*(1-merge)}deg)`,opacity:1-prog(merge,.7,1),padding:"12px 26px",borderRadius:30,background:"#fff",border:`2px solid ${C.n300}`,color:C.n500,fontWeight:800,fontSize:28,boxShadow:shadow,whiteSpace:"nowrap"}}>{s.l}</div>:null;
          })}
          {t>=189.3 && t<190.4 && <div style={{position:"absolute",left:960,top:860,transform:`translate(-50%,-50%) scale(${pop(t,189.3,.45)})`,opacity:1-prog(t,190.0,190.4)}}><CapIcon i={0} size={130}/></div>}
          {t>=190.1 && (
            <div style={{position:"absolute",left:0,top:620,width:W,textAlign:"center",fontWeight:900,fontSize:92,letterSpacing:-2.4,color:UIP}}>
              <Word t={t} at={190.2}>More</Word><Word t={t} at={190.4}>time</Word><Word t={t} at={190.7} color={C.p500}>serving</Word><Word t={t} at={191.1} color={C.p500}>customers.</Word>
            </div>)}
          {t>=190.6 && (
            <div style={{position:"absolute",left:0,top:800,width:W,display:"flex",justifyContent:"center",gap:26}}>
              {pillars.map((p,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 30px 16px 18px",borderRadius:44,background:"#fff",border:`3px solid ${p.c}`,boxShadow:shadow,transform:`scale(${pop(t,p.k,.45)})`,opacity:t>=p.k?1:0}}>
                  <div style={{width:58,height:58,borderRadius:29,background:p.c,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n={p.i} size={32} color="#fff" sw={2.1}/></div>
                  <div><div style={{fontWeight:900,fontSize:32,color:p.c,lineHeight:"34px"}}>{p.l}</div><div style={{fontWeight:700,fontSize:19,color:C.n500}}>{p.s}</div></div>
                </div>))}
            </div>)}
        </>)}
    </PageBg>
    </AbsoluteFill>
  );
};
