/* Input scheduled SVG. Three content anchors; no ambient animation or library. */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  const smooth = n => n*n*(3-2*n);
  const add = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const [k,v] of Object.entries(attrs)) n.setAttribute(k,v);
    parent.append(n); return n;
  };
  const scenes = [...document.querySelectorAll('.scene')].map(svg => ({
    svg, host:svg.parentElement, visible:false,
    wash:add('path',{class:'ink-wash'},svg),
    line:add('path',{class:'ink-line',pathLength:1},svg),
    dot:add('circle',{class:'ink-dot',r:5},svg),
    ends:[0,1].map(() => add('circle',{class:'ink-answer',r:7},svg))
  }));
  const hero = scenes[0];
  const play = document.querySelector('.touch-art');
  const toggle = document.querySelector('.motion-toggle');
  const steps = [...document.querySelectorAll('.lesson-steps li')];
  let ready=false, dirty=true, pending=0, paused=false, pulse=null;
  function point(el, host, x=.5, y=.5) {
    const a=el.getBoundingClientRect(), b=host.getBoundingClientRect();
    return {x:a.left-b.left+a.width*x,y:a.top-b.top+a.height*y};
  }
  const coords = p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  // One folded stroke, turned to follow each chapter's direction.
  function bend(a,b,spread,settle) {
    const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1;
    const loose=[[0,0],[.25,-1],[.74,1.28],[.26,1],[.75,-.9],[1,0]];
    const calm=[[0,0],[.2,.2],[.38,.54],[.62,.54],[.8,.2],[1,0]];
    return loose.map(([u,v],i)=>{
      u+=(calm[i][0]-u)*settle;v+=(calm[i][1]-v)*settle;
      return {x:a.x+dx*u-dy/len*v*spread,y:a.y+dy*u+dx/len*v*spread};
    });
  }
  function curve(pts,move=true) {
    let d=move?`M ${coords(pts[0])}`:'';
    for(let i=0;i<pts.length-1;i++) {
      const a=pts[Math.max(0,i-1)], b=pts[i], c=pts[i+1], e=pts[Math.min(pts.length-1,i+2)];
      d+=` C ${coords({x:b.x+(c.x-a.x)/6,y:b.y+(c.y-a.y)/6})} ${coords({x:c.x-(e.x-b.x)/6,y:c.y-(e.y-b.y)/6})} ${coords(c)}`;
    }
    return d;
  }
  function measure(s) {
    const {host}=s;
    s.w=host.clientWidth; s.h=host.clientHeight;
    s.top=host.getBoundingClientRect().top+scrollY;
    s.svg.setAttribute('viewBox',`0 0 ${s.w} ${s.h}`);
    if(s===hero) {
      const pics=host.querySelectorAll('.photo-wrap');
      s.a=point(pics[0],host,.99,.52); s.b=point(pics[1],host,.01,.52);
      s.mid={x:(s.a.x+s.b.x)/2,y:(s.a.y+s.b.y)/2};
      s.safeBottom=Math.min(...[...host.querySelectorAll('figcaption')].map(el=>point(el,host,0,0).y))-12;
    } else if(host.id==='lessons') {
      s.points=[...host.querySelectorAll('.step-num')].map(el=>point(el,host));
      const copy=point(steps[0].querySelector('div'),host,0,0);
      // A real drawing lane, bounded by the page edge and the lesson copy.
      s.spread=Math.min(28,(s.points[0].x-10)/1.4,copy.x-s.points[0].x-12);
    } else {
      const buttons=host.querySelectorAll('.contact-pair .button');
      if(innerWidth>700) {
        s.a=point(buttons[0],host,1,.5); s.b=point(buttons[1],host,0,.5);
      } else {
        s.a=point(buttons[0],host,0,.5); s.b=point(buttons[1],host,0,.5);
      }
    }
  }
  function setPath(s,d) {s.wash.setAttribute('d',d);s.line.setAttribute('d',d);}
  function circle(el,p,r) {el.setAttribute('cx',p.x);el.setAttribute('cy',p.y);if(r!==undefined)el.setAttribute('r',r);}
  function draw(s,now) {
    const still=reduce.matches||paused;
    const p=still?1:smooth(clamp((scrollY+innerHeight*.8-s.top)/(s.h+innerHeight*.25)));
    if(s===hero) {
      const {a,b}=s;
      const pts=bend(a,b,50,p).map(v=>({...v,y:Math.min(s.safeBottom,v.y)}));
      setPath(s,curve(pts));
      let t=p;
      if(pulse&&!still) t=clamp((now-pulse)/1400);
      const wave=pulse&&!still?Math.sin(t*Math.PI):0;
      circle(s.ends[0],a,7+wave*5*(1-t));circle(s.ends[1],b,7+wave*8*t);
      const travelling=s.line.getPointAtLength(s.line.getTotalLength()*t);
      circle(s.dot,travelling,5);
      s.dot.style.display=still?'none':'';
      if(pulse&&t>=1) {pulse=null;play.setAttribute('aria-pressed','false');}
    } else if(s.host.id==='lessons') {
      const pts=s.points;
      const focus=scrollY+innerHeight*.52-s.top;
      const journey=still?1:clamp((focus-pts[0].y)/(pts.at(-1).y-pts[0].y));
      let d=`M ${pts[0].x} ${pts[0].y-24} L ${coords(pts[0])}`;
      // The portrait's fold returns, then opens out towards the final stop.
      pts.slice(1).forEach((pt,i)=>{
        const settle=clamp(.08+i*.34+journey*.24);
        const spread=s.spread*(i===2?1-journey*.85:1);
        d+=curve(bend(pts[i],pt,spread,settle),false);
      });
      setPath(s,d);
      circle(s.dot,s.line.getPointAtLength(24+(s.line.getTotalLength()-24)*journey),6);
      s.dot.style.display=still?'none':'';
      s.ends[0].style.display='none';
      s.ends[1].style.opacity=String(smooth(clamp((journey-.8)/.2)));
      circle(s.ends[1],pts.at(-1),24+6*(1-journey));
      let active=0;pts.forEach((pt,i)=>{if(focus>=pt.y-18)active=i;});
      steps.forEach((el,i)=>el.classList.toggle('motion-current',!still&&i===active));
    } else {
      let pts;
      if(innerWidth>700) {
        pts=bend(s.a,s.b,48,.65+.35*p);
      } else {
        const lane=Math.min(48,s.a.x*.42),gap=s.b.y-s.a.y;
        pts=[s.a,...bend({x:lane,y:s.a.y+gap*.12},{x:lane,y:s.b.y-gap*.12},25,.6+.4*p).slice(1,-1),s.b];
      }
      setPath(s,curve(pts));
      s.line.style.strokeDasharray='1';s.line.style.strokeDashoffset=still?'0':String(1-clamp(p*1.7));
      circle(s.ends[0],s.a,7);circle(s.ends[1],s.b,7);
      // The loose mark ends as one small, complete ring joining both routes.
      circle(s.dot,s.line.getPointAtLength(s.line.getTotalLength()*.5),still?9:5+4*p);
      s.dot.classList.add('ink-answer');
    }
  }
  function frame(now) {
    pending=0;
    if(document.hidden)return;
    if(dirty){scenes.forEach(measure);dirty=false;}
    scenes.forEach(s=>{if(s.visible||reduce.matches||paused)draw(s,now);});
    if(pulse&&hero.visible&&!paused&&!reduce.matches)schedule();
  }
  function schedule(){if(ready&&!pending&&!document.hidden)pending=requestAnimationFrame(frame);}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      const s=scenes.find(s=>s.host===e.target);s.visible=e.isIntersecting;
      if(s===hero&&!s.visible)pulse=null;
    });schedule();
  },{rootMargin:'40px 0px'});
  scenes.forEach(s=>io.observe(s.host));
  const ro=new ResizeObserver(()=>{dirty=true;schedule();});scenes.forEach(s=>ro.observe(s.host));
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{dirty=true;schedule();},{passive:true});
  document.addEventListener('toggle',()=>{dirty=true;schedule();},true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){pulse=null;cancelAnimationFrame(pending);pending=0;}else{dirty=true;schedule();}});
  reduce.addEventListener('change',()=>{pulse=null;schedule();});
  toggle.addEventListener('click',()=>{paused=!paused;pulse=null;toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume ink':'Pause ink';schedule();});
  play.addEventListener('click',()=>{
    if(reduce.matches||paused){hero.svg.classList.toggle('alternate-ink');hero.line.style.stroke=hero.svg.classList.contains('alternate-ink')?'#895328':'';return;}
    pulse=performance.now();play.setAttribute('aria-pressed','true');schedule();
  });
  document.fonts.ready.then(()=>{ready=true;dirty=true;schedule();});
})();
