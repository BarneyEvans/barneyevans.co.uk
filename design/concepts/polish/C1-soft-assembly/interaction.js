/* Event-driven canvas choreography. No animation loop runs while idle. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mode = 'assembly';
  const scenes = [...document.querySelectorAll('.motion-scene')].map(el => ({
    el, canvas: el.querySelector('canvas'), ctx: el.querySelector('canvas').getContext('2d'),
    kind: Number(el.dataset.scene), visible: false, width: 0, height: 0
  }));
  let raf = 0, swap = 0, target = 0, start = 0, origin = 0, active = false;
  let pointer = 0, lastPointer = 0, paused = false;
  const timings = [], paints = [0,0,0,0,0];
  const clamp = n => Math.max(0, Math.min(1, n));
  const ease = n => n * n * (3 - 2 * n);
  const lerp = (a,b,p) => a + (b-a)*p;
  function tile(ctx,x,y,size,r,color,rotation=0) {
    ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.fillStyle=color;
    ctx.beginPath();ctx.roundRect(-size/2,-size/2,size,size,r);ctx.fill();ctx.restore();
  }
  function mosaic(s,p) {
    const {ctx:c,width:w,height:h,kind:k}=s;
    const lavender=['#dedff4','#b9bbe4','#999dce','#656ab0'];
    const peach=['#f1d7cb','#e9bda9','#e0a58a','#c6836a'];
    const phase = ease(p), hover=pointer*9;
    if(k===0) {
      const size=Math.min(w/13,35), cols=13;
      for(let i=0;i<cols;i++)for(let j=0;j<2;j++){
        const side=i<6?0:1, palette=(side+Math.round(swap))%2?peach:lavender;
        const x=size*.7+i*(w-size*1.4)/(cols-1);
        const base=j===0?size*.65:j===1?h*.48:h-size*.7;
        const y=base+Math.sin(i*.65+phase*2+swap*3)*size*.18;
        tile(c,x,y,size*.72,5,palette[(i+j)%3],(1-phase)*Math.sin(i)*.35+hover*.002);
      }
      return;
    }
    // Each piece travels along a short arc and lands in a staggered order.
    // The canvas stays inside a reserved content margin, so no flight crosses text.
    function land(x,y,size,color,index,delay,fromX,fromY,round=4) {
      const t=clamp((p-delay)/.42), settled=1-Math.pow(1-t,3);
      const arc=Math.sin(t*Math.PI)*size*1.25;
      tile(c,lerp(fromX,x,settled),lerp(fromY,y,settled)-arc,size,round,color,(1-settled)*(index%2?1:-1)*.9);
    }
    if(k===1) {
      const n=Math.min(30,Math.max(12,Math.round(w/24))), size=Math.min(38,w/(n+1)), gap=size+2;
      for(let i=0;i<n;i++)for(let row=0;row<2;row++){
        const t=i/(n-1), x=lerp(size*.65,w-size*.65,t);
        const y=h*.66-Math.sin(t*Math.PI)*h*.40+row*gap;
        const palette=(i<n/2)!=(swap>.5)?lavender:peach;
        // Both banks build towards the last, central keystone.
        const order=Math.min(i,n-1-i)/(n/2), delay=order*.38+row*.08;
        const fromX=i<n/2?-size-i*size*.35:w+size+(n-i)*size*.35;
        land(x,y,size,palette[(i+row)%4],i+row,delay,fromX,h*.25+Math.sin(i)*h*.25,Math.max(4,size*.18));
      }
      return;
    }
    if(k===2) {
      const size=Math.min(w/5.2,21), gap=size+3, group=Number(s.el.dataset.step);
      const palette=(group+Math.round(swap))%2?peach:lavender;
      let index=0;
      // Lay the foundation first, then three successively higher courses.
      for(let y=0;y<4;y++)for(let x=y;x<4;x++){
        const xx=w/2+(x-1.5)*gap, yy=h-size*.7-y*gap;
        land(xx,yy,size,palette[(x+y)%4],index,index*.045,w*.15+(index%3)*w*.35,size*.6+(index%2)*size,index===9?6:4);
        index++;
      }
      return;
    }
    if(k===3) {
      const size=Math.min(w/5.7,25), gap=size+2;
      for(let part=0;part<2;part++)for(let i=0;i<7;i++){
        const col=i%2, row=Math.floor(i/2), palette=(part+Math.round(swap))%2?peach:lavender;
        const xx=w/2+(part*3+col-2)*gap-(row===3?size*.35:0);
        const yy=h*.48+(row-1.5)*gap;
        land(xx,yy,size,palette[(row+col)%4],i+part,i*.045+part*.08,part?w+size:-size,h*.18+i*size*.3,Math.max(4,size*.28));
      }
      return;
    }
    // First assemble the jambs and lintel; then the two tiled leaves open.
    const size=Math.min(w/8,h/10), gap=size*1.1, top=h*.14;
    const frameProgress=clamp(p/.67);
    function frame(x,y,palette,index,delay) {
      const t=ease(clamp((frameProgress-delay)/.48));
      tile(c,lerp(index%2?-size:w+size,x,t),lerp(h*.75,y,t)-Math.sin(t*Math.PI)*size,size,size*.24,palette[index%4],(1-t)*.8);
    }
    for(let side=0;side<2;side++)for(let row=1;row<7;row++){
      const palette=(side+Math.round(swap))%2?peach:lavender;
      frame(w/2+(side?3:-3)*gap,top+row*gap,palette,row+side,(6-row)*.05);
    }
    for(let i=0;i<7;i++)frame(w/2+(i-3)*gap,top,i<3?lavender:peach,i,.3+Math.abs(i-3)*.025);
    const opening=ease(clamp((p-.64)/.32)), leafReady=ease(clamp((p-.30)/.30));
    const innerHalf=gap*2.45, leafWidth=innerHalf*(1-opening*.84), tileW=leafWidth/2;
    // Perspective is drawn as polygons, with a clear central opening at rest.
    for(let side=0;side<2;side++){
      const hinge=w/2+(side?1:-1)*innerHalf, direction=side?-1:1;
      const palette=(side+Math.round(swap))%2?peach:lavender;
      for(let row=0;row<6;row++)for(let col=0;col<2;col++){
        const x0=hinge+direction*col*tileW, x1=hinge+direction*(col+1)*tileW;
        const y=top+gap*.55+row*gap, skew0=col*opening*gap*.18, skew1=(col+1)*opening*gap*.18;
        c.globalAlpha=leafReady;c.fillStyle=palette[(row+col)%3];c.beginPath();
        c.moveTo(x0,y+skew0);c.lineTo(x1,y+skew1);c.lineTo(x1,y+gap*.92+skew1);c.lineTo(x0,y+gap*.92+skew0);c.closePath();c.fill();
      }
    }
    c.globalAlpha=1;
  }

  function paint(time) {
    raf=0;if(document.hidden)return;
    const begin=performance.now();
    if(active){const t=clamp((time-start)/700);swap=lerp(origin,target,ease(t));active=t<1;}
    for(const s of scenes){
      if(!s.visible)continue;
      const rect=s.el.getBoundingClientRect();
      if(rect.bottom<0||rect.top>innerHeight)continue;
      const dpr=Math.min(devicePixelRatio||1,2), w=rect.width,h=rect.height;
      if(!w||!h)continue;
      if(s.width!==w||s.height!==h||s.dpr!==dpr){s.width=w;s.height=h;s.dpr=dpr;s.canvas.width=Math.round(w*dpr);s.canvas.height=Math.round(h*dpr);}
      const c=s.ctx;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
      const p=(reduced.matches||paused)?1:clamp((innerHeight*.96-rect.top)/(Math.min(innerHeight*.48,360)+h*.1));
      mosaic(s,p);s.progress=+p.toFixed(3);paints[s.kind]++;
    }
    timings.push(performance.now()-begin);if(timings.length>500)timings.shift();
    if(active&&!reduced.matches)raf=requestAnimationFrame(paint);
  }
  function request(){if(!raf&&!document.hidden)raf=requestAnimationFrame(paint);}
  const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{scenes.find(s=>s.el===e.target).visible=e.isIntersecting;});request();},{rootMargin:'30px'});
  scenes.forEach(s=>observer.observe(s.el));
  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',request,{passive:true});
  new ResizeObserver(request).observe(document.body);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;active=false;swap=target;}else request();});
  reduced.addEventListener('change',()=>{active=false;swap=target;request();});
  const button=document.querySelector('.rearrange');
  button.setAttribute('aria-pressed','false');
  button.addEventListener('click',()=>{
    target=target?0:1;origin=swap;start=performance.now();active=!reduced.matches&&!paused;if(!active)swap=target;
    button.setAttribute('aria-pressed',String(!!target));request();
  });
  const pauseButton=document.querySelector('.pause');
  pauseButton.addEventListener('click',()=>{paused=!paused;active=false;swap=target;pointer=0;pauseButton.setAttribute('aria-pressed',String(paused));pauseButton.textContent=paused?'Resume motion':'Pause motion';request();});
  document.querySelectorAll('.portrait-stage,#tutors .section-heading,.review-pair,.contact-heading').forEach(el=>{
    el.addEventListener('pointermove',e=>{if(reduced.matches||paused||e.pointerType==='touch')return;const t=performance.now();if(t-lastPointer<30)return;lastPointer=t;const rect=el.getBoundingClientRect();pointer=(e.clientX-rect.left)/rect.width-.5;request();},{passive:true});
    el.addEventListener('pointerleave',()=>{pointer=0;request();},{passive:true});
  });
  // Read-only instrumentation for reproducible local QA.
  window.conceptMotion={snapshot:()=>({mode,paints:[...paints],drawMs:[...timings],active,swap,paused,reduced:reduced.matches,pixelRatio:Math.min(devicePixelRatio||1,2),progress:scenes.map(s=>s.progress??null),pending:!!raf})};
})();
