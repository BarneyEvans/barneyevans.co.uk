(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const canvas = document.querySelector('#garden'), ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement, pause = document.querySelector('#pause');
  const status = document.querySelector('#garden-status');
  const glider = [[1,0],[2,1],[0,2],[1,2],[2,2]];
  const pulsar = [];
  [2,3,4,8,9,10].forEach(n => [0,5,7,12].forEach(m => {pulsar.push([n,m],[m,n]);}));
  let cell = 20, cols = 0, rows = 0, world, next, opacity, colour, quietMask;
  let paused = reduced.matches, raf = 0, lastDraw = 0, lastStep = 0;
  let stops = [], mainTop = 0, lightPoint = null, markerPoints = [], pairPoints = [], restPoint, stemGrowth = 0;
  const light = document.querySelector("#journey-light");
  let generation = 0, quiet = [], height = 0, beam = 0, resizeTimer;
  const sprites = [null,makeSprite('#679977',false),makeSprite('#9b7dbb',true)];
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
    height = Math.max(document.body.scrollHeight,root.scrollHeight); rows = Math.min(700,Math.ceil(height/cell)+2);
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
    const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(innerWidth*dpr);canvas.height=Math.round(innerHeight*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
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
    requestDraw();
  }
  function measureJourney(){
    mainTop=document.querySelector('#main').getBoundingClientRect().top+scrollY;
    const point=el=>{const r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+scrollY+r.height/2};};
    const pair=pairPoints=[...document.querySelectorAll('.paired-cell')].map(point);
    const markers=markerPoints=[...document.querySelectorAll('.step-orb')].map(point);
    const rest=restPoint=point(document.querySelector('.light-rest'));
    const lesson=document.querySelector('.lesson-steps').getBoundingClientRect().top+scrollY;
    const mobile=innerWidth<=700;
    const start=Math.max(pair[1].y-innerHeight*.42+120,lesson-innerHeight*.7);
    stops=[{...pair[0],at:0},{...pair[1],at:Math.max(140,pair[1].y-innerHeight*.5)}];
    // A quiet margin passage keeps the travelling light clear of prices and copy.
    const subject=document.querySelector('#subjects').getBoundingClientRect();
    const rail=Math.max(10,subject.left-21);
    stops.push({x:rail,y:pair[1].y,at:stops[1].at+70});
    stops.push({x:rail,y:subject.top+scrollY,at:subject.top+scrollY-innerHeight*.4});
    stops.push({x:rail,y:lesson-40,at:start-70});
    markers.forEach((p,i)=>stops.push({...p,at:mobile?p.y-innerHeight*.48:start+i*95}));
    stops.push({x:rail,y:markers.at(-1).y,at:stops.at(-1).at+70});
    const review=document.querySelector('#reviews').getBoundingClientRect();
    stops.push({x:rail,y:review.top+scrollY+40,at:Math.max(stops.at(-1).at+50,review.top+scrollY-innerHeight*.4)});
    stops.push({x:rail,y:rest.y,at:Math.max(stops.at(-1).at+70,rest.y-innerHeight*.65)});
    stops.push({...rest,at:Math.max(stops.at(-1).at+100,rest.y-innerHeight*.45)});
    // Very short viewports and opened details must preserve a monotone journey.
    for(let i=1;i<stops.length;i++)stops[i].at=Math.max(stops[i].at,stops[i-1].at+35);
  }
  function travel(){
    if(!stops.length)return;
    if(!paused||!lightPoint){
      let i=0;while(i<stops.length-2&&scrollY>stops[i+1].at)i++;
      const a=stops[i],b=stops[i+1],t=Math.max(0,Math.min(1,(scrollY-a.at)/(b.at-a.at))),ease=t*t*(3-2*t);
      lightPoint={x:a.x+(b.x-a.x)*ease,y:a.y+(b.y-a.y)*ease};
    }
    light.style.transform=`translate3d(${lightPoint.x-16}px,${lightPoint.y-mainTop-16}px,0)`;
    document.querySelectorAll('.step-orb').forEach((el,i)=>{
      const p=markerPoints[i],distance=Math.hypot(lightPoint.x-p.x,lightPoint.y-p.y);
      el.style.setProperty('--lit',Math.max(0,1-distance/100).toFixed(2));
    });
    document.querySelectorAll('.paired-cell').forEach((el,i)=>{
      const p=pairPoints[i],distance=Math.hypot(lightPoint.x-p.x,lightPoint.y-p.y);
      el.style.setProperty('--meet',Math.max(0,1-distance/140).toFixed(2));
    });
    const bloom=reduced.matches?1:Math.max(0,1-Math.hypot(lightPoint.x-restPoint.x,lightPoint.y-restPoint.y)/200);
    document.querySelector('.light-rest').style.setProperty('--bloom',bloom.toFixed(2));
    document.querySelector('.contact-arch').style.opacity=String(.35+bloom*.65);
    const first=markerPoints[0],last=markerPoints.at(-1);
    const growth=reduced.matches?1:Math.max(0,Math.min(1,innerWidth<=700?(lightPoint.y-first.y)/(last.y-first.y):(lightPoint.x-first.x)/(last.x-first.x)));
    const passed=scrollY>=stops.find(p=>p.x===last.x&&p.y===last.y).at;
    if(!paused||reduced.matches)stemGrowth=reduced.matches||passed?1:growth;
    document.querySelector('.lesson-steps').style.setProperty('--growth',String(stemGrowth));
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
  function draw(now=performance.now()){
    const start=performance.now(),sy=scrollY,motionOff=reduced.matches;
    ctx.clearRect(0,0,innerWidth,innerHeight);
    travel();
    const bx=lightPoint?.x||0;beam=lightPoint?.y||0;
    // Fit the soft optical field inside actual spare space. This keeps text
    // untouched without cutting hard rectangular holes into the glow.
    let clearance=innerWidth<=700?150:230;
    for(const r of quiet){
      const dx=Math.max(r.x-bx,0,bx-r.right),dy=Math.max(r.y-beam,0,beam-r.bottom);
      clearance=Math.min(clearance,Math.max(0,Math.hypot(dx,dy)-7));
    }
    const diameter=Math.max(.1,clearance*2);
    ctx.drawImage(field,bx-diameter/2,beam-sy-diameter/2,diameter,diameter);
    // One local optical caustic belongs to the traveller, never a page divider.
    ctx.strokeStyle='#8da07755';ctx.lineWidth=1;
    ctx.beginPath();ctx.ellipse(bx,beam-sy,Math.min(clearance,innerWidth<=700?75:115),Math.min(clearance*.53,innerWidth<=700?40:65),-.5,0,Math.PI*2);ctx.stroke();
    const first=Math.max(0,Math.floor(sy/cell)-2),last=Math.min(rows,Math.ceil((sy+innerHeight)/cell)+2);
    for(let y=first;y<last;y++)for(let x=0;x<cols;x++){
      const i=y*cols+x,target=world[i]?1:0;
      if(motionOff||paused)opacity[i]=target;else opacity[i]+=(target-opacity[i])*.13;
      if(opacity[i]<.012)continue;
      const px=x*cell+cell/2,py=y*cell+cell/2,sp=colour[i]||1;
      if(quietMask[i])continue;
      const distance=Math.hypot((px-bx)*.7,py-beam),awake=Math.exp(-distance*distance/68000);
      ctx.globalAlpha=opacity[i]*(.7+awake*.3);
      const size=cell*(1.65+awake*.3);ctx.drawImage(sprites[sp],px-size/2,py-sy-size/2,size,size);
    }
    ctx.globalAlpha=1;
    // The traveller and its lens share this canvas and the measured safe radius.
    // Their soft edges stop before text, controls and photos.
    if(!motionOff){
      const radius=Math.max(.1,Math.min(29,clearance));
      const glow=ctx.createRadialGradient(bx,beam-sy,0,bx,beam-sy,radius);
      glow.addColorStop(0,'#fffef4');glow.addColorStop(.3,'#f9df8b');glow.addColorStop(.58,'#b7be83cc');glow.addColorStop(1,'#d6d9a200');
      ctx.fillStyle=glow;ctx.beginPath();ctx.arc(bx,beam-sy,radius,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#8e824eaa';ctx.beginPath();ctx.ellipse(bx,beam-sy,radius*.96,radius*.62,-.55,0,Math.PI*2);ctx.stroke();
    }

    metrics.drawMs.push(performance.now()-start);if(metrics.drawMs.length>240)metrics.drawMs.shift();
  }
  function tick(now){raf=0;if(document.hidden)return;if(now-lastDraw>=32){if(!paused&&!reduced.matches&&now-lastStep>950){evolve();lastStep=now;}draw(now);lastDraw=now;}if(!paused&&!reduced.matches)raf=requestAnimationFrame(tick);}
  function requestDraw(){if(document.hidden)return;if(!raf)raf=requestAnimationFrame(now=>{raf=0;draw(now);if(!paused&&!reduced.matches)raf=requestAnimationFrame(tick);});}
  function updatePause(){pause.innerHTML=paused?'▶ <span>Resume</span>':'Ⅱ <span>Pause</span>';pause.setAttribute('aria-pressed',String(paused));if(reduced.matches){pause.innerHTML='✓ <span>Still garden</span>';pause.disabled=true;}else pause.disabled=false;cancelAnimationFrame(raf);raf=0;requestDraw();}
  pause.addEventListener('click',()=>{paused=!paused;updatePause();status.textContent=paused?'Garden paused.':'Garden growing.';});
  document.querySelectorAll('.paired-cell').forEach(button=>button.addEventListener('click',()=>{
    const cells=[...document.querySelectorAll('.paired-cell')];
    if(!paused&&!reduced.matches) cells.forEach(cell=>{cell.classList.remove('answer');setTimeout(()=>{cell.classList.add('answer');setTimeout(()=>cell.classList.remove('answer'),1100);},cell===button?0:180);});
    status.textContent='A little light, shared between both tutors.';
    metrics.paired=(metrics.paired||0)+1;
  }));
  document.querySelectorAll('.tutor').forEach(card=>{
    card.querySelectorAll('.flip').forEach(button=>button.addEventListener('click',()=>{
      const back=!card.classList.contains('is-back');
      card.classList.toggle('is-back',back);
      card.querySelectorAll('.flip').forEach(b=>b.setAttribute('aria-expanded',String(back)));
      card.querySelector('.card-front .flip').focus({preventScroll:true});
      measure();
    }));
  });
  document.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',measure));
  addEventListener('scroll',requestDraw,{passive:true});addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(measure,150);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else{lastStep=performance.now();requestDraw();}});
  reduced.addEventListener('change',()=>{paused=reduced.matches;updatePause();});
  addEventListener('load',()=>{measure();updatePause();});
  new ResizeObserver(()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(measure,100);}).observe(document.querySelector('main'));
  // Read-only diagnostics for preview QA, with no network, tracking or persistence.
  window.gardenDiagnostics=()=>({cols,rows,cells:cols*rows,generation,paused,reduced:reduced.matches,paired:metrics.paired||0,light:lightPoint,stops,pixelRatio:Math.min(devicePixelRatio||1,2),stepMs:[...metrics.stepMs],drawMs:[...metrics.drawMs],species:[world?.filter(v=>v===1).length,world?.filter(v=>v===2).length]});
})();
