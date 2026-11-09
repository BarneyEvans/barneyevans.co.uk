/* One continuous thread, measured against the actual reading layout. */
(() => {
  'use strict';
  const main = document.querySelector('main');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const NS = 'http://www.w3.org/2000/svg';
  function node(tag, attrs, parent) {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key,value]) => el.setAttribute(key,value));
    parent.append(el); return el;
  }
  const svg = node('svg', {class:'journey', 'aria-hidden':'true'},main);
  const track = node('path',{class:'thread-track'},svg);
  const line = node('path',{class:'thread-line'},svg);
  const bead = node('circle',{class:'thread-bead',r:7},svg);
  const finish = node('circle',{class:'thread-finish',r:3},svg);
  const steps = [...document.querySelectorAll('.step-num')];
  const pause = document.querySelector('.pause-motion');
  const pluck = document.querySelector('.touch-art');
  let pending=0, dirty=true, ready=false, paused=false, playing=0;
  let length=0, samples=[], anchors=[], heroShape, remainder='', top=0, end;
  let portraitLength=0, restingPath='', vertices=[];
  const pluckDuration=3200;
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const f = n => Math.round(n*10)/10;
  function box(el) {
    const r=el.getBoundingClientRect(), m=main.getBoundingClientRect();
    return {x:r.left-m.left,y:r.top-m.top,w:r.width,h:r.height};
  }
  function measure() {
    playing=0;
    const w=main.clientWidth,h=main.clientHeight;
    top=main.getBoundingClientRect().top+scrollY;
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    svg.setAttribute('width',w);svg.setAttribute('height',h);
    const photos=[...document.querySelectorAll('.hero-art .photo-wrap')].map(box);
    const [a,b]=photos;
    const subjects=box(document.querySelector('#subjects'));
    const lessons=box(document.querySelector('#lessons'));
    const mapTitle=box(document.querySelector('.lesson-map-title'));
    const review=box(document.querySelector('.review-pair figure'));
    const heading=box(document.querySelector('#contact h2'));
    const gutter=w<700?12:Math.max(24,w*.0325);
    const right=w-gutter;
    // The opening thread touches the two fine stitched portrait contours.
    heroShape = () => `M ${f(a.x-7)} ${f(a.y+a.h*.55)} C ${f(a.x-18)} ${f(a.y-18)} ${f(a.x+a.w*.5)} ${f(a.y-18)} ${f(a.x+a.w*.5)} ${f(a.y-18)} C ${f(a.x+a.w+18)} ${f(a.y-18)} ${f(a.x+a.w+7)} ${f(a.y+a.h*.3)} ${f(a.x+a.w+7)} ${f(a.y+a.h*.55)} C ${f(a.x+a.w+8)} ${f(a.y+a.h*.55-18)} ${f(b.x-8)} ${f(b.y+b.h*.55+18)} ${f(b.x-7)} ${f(b.y+b.h*.55)}`;
    // Continue above the second portrait, then into the outside seam without crossing captions.
    const portraitRoute=` C ${f(b.x-20)} ${f(b.y+b.h*.25)} ${f(b.x-14)} ${f(b.y-18)} ${f(b.x+b.w*.5)} ${f(b.y-18)} C ${f(b.x+b.w+32)} ${f(b.y-24)} ${f(right-10)} ${f(b.y+18)} ${f(right)} ${f(b.y+b.h*.62)}`;
    track.setAttribute('d',heroShape(0)+portraitRoute);
    portraitLength=track.getTotalLength();
    // Return just beneath the people, rather than tracing the hero panel's perimeter.
    const captions=[...document.querySelectorAll('.hero-art figcaption')].map(box);
    const bridgeY=Math.max(...captions.map(r=>r.y+r.h))+12;
    const copy=box(document.querySelector('.hero-copy'));
    const art=box(document.querySelector('.hero-art'));
    const turnX=w>700?(copy.x+copy.w+art.x)/2:gutter+32;
    const joinY=w>700?Math.max(bridgeY+40,copy.y+copy.h+24):bridgeY+28;
    const pluckBox=box(pluck);
    const heroRoute=portraitRoute+(w<=700
      ? ` L ${f(right)} ${f(bridgeY-12)} C ${f(right)} ${f(pluckBox.y+pluckBox.h+24)} ${f(w*.65)} ${f(pluckBox.y+pluckBox.h+12)} ${f(gutter)} ${f(subjects.y+48)}`
      : ` L ${f(right)} ${f(bridgeY-12)} C ${f(right)} ${f(bridgeY+10)} ${f(right-50)} ${f(bridgeY)} ${f(turnX+16)} ${f(bridgeY)} C ${f(turnX)} ${f(bridgeY)} ${f(turnX)} ${f(bridgeY+8)} ${f(turnX)} ${f(joinY-24)} C ${f(turnX)} ${f(joinY+24)} ${f(gutter)} ${f(joinY-8)} ${f(gutter)} ${f(subjects.y+48)}`);
    track.setAttribute('d',heroShape(0)+heroRoute);
    const openingLength=track.getTotalLength();
    remainder=heroRoute+` L ${f(gutter)} ${f(lessons.y+16)}`;
    anchors=steps.map(el=>{const r=box(el);return {x:r.x+r.w/2,y:r.y+r.h/2};});
    const first=anchors[0];
    // Cross below the map title, then meet each numbered marker.
    const entrance=mapTitle.y+mapTitle.h+12;
    const lane=w>700?mapTitle.x-24:gutter;
    if(w>700) remainder+=` C ${f(gutter)} ${f(lessons.y+72)} ${f(lane)} ${f(lessons.y-16)} ${f(lane)} ${f(lessons.y+48)}`;
    remainder+=` L ${f(lane)} ${f(entrance-30)} C ${f(lane)} ${f(entrance+12)} ${f(first.x)} ${f(entrance-12)} ${f(first.x)} ${f(first.y)}`;
    for(let i=1;i<anchors.length;i++) {
      const a=anchors[i-1],b=anchors[i],mid=(a.y+b.y)/2;
      remainder+=` C ${f(a.x-12)} ${f(mid-12)} ${f(b.x+12)} ${f(mid+12)} ${f(b.x)} ${f(b.y)}`;
    }
    const last=anchors.at(-1),exit=lessons.y+lessons.h-16;
    remainder+=` L ${f(last.x)} ${f(exit-28)} C ${f(last.x)} ${f(exit+28)} ${f(gutter)} ${f(exit-44)} ${f(gutter)} ${f(exit+24)} L ${f(gutter)} ${f(review.y-30)} C ${f(gutter)} ${f(review.y+4)} ${f(review.x-6)} ${f(review.y-32)} ${f(review.x-6)} ${f(review.y+26)} C ${f(review.x+8)} ${f(review.y+review.h*.33)} ${f(review.x-18)} ${f(review.y+review.h*.68)} ${f(review.x-6)} ${f(review.y+review.h-24)} C ${f(review.x+2)} ${f(review.y+review.h+18)} ${f(gutter)} ${f(review.y+review.h-6)} ${f(gutter)} ${f(review.y+review.h+40)}`;
    // A single small loop ties off the same seam in the space above both contact routes.
    const cy=heading.y+heading.h+38,cx=w/2;
    remainder+=` L ${f(gutter)} ${f(cy-76)} C ${f(gutter)} ${f(cy+28)} ${f(cx-92)} ${f(cy-18)} ${f(cx)} ${f(cy)} C ${f(cx+26)} ${f(cy)} ${f(cx+26)} ${f(cy-32)} ${f(cx)} ${f(cy-32)} C ${f(cx-26)} ${f(cy-32)} ${f(cx-26)} ${f(cy)} ${f(cx)} ${f(cy)} L ${f(cx+42)} ${f(cy)}`;
    const d=heroShape(0)+remainder;
    restingPath=d;
    track.setAttribute('d',d);line.setAttribute('d',d);
    length=line.getTotalLength();
    // Cached geometry only; scrolling never reads layout or SVG path geometry.
    samples=[];
    let maximum=-Infinity;
    for(let i=0;i<=1000;i++) {
      const distance=length*i/1000,p=line.getPointAtLength(distance);
      // Give the portrait loops a continuous drawing interval even where they
      // turn upwards; later content follows its physical vertical position.
      const progressY=distance<=openingLength
        ? a.y-24+(subjects.y+16-a.y+24)*distance/openingLength : p.y;
      maximum=Math.max(maximum,progressY);
      samples.push({x:p.x,y:p.y,progressY:maximum,distance});
    }
    // Cache the normal and untouched polyline once. A pluck only recalculates
    // the small moving neighbourhood, without SVG geometry reads per frame.
    samples.forEach((p,i)=>{
      const before=samples[Math.max(0,i-1)],after=samples[Math.min(1000,i+1)];
      const dx=after.x-before.x,dy=after.y-before.y,scale=Math.hypot(dx,dy)||1;
      p.nx=-dy/scale;p.ny=dx/scale;
    });
    vertices=samples.map((p,i)=>`${i?'L':'M'}${f(p.x)} ${f(p.y)}`);
    end={x:cx+42,y:cy};
    finish.setAttribute('cx',end.x);finish.setAttribute('cy',end.y);
    line.style.strokeDasharray=String(length);
    dirty=false;
  }
  function draw(now) {
    pending=0;if(document.hidden)return;
    if(dirty)measure();
    const still=media.matches||paused;
    let distance=length,point=samples.at(-1);
    if(!still) {
      const target=scrollY+innerHeight*.64-top;
      let low=0,high=samples.length-1;
      while(low<high){const mid=(low+high)>>1;if(samples[mid].progressY<target)low=mid+1;else high=mid;}
      point=samples[low];distance=point.distance;
      if(scrollY+innerHeight>=document.documentElement.scrollHeight-4){distance=length;point=samples.at(-1);}
    }
    if(playing) {
      // A queued rAF timestamp can precede a just-delivered input event.
      const t=Math.max(0,(now-playing)/pluckDuration);
      if(t>=1||still){stop();}
      else {
        // Linger over both people, then carry the same impulse along the
        // lesson seam and review into the closing loop. No content moves.
        const travel=t<.45?portraitLength*t/.45:
          portraitLength+(length-portraitLength)*(1-(1-(t-.45)/.55)**1.6);
        const radius=64,amplitude=6*(1-t*.7),changed=vertices.slice();
        const start=Math.max(0,Math.floor((travel-radius)/length*1000));
        const end=Math.min(1000,Math.ceil((travel+radius)/length*1000));
        for(let i=start;i<=end;i++){
          const p=samples[i],u=(p.distance-travel)/radius;
          const offset=Math.abs(u)<1?Math.sin(u*Math.PI*2)*Math.cos(u*Math.PI/2)**2*amplitude:0;
          changed[i]=`${i?'L':'M'}${f(p.x+p.nx*offset)} ${f(p.y+p.ny*offset)}`;
        }
        const d=changed.join('');line.setAttribute('d',d);track.setAttribute('d',d);
        // The travelling bead also reveals the seam ahead of the scroll.
        distance=Math.max(distance,travel);
        point=samples[Math.min(1000,Math.round(travel/length*1000))];
        schedule();
      }
    }
    line.style.strokeDashoffset=String(length-distance);
    bead.setAttribute('cx',point.x);bead.setAttribute('cy',point.y);
    bead.style.display=still?'none':'';
    finish.classList.toggle('tied',still||distance>=length-2);
    steps.forEach((el,i)=>el.classList.toggle('thread-met',still||point.y>=anchors[i].y));
  }
  function schedule(){if(ready&&!pending&&!document.hidden)pending=requestAnimationFrame(draw);}
  function stop(){playing=0;if(restingPath){line.setAttribute('d',restingPath);track.setAttribute('d',restingPath);}}
  pluck.addEventListener('click',()=>{if(media.matches||paused){svg.classList.toggle('alternate-ink');return;}playing=performance.now();schedule();});
  pause.addEventListener('click',()=>{paused=!paused;pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Resume motion':'Pause motion';stop();schedule();});
  const resize=new ResizeObserver(()=>{dirty=true;schedule();});resize.observe(main);
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{dirty=true;schedule();},{passive:true});
  media.addEventListener('change',()=>{stop();schedule();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(pending);pending=0;stop();}else schedule();});
  document.fonts.ready.then(()=>{ready=true;schedule();});
})();
