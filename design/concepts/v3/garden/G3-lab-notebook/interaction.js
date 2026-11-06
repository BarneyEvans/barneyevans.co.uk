(() => {
  'use strict';
  const canvas = document.querySelector('#world');
  const ctx = canvas.getContext('2d', {alpha:true});
  const root = document.documentElement;
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const status = document.querySelector('#garden-status');
  const play = document.querySelector('#play');
  const glider = [[1,0],[2,1],[0,2],[1,2],[2,2]];
  const pulsar = [];
  [2,3,4,8,9,10].forEach(v => {
    [0,5,7,12].forEach(edge => {pulsar.push([v,edge],[edge,v]);});
  });
  let cells, previous, next, cols, rows, cell, selected=0, planting=1;
  let playing=!media.matches, frame=0, dirty=true, generation=0;
  let generationTime=performance.now(), lastDraw=0, pointer=null, knots=[];
  let zoom=1, width=innerWidth, height=innerHeight;
  const diagnostics={generation:0,drawMs:[],stepMs:[],planted:0,zoom:1};
  // Exposed only for reproducible QA; the canvas remains purely decorative.
  window.notebookDiagnostics=diagnostics;
  function put(x,y,species,mirror=false){
    const shape=species===1?glider:pulsar;
    for(const [dx,dy] of shape){
      const xx=x+(mirror?(species===1?2:12)-dx:dx), yy=y+dy;
      if(xx>0&&xx<cols-1&&yy>0&&yy<rows-1) cells[yy*cols+xx]=species;
    }
  }
  function setup(){
    const old=cells, oldCols=cols, oldRows=rows, oldCell=cell;
    width=innerWidth;height=innerHeight;cell=width<760?14:20;
    cols=Math.min(130,Math.ceil(width/cell)+2);
    rows=Math.min(1200,Math.ceil(document.documentElement.scrollHeight/cell)+6);
    cells=new Uint8Array(cols*rows);previous=new Uint8Array(cells.length);next=new Uint8Array(cells.length);
    if(old && oldCell===cell){
      for(let y=0;y<Math.min(rows,oldRows);y++)for(let x=0;x<Math.min(cols,oldCols);x++)cells[y*cols+x]=old[y*oldCols+x];
    }else{
      for(let y=9;y<rows-16;y+=25){
        put(2,y,1);put(5,y+8,1,true);
        put(Math.max(2,cols-16),y+4,2);
      }
      // A shared border around the tutor slides: both species obey the same rule.
      const meet=Math.floor(document.querySelector('#tutors').offsetTop/cell);
      for(let y=meet;y<meet+48;y+=16){put(Math.floor(cols/2)-6,y,1);put(Math.floor(cols/2)-1,y+2,2);}
      if(width>760){for(let y=7;y<31;y+=7)put(Math.floor(cols*.72),y,1);put(Math.floor(cols*.66),12,2);}
    }
    previous.set(cells);
    const ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);
    knots=[['top',1],['subjects',1.65],['tutors',2.15],['lessons',3.1],['reviews',2.2],['contact',1]].map(([id,z])=>[document.getElementById(id).offsetTop-height*.15,z]);
    diagnostics.grid=[cols,rows];diagnostics.pixelRatio=ratio;
    dirty=true;camera();wake();
  }
  function evolve(){
    const started=performance.now();
    previous.set(cells);next.fill(0);
    for(let y=1;y<rows-1;y++)for(let x=1;x<cols-1;x++){
      const i=y*cols+x;
      const neighbours=[cells[i-cols-1],cells[i-cols],cells[i-cols+1],cells[i-1],cells[i+1],cells[i+cols-1],cells[i+cols],cells[i+cols+1]];
      let count=0,b=0;
      for(let n=0;n<8;n++){if(neighbours[n]){count++;if(neighbours[n]===1)b++;}}
      if(cells[i]&&(count===2||count===3))next[i]=cells[i];
      else if(!cells[i]&&count===3)next[i]=b>=2?1:2;
    }
    [cells,next]=[next,cells];generation++;
    diagnostics.generation=generation;diagnostics.stepMs.push(performance.now()-started);
    if(diagnostics.stepMs.length>240)diagnostics.stepMs.shift();
  }
  function camera(){
    let target=1;
    for(let i=0;i<knots.length-1;i++){
      if(scrollY>=knots[i][0]&&scrollY<knots[i+1][0]){
        let t=Math.max(0,Math.min(1,(scrollY-knots[i][0])/(knots[i+1][0]-knots[i][0])));
        t=t*t*(3-2*t);target=knots[i][1]+(knots[i+1][1]-knots[i][1])*t;break;
      }
    }
    zoom=media.matches?1:target;
    diagnostics.zoom=zoom;
    document.querySelector('.magnification').textContent=zoom.toFixed(1)+'×';
    root.style.setProperty('--dish-scale',zoom);
    root.style.setProperty('--ring-opacity',String(.2+Math.min(1,zoom-1)*.15));
    const heroProgress=Math.min(1,scrollY/Math.max(1,document.querySelector('.hero').offsetHeight));
    root.style.setProperty('--hero-dish-scale',media.matches?1:1+heroProgress*1.15);
    root.style.setProperty('--hero-dish-opacity',media.matches?1:1-heroProgress*.85);
    const contact=document.querySelector('#contact').getBoundingClientRect();
    root.style.setProperty('--contact-scale',media.matches?1:1.3-Math.max(0,Math.min(1,(height-contact.top)/height))*.3);
    const rule=document.querySelector('.rule-note').getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,(height-rule.top)/height));
    root.style.setProperty('--born-opacity',media.matches?1:progress);
    root.style.setProperty('--rule-turn',media.matches?'0deg':(progress*12-8)+'deg');
  }
  function draw(now){
    const start=performance.now();
    const t=(!playing||media.matches)?1:Math.min(1,(now-generationTime)/440);
    const blend=t*t*(3-2*t);
    ctx.clearRect(0,0,width,height);
    const size=cell*zoom,ox=width*.5*(1-zoom),oy=height*.5*(1-zoom);
    const firstY=Math.max(0,Math.floor((scrollY+(0-oy)/zoom)/cell)-1);
    const lastY=Math.min(rows,Math.ceil((scrollY+(height-oy)/zoom)/cell)+1);
    const firstX=Math.max(0,Math.floor(-ox/size)-1),lastX=Math.min(cols,Math.ceil((width-ox)/size)+1);
    for(let y=firstY;y<lastY;y++)for(let x=firstX;x<lastX;x++){
      const i=y*cols+x,alive=cells[i],was=previous[i];
      if(!alive&&!was)continue;
      const species=alive||was;
      let opacity=alive===was?1:alive?blend:1-blend;
      opacity*=selected?(selected===species?.8:.16):.5;
      ctx.globalAlpha=opacity;
      ctx.fillStyle=species===1?'#9bbfa8':'#b6a8d3';
      const px=x*size+ox,py=(y*cell-scrollY)*zoom+oy;
      const growth=.65+.35*(alive===was?1:alive?blend:1-blend);
      const s=(size-4)*growth, inset=(size-s)/2;
      if(species===1){ctx.beginPath();ctx.roundRect(px+inset,py+inset,s,s,Math.min(3,s*.12));ctx.fill();}
      else{ctx.beginPath();ctx.arc(px+size/2,py+size/2,s/2,0,Math.PI*2);ctx.fill();}
      if(zoom>2.2){ctx.globalAlpha=opacity*.55;ctx.fillStyle=species===1?'#5f8d72':'#85759f';ctx.beginPath();ctx.arc(px+size/2,py+size/2,Math.max(1,s*.09),0,Math.PI*2);ctx.fill();}
    }
    ctx.globalAlpha=1;diagnostics.drawMs.push(performance.now()-start);
    if(diagnostics.drawMs.length>240)diagnostics.drawMs.shift();
  }
  function tick(now){
    frame=0;if(document.hidden)return;
    if(playing&&!media.matches&&now-generationTime>=650){evolve();generationTime=now;dirty=true;}
    const growing=playing&&!media.matches;
    if((dirty||growing)&&now-lastDraw>=32){draw(now);dirty=false;lastDraw=now;}
    if(growing||dirty)frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
  function updatePlay(){
    play.innerHTML=media.matches?'Motion off':playing?'Pause <span aria-hidden="true">Ⅱ</span>':'Grow <span aria-hidden="true">▷</span>';
    play.setAttribute('aria-pressed',String(playing));
    play.setAttribute('aria-disabled',String(media.matches));
    if(!playing)previous.set(cells);
    dirty=true;wake();
  }
  function choose(species){
    selected=species;planting=species;document.body.dataset.selected=String(species);
    document.querySelector('#choose-b').setAttribute('aria-pressed',String(species===1));
    document.querySelector('#choose-e').setAttribute('aria-pressed',String(species===2));
    status.textContent=(species===1?'Barney':'Eugene')+' selected. Tap empty graph paper to plant.';
    dirty=true;wake();
  }
  function plant(px,py){
    const x=Math.floor((px-width*.5*(1-zoom))/(cell*zoom));
    const y=Math.floor((scrollY+(py-height*.5*(1-zoom))/zoom)/cell);
    put(Math.max(1,Math.min(cols-(planting===1?4:14),x-1)),Math.max(1,Math.min(rows-15,y-1)),planting);
    previous.set(cells);diagnostics.planted++;
    status.textContent=(planting===1?'Glider':'Pulsar')+' planted. '+(playing?'Growing.':'Growth is paused.');
    dirty=true;wake();
  }
  document.querySelector('#choose-b').addEventListener('click',()=>choose(1));
  document.querySelector('#choose-e').addEventListener('click',()=>choose(2));
  document.querySelectorAll('[data-select]').forEach(el=>el.addEventListener('click',()=>choose(Number(el.dataset.select))));
  document.querySelectorAll('.slide').forEach(slide=>{
    const faces=[...slide.querySelectorAll('.slide-face')];
    function measureReverse(){
      slide.style.setProperty('--reverse-height',Math.max(faces[0].scrollHeight,faces[1].scrollHeight+2)+'px');
      setTimeout(setup,850);
    }
    // Keep both faces in the accessibility tree; remove only the hidden face's controls from tab order.
    function sync(){faces.forEach((face,i)=>{
      const away=i===0?slide.classList.contains('flipped'):!slide.classList.contains('flipped');
      face.classList.toggle('is-away',away);
      face.querySelectorAll('a,button,summary').forEach(el=>el.tabIndex=away?-1:0);
    });}
    sync();
    slide.addEventListener('click',()=>choose(Number(slide.dataset.species)));
    slide.querySelectorAll('.flip').forEach(btn=>btn.addEventListener('click',()=>{
      measureReverse();
      const flipped=slide.classList.toggle('flipped');
      slide.querySelectorAll('.flip').forEach(el=>el.setAttribute('aria-expanded',String(flipped)));
      sync();
      const destination=faces[flipped?1:0].querySelector('.flip');
      destination.focus({preventScroll:true});
      if(slide.getBoundingClientRect().top<25)slide.scrollIntoView({block:'start',behavior:media.matches?'instant':'smooth'});
      if(!media.matches){
        slide.querySelector('.slide-inner').animate([{opacity:1},{opacity:0,offset:.35},{opacity:0,offset:.55},{opacity:1}],{duration:800,easing:'ease-in-out'});
        for(let i=0;i<25;i++){
          const shard=document.createElement('i');shard.className='cell-shard';shard.setAttribute('aria-hidden','true');
          const col=i%5,row=Math.floor(i/5);shard.style.left=(10+col*18)+'%';shard.style.top=(10+row*18)+'%';slide.append(shard);
          const anim=shard.animate([{opacity:0,transform:'scale(.1)'},{opacity:.8,offset:.3,transform:'scale(1)'},{opacity:0,transform:`translate(${(col-2)*26}px,${(row-2)*18}px) scale(.2)`}],{duration:750,delay:i%5*20,easing:'ease-in-out'});
          anim.onfinish=()=>shard.remove();
        }
      }
    }));
    slide.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',measureReverse));
  });
  play.addEventListener('click',()=>{if(media.matches)return;playing=!playing;generationTime=performance.now();updatePlay();status.textContent=playing?'The notebook is growing.':'Growth paused.';});
  document.querySelector('#plant-near').addEventListener('click',()=>plant(width*.88,height*.48));
  document.addEventListener('pointerdown',e=>{
    if(e.target.closest('a,button,summary,header,footer,.quiet,.slide,.garden-controls,.rule-note'))return;
    pointer={x:e.clientX,y:e.clientY,scroll:scrollY,id:e.pointerId};
  },{passive:true});
  document.addEventListener('pointerup',e=>{
    const p=pointer;pointer=null;
    if(p&&p.id===e.pointerId&&Math.hypot(e.clientX-p.x,e.clientY-p.y)<8&&Math.abs(scrollY-p.scroll)<8&&!getSelection().toString())plant(e.clientX,e.clientY);
  },{passive:true});
  document.addEventListener('pointercancel',()=>pointer=null,{passive:true});
  let scrollFrame=0;
  addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;camera();dirty=true;wake();});},{passive:true});
  let resizeTimer;
  addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(setup,150);});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){cancelAnimationFrame(frame);frame=0;}
    else{generationTime=performance.now();dirty=true;wake();}
  });
  media.addEventListener('change',()=>{playing=false;previous.set(cells);camera();updatePlay();});
  addEventListener('load',()=>{setup();updatePlay();});
})();
