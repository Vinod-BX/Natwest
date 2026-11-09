import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C, FPS, W, H, prog, eo, eio, kf, lerp, pop, fade, eoExpo, eoBack} from "../theme";
import {SC} from "../timeline";
import {Ico, Spark, Check, Typewriter} from "../ui";
import {CapIcon} from "../logo";

const S0 = SC.ai[0];
const GLASS:React.CSSProperties = {background:"linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.05))",border:"1.5px solid rgba(230,215,245,.35)",borderRadius:28,boxShadow:"0 30px 80px rgba(0,0,0,.35)"};
// journey tiles (cap icon idx) : WF, INT, SW, OBS
const MODS = [{c:2,n:"Workflow Studio",x:430},{c:3,n:"Integration Hub",x:750},{c:0,n:"Single Window",x:1170},{c:1,n:"Observability",x:1490}];
const CORNERS = [{x:330,y:300},{x:330,y:800},{x:1590,y:300},{x:1590,y:800}];

const Word:React.FC<{t:number;at:number;children:React.ReactNode;color?:string}> = ({t,at,children,color}) => (
  <span style={{display:"inline-block",opacity:fade(t,at,.18),transform:`translateY(${(1-eo(prog(t,at,at+.35)))*30}px)`,marginRight:"0.26em",color}}>{children}</span>);

export const AIScene:React.FC = () => {
  const f = useCurrentFrame(); const t = S0 + f/FPS;
  const wipeIn = eio(prog(t,124.3,125.2));
  const moved = eio(prog(t,129.3,130.1));   // tiles drift to corners
  const phaseB = t>=129.6 && t<146.0;
  const phaseC = t>=145.7;
  const gather = eio(prog(t,155.8,156.8));
  // ---------- phase A positions
  const tilePos = (i:number)=>{
    const a = {x:MODS[i].x,y:640}; const b = CORNERS[i];
    return {x:lerp(a.x,b.x,moved), y:lerp(a.y,b.y,moved)};
  };
  const tileS = (i:number)=>lerp(1,.78,moved);
  const aiHex = pop(t,127.2,.6);
  const aiPos = {x:lerp(960,960,moved), y:lerp(340,150,moved)};
  // ---------- blocks (phase C)
  const L1 = [[740,400],[960,400],[1180,400],[740,690],[960,690],[1180,690]];
  const L2 = [[560,540],[760,540],[960,540],[1160,540],[1360,540],[960,540]];
  const L3 = [[960,570],[960,300],[1236,470],[1131,797],[789,797],[684,470]];
  const lay = (k:number)=>{
    const a = t<149.7?L1:t<152.5?L2:L3;
    return a[k];
  };
  const BLK = [{c:2,l:"Workflow"},{c:3,l:"Integration"},{c:0,l:"Single Window"},{c:1,l:"Observability"},{c:4,l:"AI"},{c:2,l:"Reusable"}];
  const blkPos = (k:number)=>{
    // smooth between layouts
    const T1=149.7,T2=152.5,T3=153.5;
    const p1=eoBack(prog(t,T1,T1+.7)), p2=eoBack(prog(t,T2,T2+.8));
    const a=L1[k], b=L2[k], c=L3[k];
    let x=lerp(a[0],b[0],p1), y=lerp(a[1],b[1],p1);
    x=lerp(x,c[0],p2); y=lerp(y,c[1],p2);
    // swap wobble at 'adapt/evolve'
    const sw = k===1||k===3 ? Math.sin(prog(t,153.4,154.4)*Math.PI)*(k===1?60:-60) : 0;
    const ev = kf(t,[[154.0,1],[154.3,1.12],[154.9,1]]);
    const scat = 1-eoBack(prog(t,148.0+k*.07,148.6+k*.07));
    return {x:x+sw+ scat*(k%2?-600:600), y:y+ scat*(k<3?-400:400), s:ev*(1-gather*.9), o:Math.min(1,pop(t,148.0+k*.07,.4)*1.5)};
  };
  // links between blocks when L2/L3
  const labelC = t>=148.2 && t<156 ? ( t<149.1?"Self-service": t<150.4?"Flexible": t<152.4?"Greater control": t<153.2?"Configure": t<153.9?"Adapt": "Evolve") : "";
  const stars = Array.from({length:60}).map((_,i)=>{const a=(i*137.5)%360,r=200+((i*113)%820);return {x:W/2+Math.cos(a)*r*1.6,y:H/2+Math.sin(a)*r*.9,s:i%6?3:5,ph:i};});
  // ---------- phase B micro-scenes
  const bWin = (a:number,b:number)=>kf(t,[[a-.01,0],[a+.3,1],[b-.3,1],[b,0]]);
  const checks = [
    {l:"Identity verified",k:130.2,ok:true},{l:"Mandate signed",k:130.6,ok:true},{l:"Account in scope",k:131.0,ok:false},
  ];
  const exceptionFlag = t>=131.5;
  const confidence = eo(prog(t,142.3,144.5))*.94;
  return (
    <AbsoluteFill style={{clipPath:`circle(${wipeIn*1500}px at 50% 50%)`,background:`radial-gradient(1300px 900px at 50% 45%, ${C.p800} 0%, ${C.p900} 72%)`,fontFamily:"inherit"}}>
      {stars.map((s,i)=><div key={i} style={{position:"absolute",left:s.x,top:s.y,width:s.s,height:s.s,borderRadius:"50%",background:"#E6D7F5",opacity:(.25+.3*Math.sin(t*1.6+s.ph))}}/>)}
      <div style={{position:"absolute",left:W/2-700,top:H/2-480,width:1400,height:960,borderRadius:"50%",background:"radial-gradient(closest-side,rgba(129,56,224,.38),rgba(129,56,224,0))"}}/>

      {/* heading */}
      {t>=124.9 && t<129.8 && (
        <div style={{position:"absolute",left:0,top:70,width:W,textAlign:"center",opacity:1-prog(t,129.2,129.7)}}>
          <div style={{fontSize:40,fontWeight:800,color:C.p200,letterSpacing:-.5}}><Word t={t} at={125.0}>Across</Word><Word t={t} at={125.3}>every</Word><Word t={t} at={125.7}>stage</Word><Word t={t} at={126.1}>of</Word><Word t={t} at={126.2}>this</Word><Word t={t} at={126.4}>journey</Word></div>
          <div style={{fontSize:88,fontWeight:900,color:"#fff",letterSpacing:-2.4,marginTop:10}}><Word t={t} at={127.2} color={C.p200}>AI</Word><Word t={t} at={127.6}>is</Word><Word t={t} at={127.8}>embedded</Word><Word t={t} at={128.2}>throughout</Word><Word t={t} at={128.6} color={C.p200}>Sirius</Word></div>
        </div>)}

      {/* journey connector */}
      {t<130.1 && (
        <svg width={W} height={H} style={{position:"absolute",inset:0,opacity:1-moved}}>
          <path d="M430 640 L1490 640" stroke={C.p400} strokeWidth={4} strokeDasharray="6 14" strokeLinecap="round" pathLength={1} style={{clipPath:`inset(0 ${(1-eoExpo(prog(t,125.2,126.6)))*100}% 0 0)`}}/>
          {/* AI beams */}
          {MODS.map((m,i)=>{const p=eoExpo(prog(t,127.8+i*.15,128.6+i*.15));return <path key={i} d={`M960 440 C960 540 ${m.x} 520 ${m.x} 560`} stroke={C.p200} strokeWidth={3} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1-p} opacity={.9}/>;})}
        </svg>)}
      {/* AI hex */}
      {t>=127.1 && (
        <div style={{position:"absolute",left:aiPos.x-110*lerp(1,.5,moved),top:aiPos.y-110*lerp(1,.5,moved),width:220,height:220,transform:`scale(${aiHex*lerp(1,.5,moved)})`,transformOrigin:"center",opacity:t<146?1:0,filter:"drop-shadow(0 0 40px rgba(129,56,224,.9))"}}>
          <CapIcon i={4} size={220}/></div>)}
      {/* module tiles */}
      {MODS.map((m,i)=>{
        const p=tilePos(i); const s=pop(t,125.0+i*.4,.5)*tileS(i)*(t>=155?1-gather:1); const size=160;
        const sparkle = t>128.2?pop(t,128.2+i*.15,.4):0;
        return t>=125.0+i*.4-.05 && (
          <div key={i} style={{position:"absolute",left:p.x-size/2,top:p.y-size/2,width:size,height:size,transform:`scale(${s})`,opacity:t>=146?0:1}}>
            <CapIcon i={m.c} size={size}/>
            <div style={{position:"absolute",right:-12,top:-12,transform:`scale(${sparkle})`,width:44,height:44,borderRadius:22,background:`linear-gradient(135deg,${C.p400},${C.p500})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 24px rgba(166,107,240,.9)"}}><Spark size={24}/></div>
            <div style={{position:"absolute",top:size+16,left:-40,width:size+80,textAlign:"center",color:"#fff",fontWeight:800,fontSize:24,opacity:1-moved}}>{m.n}</div>
          </div>);
      })}

      {/* ---------- phase B ---------- */}
      {phaseB && <>
        {/* beams from corners to centre */}
        <svg width={W} height={H} style={{position:"absolute",inset:0,opacity:kf(t,[[129.6,0],[130.3,1],[145.6,1],[146.0,0]])}}>
          {CORNERS.map((c,i)=>{const k=((t*.7+i*.25)%1);const ex=960,ey=540;return <g key={i}><line x1={c.x+(c.x<960?70:-70)} y1={c.y} x2={ex+(c.x<960?-400:400)} y2={ey+(c.y<540?-120:120)} stroke={C.p400} strokeWidth={3} strokeDasharray="4 12" opacity={.6}/><circle cx={lerp(c.x+(c.x<960?70:-70),ex+(c.x<960?-400:400),k)} cy={lerp(c.y,ey+(c.y<540?-120:120),k)} r={7} fill={C.p200}/></g>;})}
        </svg>
        {/* B1/B2 checks */}
        {t>=129.8&&t<132.9 && (
          <div style={{position:"absolute",left:560,top:290,width:800,height:520,padding:"34px 40px",opacity:bWin(129.8,132.9),transform:`scale(${.94+.06*bWin(129.8,132.9)})`,...GLASS}}>
            <div style={{display:"flex",alignItems:"center",gap:14,color:C.p200,fontWeight:900,fontSize:22,letterSpacing:1.4}}><Spark size={24} color={C.p200}/>AUTOMATED BUSINESS CHECKS</div>
            {checks.map((c,i)=>{
              const bad = !c.ok && exceptionFlag;
              return t>=c.k-.1 && <div key={i} style={{marginTop:22,height:92,borderRadius:22,background:bad?"rgba(229,21,101,.22)":"rgba(255,255,255,.1)",border:`2px solid ${bad?C.pink:"rgba(255,255,255,.18)"}`,display:"flex",alignItems:"center",gap:20,padding:"0 28px",transform:`translateX(${(1-eo(prog(t,c.k,c.k+.3)))*60}px) scale(${bad?1+.02*Math.sin(t*10):1})`,opacity:fade(t,c.k,.2),boxShadow:bad?`0 0 ${30+20*Math.sin(t*8)}px rgba(229,21,101,.55)`:"none"}}>
                {bad? <div style={{width:44,height:44,borderRadius:22,background:C.pink,display:"flex",alignItems:"center",justifyContent:"center"}}><Ico n="warn" size={26} color="#fff" sw={2.4}/></div> : <Check size={44}/>}
                <div style={{fontWeight:800,fontSize:34,color:"#fff"}}>{c.l}</div>
                {bad && <div style={{marginLeft:"auto",padding:"8px 20px",borderRadius:22,background:C.pink,color:"#fff",fontWeight:900,fontSize:20}}>EXCEPTION</div>}
                {!bad && <div style={{marginLeft:"auto",fontWeight:800,fontSize:18,color:C.green}}>Auto-checked</div>}
              </div>;
            })}
            {t>=131.4 && <div style={{marginTop:22,fontWeight:800,fontSize:24,color:C.p200,opacity:fade(t,131.9,.3)}}>Exceptions highlighted automatically</div>}
          </div>)}
        {/* B3 recommendation */}
        {t>=132.6&&t<135.1 && (
          <div style={{position:"absolute",left:560,top:290,width:800,height:520,padding:"34px 40px",opacity:bWin(132.6,135.1),transform:`scale(${.94+.06*bWin(132.6,135.1)})`,...GLASS}}>
            <div style={{display:"flex",alignItems:"center",gap:14,color:C.p200,fontWeight:900,fontSize:22,letterSpacing:1.4}}><Ico n="bulb" size={28} color={C.yellow} sw={2}/>INTELLIGENT RECOMMENDATION</div>
            <div style={{marginTop:36,fontWeight:900,fontSize:52,color:"#fff",lineHeight:"58px",letterSpacing:-1}}>Route to mandate analyst for manual review</div>
            <div style={{marginTop:26,display:"flex",alignItems:"center",gap:20}}>
              <div style={{flex:1,height:16,borderRadius:8,background:"rgba(255,255,255,.15)",overflow:"hidden"}}><div style={{width:`${94*eo(prog(t,133.2,134.2))}%`,height:"100%",background:`linear-gradient(90deg,${C.p400},${C.green})`}}/></div>
              <div style={{fontWeight:900,fontSize:30,color:C.green}}>94% confidence</div>
            </div>
            <div style={{marginTop:34,display:"flex",gap:16}}>
              <div style={{height:64,padding:"0 40px",borderRadius:32,background:`linear-gradient(90deg,${C.p500},${C.p400})`,color:"#fff",fontWeight:900,fontSize:24,display:"flex",alignItems:"center",gap:10,boxShadow:`0 0 ${30*kf(t,[[134.2,0],[134.5,1],[134.9,0]])}px ${C.p400}`}}><Spark size={22}/>Accept</div>
              <div style={{height:64,padding:"0 34px",borderRadius:32,border:"2px solid rgba(255,255,255,.4)",color:"#fff",fontWeight:800,fontSize:22,display:"flex",alignItems:"center"}}>Why this?</div>
            </div>
          </div>)}
        {/* B4 assistant */}
        {t>=134.9&&t<141.6 && (
          <div style={{position:"absolute",left:500,top:240,width:920,height:640,padding:"30px 38px",opacity:bWin(134.9,141.6),transform:`scale(${.94+.06*bWin(134.9,141.6)})`,...GLASS}}>
            <div style={{display:"flex",alignItems:"center",gap:14,color:C.p200,fontWeight:900,fontSize:22,letterSpacing:1.4}}><Ico n="chat" size={28} color={C.p200} sw={2}/>AI ASSISTANT</div>
            {t>=136.0 && <div style={{marginTop:22,marginLeft:"auto",width:"fit-content",maxWidth:620,padding:"16px 26px",borderRadius:26,borderBottomRightRadius:6,background:"#fff",color:C.p800,fontWeight:800,fontSize:26,transform:`scale(${pop(t,136.0,.35)})`,transformOrigin:"right bottom"}}>Find the mandate documents for ABC Private Ltd</div>}
            {t>=137.0 && <div style={{marginTop:18,width:"fit-content",maxWidth:700,padding:"16px 26px",borderRadius:26,borderBottomLeftRadius:6,background:`linear-gradient(135deg,${C.p500},${C.p600})`,color:"#fff",fontWeight:700,fontSize:26,lineHeight:"34px"}}><Typewriter t={t} start={137.1} cps={34} text="Found 3 files, last updated 12:05."/></div>}
            {t>=138.3 && <div style={{marginTop:14,width:"fit-content",maxWidth:700,padding:"16px 26px",borderRadius:26,borderBottomLeftRadius:6,background:`linear-gradient(135deg,${C.p500},${C.p600})`,color:"#fff",fontWeight:700,fontSize:26,lineHeight:"34px"}}><Typewriter t={t} start={138.4} cps={38} text="Context: account 52662346 is out of scope for batch processing."/></div>}
            {t>=139.6 && <div style={{marginTop:22,display:"flex",alignItems:"center",gap:18,padding:"18px 26px",borderRadius:24,background:"rgba(58,211,86,.16)",border:`2px solid ${C.green}`,transform:`scale(${pop(t,139.6,.45)})`,transformOrigin:"left center",boxShadow:`0 0 ${30*kf(t,[[140.2,0],[140.6,1],[141.3,0]])}px rgba(58,211,86,.7)`}}>
              <Ico n="target" size={40} color={C.green} sw={2}/>
              <div><div style={{fontWeight:900,fontSize:17,letterSpacing:1.4,color:C.green}}>NEXT BEST ACTION</div><div style={{fontWeight:900,fontSize:32,color:"#fff"}}>Request signatory proof</div></div>
              <div style={{marginLeft:"auto"}}><Ico n="arrow" size={40} color="#fff" sw={2.4}/></div>
            </div>}
          </div>)}
        {/* B5 confident decisions */}
        {t>=141.5&&t<146.2 && (
          <div style={{position:"absolute",left:560,top:290,width:800,height:520,padding:"34px 40px",opacity:bWin(141.5,146.2),transform:`scale(${.94+.06*bWin(141.5,146.2)})`,...GLASS}}>
            <div style={{display:"flex",alignItems:"center",gap:14,color:C.p200,fontWeight:900,fontSize:22,letterSpacing:1.4}}><Ico n="target" size={26} color={C.p200} sw={2}/>INFORMED DECISIONS</div>
            <div style={{display:"flex",alignItems:"center",gap:50,marginTop:20}}>
              <div style={{position:"relative",width:230,height:230}}>
                <svg width="230" height="230" viewBox="0 0 230 230"><circle cx="115" cy="115" r="96" stroke="rgba(255,255,255,.16)" strokeWidth="20" fill="none"/><circle cx="115" cy="115" r="96" stroke={C.green} strokeWidth="20" fill="none" strokeLinecap="round" strokeDasharray={603} strokeDashoffset={603*(1-confidence)} transform="rotate(-90 115 115)"/></svg>
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#fff"}}><div style={{fontWeight:900,fontSize:62}}>{Math.round(confidence*100)}%</div><div style={{fontWeight:800,fontSize:15,letterSpacing:1.4,color:C.p200}}>CONFIDENCE</div></div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:18}}>
                {[{l:"More informed decisions",k:142.9},{l:"Act with greater confidence",k:143.9},{l:"Fewer manual hand-offs",k:144.7}].map((r,i)=>t>=r.k&&<div key={i} style={{display:"flex",alignItems:"center",gap:16,fontWeight:900,fontSize:30,color:"#fff",transform:`translateX(${(1-eo(prog(t,r.k,r.k+.3)))*50}px)`,opacity:fade(t,r.k,.2)}}><Check size={38}/>{r.l}</div>)}
              </div>
            </div>
          </div>)}
      </>}

      {/* ---------- phase C: building blocks ---------- */}
      {phaseC && t<157.5 && <>
        <div style={{position:"absolute",left:0,top:62,width:W,textAlign:"center",fontWeight:900,fontSize:84,letterSpacing:-2,color:"#fff",opacity:(1-gather)*(t>=148.2?1:0)}}>
          {labelC && <span key={labelC} style={{display:"inline-block",transform:`scale(${pop(t, labelC==="Self-service"?148.2:labelC==="Flexible"?149.1:labelC==="Greater control"?150.4:labelC==="Configure"?152.4:labelC==="Adapt"?153.2:153.9,.4)})`,color:labelC==="Greater control"?C.p200:"#fff"}}>{labelC}</span>}
        </div>
        {BLK.map((b,k)=>{const p=blkPos(k);return (
          <div key={k} style={{position:"absolute",left:p.x-95,top:p.y-95,width:190,height:190,transform:`scale(${p.s})`,opacity:p.o,borderRadius:34,boxShadow:`0 20px 50px rgba(0,0,0,.4), 0 0 ${k===2&&t>151.3&&t<152.5?40:0}px ${C.p400}`}}>
            <CapIcon i={b.c} size={190} style={{borderRadius:34}}/>
            <div style={{position:"absolute",bottom:-40,width:"100%",textAlign:"center",color:C.p200,fontWeight:800,fontSize:20}}>{b.l}</div>
          </div>);})}
        {/* dragging cursor */}
        {t>150.9 && t<152.6 && (
          <svg width="34" height="40" viewBox="0 0 34 40" style={{position:"absolute",left:kf(t,[[150.9,1500],[151.3,1250],[152.5,820]]),top:kf(t,[[150.9,300],[151.3,640],[152.5,800]]),filter:"drop-shadow(0 4px 6px rgba(0,0,0,.5))"}}><path d="M4 3v28l7-7 5 12 6-3-5-11h10z" fill="#fff" stroke="#2D2D2D" strokeWidth="2.2" strokeLinejoin="round"/></svg>)}
        {/* control toggles */}
        {t>=152.5 && t<155.8 && (
          <div style={{position:"absolute",left:960,top:940,transform:"translateX(-50%)",display:"flex",gap:18,opacity:1-gather}}>
            {[{l:"Configure",k:152.6},{l:"Adapt",k:153.3},{l:"Evolve",k:153.9}].map((c,i)=>t>=c.k&&<div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 26px 12px 16px",borderRadius:36,background:"rgba(255,255,255,.12)",border:"2px solid rgba(255,255,255,.3)",color:"#fff",fontWeight:900,fontSize:28,transform:`scale(${pop(t,c.k,.4)})`}}>
              <div style={{width:54,height:30,borderRadius:15,background:C.green,position:"relative"}}><div style={{position:"absolute",right:3,top:3,width:24,height:24,borderRadius:12,background:"#fff"}}/></div>{c.l}</div>)}
          </div>)}
        {/* gather flash */}
        {gather>0 && <div style={{position:"absolute",left:W/2-500,top:H/2-500,width:1000,height:1000,borderRadius:"50%",background:`radial-gradient(closest-side, rgba(255,255,255,${.9*gather}), rgba(230,215,245,0))`}}/>}
      </>}
    </AbsoluteFill>
  );
};
