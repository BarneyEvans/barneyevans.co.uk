/* One finite document-coordinate world. 1 = Barney, 2 = Eugene.
   Immigration Life: Conway B3/S23, with majority-parent species at birth. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const canvas = document.querySelector('#garden');
  const ctx = canvas.getContext('2d');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const pause = document.querySelector('#pause');
  const speciesButton = document.querySelector('#species');
  const status = document.querySelector('#garden-status');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const stepEls = [...document.querySelectorAll('.lesson-path li')];
  let cells, next, previous, cell, cols, rows, width, height;
  let chosen = 0, planting = 1, paused = media.matches, raf = 0, timer = 0;
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
    const spread = chapter.id === 'subjects' ? 2 : 3;
    for (let k=0;k<spread;k++) {
      const bedY=y+3+k*Math.max(19,Math.floor(h/spread));
      put(1,bedY,1);
      put(4,bedY+6,1);
      put(1,bedY+12,1);
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

  function setup() {
    const old = cells, oldCols = cols, oldRows = rows;
    width = innerWidth; height = innerHeight;
    cell = Math.max(width<760 ? 14 : 22, Math.ceil(width/140), Math.ceil(document.documentElement.scrollHeight/900));
    cols = Math.ceil(width/cell)+1;
    rows = Math.ceil(document.documentElement.scrollHeight/cell)+2;
    cells = new Uint8Array(cols*rows); next = new Uint8Array(cells.length);
    if (old) {
      for(let y=0;y<Math.min(rows,oldRows);y++)
        for(let x=0;x<Math.min(cols,oldCols);x++) cells[y*cols+x]=old[y*oldCols+x];
    } else {
      // Sparse morning seedlings; the fuller beds are planted by the scroll story.
      put(2,Math.floor(235/cell),1);
      put(cols-15,Math.floor(440/cell),2);
      put(2,Math.floor(690/cell),1);
      if(media.matches) chapters.forEach(seedChapter);
    }
    previous = cells.slice();
    const dpr = Math.min(devicePixelRatio||1,2);
    canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    scrollStory(); requestDraw();
  }

  function evolve() {
    const begin = performance.now();
    next.fill(0);
    for(let y=1;y<rows-1;y++) for(let x=1;x<cols-1;x++) {
      const i=y*cols+x;
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
    requestDraw();
  }

  function roundedCell(x,y,size,species,alpha,scale) {
    ctx.globalAlpha=alpha;
    ctx.fillStyle=species===1?'#a8bea0':'#bcaed0';
    const s=(size-3)*scale, inset=(size-s)/2;
    ctx.beginPath();
    ctx.roundRect(x+inset,y+inset,s,s,species===1?Math.min(3,s*.2):s*.46);
    ctx.fill();
  }

  function draw(now) {
    const start=performance.now();
    ctx.clearRect(0,0,width,height);
    const t=media.matches||paused?1:clamp((now-changedAt)/560,0,1);
    const eased=t*t*(3-2*t);
    const first=Math.max(0,Math.floor(scrollY/cell)-1);
    const end=Math.min(rows,Math.ceil((scrollY+height)/cell)+1);
    for(let y=first;y<end;y++) for(let x=0;x<cols;x++) {
      const i=y*cols+x, s=cells[i], old=previous[i];
      if(!s&&!old) continue;
      const active=s||old;
      const selection=chosen && active!==chosen ? .22 : chosen ? .95 : .65;
      const alpha=(s ? old ? 1 : eased : 1-eased)*selection;
      if(alpha<.005) continue;
      const scale=s&&!old ? .58+.42*eased : !s ? 1-.22*eased : 1;
      roundedCell(x*cell,y*cell-scrollY,cell,active,alpha,scale);
    }
    ctx.globalAlpha=1;
    lastDraw=performance.now()-start;
    metrics.drawMs.push(lastDraw);
    if(metrics.drawMs.length>240) metrics.drawMs.shift();
    if(t<1&&!paused&&!media.matches&&!document.hidden) requestDraw();
  }

  function requestDraw() {
    if(!raf&&!document.hidden) raf=requestAnimationFrame(now=>{raf=0;draw(now);});
  }

  function scrollStory() {
    if(!cells) return;
    day=clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-height),0,1);
    document.documentElement.style.setProperty('--day',media.matches?'.55':day.toFixed(4));
    // Each bed belongs to this same world. Scroll introduces increasing density.
    chapters.forEach(chapter=>{
      if(chapter.getBoundingClientRect().top<height*.94) seedChapter(chapter);
    });
    const lessons=document.querySelector('#lessons').getBoundingClientRect();
    const path=clamp((height*.7-lessons.top)/lessons.height,0,1);
    document.documentElement.style.setProperty('--path',media.matches?1:path);
    stepEls.forEach((el,i)=>el.classList.toggle('active',media.matches||path>(i+.5)/4));
    requestDraw();
  }

  function schedule() {
    clearInterval(timer); timer=0;
    pause.textContent=media.matches?'Motion off':paused?'Grow ▷':'Pause Ⅱ';
    pause.setAttribute('aria-pressed',String(paused));
    pause.setAttribute('aria-label',media.matches?'Motion off: reduced motion preference':paused?'Resume garden growth':'Pause garden growth');
    if(!paused&&!media.matches&&!document.hidden) timer=setInterval(evolve,1050);
    if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0;}
  }
  pause.addEventListener('click',()=>{
    if(media.matches) { status.textContent='Motion is off. You can still choose a tutor and plant a still pattern.'; return; }
    paused=!paused; schedule(); requestDraw();
    status.textContent=paused?'Garden paused.':'Garden growing.';
  });

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
    const beds=[document.querySelector('.hero-people'),document.querySelector('.garden-crossing')];
    const visible=beds.find(el=>{const r=el.getBoundingClientRect();return r.bottom>70&&r.top<height-100;});
    plant(width*.55,visible?documentY(visible)+Math.min(visible.offsetHeight/2,90):scrollY+height*.5);
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
  let scrollFrame=0;
  addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;scrollStory();});},{passive:true});
  let resizeTimer;
  addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(setup,140);});
  document.addEventListener('visibilitychange',()=>{schedule();if(!document.hidden){scrollStory();requestDraw();}});
  media.addEventListener('change',()=>{if(media.matches){paused=true;chapters.forEach(seedChapter);}schedule();scrollStory();requestDraw();});
  // Small read-only diagnostics for reproducible local performance checks.
  window.greenhouse={snapshot:()=>({generation,paused,chosen,planting,cols,rows,cell,day,live:cells.reduce((n,c)=>n+!!c,0),sage:cells.reduce((n,c)=>n+(c===1),0),lavender:cells.reduce((n,c)=>n+(c===2),0),metrics:JSON.parse(JSON.stringify(metrics))})};
  addEventListener('load',()=>{setup();schedule();});
})();
