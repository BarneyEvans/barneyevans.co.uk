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
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const f = n => Math.round(n*10)/10;
  function box(el) {
    const r=el.getBoundingClientRect(), m=main.getBoundingClientRect();
    return {x:r.left-m.left,y:r.top-m.top,w:r.width,h:r.height};
  }
  function measure() {
    const w=main.clientWidth,h=main.clientHeight;
    top=main.getBoundingClientRect().top+scrollY;
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    svg.setAttribute('width',w);svg.setAttribute('height',h);
    const photos=[...document.querySelectorAll('.hero-art .photo-wrap')].map(box);
    const [a,b]=photos, hero=box(document.querySelector('.hero'));
    const subjects=box(document.querySelector('#subjects'));
    const lessons=box(document.querySelector('#lessons'));
    const mapTitle=box(document.querySelector('.lesson-map-title'));
    const review=box(document.querySelector('.review-pair figure'));
    const heading=box(document.querySelector('#contact h2'));
    const gutter=w<700?12:Math.max(24,w*.0325);
    const right=w-gutter;
    // The opening thread touches the two fine stitched portrait contours.
    heroShape = bend => `M ${f(a.x-7)} ${f(a.y+a.h*.55)} C ${f(a.x-18)} ${f(a.y-18)} ${f(a.x+a.w*.5)} ${f(a.y-18)} ${f(a.x+a.w*.5)} ${f(a.y-18)} C ${f(a.x+a.w+18)} ${f(a.y-18)} ${f(a.x+a.w+7)} ${f(a.y+a.h*.3)} ${f(a.x+a.w+7)} ${f(a.y+a.h*.55)} C ${f(a.x+a.w+22+bend)} ${f(a.y+a.h*.55-30)} ${f(b.x-22-bend)} ${f(b.y+b.h*.55+30)} ${f(b.x-7)} ${f(b.y+b.h*.55)}`;
    // Continue above the second portrait, then into the outside seam without crossing captions.
    const heroRoute=` C ${f(b.x-20)} ${f(b.y+b.h*.25)} ${f(b.x-14)} ${f(b.y-18)} ${f(b.x+b.w*.5)} ${f(b.y-18)} C ${f(b.x+b.w+14)} ${f(b.y-18)} ${f(right)} ${f(b.y)} ${f(right)} ${f(b.y+70)} L ${f(right)} ${f(hero.h-22)} Q ${f(right)} ${f(hero.h-8)} ${f(right-16)} ${f(hero.h-8)} L ${f(gutter+16)} ${f(hero.h-8)} Q ${f(gutter)} ${f(hero.h-8)} ${f(gutter)} ${f(subjects.y+16)}`;
    track.setAttribute('d',heroShape(0)+heroRoute);
    const openingLength=track.getTotalLength();
    remainder=heroRoute+` L ${f(gutter)} ${f(lessons.y+16)}`;
    anchors=steps.map(el=>{const r=box(el);return {x:r.x+r.w/2,y:r.y+r.h/2};});
    const first=anchors[0];
    // Cross below the map title, then meet each numbered marker.
    const entrance=mapTitle.y+mapTitle.h+12;
    const lane=w>700?mapTitle.x-24:gutter;
    if(w>700) remainder+=` Q ${f(gutter)} ${f(lessons.y+24)} ${f(gutter+12)} ${f(lessons.y+24)} L ${f(lane-12)} ${f(lessons.y+24)} Q ${f(lane)} ${f(lessons.y+24)} ${f(lane)} ${f(lessons.y+36)}`;
    remainder+=` L ${f(lane)} ${f(entrance-10)} Q ${f(lane)} ${f(entrance)} ${f(lane+12)} ${f(entrance)} L ${f(first.x-12)} ${f(entrance)} Q ${f(first.x)} ${f(entrance)} ${f(first.x)} ${f(entrance+12)} L ${f(first.x)} ${f(first.y)}`;
    for(let i=1;i<anchors.length;i++) {
      const a=anchors[i-1],b=anchors[i],mid=(a.y+b.y)/2;
      remainder+=` C ${f(a.x-12)} ${f(mid-12)} ${f(b.x+12)} ${f(mid+12)} ${f(b.x)} ${f(b.y)}`;
    }
    const last=anchors.at(-1),exit=lessons.y+lessons.h-16;
    remainder+=` L ${f(last.x)} ${f(exit-12)} Q ${f(last.x)} ${f(exit)} ${f(last.x-12)} ${f(exit)} L ${f(gutter+12)} ${f(exit)} Q ${f(gutter)} ${f(exit)} ${f(gutter)} ${f(exit+12)} L ${f(gutter)} ${f(review.y-24)} Q ${f(gutter)} ${f(review.y-12)} ${f(gutter+12)} ${f(review.y-12)} L ${f(review.x-12)} ${f(review.y-12)} Q ${f(review.x)} ${f(review.y-12)} ${f(review.x)} ${f(review.y)} L ${f(review.x)} ${f(review.y+review.h-12)} Q ${f(review.x)} ${f(review.y+review.h)} ${f(review.x-12)} ${f(review.y+review.h)} L ${f(gutter+12)} ${f(review.y+review.h)} Q ${f(gutter)} ${f(review.y+review.h)} ${f(gutter)} ${f(review.y+review.h+12)}`;
    // A single small loop ties off the same seam in the space above both contact routes.
    const cy=heading.y+heading.h+38,cx=w/2;
    remainder+=` L ${f(gutter)} ${f(cy-12)} Q ${f(gutter)} ${f(cy)} ${f(gutter+12)} ${f(cy)} L ${f(cx)} ${f(cy)} C ${f(cx+26)} ${f(cy)} ${f(cx+26)} ${f(cy-32)} ${f(cx)} ${f(cy-32)} C ${f(cx-26)} ${f(cy-32)} ${f(cx-26)} ${f(cy)} ${f(cx)} ${f(cy)} L ${f(cx+42)} ${f(cy)}`;
    const d=heroShape(0)+remainder;
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
    line.style.strokeDashoffset=String(length-distance);
    bead.setAttribute('cx',point.x);bead.setAttribute('cy',point.y);
    bead.style.display=still?'none':'';
    finish.classList.toggle('tied',still||distance>=length-2);
    steps.forEach((el,i)=>el.classList.toggle('thread-met',still||point.y>=anchors[i].y));
    if(playing) {
      const t=(now-playing)/1100;
      if(t>=1||still||scrollY>document.querySelector('.hero').offsetHeight){playing=0;line.setAttribute('d',heroShape(0)+remainder);track.setAttribute('d',heroShape(0)+remainder);}
      else {const bend=Math.sin(t*Math.PI*7)*(1-t)**2*20;const d=heroShape(bend)+remainder;line.setAttribute('d',d);track.setAttribute('d',d);schedule();}
    }
  }
  function schedule(){if(ready&&!pending&&!document.hidden)pending=requestAnimationFrame(draw);}
  function stop(){playing=0;if(heroShape){line.setAttribute('d',heroShape(0)+remainder);track.setAttribute('d',heroShape(0)+remainder);}}
  pluck.addEventListener('click',()=>{if(media.matches||paused){svg.classList.toggle('alternate-ink');return;}playing=performance.now();schedule();});
  pause.addEventListener('click',()=>{paused=!paused;pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Resume motion':'Pause motion';stop();schedule();});
  const resize=new ResizeObserver(()=>{dirty=true;schedule();});resize.observe(main);
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{dirty=true;schedule();},{passive:true});
  media.addEventListener('change',()=>{stop();schedule();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(pending);pending=0;stop();}else schedule();});
  document.fonts.ready.then(()=>{ready=true;schedule();});
})();
