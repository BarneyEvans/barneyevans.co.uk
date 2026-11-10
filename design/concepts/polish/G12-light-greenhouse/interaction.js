(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const canvas = document.createElement('div'), tiles = [], tileHeight = 512;
  canvas.id='garden';canvas.setAttribute('aria-hidden','true');document.querySelector('#garden').replaceWith(canvas);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement, pauses = [...document.querySelectorAll('.pause')];
  const status = document.querySelector('#garden-status');
  const glider = [[1,0],[2,1],[0,2],[1,2],[2,2]];
  const pulsar = [];
  [2,3,4,8,9,10].forEach(n => [0,5,7,12].forEach(m => {pulsar.push([n,m],[m,n]);}));
  let cell = 20, cols = 0, rows = 0, world, next, opacity, colour, quietMask;
  let reducedState = reduced.matches, paused = reducedState, raf = 0, lastDraw = 0, lastStep = 0, lastTick = 0;
  let stops = [], mainTop = 0, lightPoint = null, markerPoints = [], pairPoints = [], restPoint, stemGrowth = 0;
  const light = document.querySelector("#journey-light");
  // The texture and light both live in document space. Scrolling is composited
  // by the browser; neither layer subtracts a sampled scrollY from its paint.
  const lens = document.createElement('canvas'), lensContext = lens.getContext('2d');
  const coreCanvas = document.createElement('canvas'), coreContext = coreCanvas.getContext('2d');
  coreCanvas.className='light-core';light.append(lens,coreCanvas);
  const lensSize = 480, smallRadius = 8, travelSpeed = 90, acceleration = 240;
  const pairElements = [...document.querySelectorAll('.paired-cell')];
  const markerElements = [...document.querySelectorAll('.step-orb')];
  const restElement = document.querySelector('.light-rest');
  const arch = document.querySelector('.contact-arch'), stem = document.querySelector('.lesson-steps');
  const motionStyles = new WeakMap();
  function setMotion(el,name,value){
    let values=motionStyles.get(el);if(!values){values={};motionStyles.set(el,values);}
    if(values[name]===value)return;values[name]=value;el.style.setProperty(name,String(value));
  }
  let route = [], distance = 0, velocity = 0, targetDistance = 0, phase = 'settled';
  let phaseTime = 0, opening = 1, settledStop = 0, lightRadius = smallRadius, paintedStop = -1;
  let generation = 0, quiet = [], height = 0, resizeTimer;
  const sprites = [null,makeSprite('#a2afa4',false),makeSprite('#b2a9bb',true)];
  const field = document.createElement('canvas');field.width=field.height=512;
  const fieldContext=field.getContext('2d');
  const optical=fieldContext.createRadialGradient(240,220,8,256,256,250);
  optical.addColorStop(0,'#fffbeacc');optical.addColorStop(.22,'#e8e9bbd9');optical.addColorStop(.45,'#bfd6b2b0');optical.addColorStop(.7,'#c2aedb77');optical.addColorStop(1,'#d0bbdf00');
  fieldContext.fillStyle=optical;fieldContext.fillRect(0,0,512,512);
  const metrics = {stepMs:[],drawMs:[],generation:0};
  function makeSprite(tint,diamond) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), glow = g.createRadialGradient(32,32,1,32,32,31);
    glow.addColorStop(0,'#fffef8'); glow.addColorStop(.14,tint); glow.addColorStop(.35,tint+'b0'); glow.addColorStop(1,tint+'00');
    // Blur the tiny cached sprite once, rather than filtering a page-size
    // canvas again each time the living texture changes.
    g.filter='blur(2px)';
    g.fillStyle = glow; g.fillRect(0,0,64,64);g.fillStyle=tint;
    g.beginPath();if(diamond){g.moveTo(32,25);g.lineTo(39,32);g.lineTo(32,39);g.lineTo(25,32);}else{g.arc(32,32,6,0,Math.PI*2);}g.fill();
    g.fillStyle='#fffef9';g.beginPath();g.arc(31,30,2,0,Math.PI*2);g.fill();return c;
  }
  function put(x,y,species,mirror=false) {
    (species===1?glider:pulsar).forEach(([dx,dy])=>{
      const xx=x+(mirror?-dx:dx),yy=y+dy;
      if(xx>0&&xx<cols-1&&yy>0&&yy<rows-1){const i=yy*cols+xx;world[i]=species;colour[i]=species;opacity[i]=paused||reduced.matches?1:.05;}
    });
  }
  function measure() {
    const old = world, oldColour = colour, oldOpacity = opacity, oldCols = cols, oldRows = rows;
    cell = innerWidth < 600 ? 15 : 20; cols = Math.min(120,Math.ceil(innerWidth/cell));
    // Measure real flow content, so an old canvas height cannot keep the page
    // artificially tall after a biography closes.
    height = Math.round(document.querySelector('footer').getBoundingClientRect().bottom+scrollY); rows = Math.min(700,Math.ceil(height/cell)+2);
    world = new Uint8Array(cols*rows);next = new Uint8Array(cols*rows);opacity = new Float32Array(cols*rows);colour = new Uint8Array(cols*rows);
    if(old){for(let y=0;y<Math.min(rows,oldRows);y++)for(let x=0;x<Math.min(cols,oldCols);x++){const i=y*cols+x,j=y*oldCols+x;world[i]=old[j];colour[i]=oldColour[j];opacity[i]=oldOpacity[j];}}
    else {
      for(let y=9;y<rows-15;y+=30){put(2,y,1);put(5,y+5,1);put(cols-15,y+9,2);}
      const meeting=Math.floor(document.querySelector('#tutors').offsetTop/cell);
      // Opposing gliders and neighbouring pulsars share one lattice at the tutors.
      put(Math.floor(cols*.43),meeting+5,1);put(Math.floor(cols*.58),meeting+8,1,true);
      put(Math.max(1,Math.floor(cols*.55)-6),meeting+15,2);
      put(Math.floor(cols*.4),meeting+20,1);
      for(let y=10;y<30;y+=8)put(Math.floor(cols*.64),y,1);
    }
    // Fixed document-space tiles keep scroll exact without re-uploading a
    // page-sized bitmap when a handful of cells change in the visible area.
    canvas.style.height=height+'px';
    const count=Math.ceil(height/tileHeight);
    while(tiles.length>count)tiles.pop().element.remove();
    for(let i=0;i<count;i++){
      if(!tiles[i]){const element=document.createElement('canvas');canvas.append(element);tiles.push({element,ctx:element.getContext('2d')});}
      const tile=tiles[i];tile.top=i*tileHeight;
      // The deliberately soft texture uses half-resolution paint; positions
      // remain CSS-pixel floats and the independent light stays full resolution.
      const size=Math.min(tileHeight,height-tile.top);
      tile.element.width=Math.ceil(innerWidth/2);tile.element.height=Math.ceil(size/2);
      tile.element.style.top=tile.top+'px';tile.element.style.height=size+'px';
      tile.ctx.setTransform(tile.element.width/innerWidth,0,0,tile.element.height/size,0,-tile.top*tile.element.height/size);
    }
    const dpr=Math.min(devicePixelRatio||1,2);
    lens.width=lens.height=lensSize*dpr;lensContext.setTransform(dpr,0,0,dpr,0,0);
    coreCanvas.width=coreCanvas.height=64*dpr;coreContext.setTransform(dpr,0,0,dpr,0,0);
    const glow=coreContext.createRadialGradient(32,32,0,32,32,29);
    glow.addColorStop(0,'#fffef4');glow.addColorStop(.3,'#f9df8b');glow.addColorStop(.58,'#b7be83cc');glow.addColorStop(1,'#d6d9a200');
    coreContext.fillStyle=glow;coreContext.fillRect(0,0,64,64);paintedStop=-1;
    // Protect real text fragments rather than blank block widths. The sprite's
    // full radius is included, so no colony can paint underneath a glyph.
    quiet=[];
    const walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode;
      if(!node.textContent.trim()||node.parentElement.closest('.sr-only,.step-orb'))continue;
      const range=document.createRange();range.selectNodeContents(node);
      for(const r of range.getClientRects())if(r.width&&r.height)quiet.push({x:r.left,y:r.top+scrollY,right:r.right,bottom:r.bottom+scrollY});
    }
    document.querySelectorAll('img,a.button,footer').forEach(el=>{const r=el.getBoundingClientRect();quiet.push({x:r.left,y:r.top+scrollY,right:r.right,bottom:r.bottom+scrollY});});
    quietMask=new Uint8Array(cols*rows);
    const pad=cell*1.05+5;
    for(const r of quiet){
      const x0=Math.max(0,Math.floor((r.x-pad)/cell)),x1=Math.min(cols-1,Math.ceil((r.right+pad)/cell));
      const y0=Math.max(0,Math.floor((r.y-pad)/cell)),y1=Math.min(rows-1,Math.ceil((r.bottom+pad)/cell));
      for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)quietMask[y*cols+x]=1;
    }
    if(!old){
      document.querySelectorAll('.paired-cell,.light-rest').forEach((el,i)=>{
        const r=el.getBoundingClientRect(),x=Math.floor((r.left+r.width/2)/cell),y=Math.floor((r.top+scrollY+r.height/2)/cell);
        put(Math.max(1,x-5),y-2,1);put(Math.min(cols-5,x+4),y+1,1,true);
        if(i===2)put(Math.max(1,Math.floor(cols*.72)-6),y-5,2);
      });
    }
    measureJourney();
    drawTexture(true);
    requestDraw();
  }
  const smooth = t => t*t*t*(t*(t*6-15)+10);
  function measureJourney(){
    mainTop=document.querySelector('#main').getBoundingClientRect().top+scrollY;
    const point=el=>{const r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+scrollY+r.height/2};};
    pairPoints=pairElements.map(point);markerPoints=markerElements.map(point);restPoint=point(restElement);
    const subject=document.querySelector('#subjects').getBoundingClientRect();
    const rail=subject.left/2, mobile=innerWidth<=700, first=markerPoints[0], last=markerPoints.at(-1);
    const meeting=Math.max(0,pairPoints[0].y-innerHeight*.65);
    const lessonAt=first.y-innerHeight*(mobile?.48:.65);
    const nodes=[
      {...pairPoints[0],at:meeting,stop:0},
      {...pairPoints[1],at:meeting+170,stop:1},
      {x:rail,y:pairPoints[1].y,at:meeting+300},
      {x:rail,y:first.y,at:lessonAt-70},
      ...markerPoints.map((p,i)=>({...p,at:mobile?p.y-innerHeight*.48:lessonAt+i*115,stop:i+2})),
      {x:rail,y:last.y,at:mobile?last.y-innerHeight*.48+100:lessonAt+445},
      {x:rail,y:restPoint.y,at:restPoint.y-innerHeight*.65},
      {...restPoint,at:restPoint.y-innerHeight*.45,stop:6}
    ];
    const maxScroll=height-innerHeight;
    nodes.forEach((p,i)=>{p.at=Math.min(maxScroll,p.at);if(i)p.at=Math.max(p.at,nodes[i-1].at+35);});
    // Arc-length samples make the travel speed independent of the length of a
    // scroll interval. Round margin corners; stops themselves remain exact.
    route=[];stops=[];
    const append=p=>{const prev=route.at(-1);route.push({...p,s:prev?prev.s+Math.hypot(p.x-prev.x,p.y-prev.y):0});};
    const line=p=>{
      const a=route.at(-1),length=Math.hypot(p.x-a.x,p.y-a.y),n=Math.max(1,Math.ceil(length/3));
      for(let j=1;j<=n;j++){const t=j/n;append({x:a.x+(p.x-a.x)*t,y:a.y+(p.y-a.y)*t});}
    };
    append(nodes[0]);nodes[0].s=0;stops.push(nodes[0]);
    for(let i=1;i<nodes.length;i++){
      const a=nodes[i-1],b=nodes[i],c=nodes[i+1];
      if(b.stop===undefined&&c){
        const before=Math.hypot(b.x-a.x,b.y-a.y),after=Math.hypot(c.x-b.x,c.y-b.y);
        const r=Math.min(26,before/3,after/3);
        const entry={x:b.x+(a.x-b.x)*r/before,y:b.y+(a.y-b.y)*r/before};
        const leave={x:b.x+(c.x-b.x)*r/after,y:b.y+(c.y-b.y)*r/after};
        line(entry);
        for(let j=1;j<=24;j++){const t=j/24,u=1-t;append({x:u*u*entry.x+2*u*t*b.x+t*t*leave.x,y:u*u*entry.y+2*u*t*b.y+t*t*leave.y});if(j===12)b.s=route.at(-1).s;}
      }else{
        // Tutor-to-tutor movement has a shallow, visible hop in its clear pool.
        // It is sampled by length, so the curved portion cannot accelerate.
        const start=route.at(-1),hop=i===1?12:0,n=Math.max(1,Math.ceil(Math.hypot(b.x-start.x,b.y-start.y)/3));
        for(let j=1;j<=n;j++){const t=j/n;append({x:start.x+(b.x-start.x)*t,y:start.y+(b.y-start.y)*t-hop*Math.sin(Math.PI*t)**2});}
        b.s=route.at(-1).s;
      }
      stops.push(b);
    }
    for(const p of stops.filter(p=>p.stop!==undefined)){
      let clearance=innerWidth<=700?150:230;
      for(const r of quiet){const dx=Math.max(r.x-7-p.x,0,p.x-r.right-7),dy=Math.max(r.y-7-p.y,0,p.y-r.bottom-7);clearance=Math.min(clearance,Math.hypot(dx,dy));}
      p.radius=Math.max(smallRadius,clearance);
    }
    if(!lightPoint){distance=0;settledStop=0;phase='settled';opening=1;}
    else if(phase!=='travel')distance=stops.find(p=>p.stop===settledStop).s;
    else distance=Math.min(distance,route.at(-1).s);
    lightPoint=pointAt(distance);
  }
  function pointAt(s){
    let lo=0,hi=route.length-1;
    while(lo+1<hi){const m=(lo+hi)>>1;if(route[m].s<s)lo=m;else hi=m;}
    const a=route[lo],b=route[hi],t=Math.max(0,Math.min(1,(s-a.s)/(b.s-a.s||1)));
    return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
  }
  function scrollTarget(){
    if(scrollY<=stops[0].at)return 0;
    if(scrollY>=height-innerHeight-2)return route.at(-1).s;
    let i=0;while(i<stops.length-2&&scrollY>stops[i+1].at)i++;
    const a=stops[i],b=stops[i+1],t=Math.max(0,Math.min(1,(scrollY-a.at)/(b.at-a.at)));
    return a.s+(b.s-a.s)*t;
  }
  function travel(dt){
    if(!stops.length)return;
    targetDistance=scrollTarget();
    if(!paused&&!reduced.matches){
      if(phase==='opening'){
        phaseTime+=dt;opening=smooth(Math.min(1,phaseTime/.85));
        if(phaseTime>=.85){phase='holding';phaseTime=0;opening=1;}
      }else if(phase==='holding'){
        phaseTime+=dt;if(phaseTime>=.6)phase='settled';
      }else if(phase==='settled'){
        if(Math.abs(targetDistance-distance)>3){phase='closing';phaseTime=0;}
      }else if(phase==='closing'){
        phaseTime+=dt;opening=1-smooth(Math.min(1,phaseTime/.7));
        if(phaseTime>=.7){phase='travel';opening=0;velocity=0;}
      }else{
        const direction=Math.sign(targetDistance-distance);
        const arrivals=stops.filter(p=>p.stop!==undefined&&direction*(p.s-distance)>.01);
        const nextStop=direction>0?arrivals[0]:arrivals.at(-1);
        let destination=targetDistance;
        if(nextStop&&direction*(targetDistance-nextStop.s)>=0)destination=nextStop.s;
        const delta=destination-distance;
        const desired=Math.sign(delta)*Math.min(travelSpeed,Math.sqrt(2*acceleration*Math.abs(delta)));
        velocity+=Math.max(-acceleration*dt,Math.min(acceleration*dt,desired-velocity));
        let advance=velocity*dt;
        if(Math.sign(advance)===Math.sign(delta)&&Math.abs(advance)>=Math.abs(delta)){advance=delta;velocity=0;}
        distance=Math.max(0,Math.min(route.at(-1).s,distance+advance));
        if(nextStop&&Math.abs(distance-nextStop.s)<.01){
          distance=nextStop.s;settledStop=nextStop.stop;phase='opening';phaseTime=0;velocity=0;
        }
      }
    }
    lightPoint=pointAt(distance);
    const atStop=phase!=='travel';
    markerElements.forEach((el,i)=>setMotion(el,'--lit',reduced.matches?.65:atStop&&settledStop===i+2?opening:0));
    pairElements.forEach((el,i)=>setMotion(el,'--meet',reduced.matches?.4:atStop&&settledStop===i?opening:0));
    const bloom=reduced.matches?1:atStop&&settledStop===6?opening:0;
    setMotion(restElement,'--bloom',bloom);setMotion(arch,'opacity',.35+bloom*.65);
    const first=stops.find(p=>p.stop===2),last=stops.find(p=>p.stop===5);
    if(!paused||reduced.matches)stemGrowth=reduced.matches?1:Math.max(0,Math.min(1,(distance-first.s)/(last.s-first.s)));
    setMotion(stem,'--growth',stemGrowth);
    drawLight();
  }
  function drawLight(){
    const stop=stops.find(p=>p.stop===settledStop);
    lightRadius=smallRadius+(stop.radius-smallRadius)*opening;
    // Paint an arrival only once. Opening uses compositor scale/opacity, so
    // even the full oval does not need a new canvas raster every frame.
    if(paintedStop!==settledStop){
      const g=lensContext,half=lensSize/2,r=stop.radius;
      g.clearRect(0,0,lensSize,lensSize);g.save();g.translate(half,half);
      g.drawImage(field,-r,-r,r*2,r*2);
      g.strokeStyle='#8da07766';g.lineWidth=1;
      g.beginPath();g.ellipse(0,0,Math.min(r,innerWidth<=700?75:115),Math.min(r*.53,innerWidth<=700?40:65),-.5,0,Math.PI*2);g.stroke();
      g.strokeStyle='#8e824eaa';g.beginPath();g.ellipse(0,0,27.84,17.98,-.55,0,Math.PI*2);g.stroke();
      g.restore();paintedStop=settledStop;
    }
    const x=lightPoint.x,y=lightPoint.y-mainTop;
    lens.style.transform='translate3d('+(x-lensSize/2)+'px,'+(y-lensSize/2)+'px,0) scale('+(lightRadius/stop.radius)+')';
    lens.style.opacity=String(opening);
    coreCanvas.style.transform='translate3d('+(x-32)+'px,'+(y-32)+'px,0) scale('+((smallRadius+(29-smallRadius)*opening)/29)+')';
  }
  function evolve(){
    const start=performance.now();next.set(world);
    const from=Math.max(1,Math.floor(scrollY/cell)-8),to=Math.min(rows-1,Math.ceil((scrollY+innerHeight)/cell)+8);
    for(let y=from;y<to;y++)for(let x=1;x<cols-1;x++){
      const i=y*cols+x;next[i]=0;let n=0,mint=0;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const v=world[i+dy*cols+dx];if(v){n++;if(v===1)mint++;}}
      // Conway B3/S23, Immigration majority-colour births, unchanged survivors.
      if(world[i]&&(n===2||n===3))next[i]=world[i];else if(!world[i]&&n===3)next[i]=mint>=2?1:2;
      if(next[i])colour[i]=next[i];
    }
    [world,next]=[next,world];generation++;metrics.generation=generation;
    metrics.stepMs.push(performance.now()-start);if(metrics.stepMs.length>120)metrics.stepMs.shift();
  }
  function drawTexture(all=false){
    if(!world)return;
    const visible=tiles.filter(tile=>all||(tile.top+tileHeight>scrollY-64&&tile.top<scrollY+innerHeight+64));
    const from=Math.max(0,Math.floor(visible[0].top/cell)-2),to=Math.min(rows,Math.ceil((visible.at(-1).top+tileHeight)/cell)+2);
    for(let y=from;y<to;y++)for(let x=0;x<cols;x++){
      const i=y*cols+x,target=world[i]?1:0;
      if(reduced.matches)opacity[i]=target;else if(!paused)opacity[i]+=(target-opacity[i])*.13;
    }
    for(const tile of visible){
      const ctx=tile.ctx,first=Math.max(0,Math.floor(tile.top/cell)-2),last=Math.min(rows,Math.ceil((tile.top+tileHeight)/cell)+2);
      ctx.clearRect(0,tile.top,innerWidth,tileHeight);
      for(let y=first;y<last;y++)for(let x=0;x<cols;x++){
        const i=y*cols+x;if(opacity[i]<.012||quietMask[i])continue;
        const px=x*cell+cell/2,py=y*cell+cell/2,size=cell*1.85;
        ctx.globalAlpha=opacity[i];ctx.drawImage(sprites[colour[i]||1],px-size/2,py-size/2,size,size);
      }
    }
  }
  function tick(now){
    raf=0;if(document.hidden)return;
    // A media-query change can become visible to this RAF before its change
    // event is delivered. Settle immediately instead of stopping mid-travel.
    if(reduced.matches!==reducedState){syncReducedMotion();return;}
    // Keep a predictable animation budget on high-refresh displays. This
    // limits only the living light/cells; document scrolling stays native.
    if(!paused&&!reduced.matches&&lastTick&&now-lastTick<1000/60){raf=requestAnimationFrame(tick);return;}
    const start=performance.now(),dt=lastTick?Math.min(.032,(now-lastTick)/1000):0;lastTick=now;
    travel(dt);
    if(!paused&&!reduced.matches){
      if(now-lastStep>950){evolve();lastStep=now;}
      if(now-lastDraw>=64){drawTexture();lastDraw=now;}
      raf=requestAnimationFrame(tick);
    }
    metrics.drawMs.push(performance.now()-start);if(metrics.drawMs.length>240)metrics.drawMs.shift();
  }
  function requestDraw(){if(!document.hidden&&!raf)raf=requestAnimationFrame(tick);}
  function updatePause(){
    pauses.forEach(pause=>{
      pause.innerHTML=paused?'&#9654; <span>Resume</span>':'&#8545; <span>Pause</span>';
      pause.setAttribute('aria-pressed',String(paused));
      pause.setAttribute('aria-label',paused?'Resume garden':'Pause garden');
      pause.disabled=reduced.matches;
      if(reduced.matches){pause.innerHTML='&#10003; <span>Still garden</span>';pause.setAttribute('aria-label','Still garden');}
    });
    root.classList.toggle('garden-paused',paused);
    cancelAnimationFrame(raf);raf=0;lastTick=0;requestDraw();
  }
  pauses.forEach(pause=>pause.addEventListener('click',()=>{paused=!paused;updatePause();status.textContent=paused?'Garden paused.':'Garden growing.';}));
  document.querySelectorAll('.paired-cell').forEach(button=>button.addEventListener('click',()=>{
    const cells=[...document.querySelectorAll('.paired-cell')];
    if(!paused&&!reduced.matches) cells.forEach(cell=>{cell.classList.remove('answer');setTimeout(()=>{cell.classList.add('answer');setTimeout(()=>cell.classList.remove('answer'),1100);},cell===button?0:180);});
    status.textContent='A little light, shared between both tutors.';
    metrics.paired=(metrics.paired||0)+1;
  }));
  document.querySelectorAll('.flip').forEach(button=>button.addEventListener('click',()=>{
    const panel=document.getElementById(button.getAttribute('aria-controls'));
    const opener=document.querySelector('.card-front [aria-controls="'+panel.id+'"]');
    const card=opener.closest('.tutor'),open=!panel.classList.contains('is-open');
    panel.classList.toggle('is-open',open);card.classList.toggle('is-back',open);
    document.querySelectorAll('[aria-controls="'+panel.id+'"]').forEach(b=>b.setAttribute('aria-expanded',String(open)));
    measure();
    if(open){panel.tabIndex=-1;panel.focus({preventScroll:true});panel.scrollIntoView({block:'nearest',behavior:'instant'});}
    else {opener.focus({preventScroll:true});opener.scrollIntoView({block:'nearest',behavior:'instant'});}
  }));
  document.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',measure));
  addEventListener('scroll',requestDraw,{passive:true});addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(measure,150);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else{lastStep=performance.now();lastTick=0;requestDraw();}});
  function syncReducedMotion(){
    const requested=reduced.matches;
    if(requested===reducedState)return;
    reducedState=requested;paused=requested;
    if(requested){
      const nearest=stops.filter(p=>p.stop!==undefined).sort((a,b)=>Math.abs(a.s-distance)-Math.abs(b.s-distance))[0];
      distance=nearest.s;settledStop=nearest.stop;phase='settled';opening=1;velocity=0;paintedStop=-1;
      travel(0);
      drawTexture(true);
    }
    updatePause();
  }
  reduced.addEventListener('change',syncReducedMotion);
  addEventListener('load',()=>{measure();updatePause();});
  new ResizeObserver(()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(measure,100);}).observe(document.querySelector('main'));
  // Read-only diagnostics for preview QA, with no network, tracking or persistence.
  window.gardenDiagnostics=(motionOnly=false)=>{
    const state={light:lightPoint,stops,motion:{phase,opening,radius:lightRadius,distance,targetDistance,velocity,speedLimit:travelSpeed,settledStop,backgroundDocumentTop:0}};
    // Frame probes should not count every cell or allocate timing histories.
    return motionOnly?state:{...state,cols,rows,cells:cols*rows,generation,paused,reduced:reduced.matches,paired:metrics.paired||0,pixelRatio:Math.min(devicePixelRatio||1,2),stepMs:[...metrics.stepMs],drawMs:[...metrics.drawMs],species:[world?.filter(v=>v===1).length,world?.filter(v=>v===2).length]};
  };
})();
