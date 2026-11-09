(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const canvas = document.querySelector('#garden'), ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement, pause = document.querySelector('#pause');
  const status = document.querySelector('#garden-status'), speciesButton = document.querySelector('#species');
  const glider = [[1,0],[2,1],[0,2],[1,2],[2,2]];
  const pulsar = [];
  [2,3,4,8,9,10].forEach(n => [0,5,7,12].forEach(m => {pulsar.push([n,m],[m,n]);}));
  let cell = 20, cols = 0, rows = 0, world, next, opacity, colour;
  let selected = 0, plantSpecies = 1, paused = reduced.matches, raf = 0, lastDraw = 0, lastStep = 0;
  let generation = 0, pointer = null, headings = [], quiet = [], height = 0, beam = 0, resizeTimer;
  const sprites = [null,makeSprite('#b7d5bb',false),makeSprite('#bfb0de',true)];
  const metrics = {stepMs:[],drawMs:[],generation:0,planted:0};
  function makeSprite(tint,diamond) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), glow = g.createRadialGradient(32,32,1,32,32,31);
    glow.addColorStop(0,'#fffef8'); glow.addColorStop(.14,tint); glow.addColorStop(.35,tint+'b0'); glow.addColorStop(1,tint+'00');
    g.fillStyle = glow; g.fillRect(0,0,64,64);g.fillStyle=tint;
    g.beginPath();if(diamond){g.moveTo(32,25);g.lineTo(39,32);g.lineTo(32,39);g.lineTo(25,32);}else{g.arc(32,32,5,0,Math.PI*2);}g.fill();
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
    headings=[...document.querySelectorAll('h1,h2')].map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y+scrollY,w:r.width,h:r.height};});
    quiet=[...document.querySelectorAll('h1,h2,h3,h4,p,blockquote,figcaption,.quick-facts,.hero-actions')].map(el=>{const r=el.getBoundingClientRect();return {x:r.x-10,y:r.y+scrollY-10,right:r.right+10,bottom:r.bottom+scrollY+10};});
    requestDraw();
  }
  function evolve(){
    const start=performance.now();next.fill(0);
    for(let y=1;y<rows-1;y++)for(let x=1;x<cols-1;x++){
      const i=y*cols+x;let n=0,mint=0;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const v=world[i+dy*cols+dx];if(v){n++;if(v===1)mint++;}}
      // Conway B3/S23, Immigration majority-colour births, unchanged survivors.
      if(world[i]&&(n===2||n===3))next[i]=world[i];else if(!world[i]&&n===3)next[i]=mint>=2?1:2;
      if(next[i])colour[i]=next[i];
    }
    [world,next]=[next,world];generation++;metrics.generation=generation;
    metrics.stepMs.push(performance.now()-start);if(metrics.stepMs.length>120)metrics.stepMs.shift();
  }
  function beamX(y){
    let x=innerWidth*(.53+.35*Math.sin(y/660+.55));
    headings.forEach(h=>{const near=Math.exp(-Math.pow((y-h.y-h.h*.5)/(h.h+95),2));const edge=h.x+h.w+40; x+=(Math.min(innerWidth-22,edge)-x)*near*.8;});
    return x;
  }
  function draw(now=performance.now()){
    const start=performance.now(), sy=scrollY, progress=sy/Math.max(1,height-innerHeight), motionOff=reduced.matches;
    root.style.setProperty('--dusk',motionOff?0:progress.toFixed(3));root.style.setProperty('--focus',motionOff?0:Math.min(1,sy/750).toFixed(3));
    ctx.clearRect(0,0,innerWidth,innerHeight);beam=motionOff?innerHeight*.5:sy+innerHeight*.52;
    // A broad caustic follows the reading position; thin displaced contours suggest refraction.
    const bx=beamX(beam),by=beam-sy;
    const halo=ctx.createRadialGradient(bx,by,4,bx,by,innerWidth<600?190:330);
    halo.addColorStop(0,'#fffdf5b0');halo.addColorStop(.25,'#d1e5c755');halo.addColorStop(.57,'#c9b8e637');halo.addColorStop(1,'#e5d5f000');ctx.fillStyle=halo;ctx.fillRect(0,0,innerWidth,innerHeight);
    for(let k=0;k<7;k++){
      ctx.beginPath();for(let y=-60;y<innerHeight+60;y+=18){const docY=y+sy,x=beamX(docY)+(k-3)*9*Math.sin(docY/260+.8);if(y===-60)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
      ctx.strokeStyle=k%2?'#b0a3cc20':'#9dbba023';ctx.lineWidth=k===3?12:1;ctx.stroke();
    }
    const first=Math.max(0,Math.floor(sy/cell)-2),last=Math.min(rows,Math.ceil((sy+innerHeight)/cell)+2);
    for(let y=first;y<last;y++)for(let x=0;x<cols;x++){
      const i=y*cols+x,target=world[i]?1:0;
      if(motionOff||paused)opacity[i]=target;else opacity[i]+=(target-opacity[i])*.13;
      if(opacity[i]<.012)continue;
      const px=x*cell+cell/2,py=y*cell+cell/2,sp=colour[i]||1;
      if(quiet.some(r=>px>r.x&&px<r.right&&py>r.y&&py<r.bottom))continue;
      const distance=Math.hypot((px-bx)*.7,py-beam),awake=Math.exp(-distance*distance/68000);
      const gain=selected?(selected===sp?1:.22):1;
      ctx.globalAlpha=opacity[i]*(.28+awake*.69)*gain;
      const size=cell*(1.3+awake*.45);ctx.drawImage(sprites[sp],px-size/2,py-sy-size/2,size,size);
    }
    ctx.globalAlpha=1;
    if(!motionOff)document.querySelectorAll('.lesson-steps li').forEach(el=>{const r=el.getBoundingClientRect();el.style.setProperty('--lit',Math.max(0,1-Math.abs(r.top-innerHeight*.5)/250).toFixed(2));});
    metrics.drawMs.push(performance.now()-start);if(metrics.drawMs.length>240)metrics.drawMs.shift();
  }
  function tick(now){raf=0;if(document.hidden)return;if(now-lastDraw>=32){if(!paused&&!reduced.matches&&now-lastStep>950){evolve();lastStep=now;}draw(now);lastDraw=now;}if(!paused&&!reduced.matches)raf=requestAnimationFrame(tick);}
  function requestDraw(){if(document.hidden)return;if(!raf)raf=requestAnimationFrame(now=>{raf=0;draw(now);if(!paused&&!reduced.matches)raf=requestAnimationFrame(tick);});}
  function updatePause(){pause.innerHTML=paused?'▶ <span>Resume</span>':'Ⅱ <span>Pause</span>';pause.setAttribute('aria-pressed',String(paused));if(reduced.matches){pause.innerHTML='✓ <span>Still garden</span>';pause.disabled=true;}else pause.disabled=false;cancelAnimationFrame(raf);raf=0;requestDraw();}
  pause.addEventListener('click',()=>{paused=!paused;updatePause();status.textContent=paused?'Garden paused.':'Garden growing.';});
  speciesButton.addEventListener('click',()=>{plantSpecies=plantSpecies===1?2:1;const name=plantSpecies===1?'Barney':'Eugene';speciesButton.querySelector('strong').textContent=name;speciesButton.setAttribute('aria-label',`Plant species: ${name}. Select ${plantSpecies===1?'Eugene':'Barney'}.`);document.querySelector('.garden-tools').classList.toggle('eugene',plantSpecies===2);});
  function plant(x,y){const half=plantSpecies===1?1:6;put(Math.max(1,Math.min(cols-(plantSpecies===1?4:14),Math.floor(x/cell)-half)),Math.min(rows-14,Math.floor(y/cell)-half),plantSpecies);metrics.planted++;status.textContent=`Planted ${plantSpecies===1?'Barney’s glider':'Eugene’s pulsar'}.`;requestDraw();}
  document.querySelector('#plant').addEventListener('click',()=>plant(innerWidth*.87,scrollY+innerHeight*.55));
  document.addEventListener('pointerdown',e=>{if(e.target.closest('a,button,header,.tutor,.subject,blockquote,p,h1,h2,h3,h4,li,footer,.garden-tools'))return;pointer={x:e.clientX,y:e.clientY,scroll:scrollY,id:e.pointerId};},{passive:true});
  document.addEventListener('pointerup',e=>{if(!pointer||pointer.id!==e.pointerId)return;const p=pointer;pointer=null;if(Math.hypot(p.x-e.clientX,p.y-e.clientY)<9&&Math.abs(scrollY-p.scroll)<9)plant(e.clientX,e.clientY+scrollY);},{passive:true});
  document.addEventListener('pointercancel',()=>pointer=null);
  function choose(species){selected=species;document.querySelectorAll('.tutor').forEach(el=>el.classList.toggle('selected',Number(el.dataset.species)===species));document.querySelectorAll('.subject').forEach(el=>{const yes=Number(el.dataset.species)===species;el.classList.toggle('chosen',yes);el.querySelector('button').setAttribute('aria-pressed',String(yes));});requestDraw();}
  document.querySelectorAll('.tutor').forEach(card=>{
    const veil=card.querySelector('.cell-veil');for(let i=0;i<72;i++){const dot=document.createElement('i');dot.style.setProperty('--i',String((i*7)%19));veil.append(dot);}
    card.addEventListener('click',()=>choose(Number(card.dataset.species)));
    card.querySelectorAll('.flip').forEach(button=>button.addEventListener('click',()=>{
      if(card.classList.contains('turning'))return;
      const back=!card.classList.contains('is-back');
      const swap=()=>{card.classList.toggle('is-back',back);card.querySelectorAll('.flip').forEach(b=>{b.setAttribute('aria-expanded',String(back));b.tabIndex=back?(b.closest('.card-back')?0:-1):(b.closest('.card-front')?0:-1);});card.querySelectorAll('.card-back a').forEach(a=>a.tabIndex=back?0:-1);card.querySelector(back?'.card-back .flip':'.card-front .flip').focus({preventScroll:true});measure();};
      if(reduced.matches||paused)swap();else{card.classList.add('turning');setTimeout(swap,360);setTimeout(()=>card.classList.remove('turning'),1020);}
    }));card.querySelectorAll('.card-back a,.card-back button').forEach(a=>a.tabIndex=-1);
  });
  document.querySelectorAll('.choose').forEach(button=>button.addEventListener('click',()=>choose(Number(button.closest('.subject').dataset.species))));
  addEventListener('scroll',requestDraw,{passive:true});addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(measure,150);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else{lastStep=performance.now();requestDraw();}});
  reduced.addEventListener('change',()=>{paused=reduced.matches;updatePause();});
  addEventListener('load',()=>{measure();updatePause();});
  // Read-only diagnostics for preview QA, with no network, tracking or persistence.
  window.gardenDiagnostics=()=>({cols,rows,cells:cols*rows,generation,paused,reduced:reduced.matches,selected,planted:metrics.planted,pixelRatio:Math.min(devicePixelRatio||1,2),stepMs:[...metrics.stepMs],drawMs:[...metrics.drawMs],species:[world?.filter(v=>v===1).length,world?.filter(v=>v===2).length]});
})();
