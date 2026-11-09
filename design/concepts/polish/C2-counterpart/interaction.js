/* One pair visits three content anchors. Event-driven and idle at rest. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const anchors = [...document.querySelectorAll('.motion-scene')];
  const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
  const clamp = n => Math.max(0, Math.min(1, n));
  const ease = n => n * n * (3 - 2 * n);
  const palettes = [['#f2c4ca','#e7a9b4','#d992a3'],['#d7bed4','#bc9ab7','#9e789b']];
  let raf = 0, host = null, paused = false, pointer = 0, swap = 0, target = 0;
  let start = 0, origin = 0, active = false, frozen = .8;
  const paints = [0,0,0], timings = [];
  function band(side, points, width) {
    const palette = palettes[(side + Math.round(swap)) % 2];
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      points.forEach(([x,y], i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
      ctx.strokeStyle = palette[layer]; ctx.lineWidth = width * (1 - layer * .2);
      ctx.lineCap = ctx.lineJoin = 'round'; ctx.stroke();
    }
  }
  function draw(kind, w, h, p) {
    const paths = [], vertical = kind === 1;
    const thickness = vertical ? 16 : Math.min(29, Math.max(20,w*.055));
    for (let side = 0; side < 2; side++) {
      const sign = side ? 1 : -1, points = [];
      for (let i = 0; i <= 120; i++) {
        const t = i / 120;
        let x, y;
        if (kind === 0) {
          // Separate ribbons open outward and land on the two portrait frames.
          const reach = w < 760 ? .265 : .408;
          x = w * (.5 + sign*(.065+(reach-.065)*ease(t)));
          x += Math.sin(t*Math.PI)*((p-.5)*w*.055+pointer*12);
          y = h * (.08+.92*t);
        } else if (kind === 1) {
          // The four crossings follow the lesson sequence, not its durations.
          y = h * (.025 + .95*t);
          x = w/2 + sign*w*.29*Math.sin(t*Math.PI*4 + (1-p)*.65 + swap*Math.PI);
          x += Math.sin(t*Math.PI)*pointer*3;
        } else {
          // The braid relaxes into two quiet parallel strokes at contact.
          x = w * (.09+.82*t);
          y = h*.5 + sign*h*.16 + Math.sin(t*Math.PI*2)*h*.10*(1-p);
        }
        points.push([x,y]);
      }
      paths.push(points); band(side, points, thickness);
    }
    if (vertical) {
      let crossing = 0;
      for (let i = 2; i < 119; i++) {
        const before = paths[0][i-1][0] - paths[1][i-1][0];
        const after = paths[0][i][0] - paths[1][i][0];
        if (before*after < 0) {
          const over = crossing++ % 2;
          const points = paths[over].slice(Math.max(0,i-3),Math.min(121,i+4));
          // A narrow gap makes the alternating overpass legible on a phone.
          ctx.save(); ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath(); points.forEach(([x,y],j)=>j?ctx.lineTo(x,y):ctx.moveTo(x,y));
          ctx.lineWidth = thickness+3; ctx.stroke(); ctx.restore(); band(over,points,thickness);
        }
      }
    }
  }
  function paint(time) {
    raf = 0; if (document.hidden) return;
    const begin = performance.now();
    if (active) { const p = clamp((time-start)/650); swap=origin+(target-origin)*ease(p); active=p<1; }
    // Relocate this canvas between reserved spaces when each chapter enters view.
    // It never moves across reading text or controls.
    const visible = anchors.map(el=>({el,r:el.getBoundingClientRect()}))
      .filter(({r})=>r.bottom>0&&r.top<innerHeight)
      .sort((a,b)=>Math.abs(a.r.top+a.r.height/2-innerHeight/2)-Math.abs(b.r.top+b.r.height/2-innerHeight/2));
    if (visible.length) {
      const {el,r} = visible[0];
      if (host!==el) {host=el;host.append(canvas);}
      const dpr=Math.min(devicePixelRatio||1,2),w=r.width,h=r.height;
      if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
      const kind=Number(el.dataset.scene);
      const progress=reduced.matches?1:paused?frozen:ease(clamp((innerHeight*.9-r.top)/(innerHeight*.7+r.height*.4)));
      el.dataset.progress=progress.toFixed(3);el.dataset.state=['separate','braided','parallel'][kind];
      draw(kind,w,h,progress);paints[kind]++;
    }
    timings.push(performance.now()-begin);if(timings.length>500)timings.shift();
    if(active&&!reduced.matches&&!paused)raf=requestAnimationFrame(paint);
  }
  function request(){if(!raf&&!document.hidden)raf=requestAnimationFrame(paint);}
  const observer=new IntersectionObserver(request);anchors.forEach(el=>observer.observe(el));
  addEventListener('scroll',request,{passive:true});addEventListener('resize',request,{passive:true});
  new ResizeObserver(request).observe(document.body);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;active=false;swap=target;}else request();});
  reduced.addEventListener('change',()=>{active=false;swap=target;pointer=0;request();});
  const play=document.querySelector('.play'),pause=document.querySelector('.pause');
  play.addEventListener('click',()=>{target=target?0:1;origin=swap;start=performance.now();active=!reduced.matches&&!paused;if(!active)swap=target;play.setAttribute('aria-pressed',String(!!target));request();});
  pause.addEventListener('click',()=>{paused=!paused;frozen=Number(host?.dataset.progress||.8);active=false;swap=target;pointer=0;pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Resume ribbons':'Pause ribbons';request();});
  document.querySelectorAll('.portrait-stage,.lesson-journey,.contact-heading').forEach(el=>{
    el.addEventListener('pointermove',e=>{if(reduced.matches||paused||e.pointerType==='touch')return;const r=el.getBoundingClientRect();pointer=(e.clientX-r.left)/r.width-.5;request();},{passive:true});
    el.addEventListener('pointerleave',()=>{pointer=0;request();},{passive:true});
  });
  window.conceptMotion={snapshot:()=>({states:['separate','braided','parallel'],paints:[...paints],drawMs:[...timings],active,swap,paused,reduced:reduced.matches,pixelRatio:Math.min(devicePixelRatio||1,2),pending:!!raf,host:host?.dataset.scene})};
  request();
})();
