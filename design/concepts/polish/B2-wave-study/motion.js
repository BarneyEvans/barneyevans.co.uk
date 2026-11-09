/* One signal: a broad human welcome, four sampled lesson markers, a settled contact. */
(() => {
  'use strict';
  const ns = 'http://www.w3.org/2000/svg';
  const main = document.querySelector('main');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('#motion-toggle');
  const visual = document.querySelector('.hero-visual');
  const steps = [...document.querySelectorAll('.step-number')];
  const contacts = [...document.querySelectorAll('.contact-pair>div')];
  const clamp = n => Math.max(0, Math.min(1, n));
  const make = (tag, attrs, parent) => {
    const el = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    parent.append(el); return el;
  };
  const art = make('svg', {class:'wave-journey', 'aria-hidden':'true', focusable:'false'}, main);
  const defs = make('defs', {}, art);
  const gradient = make('linearGradient', {id:'wave-colour', gradientUnits:'userSpaceOnUse', x1:0,y1:0,x2:1440,y2:0}, defs);
  make('stop', {offset:'0%', 'stop-color':'#bd789f'}, gradient);
  make('stop', {offset:'100%', 'stop-color':'#74a7c8'}, gradient);
  const path = cls => make('path', {class:cls, fill:'none'}, art);
  const rail = path('journey-rail');
  const travelling = path('travelling-wave');
  const traveller = make('circle', {r:5, class:'traveller', opacity:0}, art);
  const welcome = path('welcome-wave');
  const welcomeEdge = path('welcome-edge');
  const gathering = path('gathering-wave');
  const gatheringEdge = path('gathering-edge');
  const lesson = path('lesson-wave');
  const lessonBody = path('lesson-body');
  const samples = Array.from({length:49}, () => make('circle', {r:3.8, class:'wave-sample', opacity:0}, art));
  const endings = contacts.map(() => ({body:path('contact-body'), line:path('contact-wave'), dot:make('circle',{r:6,class:'contact-dot', opacity:0},art)}));
  let box, opening, gatheringBox, marks, ends, top, height, gutter, exitY, queued=0, dirty=true, paused=false;
  let pointer = {x:0,y:0,active:false};
  const curve = points => points.map((p,i) => `${i?'L':'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  function measure() {
    const r = main.getBoundingClientRect(); top = r.top + scrollY; height = r.height;
    const relative = el => { const b=el.getBoundingClientRect();return {x:b.left,y:b.top+scrollY-top,w:b.width,h:b.height}; };
    const v = relative(visual); const pair=relative(document.querySelector('.portrait-pair'));
    box={x:v.x-10,y:pair.y+pair.h*.31,w:v.w+20,h:pair.h};
    const copy=relative(document.querySelector('.hero-copy'));
    opening={x:copy.x-24,y:Math.max(copy.y+copy.h+44,v.y+v.h+34),w:box.x+box.w-copy.x+24};
    marks=steps.map(el=>{const b=relative(el);return {x:b.x+b.w/2,y:b.y+b.h/2};});
    const lessonBox=relative(document.querySelector('.lessons'));
    gatheringBox={x:lessonBox.x+8,y:marks[0].y-77,w:lessonBox.w-16};
    ends=contacts.map(el=>{const b=relative(el);return {x:b.x,y:b.y+22,w:b.w,h:b.h};});
    gutter=Math.max(8,(document.querySelector('.subjects').getBoundingClientRect().left)*.45);
    art.setAttribute('width',innerWidth);art.setAttribute('height',height);
    gradient.setAttribute('x2',innerWidth);
    const first=marks[0], last=ends[ends.length-1];
    const exit=relative(document.querySelector('.hero'));
    exitY=exit.y+exit.h-16;
    const right=innerWidth-gutter/2;
    const lead=innerWidth>760?`M${opening.x} ${opening.y} Q${gutter} ${opening.y} ${gutter} ${opening.y+30}`:`M${box.x+box.w} ${box.y} Q${right} ${box.y} ${right} ${box.y+35} L${right} ${exitY-20} Q${right} ${exitY} ${right-20} ${exitY} L${gutter+20} ${exitY} Q${gutter} ${exitY} ${gutter} ${exitY+20}`;
    rail.setAttribute('d',`${lead} L${gutter} ${first.y-40} Q${gutter} ${first.y} ${first.x} ${first.y} M${gutter} ${first.y-40} L${gutter} ${last.y-30} Q${gutter} ${last.y} ${last.x} ${last.y}`);
    dirty=false;
  }
  const visible = (y,h=0) => y+top+h>scrollY-80 && y+top<scrollY+innerHeight+80;
  const progress = (y,h) => clamp((scrollY+innerHeight-top-y)/(innerHeight+h));
  const ease = n => {const p=clamp(n);return p*p*(3-2*p);};
  // The same tapered crest and trough recur at the welcome, gathering and contact.
  const wave = (t,phase=0) => Math.sin(t*Math.PI*2+phase)*Math.sin(t*Math.PI);
  function render() {
    queued=0;if(document.hidden)return;if(dirty)measure();
    const still=media.matches||paused;
    if(still||visible(box.y-box.h/2,box.h)) {
      const phase=still?0:progress(box.y,box.h)*1.6;
      const desktop=innerWidth>760;
      const pts=Array.from({length:81},(_,i)=>{
        const t=i/80,x=box.x+t*box.w;
        const pull=pointer.active&&!still?pointer.y*Math.exp(-Math.pow((x-pointer.x)/95,2)):0;
        return {x,y:box.y+wave(t,phase)*box.h*.24+pull};
      });
      let d=curve(pts);
      if(desktop){
        // A broad sweep beneath the facts turns through spare space outside the
        // portraits. Its curve never needs to pass between prices and faces.
        const sweep=Array.from({length:81},(_,i)=>{const t=i/80;return{x:opening.x+t*opening.w,y:opening.y+wave(t,phase)*18};});
        const end=pts[80],outer=Math.min(innerWidth-34,end.x+94);
        d=curve(sweep)+` C${outer} ${opening.y} ${outer} ${end.y} ${end.x} ${end.y} `+pts.slice(0,-1).reverse().map(p=>`L${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
      }
      welcome.setAttribute('d',d);welcomeEdge.setAttribute('d',d);
    }
    const first=marks[0],last=marks[3],vertical=innerWidth<=760;
    if(still||visible(gatheringBox.y-45,150)) {
      // A full-width wave first widens, then gathers into the first lesson sample.
      // The movement uses the reserved gap below the timetable heading.
      const arrival=still?1:clamp((scrollY+innerHeight*.86-top-gatheringBox.y)/(innerHeight*.42));
      const gather=ease((arrival-.28)/.72);
      const width=gatheringBox.w*(1-gather)+34*gather;
      const start=gatheringBox.x*(1-gather)+(first.x-17)*gather;
      const y=gatheringBox.y+(first.y-gatheringBox.y)*gather;
      const amplitude=(20+Math.sin(arrival*Math.PI)*18)*(1-gather);
      const pts=Array.from({length:81},(_,i)=>{const t=i/80;return{x:start+t*width,y:y+wave(t)*amplitude};});
      gathering.setAttribute('d',curve(pts));gatheringEdge.setAttribute('d',curve(pts));
      gathering.style.opacity=((1-gather)*.34).toFixed(2);
      gatheringEdge.style.opacity=((1-gather)*.9).toFixed(2);
    }
    // A visible packet of this same wave accompanies the reading position.
    // Its entire width is reserved in the gutter; it never crosses the copy.
    const focus=scrollY+innerHeight*.43-top;
    const packetVisible=!still && focus>exitY+100 && focus<ends[0].y-100 &&
      (focus<first.y-100 || focus>last.y+130);
    travelling.style.opacity=packetVisible?'1':'0';
    traveller.style.opacity=packetVisible?'1':'0';
    if(packetVisible){
      const amplitude=Math.min(24,gutter*.48);
      const packet=Array.from({length:49},(_,i)=>{const t=i/48;return{x:gutter+Math.sin(t*Math.PI*4)*Math.sin(t*Math.PI)*amplitude,y:focus-90+t*180};});
      travelling.setAttribute('d',curve(packet));
      traveller.setAttribute('cx',gutter);traveller.setAttribute('cy',focus);
    }
    if(still||visible(first.y-30,last.y-first.y+180)) {
      const p=still?1:clamp(progress(first.y,last.y-first.y+120)*1.7);
      const sampled=clamp((p-.12)/.65);
      const pts=Array.from({length:97},(_,i)=>{
        const t=i/96,segment=Math.min(2,Math.floor(t*3)),q=t*3-segment;
        const a=marks[segment],b=marks[segment+1];
        const wave=Math.sin(t*Math.PI*6)*(vertical?19:22);
        return {x:a.x+(b.x-a.x)*q+(vertical?wave:0),y:a.y+(b.y-a.y)*q+(vertical?0:wave)};
      });
      lesson.setAttribute('d',curve(pts));lesson.style.opacity=(1-sampled*.9).toFixed(2);
      lessonBody.setAttribute('d',curve(pts));lessonBody.style.opacity=((1-sampled)*.28).toFixed(2);
      samples.forEach((dot,i)=>{const point=pts[i*2];dot.setAttribute('cx',point.x);dot.setAttribute('cy',point.y);dot.style.opacity=(.12+sampled*.88).toFixed(2);});
    }
    ends.forEach((b,i)=>{
      if(!still&&!visible(b.y,b.h))return;
      // Regain the opening profile, hold it briefly, then settle before the actions.
      const arrival=clamp((scrollY+innerHeight-top-b.y)/Math.min(innerHeight*.45,b.h));
      const settle=still?1:ease((arrival-.32)/.68);
      const pts=Array.from({length:65},(_,j)=>{const t=j/64;return{x:b.x+t*b.w,y:b.y+wave(t)*(1-settle)*49};});
      endings[i].line.setAttribute('d',curve(pts));
      endings[i].body.setAttribute('d',curve(pts));
      endings[i].dot.setAttribute('cx',b.x+b.w/2);endings[i].dot.setAttribute('cy',b.y);
      endings[i].dot.style.opacity=(.35+settle*.65).toFixed(2);
    });
  }
  function request(){if(!queued&&!document.hidden)queued=requestAnimationFrame(render);}
  function layout(){dirty=true;request();}
  function release(){pointer.active=false;request();}
  function respond(e){if(media.matches||paused)return;const r=visual.getBoundingClientRect();pointer={x:e.clientX,y:((e.clientY-r.top)/r.height-.5)*50,active:true};request();}
  visual.addEventListener('pointermove',respond,{passive:true});
  visual.addEventListener('pointerdown',respond,{passive:true});
  ['pointerleave','pointerup','pointercancel'].forEach(type=>visual.addEventListener(type,release));
  function sync(){toggle.disabled=media.matches;toggle.textContent=media.matches?'Wave motion off':paused?'Resume wave':'Pause wave';toggle.setAttribute('aria-pressed',String(paused||media.matches));release();}
  toggle.addEventListener('click',()=>{paused=!paused;sync();});
  media.addEventListener('change',sync);
  addEventListener('scroll',request,{passive:true});addEventListener('resize',layout,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(queued);queued=0;}else request();});
  new ResizeObserver(layout).observe(main);
  document.fonts.ready.then(layout);
  sync();
})();
