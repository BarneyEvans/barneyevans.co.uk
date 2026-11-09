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
  function curve(pts) {
    let d=`M ${coords(pts[0])}`;
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
      s.stepTops=steps.map(el=>el.getBoundingClientRect().top+scrollY);
    } else {
      const buttons=host.querySelectorAll('.contact-pair .button');
      if(innerWidth>700) {
        s.a=point(buttons[0],host,1,.5); s.b=point(buttons[1],host,0,.5);
        s.mid={x:(s.a.x+s.b.x)/2,y:s.a.y};
        s.path=`M ${coords(s.a)} C ${s.mid.x-35} ${s.a.y} ${s.mid.x-35} ${s.a.y+34} ${s.mid.x} ${s.a.y+34} C ${s.mid.x+35} ${s.b.y+34} ${s.mid.x+35} ${s.b.y} ${coords(s.b)}`;
        s.mid.y+=34;
      } else {
        s.a=point(buttons[0],host,0,.5); s.b=point(buttons[1],host,0,.5);
        const x=20;
        s.mid={x,y:(s.a.y+s.b.y)/2};
        s.path=`M ${coords(s.a)} H ${x+14} Q ${x} ${s.a.y} ${x} ${s.a.y+14} V ${s.b.y-14} Q ${x} ${s.b.y} ${x+14} ${s.b.y} H ${s.b.x}`;
      }
    }
  }
  function setPath(s,d) {s.wash.setAttribute('d',d);s.line.setAttribute('d',d);}
  function circle(el,p,r) {el.setAttribute('cx',p.x);el.setAttribute('cy',p.y);if(r!==undefined)el.setAttribute('r',r);}
  function draw(s,now) {
    const still=reduce.matches||paused;
    const p=still?1:smooth(clamp((scrollY+innerHeight*.8-s.top)/(s.h+innerHeight*.25)));
    if(s===hero) {
      const {a,b,mid}=s, gap=b.x-a.x;
      const loose=[a,{x:mid.x-gap*.25,y:mid.y-50},{x:mid.x+gap*.24,y:mid.y+64},{x:mid.x-gap*.24,y:mid.y+50},{x:mid.x+gap*.25,y:mid.y-45},b];
      const ordered=[a,{x:a.x+gap*.2,y:mid.y+10},{x:mid.x-gap*.12,y:mid.y+27},{x:mid.x+gap*.12,y:mid.y+27},{x:b.x-gap*.2,y:mid.y+10},b];
      const pts=loose.map((v,i)=>({x:v.x+(ordered[i].x-v.x)*p,y:Math.min(s.safeBottom,v.y+(ordered[i].y-v.y)*p)}));
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
      // The route goes through the actual numbered centres, never through copy.
      const y=pts[0].y-24;
      let d=`M ${pts[0].x} ${y}`;
      pts.forEach((pt,i)=>{
        const prev=i?pts[i-1]:{x:pt.x,y};
        const bend=(1-p)*(i%2?-12:12);
        d+=` C ${prev.x+bend} ${(prev.y+pt.y)/2} ${pt.x-bend} ${(prev.y+pt.y)/2} ${coords(pt)}`;
      });
      setPath(s,d);
      const focus=scrollY+innerHeight*.52-s.top;
      const yy=still?pts.at(-1).y:Math.max(pts[0].y,Math.min(pts.at(-1).y,focus));
      circle(s.dot,{x:pts[0].x,y:yy},6);
      s.ends.forEach(el=>el.style.display='none');
      let active=0;pts.forEach((pt,i)=>{if(yy>=pt.y-18)active=i;});
      steps.forEach((el,i)=>el.classList.toggle('motion-current',!still&&i===active));
    } else {
      setPath(s,s.path);
      s.line.style.strokeDasharray='1';s.line.style.strokeDashoffset=still?'0':String(1-clamp(p*1.7));
      circle(s.ends[0],s.a,7);circle(s.ends[1],s.b,7);
      // The loose mark ends as one small, complete ring joining both routes.
      circle(s.dot,s.mid,still?9:5+4*p);
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
