/* One finite document-coordinate world. 1 = Barney, 2 = Eugene.
   Immigration Life: Conway B3/S23, with majority-parent species at birth. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const canvas = document.createElement('div'), tiles = [], tileHeight = 512;
  canvas.id='garden';canvas.setAttribute('aria-hidden','true');document.querySelector('#garden').replaceWith(canvas);
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const pauses = [...document.querySelectorAll('[data-pause]')];
  const speciesButton = document.querySelector('#species');
  const status = document.querySelector('#garden-status');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const stepEls = [...document.querySelectorAll('.lesson-path li')];
  const light = document.querySelector('.journey-light');
  const daylight = document.querySelector('.daylight');
  const archLight = document.querySelector('.glass-arch span');
  const contactSun = document.querySelector('.contact-sun');
  const lessonPath = document.querySelector('.lesson-path');
  // G12 Round 5's scroll coordinate and 100ms finite-tail easing, in G1's world.
  const lens=document.createElement('canvas'),lensContext=lens.getContext('2d');
  const coreCanvas=document.createElement('canvas'),coreContext=coreCanvas.getContext('2d');
  coreCanvas.className='light-core';light.append(lens,coreCanvas);
  const lensSize=480,smallRadius=8,smoothingSeconds=.1,mainTop=0;
  let route=[],stops=[],distance=0,velocity=0,targetDistance=0,phase='settled';
  let lastScrollPosition=scrollY,lastScrollTime=performance.now();
  let opening=1,settledStop=0,lightRadius=smallRadius,paintedStop=-1,lightPoint=null;
  const field=document.createElement('canvas');field.width=field.height=512;
  const fg=field.getContext('2d'),optical=fg.createRadialGradient(240,220,8,256,256,250);
  optical.addColorStop(0,'#fff9dccc');optical.addColorStop(.22,'#efd18cd9');optical.addColorStop(.5,'#edc56d88');optical.addColorStop(1,'#edce8500');
  fg.fillStyle=optical;fg.fillRect(0,0,512,512);
  const seed=new Image();seed.onload=()=>{paintedStop=-1;requestDraw();};seed.src='assets/sun-centre.svg';
  const smooth=t=>t*t*t*(t*(t*6-15)+10);
  let quiet=[],quietMask,dirty=true,allDirty=true,lastTick=0,lastStep=0,reducedState=media.matches;
  const sprites=[null,makeSprite('#a9b6a0',false),makeSprite('#b8afc6',true)];
  function makeSprite(tint,round){const c=document.createElement('canvas');c.width=c.height=48;const g=c.getContext('2d');g.filter='blur(1.7px)';g.fillStyle=tint;g.beginPath();g.roundRect(10,10,28,28,round?13:4);g.fill();return c;}
  let chapterGeometry = [], stepTops = [], pageHeight = 0;
  let cells, next, previous, cell, cols, rows, width, height;
  let chosen = 0, planting = 1, paused = media.matches, raf = 0;
  let changedAt = 0, generation = 0, pointer = null, seeded = new Set();
  let day = 0, lastDraw = 0;
  const metrics = { solverMs: [], drawMs: [], generations: 0, planted: 0, chapterSeeds: [] };
  const glider = [[1,0],[2,1],[0,2],[1,2],[2,2]];
  const pulsar = [];
  [0,5,7,12].forEach(y => [2,3,4,8,9,10].forEach(x => pulsar.push([x,y])));
  [2,3,4,8,9,10].forEach(y => [0,5,7,12].forEach(x => pulsar.push([x,y])));
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const documentY = el => el.getBoundingClientRect().top + scrollY;

  function put(x,y,species,pattern = species === 1 ? glider : pulsar,mirror = false) {
    const maxX = Math.max(...pattern.map(p => p[0]));
    pattern.forEach(([dx,dy]) => {
      const xx = Math.round(x + (mirror ? maxX-dx : dx)), yy = Math.round(y+dy);
      if (xx>0 && xx<cols-1 && yy>0 && yy<rows-1) cells[yy*cols+xx] = species;
    });
  }

  function seedChapter(chapter) {
    if (seeded.has(chapter.id)) return;
    seeded.add(chapter.id);
    const y = Math.floor(documentY(chapter)/cell);
    const h = Math.floor(chapter.offsetHeight/cell);
    const spread = 1;
    for (let k=0;k<spread;k++) {
      const bedY=y+3+k*Math.max(19,Math.floor(h/spread));
      put(1,bedY,1);
      put(cols-15,y+8+k*Math.max(16,Math.floor(h/spread)),2);
    }
    if (chapter.id === 'tutors') {
      const cy = Math.floor((documentY(document.querySelector('.garden-crossing'))+70)/cell);
      const mid = Math.floor(cols/2);
      put(mid-12,cy,1);
      put(mid+1,cy-4,2);
      // An adjoining collision patch gives the two populations a shared border.
      put(mid-2,cy+5,1,[[0,0],[1,0],[0,1],[1,2],[2,1]]);
      put(mid+1,cy+5,2,[[0,0],[1,0],[2,1],[0,2],[1,2]]);
    }
    metrics.chapterSeeds.push(chapter.id);
    changedAt = performance.now();
  }

  function setup(){
    const old=cells,oldCols=cols,oldRows=rows;
    width=innerWidth;height=innerHeight;
    pageHeight=Math.round(document.querySelector('footer').getBoundingClientRect().bottom+scrollY);
    cell=Math.max(width<760?14:22,Math.ceil(width/140),Math.ceil(pageHeight/900));
    cols=Math.ceil(width/cell)+1;rows=Math.ceil(pageHeight/cell)+2;
    cells=new Uint8Array(cols*rows);next=new Uint8Array(cells.length);
    if(old){for(let y=0;y<Math.min(rows,oldRows);y++)for(let x=0;x<Math.min(cols,oldCols);x++)cells[y*cols+x]=old[y*oldCols+x];}
    else{put(2,Math.floor(235/cell),1);put(cols-15,Math.floor(440/cell),2);put(2,Math.floor(690/cell),1);if(media.matches)chapters.forEach(seedChapter);}
    previous=cells.slice();
    canvas.style.height=pageHeight+'px';
    light.style.height=pageHeight+'px';
    const count=Math.ceil(pageHeight/tileHeight);
    while(tiles.length>count)tiles.pop().element.remove();
    for(let i=0;i<count;i++){
      if(!tiles[i]){const element=document.createElement('canvas');canvas.append(element);tiles.push({element,ctx:element.getContext('2d')});}
      const tile=tiles[i];tile.top=i*tileHeight;const size=Math.min(tileHeight,pageHeight-tile.top);
      tile.element.width=Math.ceil(width/2);tile.element.height=Math.ceil(size/2);tile.element.style.top=tile.top+'px';tile.element.style.height=size+'px';
      tile.ctx.setTransform(tile.element.width/width,0,0,tile.element.height/size,0,-tile.top*tile.element.height/size);
    }
    quiet=[];
    const walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode;if(!node.textContent.trim()||node.parentElement.closest('.sr-only,.step-seed,.tutor-card:not(.flipped) .tutor-back,.tutor-card.flipped .tutor-front'))continue;
      const range=document.createRange();range.selectNodeContents(node);
      for(const r of range.getClientRects())if(r.width&&r.height)quiet.push({x:r.left,y:r.top+scrollY,right:r.right,bottom:r.bottom+scrollY});
    }
    document.querySelectorAll('img,a.button,button,footer').forEach(el=>{const r=el.getBoundingClientRect();if(r.width&&r.height)quiet.push({x:r.left,y:r.top+scrollY,right:r.right,bottom:r.bottom+scrollY});});
    quietMask=new Uint8Array(cols*rows);const pad=cell+5;
    for(const r of quiet){const x0=Math.max(0,Math.floor((r.x-pad)/cell)),x1=Math.min(cols-1,Math.ceil((r.right+pad)/cell)),y0=Math.max(0,Math.floor((r.y-pad)/cell)),y1=Math.min(rows-1,Math.ceil((r.bottom+pad)/cell));for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)quietMask[y*cols+x]=1;}
    const dpr=Math.min(devicePixelRatio||1,2);
    lens.width=lens.height=lensSize*dpr;lensContext.setTransform(dpr,0,0,dpr,0,0);
    coreCanvas.width=coreCanvas.height=64*dpr;coreContext.setTransform(dpr,0,0,dpr,0,0);
    const glow=coreContext.createRadialGradient(32,32,0,32,32,29);
    glow.addColorStop(0,'#fff9dc');glow.addColorStop(.3,'#efd18c');glow.addColorStop(.58,'#d2a458cc');glow.addColorStop(1,'#edce8500');
    coreContext.fillStyle=glow;coreContext.fillRect(0,0,64,64);paintedStop=-1;
    measureJourney();dirty=allDirty=true;requestDraw();
  }

  function measureJourney(){
    chapterGeometry=chapters.map(el=>({el,top:documentY(el)}));
    stepTops=stepEls.map(el=>documentY(el));
    const rect=el=>{const r=el.getBoundingClientRect();return {x:r.left,y:r.top+scrollY,width:r.width,height:r.height,right:r.right,bottom:r.bottom+scrollY};};
    const mobile=width<=760,horizontal=1.19;
    const portraits=[...document.querySelectorAll('.portrait-crop')].map(rect);
    const crownY=Math.min(...portraits.map(p=>p.y))-60;
    const pairPoints=portraits.map(p=>({x:p.x+p.width/2,y:crownY}));
    const markerPoints=stepEls.map(el=>{const r=rect(el.querySelector('.step-seed'));return {x:r.x+r.width/2,y:r.y+r.height/2};});
    const bed=rect(document.querySelector('.planting-bed')),plantPoint={x:bed.x+bed.width/2,y:bed.y+bed.height/2};
    const contact=rect(document.querySelector('#contact')),restPoint={x:contact.x+contact.width/2,y:contact.y+70};
    const rail=mobile?11:Math.max(16,bed.x/2),first=markerPoints[0],last=markerPoints.at(-1),maxScroll=pageHeight-height;
    const plantAt=plantPoint.y-height*.55,firstAt=first.y-height*(mobile?.55:.48);
    let nodes;
    if(mobile){
      const meeting=Math.max(0,crownY-height*.8),second=meeting+(pairPoints[1].x-pairPoints[0].x)/horizontal;
      const restAt=Math.min(maxScroll,restPoint.y-height*.35),crossY=contact.y-12;
      const drop=(restPoint.y-crossY)/1.5,cross=Math.abs(restPoint.x-rail)/horizontal;
      nodes=[
        {...pairPoints[0],at:meeting,stop:0},{...pairPoints[1],at:second,stop:1},
        {x:rail,y:crownY,at:second+Math.abs(pairPoints[1].x-rail)/horizontal},
        {x:rail,y:plantPoint.y,at:plantAt-Math.abs(plantPoint.x-rail)/horizontal},
        {...plantPoint,at:plantAt,stop:2},
        {x:rail,y:plantPoint.y,at:plantAt+Math.abs(plantPoint.x-rail)/horizontal},
        {x:rail,y:first.y,at:firstAt-Math.abs(first.x-rail)/horizontal},
        ...markerPoints.map((p,i)=>({...p,at:p.y-height*.55,stop:i+3})),
        {x:rail,y:last.y,at:last.y-height*.55+Math.abs(last.x-rail)/horizontal},
        {x:rail,y:crossY,at:restAt-drop-cross},
        {x:restPoint.x,y:crossY,at:restAt-drop},
        {...restPoint,at:restAt,stop:7}
      ];
    }else{
      // The right rail avoids the headline and prices. Its vertical catch-up
      // borrows scroll from the long subject chapter, then crosses the empty bed.
      const right=width-rail,second=(pairPoints[1].x-pairPoints[0].x)/horizontal;
      const exitAt=second+(right-pairPoints[1].x)/horizontal;
      const enterAt=plantPoint.y-height*.85,meeting=enterAt+(right-plantPoint.x)/horizontal;
      const gutter=plantPoint.x,below=rect(document.querySelector('.lesson-path')).bottom+20;
      const lastAt=last.y-height*.48,belowAt=lastAt+(below-last.y)/1.5;
      const gutterAt=belowAt+Math.abs(last.x-gutter)/horizontal;
      nodes=[
        {...pairPoints[0],at:0,stop:0},{...pairPoints[1],at:second,stop:1},
        {x:right,y:crownY,at:exitAt},{x:right,y:plantPoint.y,at:enterAt},
        {...plantPoint,at:meeting,stop:2},
        {x:gutter,y:first.y,at:firstAt-Math.abs(first.x-gutter)/horizontal},
        ...markerPoints.map((p,i)=>({...p,at:p.y-height*.48,stop:i+3})),
        {x:last.x,y:below,at:belowAt},{x:gutter,y:below,at:gutterAt},
        {...restPoint,at:Math.min(maxScroll,restPoint.y-height*.4),stop:7}
      ];
    }
    // Small, rounded margin corners retain their allocated scroll intervals.
    route=[];stops=[];
    const append=p=>{const prev=route.at(-1);route.push({...p,s:prev?prev.s+Math.hypot(p.x-prev.x,p.y-prev.y):0});};
    const line=p=>{
      const a=route.at(-1),length=Math.hypot(p.x-a.x,p.y-a.y),n=Math.max(1,Math.ceil(length/3));
      for(let j=1;j<=n;j++){const t=j/n;append({x:a.x+(p.x-a.x)*t,y:a.y+(p.y-a.y)*t,at:a.at+(p.at-a.at)*t});}
    };
    append(nodes[0]);nodes[0].s=0;stops.push(nodes[0]);
    for(let i=1;i<nodes.length;i++){
      const a=nodes[i-1],b=nodes[i],c=nodes[i+1];
      if(b.stop===undefined&&c){
        const before=Math.hypot(b.x-a.x,b.y-a.y),after=Math.hypot(c.x-b.x,c.y-b.y);
        const r=Math.min(14,before/4,after/4);
        const entry={x:b.x+(a.x-b.x)*r/before,y:b.y+(a.y-b.y)*r/before,at:b.at-(b.at-a.at)*r/before};
        const leave={x:b.x+(c.x-b.x)*r/after,y:b.y+(c.y-b.y)*r/after,at:b.at+(c.at-b.at)*r/after};
        line(entry);
        for(let j=1;j<=20;j++){const t=j/20,u=1-t;append({x:u*u*entry.x+2*u*t*b.x+t*t*leave.x,y:u*u*entry.y+2*u*t*b.y+t*t*leave.y,at:u*u*entry.at+2*u*t*b.at+t*t*leave.at});if(j===10)b.s=route.at(-1).s;}
      }else{line(b);b.s=route.at(-1).s;}
      stops.push(b);
    }
    const visits=stops.filter(p=>p.stop!==undefined);
    visits.forEach((p,i)=>{
      p.radius=clearanceAt(p,150);
      // G1's close, stacked lesson stops need a shorter opening span so the
      // pool always gathers fully into the round travelling light between them.
      const gap=Math.min(i?p.s-visits[i-1].s:Infinity,i+1<visits.length?visits[i+1].s-p.s:Infinity);
      p.openingSpan=Math.min(p.stop===7?85:mobile?60:70,gap*.42);
    });
    if(!lightPoint||!paused&&!media.matches)distance=scrollTarget();
    else distance=Math.min(distance,route.at(-1).s);
    if(media.matches){const nearest=nearestStop(distance);distance=nearest.s;settledStop=nearest.stop;opening=1;phase='settled';}
    lightPoint=pointAt(distance);
  }
  function clearanceAt(p,limit){
    for(const r of quiet){const dx=Math.max(r.x-7-p.x,0,p.x-r.right-7),dy=Math.max(r.y-7-p.y,0,p.y-r.bottom-7);limit=Math.min(limit,Math.hypot(dx,dy));}
    return Math.max(smallRadius,limit);
  }
  function pointAt(s){
    let lo=0,hi=route.length-1;
    while(lo+1<hi){const m=(lo+hi)>>1;if(route[m].s<s)lo=m;else hi=m;}
    const a=route[lo],b=route[hi],t=Math.max(0,Math.min(1,(s-a.s)/(b.s-a.s||1)));
    return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
  }
  function scrollTarget(y=scrollY){
    let lo=0,hi=route.length-1;
    while(lo+1<hi){const m=(lo+hi)>>1;if(route[m].at<y)lo=m;else hi=m;}
    const a=route[lo],b=route[hi],t=Math.max(0,Math.min(1,(y-a.at)/(b.at-a.at||1)));
    return a.s+(b.s-a.s)*t;
  }
  function nearestStop(s){return stops.filter(p=>p.stop!==undefined).reduce((a,b)=>Math.abs(a.s-s)<Math.abs(b.s-s)?a:b);}
  function travel(dt){
    if(!stops.length)return;
    targetDistance=scrollTarget();
    if(!paused&&!media.matches){
      const previous=distance;
      // A 100ms exponential follows input without a speed cap or queue. Its
      // smooth finite tail finishes at 280ms, reserving one paint interval
      // within the 300ms settling budget after the last native scroll;
      // otherwise a large flick would leave a visible exponential remainder.
      const now=performance.now();
      if(scrollY!==lastScrollPosition){lastScrollPosition=scrollY;lastScrollTime=now;}
      const age=Math.max(0,(now-lastScrollTime)/1000);
      const tail=t=>{const u=Math.max(0,Math.min(1,(t-.1)/.18));return (1-u*u)**2;};
      const residual=Math.exp(-dt/smoothingSeconds)*tail(age)/(tail(Math.max(0,age-dt))||1);
      distance+=(targetDistance-distance)*(1-residual);
      if(Math.abs(targetDistance-distance)<.05)distance=targetDistance;
      velocity=dt?(distance-previous)/dt:0;
      const stop=nearestStop(distance),gap=Math.abs(distance-stop.s);
      settledStop=stop.stop;
      // Shape is scrubbed by the same route coordinate as position. Pausing
      // halfway or reversing scroll therefore preserves/reverses the opening.
      opening=1-smooth(Math.min(1,gap/stop.openingSpan));
      phase=opening>.999?'settled':opening>0?'scrub':'travel';
    }
    lightPoint=pointAt(distance);
    const first=stops.find(p=>p.stop===3),last=stops.find(p=>p.stop===6);
    const path=media.matches?1:clamp((distance-first.s)/(last.s-first.s),0,1);
    lessonPath.style.setProperty('--path',path);
    stepEls.forEach((el,i)=>el.classList.toggle('active',media.matches||distance>=stops.find(p=>p.stop===i+3).s));
    drawLight();
  }
  function drawLight(){
    const stop=stops.find(p=>p.stop===settledStop);
    lightRadius=smallRadius+((opening?Math.min(stop.radius,clearanceAt(lightPoint,stop.radius)):stop.radius)-smallRadius)*opening;
    // Paint an arrival only once. Opening uses compositor scale/opacity, so
    // even the full oval does not need a new canvas raster every frame.
    if(paintedStop!==settledStop){
      const g=lensContext,half=lensSize/2,r=stop.radius;
      g.clearRect(0,0,lensSize,lensSize);g.save();g.translate(half,half);
      g.drawImage(field,-r,-r,r*2,r*2);
      g.strokeStyle='#ba8b4266';g.lineWidth=1;
      g.beginPath();g.ellipse(0,0,Math.min(r,innerWidth<=700?75:115),Math.min(r*.53,innerWidth<=700?40:65),-.5,0,Math.PI*2);g.stroke();
      g.strokeStyle='#ba8b42aa';g.beginPath();g.ellipse(0,0,Math.min(27.84,r-.5),Math.min(17.98,r*.6),-.55,0,Math.PI*2);g.stroke();
      if(seed.complete&&seed.naturalWidth){const h=Math.min(70,r*1.4);g.drawImage(seed,-h*.4,-h/2,h*.8,h);}
      g.restore();paintedStop=settledStop;
    }
    const x=lightPoint.x,y=lightPoint.y-mainTop;
    lens.style.transform='translate3d('+(x-lensSize/2)+'px,'+(y-lensSize/2)+'px,0) scale('+(lightRadius/stop.radius)+')';
    lens.style.opacity=String(opening);
    coreCanvas.style.opacity=String(1-opening*.85);
    coreCanvas.style.transform='translate3d('+(x-32)+'px,'+(y-32)+'px,0) scale('+((smallRadius+(Math.min(29,lightRadius)-smallRadius)*opening)/29)+')';
  }
  function evolve() {
    const begin = performance.now();
    next.set(cells);
    const from=Math.max(1,Math.floor(scrollY/cell)-8),to=Math.min(rows-1,Math.ceil((scrollY+height)/cell)+8);
    for(let y=from;y<to;y++) for(let x=1;x<cols-1;x++) {
      const i=y*cols+x;next[i]=0;
      let count=0,sage=0;
      for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) {
        if(!dx&&!dy) continue;
        const n=cells[i+dy*cols+dx];
        if(n) {count++; if(n===1) sage++;}
      }
      if(cells[i] && (count===2||count===3)) next[i]=cells[i];
      else if(!cells[i] && count===3) next[i]=sage>=2?1:2;
    }
    previous.set(cells); [cells,next]=[next,cells];
    generation++; metrics.generations=generation;
    changedAt=performance.now();
    metrics.solverMs.push(changedAt-begin);
    if(metrics.solverMs.length>120) metrics.solverMs.shift();
    // The running tick owns the next frame; evolution only invalidates paint.
    dirty=true;
  }

  function draw(now,all=false){
    const start=performance.now(),t=media.matches||paused?1:clamp((now-changedAt)/560,0,1),eased=t*t*(3-2*t);
    const visible=tiles.filter(tile=>all||(tile.top+tileHeight>scrollY-64&&tile.top<scrollY+height+64));
    for(const tile of visible){
      const ctx=tile.ctx;ctx.clearRect(0,tile.top,width,tileHeight);
      const first=Math.max(0,Math.floor(tile.top/cell)-1),end=Math.min(rows,Math.ceil((tile.top+tileHeight)/cell)+1);
      for(let y=first;y<end;y++)for(let x=0;x<cols;x++){
        const i=y*cols+x,s=cells[i],old=previous[i];if((!s&&!old)||quietMask[i])continue;
        const active=s||old,selection=chosen&&active!==chosen?.22:chosen?.95:.65;
        const alpha=(s?old?1:eased:1-eased)*selection;if(alpha<.005)continue;
        ctx.globalAlpha=alpha;const size=cell*1.24;ctx.drawImage(sprites[active],x*cell+(cell-size)/2,y*cell+(cell-size)/2,size,size);
      }
    }
    lastDraw=performance.now()-start;metrics.drawMs.push(lastDraw);if(metrics.drawMs.length>240)metrics.drawMs.shift();
    dirty=t<1&&!paused&&!media.matches;
  }
  function scrollStory(dt=0) {
    if(!cells) return;
    if(media.matches && !paused) {paused=true;schedule();}
    day=clamp(scrollY/Math.max(1,pageHeight-height),0,1);
    // Each bed belongs to this same world. Scroll introduces increasing density.
    chapterGeometry.forEach(({el,top})=>{
      if(top-scrollY<height*.94) seedChapter(el);
    });
    const daylightValue=media.matches?'.55':day.toFixed(4);
    daylight.style.setProperty('--day',daylightValue);
    archLight.style.setProperty('--day',daylightValue);
    contactSun.style.setProperty('--day',daylightValue);
    travel(dt);
  }

  function tick(now){
    raf=0;if(document.hidden||!cells)return;
    if(media.matches!==reducedState){syncReducedMotion();return;}
    if(!paused&&!media.matches&&lastTick&&now-lastTick<1000/60){raf=requestAnimationFrame(tick);return;}
    const dt=lastTick?(now-lastTick)/1000:0;lastTick=now;
    scrollStory(dt);
    if(!paused&&!media.matches&&now-lastStep>1050){evolve();lastStep=now;}
    if(allDirty||(paused&&dirty)||(now-lastDrawAt>=64&&(dirty||!paused))){draw(now,allDirty);allDirty=false;lastDrawAt=now;}
    if(!paused&&!media.matches)raf=requestAnimationFrame(tick);
  }
  let lastDrawAt=0;
  function requestDraw(){dirty=true;if(!raf&&!document.hidden)raf=requestAnimationFrame(tick);}
  function schedule(){
    pauses.forEach(pause=>{pause.textContent=media.matches?'Motion off':paused?'Grow ▷':'Pause Ⅱ';pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',media.matches?'Motion off: reduced motion preference':paused?'Resume garden growth':'Pause garden growth');});
    if(raf){cancelAnimationFrame(raf);raf=0;}lastTick=0;requestDraw();
  }
  function syncReducedMotion(){
    const requested=media.matches;if(requested===reducedState)return;reducedState=requested;paused=requested;
    if(requested){
      chapters.forEach(seedChapter);allDirty=true;
      const nearest=nearestStop(distance);distance=nearest.s;settledStop=nearest.stop;phase='settled';opening=1;velocity=0;paintedStop=-1;
      travel(0);
    }
    schedule();
  }
  pauses.forEach(pause=>pause.addEventListener('click',()=>{
    if(media.matches) { status.textContent='Motion is off. You can still choose a tutor and plant a still pattern.'; return; }
    paused=!paused; schedule(); requestDraw();
    status.textContent=paused?'Garden paused.':'Garden growing.';
  }));

  function choose(species) {
    chosen=species; document.body.dataset.choice=String(species);
    document.querySelectorAll('.subject-select').forEach(el=>el.setAttribute('aria-pressed',String(+el.dataset.choose===species)));
    requestDraw();
  }
  document.querySelectorAll('[data-choose]').forEach(el=>el.addEventListener('click',()=>choose(+el.dataset.choose)));
  document.querySelectorAll('.tutor-card').forEach(card=>{
    card.addEventListener('click',()=>choose(+card.dataset.species));
    const back=card.querySelector('.tutor-back');
    const button=card.querySelector('.flip-button');
    const veil=card.querySelector('.cell-veil');
    for(let n=0;n<88;n++) {const i=document.createElement('i');i.style.setProperty('--i',String((n%8)*3+Math.floor(n/8)));veil.appendChild(i);}
    function syncTabs() {back.querySelectorAll('a,summary').forEach(el=>el.tabIndex=card.classList.contains('flipped')?0:-1);}
    syncTabs();
    button.addEventListener('click',()=>{
      if(card.classList.contains('turning')) return;
      const flip=()=>{
        card.classList.toggle('flipped');
        const on=card.classList.contains('flipped');
        button.setAttribute('aria-expanded',String(on));
        button.innerHTML=(on?'Back to ':'More about ')+button.dataset.name+' <span aria-hidden="true">'+(on?'−':'＋')+'</span>';
        syncTabs();
        requestAnimationFrame(()=>{
          setup();
          const heading=card.querySelector(on?'.tutor-back h3':'.tutor-front h3');
          heading.tabIndex=-1;
          heading.focus({preventScroll:true});
          if(card.getBoundingClientRect().top < -30) {
            scrollTo({top:documentY(card)-25,behavior:media.matches?'instant':'smooth'});
          }
        });
      };
      if(media.matches) flip();
      else {
        card.classList.add('turning');
        setTimeout(flip,260);
        setTimeout(()=>card.classList.remove('turning'),900);
      }
    });
  });

  speciesButton.addEventListener('click',()=>{
    planting=planting===1?2:1;
    const name=planting===1?'Barney':'Eugene';
    speciesButton.innerHTML='Plant: '+name+' <span aria-hidden="true">⌄</span>';
    speciesButton.setAttribute('aria-label','Plant pattern: '+name+'. Switch to '+(planting===1?'Eugene':'Barney')+'.');
    status.textContent=name+' selected. Tap empty space to plant, or use Plant +.';
  });
  function plant(x,y) {
    const wide=planting===1?3:13;
    const px=clamp(Math.floor(x/cell)-Math.floor(wide/2),1,Math.max(1,cols-wide-1));
    const py=clamp(Math.floor(y/cell)-Math.floor(wide/2),1,rows-wide-1);
    previous.set(cells);put(px,py,planting);changedAt=performance.now();
    metrics.planted++;
    status.textContent=(planting===1?'Barney’s glider':'Eugene’s pulsar')+' planted.';
    requestDraw();
  }
  document.querySelector('#plant').addEventListener('click',()=>{
    // Put the keyboard-accessible seed into the nearest open garden bed.
    const bed=document.querySelector('.planting-bed');
    plant(width*.55,documentY(bed)+bed.offsetHeight/2);
  });
  document.addEventListener('pointerdown',event=>{
    if(event.target.closest('a,button,summary,header,footer,.quiet,.subject-column,.tutor-card,.lesson-path,.review-pair,.review-source,.contact-inner,.garden-controls')) return;
    pointer={x:event.clientX,y:event.clientY,scroll:scrollY,id:event.pointerId};
  },{passive:true});
  document.addEventListener('pointerup',event=>{
    if(!pointer||pointer.id!==event.pointerId)return;
    const p=pointer;pointer=null;
    if(Math.hypot(event.clientX-p.x,event.clientY-p.y)<9&&Math.abs(scrollY-p.scroll)<9&&!getSelection().toString())plant(event.clientX,event.clientY+scrollY);
  },{passive:true});
  document.addEventListener('pointercancel',()=>pointer=null,{passive:true});
  addEventListener('scroll',()=>{if(!raf&&!document.hidden)raf=requestAnimationFrame(tick);},{passive:true});
  let resizeTimer;
  addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(setup,140);});
  document.querySelectorAll('.tutor-back details').forEach(el=>el.addEventListener('toggle',setup));
  document.addEventListener('visibilitychange',()=>{schedule();if(!document.hidden){scrollStory();requestDraw();}});
  media.addEventListener('change',syncReducedMotion);
  // Small read-only diagnostics for reproducible local performance checks.
  window.greenhouse={snapshot:()=>({generation,paused,chosen,planting,cols,rows,cell,day,live:cells.reduce((n,c)=>n+!!c,0),sage:cells.reduce((n,c)=>n+(c===1),0),lavender:cells.reduce((n,c)=>n+(c===2),0),metrics:JSON.parse(JSON.stringify(metrics))})};
  window.gardenDiagnostics=(motionOnly=false)=>{
    const state={light:lightPoint,stops,route:motionOnly?undefined:route,motion:{phase,opening,radius:lightRadius,distance,targetDistance,velocity,smoothingSeconds,settledStop,target:pointAt(targetDistance),nearestStopDistance:Math.abs(distance-nearestStop(distance).s),backgroundDocumentTop:0}};
    return motionOnly?state:{...state,...greenhouse.snapshot(),reduced:media.matches};
  };
  addEventListener('load',()=>{setup();schedule();});
  new ResizeObserver(()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(setup,120);}).observe(document.querySelector('main'));
})();
