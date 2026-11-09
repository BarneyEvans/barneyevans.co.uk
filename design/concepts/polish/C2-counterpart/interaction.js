/* Event-driven canvas choreography. No animation loop runs while idle. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mode = document.body.classList.contains('assembly') ? 'assembly' : 'counterpart';
  const scenes = [...document.querySelectorAll('.motion-scene')].map(el => ({
    el, canvas: el.querySelector('canvas'), ctx: el.querySelector('canvas').getContext('2d'),
    kind: Number(el.dataset.scene), visible: false, width: 0, height: 0
  }));
  let raf = 0, swap = 0, target = 0, start = 0, origin = 0, active = false;
  let pointer = 0, lastPointer = 0;
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
    if(k===1) {
      const n=24,size=Math.min(w/27,32), mid=h*.52;
      for(let i=0;i<n;i++)for(let row=0;row<2;row++){
        const t=i/(n-1), x=lerp(w*.07,w*.93,t), arch=-Math.sin(t*Math.PI)*h*.31;
        const scatter=Math.sin(i*1.8+row)*h*.2;
        const y=mid+lerp(scatter,arch,phase)+row*(size+4)+Math.sin(t*Math.PI*2+swap*3)*hover;
        const palette=(i<n/2)!=(swap>.5)?lavender:peach;
        tile(c,x,y,size,Math.max(3,size*.17),palette[(i+row)%3],(1-phase)*Math.sin(i)*.55);
      }
      return;
    }
    if(k===2) {
      const size=Math.min(w/28,26), space=w/5;
      for(let group=0;group<4;group++)for(let x=0;x<4;x++)for(let y=0;y<=x;y++){
        const reveal=ease(clamp(p*1.6-group*.17));
        const xx=space*(group+1)+(x-1.5)*(size+3);
        const yy=h*.82-y*(size+3)-(group%2)*5;
        const palette=(group+Math.round(swap))%2?peach:lavender;
        tile(c,xx,lerp(h*.52+Math.sin(x+y+group)*h*.28,yy,reveal),size,4,palette[(x+y)%3],(1-reveal)*.6);
      }
      return;
    }
    if(k===3) {
      const size=Math.min(w/30,23), palette=[lavender,peach];
      for(let q=0;q<2;q++)for(let part=0;part<2;part++)for(let i=0;i<8;i++){
        const x=q?w*.72:w*.28;
        const col=i%2, row=Math.floor(i/2);
        const dx=(part*3+col-2)*(size+3), dy=(row-1.5)*(size+3);
        const xx=x+dx+(row===3?-size*.55:0);
        const yy=h*.5+dy;
        tile(c,lerp(w*.1+(q*16+part*8+i)*(w*.8/31),xx,phase),lerp(h*.55,yy,phase),size,4,palette[(q+Math.round(swap))%2][(row+col)%3],(1-phase)*.5);
      }
      return;
    }
    const size=Math.min(w/10,h/6), gap=size*1.1;
    for(let side=0;side<2;side++)for(let row=0;row<4;row++)for(let col=0;col<2;col++){
      const sign=side?1:-1, palette=(side+Math.round(swap))%2?peach:lavender;
      const x=w/2+sign*(gap*(1.3+col)+phase*gap*.35);
      const y=h*.25+row*gap;
      tile(c,x+Math.sin(row+side)*(1-phase)*gap,y,size,5,palette[(row+col)%3],sign*(1-phase)*.4);
    }
    for(let i=0;i<6;i++)tile(c,w/2+(i-2.5)*gap,h*.18-(1-phase)*i*4,size,5,(i<3?lavender:peach)[1]);
  }
  function ribbons(s,p) {
    const {ctx:c,width:w,height:h,kind:k}=s;
    const phase=ease(p), thick=Math.max(12,Math.min(w*.045,37));
    const paths=[], colors=[['#f2c4ca','#e7a9b4','#d992a3'],['#d7bed4','#bc9ab7','#9e789b']];
    // Each strand is a solid band with two tonal edges, not a glowing light beam.
    function band(side,points,width=thick) {
      const palette=colors[(side+Math.round(swap))%2];
      for(let layer=0;layer<3;layer++){
        c.beginPath();
        points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));
        c.strokeStyle=palette[layer];c.lineWidth=width*(1-layer*.22);c.lineCap='round';c.lineJoin='round';c.stroke();
      }
    }
    for(let side=0;side<2;side++){
      const sign=side?1:-1, points=[];
      for(let i=0;i<=100;i++){
        const t=i/100;
        let x=t*w,y=h*.5;
        if(k===0){
          x=w*(.08+.84*t);
          y=h*(.36+.32*Math.sin(t*Math.PI))+sign*h*.10*Math.cos(t*Math.PI*2+phase*2+swap*Math.PI);
          y+=pointer*12*Math.sin(t*Math.PI);
        }else if(k===1){
          x=w*(.035+.93*t);
          const amp=h*(.08+.24*phase);
          y=h*.5+sign*amp*Math.sin(t*Math.PI*2+swap*Math.PI)+Math.sin(t*Math.PI)*pointer*12;
        }else if(k===2){
          x=w*(.04+.92*t);
          const bend=Math.sin(t*Math.PI*4+phase*Math.PI);
          y=h*.5+sign*(h*.13+h*.14*phase)*bend;
          y+=Math.sin(t*Math.PI*2+swap*Math.PI)*h*.06;
        }else if(k===3){
          // Two broad open loops exchange their over/under order along the page.
          x=w*(.08+.84*t);
          const a=Math.sin(t*Math.PI*2), b=Math.sin(t*Math.PI*4);
          y=h*.5+sign*h*.32*lerp(a,b,phase*.8)+Math.sin(t*Math.PI)*pointer*10;
        }else{
          // The two independent curves settle into one aligned, double underline.
          x=w*(.10+.8*t);
          y=h*.5+sign*h*.08+Math.sin(t*Math.PI*2+side*Math.PI)*h*.27*(1-phase);
          y+=Math.sin(t*Math.PI)*Math.sin(swap*Math.PI)*h*.15;
        }
        points.push([x,y]);
      }
      paths.push(points);band(side,points,k===0?thick*.85:thick);
    }
    // Alternate the overpass at each crossing, so the ribbon actually weaves.
    if(k>0&&k<4){let crossing=0;for(let i=2;i<98;i++){
      const before=paths[0][i-1][1]-paths[1][i-1][1],after=paths[0][i][1]-paths[1][i][1];
      if(before*after<0){if(crossing++%2===0)band(0,paths[0].slice(Math.max(0,i-5),Math.min(101,i+6)));}
    }}
    if(k===2){
      c.fillStyle='#fff8f7';
      for(let i=0;i<4;i++){c.beginPath();c.arc(w*(.12+i*.25),h*.5,5,0,Math.PI*2);c.fill();}
    }
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
      const p=reduced.matches?.82:clamp((innerHeight*.94-rect.top)/(innerHeight*.72+h*.3));
      (mode==='assembly'?mosaic:ribbons)(s,p);s.progress=+p.toFixed(3);paints[s.kind]++;
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
  const button=document.querySelector('.play');
  button.setAttribute('aria-pressed','false');
  button.addEventListener('click',()=>{
    target=target?0:1;origin=swap;start=performance.now();active=!reduced.matches;if(!active)swap=target;
    button.setAttribute('aria-pressed',String(!!target));request();
  });
  document.querySelectorAll('.portrait-stage,.interlude,.review-interlude,.contact-heading').forEach(el=>{
    el.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;const t=performance.now();if(t-lastPointer<30)return;lastPointer=t;const rect=el.getBoundingClientRect();pointer=(e.clientX-rect.left)/rect.width-.5;request();},{passive:true});
    el.addEventListener('pointerleave',()=>{pointer=0;request();},{passive:true});
  });
  // Read-only instrumentation for reproducible local QA.
  window.conceptMotion={snapshot:()=>({mode,paints:[...paints],drawMs:[...timings],active,swap,reduced:reduced.matches,pixelRatio:Math.min(devicePixelRatio||1,2),progress:scenes.map(s=>s.progress??null),pending:!!raf})};
})();
