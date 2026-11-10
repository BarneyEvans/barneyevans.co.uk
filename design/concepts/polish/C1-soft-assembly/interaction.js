/* One shared, finite animation clock. Assemblies play once and stay built. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mode = 'assembly';
  const scenes = [...document.querySelectorAll('.motion-scene')].map(el => ({
    el, canvas: el.querySelector('canvas'), ctx: el.querySelector('canvas').getContext('2d'),
    kind: Number(el.dataset.scene), width: 0, height: 0, top: 0,
    progress: 0, elapsed: 0, started: false, dirty: true, bounds: null
  }));
  let raf = 0, swap = 0, target = 0, start = 0, origin = 0, active = false;
  let pointer = 0, pointerX = null, paused = false, geometryDirty = true, lastTime = 0;
  const durations = [2200, 3600, 4000, 3800, 5400];
  const timings = [], paints = [0,0,0,0,0];
  const clamp = n => Math.max(0, Math.min(1, n));
  const ease = n => n * n * n * (10 + n * (-15 + n * 6));
  const lerp = (a,b,p) => a + (b-a)*p;
  const blend = (a,b,p) => {
    const x=parseInt(a.slice(1),16), y=parseInt(b.slice(1),16);
    return `rgb(${[16,8,0].map(shift=>Math.round(lerp((x>>shift)&255,(y>>shift)&255,p))).join(',')})`;
  };
  let drawingScene;
  function include(x,y,r=0) {
    const b=drawingScene.bounds;
    b.left=Math.min(b.left,x-r);b.right=Math.max(b.right,x+r);
    b.top=Math.min(b.top,y-r);b.bottom=Math.max(b.bottom,y+r);
  }
  function tile(ctx,x,y,size,r,color,rotation=0) {
    include(x,y,size/2*(Math.abs(Math.cos(rotation))+Math.abs(Math.sin(rotation))));
    ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.fillStyle=color;
    ctx.beginPath();ctx.roundRect(-size/2,-size/2,size,size,r);ctx.fill();ctx.restore();
  }
  function mosaic(s,p) {
    const {ctx:c,width:w,height:h,kind:k}=s;
    const cool=['#dedff4','#b9bbe4','#999dce','#656ab0'];
    const warm=['#f1d7cb','#e9bda9','#e0a58a','#c6836a'];
    const lavender=cool.map((color,i)=>blend(color,warm[i],swap));
    const peach=warm.map((color,i)=>blend(color,cool[i],swap));
    const phase = ease(p), hover=pointer*9;
    if(k===0) {
      const size=Math.min(w/13,35), cols=13;
      for(let i=0;i<cols;i++)for(let j=0;j<2;j++){
        const side=i<6?0:1, palette=side?peach:lavender;
        const x=size*.7+i*(w-size*1.4)/(cols-1);
        const base=j===0?size*.65:j===1?h*.48:h-size*.7;
        const y=base+Math.sin(i*.65+phase*2+swap*3)*size*.18;
        tile(c,x,y,size*.72,5,palette[(i+j)%3],(1-phase)*Math.sin(i)*.35+hover*.002);
      }
      return;
    }
    // Endpoints and the entire arc reserve room for the rotated square.
    // Nothing enters from beyond the canvas or crosses neighbouring copy.
    function land(x,y,size,color,index,delay,fromX,fromY,round=4,travel=.54) {
      const margin=size*.71+2;
      x=Math.max(margin,Math.min(w-margin,x));fromX=Math.max(margin,Math.min(w-margin,fromX));
      y=Math.max(margin,Math.min(h-margin,y));fromY=Math.max(margin,Math.min(h-margin,fromY));
      const t=clamp((p-delay)/travel), settled=ease(t);
      const lift=Math.min(size*.85,Math.max(0,Math.min(y,fromY)-margin));
      const arc=Math.sin(t*Math.PI)**2*lift;
      tile(c,lerp(fromX,x,settled),lerp(fromY,y,settled)-arc,size,round,color,(1-settled)*(index%2?1:-1)*.48);
    }
    if(k===1) {
      const n=Math.min(30,Math.max(12,Math.round(w/24))), size=Math.min(38,w/(n+1),h/3.8), gap=size+2;
      for(let i=0;i<n;i++)for(let row=0;row<2;row++){
        const t=i/(n-1), x=lerp(size*.85,w-size*.85,t);
        const y=h*.61-Math.sin(t*Math.PI)*h*.27+row*gap;
        const palette=i<n/2?lavender:peach;
        // Both banks build towards the last, central keystone.
        const order=Math.min(i,n-1-i)/(n/2), delay=order*.34+row*.08;
        const fromX=i<n/2?size*(.9+i*.42):w-size*(.9+(n-1-i)*.42);
        land(x,y,size,palette[(i+row)%4],i+row,delay,fromX,h*(.53+Math.sin(i)*.13),Math.max(4,size*.18));
      }
      return;
    }
    if(k===2) {
      const size=Math.min(w/5.2,21), gap=size+3, group=Number(s.el.dataset.step);
      const palette=group%2?peach:lavender;
      let index=0;
      // Lay the foundation first, then three successively higher courses.
      for(let y=0;y<4;y++)for(let x=y;x<4;x++){
        const xx=w/2+(x-1.5)*gap, yy=h-size*.7-y*gap;
        land(xx,yy,size,palette[(x+y)%4],index,index*.047,w*.2+(index%3)*w*.3,h*(.38+(index%2)*.24),index===9?6:4);
        index++;
      }
      return;
    }
    if(k===3) {
      // Two opening quotation marks: a rising hook above each broad lower bowl.
      const size=Math.min(w/6.4,h/5.4,19), gap=size+1.5;
      const cells=[[1,.15,.64],[.3,.6,.8],[0,1.4,1],[0,2.4,1],[1,2.4,1],[1,1.4,1]];
      for(let part=0;part<2;part++)for(let i=0;i<cells.length;i++){
        const [col,row,scale]=cells[i], palette=part?peach:lavender;
        const xx=size*.9+(part*3+col)*gap, yy=h*.18+row*gap, actualSize=size*scale;
        land(xx,yy,actualSize,palette[i<2?3:i<4?2:1],i+part,i*.06+part*.10,
          size+(i%3)*w*.29,h*(.38+(i%3)*.17),actualSize*.27);
      }
      return;
    }
    // First assemble the jambs and lintel; then the two tiled leaves open.
    const size=Math.min(w/8,h/10), gap=size*1.1, top=h*.14;
    function frame(x,y,palette,index,delay) {
      land(x,y,size,palette[index%4],index,delay,
        w*(index%2?.32:.68),h*(.42+(index%3)*.12),size*.24,.34);
    }
    for(let side=0;side<2;side++)for(let row=1;row<7;row++){
      const palette=side?peach:lavender;
      frame(w/2+(side?3:-3)*gap,top+row*gap,palette,row+side,(6-row)*.027);
    }
    for(let i=0;i<7;i++)frame(w/2+(i-3)*gap,top,i<3?lavender:peach,i,.16+Math.abs(i-3)*.018);
    const opening=ease(clamp((p-.60)/.40)), leafReady=ease(clamp((p-.15)/.28));
    const innerHalf=gap*2.45, angle=opening*Math.PI*.44;
    const leafWidth=innerHalf*Math.cos(angle), tileW=leafWidth/2;
    // Perspective is drawn as polygons, with a clear central opening at rest.
    for(let side=0;side<2;side++){
      const hinge=w/2+(side?1:-1)*innerHalf, direction=side?-1:1;
      const palette=side?peach:lavender;
      for(let row=0;row<6;row++)for(let col=0;col<2;col++){
        const x0=hinge+direction*col*tileW, x1=hinge+direction*(col+1)*tileW;
        const y=top+gap*.55+row*gap, skew0=col*Math.sin(angle)*gap*.22, skew1=(col+1)*Math.sin(angle)*gap*.22;
        include(x0,y+skew0);include(x1,y+gap*.92+skew1);
        c.globalAlpha=leafReady;c.fillStyle=palette[(row+col)%3];c.beginPath();
        c.moveTo(x0,y+skew0);c.lineTo(x1,y+skew1);c.lineTo(x1,y+gap*.92+skew1);c.lineTo(x0,y+gap*.92+skew0);c.closePath();c.fill();
      }
    }
    c.globalAlpha=1;
  }

  function paint(time) {
    raf=0;if(document.hidden)return;
    const begin=performance.now();
    const dt=lastTime?Math.min(50,time-lastTime):0;lastTime=time;
    // Read all geometry together, before any canvas backing-store writes.
    const y=scrollY, viewport=innerHeight, dpr=Math.min(devicePixelRatio||1,2);
    if(geometryDirty){
      const rects=scenes.map(s=>s.el.getBoundingClientRect());
      scenes.forEach((s,i)=>{const r=rects[i];s.top=r.top+y;s.left=r.left;s.width=r.width;s.height=r.height;s.dirty=true;});
      geometryDirty=false;
    }
    pointer=pointerX===null?0:Math.max(-.5,Math.min(.5,(pointerX-scenes[0].left)/Math.max(1,scenes[0].width)-.5));
    const changing=active;
    if(active){const t=clamp((time-start)/1100);swap=lerp(origin,target,ease(t));active=t<1;}
    let running=active;
    for(const s of scenes){
      const top=s.top-y, w=s.width,h=s.height, previous=s.progress;
      if(reduced.matches||paused){s.progress=1;s.elapsed=durations[s.kind];s.started=true;}
      if(top+h<0||top>viewport||!w||!h)continue;
      if(!s.started&&top<viewport*.90){s.started=true;s.dirty=true;}
      if(s.started&&s.progress<1){s.elapsed+=dt;s.progress=clamp(s.elapsed/durations[s.kind]);running=s.progress<1||running;}
      if(!s.dirty&&s.progress===previous&&!changing)continue;
      if(s.canvas.width!==Math.round(w*dpr)||s.canvas.height!==Math.round(h*dpr)){
        s.canvas.width=Math.round(w*dpr);s.canvas.height=Math.round(h*dpr);
      }
      const c=s.ctx;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
      drawingScene=s;s.bounds={left:Infinity,top:Infinity,right:-Infinity,bottom:-Infinity};
      mosaic(s,s.progress);s.dirty=false;paints[s.kind]++;
    }
    timings.push(performance.now()-begin);if(timings.length>500)timings.shift();
    if(running&&!reduced.matches&&!paused)raf=requestAnimationFrame(paint);else lastTime=0;
  }
  function request(){if(!raf&&!document.hidden)raf=requestAnimationFrame(paint);}
  const observer=new IntersectionObserver(request);
  scenes.forEach(s=>observer.observe(s.el));
  addEventListener('scroll',request,{passive:true});
  const resize=new ResizeObserver(()=>{geometryDirty=true;request();});
  resize.observe(document.body);scenes.forEach(s=>resize.observe(s.el));
  document.addEventListener('toggle',()=>{geometryDirty=true;request();},true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;lastTime=0;}else request();});
  reduced.addEventListener('change',()=>{active=false;swap=target;scenes.forEach(s=>s.dirty=true);request();});
  const button=document.querySelector('.rearrange');
  button.setAttribute('aria-pressed','false');
  button.addEventListener('click',()=>{
    target=target?0:1;origin=swap;start=performance.now();active=!reduced.matches&&!paused;if(!active)swap=target;
    scenes.forEach(s=>s.dirty=true);button.setAttribute('aria-pressed',String(!!target));request();
  });
  const pauseButton=document.querySelector('.pause');
  pauseButton.addEventListener('click',()=>{paused=!paused;active=false;swap=target;pointerX=null;scenes.forEach(s=>s.dirty=true);pauseButton.setAttribute('aria-pressed',String(paused));pauseButton.textContent=paused?'Resume motion':'Pause motion';request();});
  const portrait=document.querySelector('.portrait-stage');
  portrait.addEventListener('pointermove',e=>{
    if(reduced.matches||paused||e.pointerType==='touch')return;
    pointerX=e.clientX;scenes[0].dirty=true;request();
  },{passive:true});
  portrait.addEventListener('pointerleave',()=>{pointerX=null;scenes[0].dirty=true;request();},{passive:true});
  // Read-only instrumentation for reproducible local QA.
  window.conceptMotion={snapshot:()=>({mode,paints:[...paints],drawMs:[...timings],active,swap,paused,reduced:reduced.matches,pixelRatio:Math.min(devicePixelRatio||1,2),progress:scenes.map(s=>s.progress),pending:!!raf,
    scenes:scenes.map(s=>({kind:s.kind,progress:s.progress,duration:durations[s.kind],width:s.width,height:s.height,bounds:s.bounds}))})};
})();
