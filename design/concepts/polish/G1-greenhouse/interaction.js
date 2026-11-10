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
  let lightStops=[];
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
    canvas.style.height=pageHeight+'px';day
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
    measureJourney();dirty=allDirty=true;requestDraw();
  }

  function measureJourney() {
    pageHeight=document.documentElement.scrollHeight;
    chapterGeometry=chapters.map(el=>({el,top:documentY(el)}));
    stepTops=stepEls.map(el=>documentY(el));
    const arch = document.querySelector('.glass-arch').getBoundingClientRect();
    const subject = document.querySelector('#subjects');
    const contact = document.querySelector('#contact').getBoundingClientRect();
    const margin = width < 760 ? 11 : Math.max(16,(width-1160)/2+17);
    const archY = arch.top + scrollY + (width<761?40:52);
    const archX = arch.left+arch.width/2;
    const archScale=width<761?1.65:2.1;
    const archHold=Math.max(1,archY-height*.35);
    const garden=document.querySelector('.planting-bed').getBoundingClientRect();
    const gardenY=garden.top+scrollY+garden.height/2;
    lightStops = [
      {scroll:0,x:archX,y:archY,size:archScale},
      {scroll:archHold,x:archX,y:archY-archHold,size:archScale},
      {scroll:archHold+90,x:margin,y:archY-archHold-90,size:.16},
      {scroll:documentY(subject)-height*.25,x:margin,y:height*.35,size:.16},
      {scroll:gardenY-height*.7,x:margin,y:height*.7,size:.16},
      {scroll:gardenY-height*.55,x:width/2,y:height*.55,size:2.25},
      {scroll:gardenY-height*.35,x:width/2,y:height*.35,size:2.25},
      {scroll:gardenY-height*.2,x:margin,y:height*.2,size:.16}
    ];
    const first = stepEls[0].querySelector('.step-seed').getBoundingClientRect();
    if(width>=761) {
      const lessonTop=documentY(document.querySelector('#lessons'));
      lightStops.push({scroll:lessonTop-height*.8,x:margin,y:height*.8-24,size:.16});
      lightStops.push({scroll:lessonTop-height*.7,x:first.left-12,y:height*.7-24,size:.16});
    }
    lightStops.push({scroll:first.top+scrollY-height*.55-48,x:width>=761?first.left-12:margin,y:height*.55,size:.16});
    stepEls.forEach(el=>{
      const r=el.querySelector('.step-seed').getBoundingClientRect();
      lightStops.push({scroll:r.top+scrollY-height*.55,x:r.left+r.width/2,y:height*.55+r.height/2,size:1.9});
    });
    lightStops.push({scroll:documentY(document.querySelector('#reviews'))-height*.3,x:margin,y:height*.35,size:.16});
    // Cross the empty crown of the contact arch, never the preceding review.
    lightStops.push({scroll:contact.top+scrollY-height*.82,x:margin,y:height*.82+70,size:.16});
    lightStops.push({scroll:contact.top+scrollY-height*.65,x:contact.left+contact.width/2,y:height*.65+70,size:3.6});
    lightStops.sort((a,b)=>a.scroll-b.scroll);
  }

  function moveLight() {
    if(media.matches || !lightStops.length) return;
    let a=lightStops[0],b=a;
    for(let i=1;i<lightStops.length;i++) {
      b=lightStops[i];
      if(scrollY<=b.scroll) break;
      a=b;
    }
    const t=clamp((scrollY-a.scroll)/Math.max(1,b.scroll-a.scroll),0,1);
    const smooth=t*t*(3-2*t);
    const x=a.x+(b.x-a.x)*smooth;
    const y=a.y+(b.y-a.y)*t-(a===b?Math.max(0,scrollY-a.scroll):0);
    const size=a.size+(b.size-a.size)*smooth;
    light.style.transform=`translate3d(${(x-48).toFixed(1)}px,${(y-48).toFixed(1)}px,0) scale(${size.toFixed(3)})`;
    light.style.opacity=clamp((size-.16)/1.2,0,1).toFixed(3);
    light.style.setProperty('--core-scale',Math.min(1,1.7/size).toFixed(3));
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
  function scrollStory() {
    if(!cells) return;
    if(media.matches && !paused) {paused=true;schedule();}
    day=clamp(scrollY/Math.max(1,pageHeight-height),0,1);
    // Each bed belongs to this same world. Scroll introduces increasing density.
    chapterGeometry.forEach(({el,top})=>{
      if(top-scrollY<height*.94) seedChapter(el);
    });
    const path=clamp((height*.55+scrollY-stepTops[0])/Math.max(1,stepTops[3]-stepTops[0]),0,1);
    const daylightValue=media.matches?'.55':day.toFixed(4);
    daylight.style.setProperty('--day',daylightValue);
    archLight.style.setProperty('--day',daylightValue);
    contactSun.style.setProperty('--day',daylightValue);
    lessonPath.style.setProperty('--path',media.matches?1:path);
    const arrival=media.matches?1:clamp((scrollY+height*.7-stepTops[0])/140,0,1)*clamp((stepTops[3]-scrollY-height*.2)/140,0,1);
    lessonPath.style.setProperty('--pool-y',`${(48+path*(stepTops[3]-stepTops[0])).toFixed(1)}px`);
    lessonPath.style.setProperty('--pool-arrival',arrival.toFixed(3));
    const contactArrival=media.matches?1:clamp((scrollY+height*.75-chapterGeometry[4].top)/180,0,1);
    contactSun.style.setProperty('--arrival',contactArrival.toFixed(3));
    stepEls.forEach((el,i)=>el.classList.toggle('active',media.matches||stepTops[i]-scrollY<height*.55));
    moveLight();
  }

  function tick(now){
    raf=0;if(document.hidden||!cells)return;
    if(media.matches!==reducedState){syncReducedMotion();return;}
    if(!paused&&!media.matches&&lastTick&&now-lastTick<1000/60){raf=requestAnimationFrame(tick);return;}
    const dt=lastTick?Math.min(.032,(now-lastTick)/1000):0;lastTick=now;
    scrollStory();
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
    if(requested){chapters.forEach(seedChapter);allDirty=true;}
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
  addEventListener('load',()=>{setup();schedule();});
  new ResizeObserver(()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(setup,120);}).observe(document.querySelector('main'));
})();
