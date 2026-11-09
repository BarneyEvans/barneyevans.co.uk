/* One optical journey. Native scroll and pointer input are the only clocks. */
(() => {
  'use strict';
  const ns = 'http://www.w3.org/2000/svg';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const main = document.querySelector('main');
  const visual = document.querySelector('.hero-visual');
  const clamp = n => Math.max(0, Math.min(1, n));
  const make = (tag, attrs, parent) => {
    const node = document.createElementNS(ns, tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    parent.append(node);
    return node;
  };
  const art = make('svg', { class: 'beam-journey', 'aria-hidden': 'true', focusable: 'false' }, main);
  const defs = make('defs', {}, art);
  const gradient = make('linearGradient', { id: 'beam-colour', x1: '0', x2: '0', y1: '0', y2: '1' }, defs);
  [['0%', '#b58056'], ['30%', '#8a79bb'], ['65%', '#c08d63'], ['100%', '#7870b4']].forEach(([offset, color]) => make('stop', { offset, 'stop-color': color }, gradient));
  const path = (cls, parent = art) => make('path', { class: cls, fill: 'none', 'vector-effect': 'non-scaling-stroke' }, parent);
  const track = path('beam-track'), glow = path('beam-glow'), beam = path('beam-line');
  const headHalo = make('circle', { r: '16', class: 'beam-head-halo' }, art);
  const head = make('circle', { r: '6', class: 'beam-head' }, art);
  const halo = make('circle', { r: '33', class: 'beam-halo' }, art);
  const contactLens = make('ellipse', { rx: '51', ry: '20', class: 'contact-lens' }, art);
  const settled = make('circle', { r: '7', class: 'beam-settled' }, art);
  const branches = [...document.querySelectorAll('.subject-symbol, .meeting-photo, .step-number')].map(anchor => ({anchor, track: path('beam-track beam-branch'), glow: path('beam-glow beam-branch'), line: path('beam-line beam-branch'), y: 0}));
  const hero = make('svg', { viewBox: '0 0 600 510', preserveAspectRatio: 'none', class: 'aperture-art', 'aria-hidden': 'true' }, document.querySelector('.optics-stage'));
  const rays = Array.from({ length: 7 }, (_, i) => path(i % 2 ? 'ray ray-warm' : 'ray', hero));
  const lens = make('ellipse', { cx: '270', cy: '75', rx: '24', ry: '70', class: 'lens-plane' }, hero);
  const focus = make('circle', { r: '5', class: 'focus-point' }, hero);
  let raf = 0, dirty = true, geometry, pointer = { x: 0, y: 0 };
  const rect = node => {
    const r = node.getBoundingClientRect();
    return { x: r.left, y: r.top + scrollY, w: r.width, h: r.height };
  };
  function measure() {
    // Cache geometry between resize, font and disclosure changes.
    const base = rect(main), v = rect(visual), contact = rect(document.querySelector('#contact'));
    const wrap = rect(document.querySelector('.hero'));
    const narrow = innerWidth <= 760;
    const rail = Math.max(8, wrap.x - (narrow ? 15 : 32));
    const start = { x: v.x + v.w * .78, y: v.y - base.y + v.h * (narrow ? 34 : 45) / 510 };
    const end = { x: innerWidth - wrap.x - 42, y: contact.y - base.y + 46 };
    const turn = narrow ? Math.max(14, v.y - base.y - 8) : 14;
    const d = `M${start.x} ${start.y} Q${start.x} ${turn} ${start.x - 30} ${turn} H${rail + 24} Q${rail} ${turn} ${rail} ${turn + 24} V${end.y - 28} Q${rail} ${end.y} ${rail + 30} ${end.y} H${end.x}`;
    art.setAttribute('viewBox', `0 0 ${innerWidth} ${base.h}`);
    art.style.height = `${base.h}px`;
    track.setAttribute('d', d); glow.setAttribute('d', d); beam.setAttribute('d', d);
    const length = beam.getTotalLength();
    beam.style.strokeDasharray = glow.style.strokeDasharray = length;
    branches.forEach(b => {
      const a = rect(b.anchor), isStep = b.anchor.classList.contains('step-number');
      const isPerson = b.anchor.classList.contains('meeting-photo');
      const x = a.x + a.w * .5, y = a.y - base.y + a.h * .5;
      const lead = narrow ? y : a.y - base.y - (isStep ? 17 : 24);
      let branch = narrow
        ? `M${rail} ${y - 18} Q${rail} ${y} ${rail + 18} ${y} H${a.x - 3}`
        : `M${rail} ${lead - 16} Q${rail} ${lead} ${rail + 20} ${lead} H${x - 16} Q${x} ${lead} ${x} ${lead + 16} V${a.y - base.y - 3}`;
      if (isPerson) {
        const scene = rect(document.querySelector('.beam-meeting'));
        const splitX = innerWidth / 2, splitY = scene.y - base.y + 9;
        const top = a.y - base.y - 7, left = a.x - 7, right = a.x + a.w + 7, bottom = a.y - base.y + a.h + 7;
        branch = `M${rail} ${splitY - 18} Q${rail} ${splitY} ${rail + 20} ${splitY} H${splitX} C${splitX} ${top - 20} ${x} ${top - 20} ${x} ${top} C${left} ${top} ${left} ${top + 18} ${left} ${top + 55} V${bottom - 14} Q${left} ${bottom} ${left + 14} ${bottom} H${right - 14} Q${right} ${bottom} ${right} ${bottom - 14} V${top + 55} C${right} ${top + 18} ${right} ${top} ${x} ${top}`;
      }
      b.track.setAttribute('d', branch); b.glow.setAttribute('d', branch); b.line.setAttribute('d', branch);
      b.line.setAttribute('pathLength', '1'); b.glow.setAttribute('pathLength', '1'); b.y = y + base.y;
    });
    halo.setAttribute('cx', end.x); halo.setAttribute('cy', end.y);
    settled.setAttribute('cx', end.x); settled.setAttribute('cy', end.y);
    contactLens.setAttribute('cx', end.x); contactLens.setAttribute('cy', end.y);
    geometry = { base, v, rail, length, end };
    dirty = false;
  }
  function drawHero() {
    const { v } = geometry;
    if (v.y > scrollY + innerHeight || v.y + v.h < scrollY) return;
    const compact = innerWidth <= 760;
    const p = reduced.matches ? .45 : clamp((scrollY + innerHeight - v.y) / (innerHeight + v.h));
    const x = 468, y = compact ? 34 : 45;
    const lensX = 270 + pointer.x * 32;
    lens.setAttribute('cx', lensX);
    lens.setAttribute('rx', 28 - p * 14); lens.setAttribute('ry', compact ? 48 : 70); lens.setAttribute('cy', (compact ? 54 : 75) + pointer.y * 20);
    rays.forEach((ray, i) => {
      const entry = 10 + i * (compact ? 15 : 21);
      ray.setAttribute('d', `M0 ${entry} L${lensX} ${entry + pointer.y * 20} L${x} ${y} L600 ${y + (i - 3) * 18}`);
    });
    focus.setAttribute('cx', x); focus.setAttribute('cy', y);
  }
  function render() {
    raf = 0;
    if (document.hidden) return;
    if (dirty) measure();
    const { base, length, end } = geometry;
    const targetY = scrollY + innerHeight * .76 - base.y;
    let lo = 0, hi = length;
    for (let n = 0; n < 13; n++) {
      const mid = (lo + hi) / 2;
      if (beam.getPointAtLength(mid).y < targetY) lo = mid; else hi = mid;
    }
    const completed = targetY >= end.y;
    const distance = reduced.matches || completed ? length : (lo + hi) / 2;
    beam.style.strokeDashoffset = glow.style.strokeDashoffset = length - distance;
    const point = beam.getPointAtLength(distance);
    head.setAttribute('cx', point.x); head.setAttribute('cy', point.y);
    headHalo.setAttribute('cx', point.x); headHalo.setAttribute('cy', point.y);
    head.style.opacity = headHalo.style.opacity = reduced.matches || completed ? '0' : '1';
    halo.style.opacity = contactLens.style.opacity = settled.style.opacity = reduced.matches || completed ? '1' : '.3';
    branches.forEach(b => {
      const p = reduced.matches ? 1 : clamp((scrollY + innerHeight * .86 - b.y) / (innerHeight * .35));
      b.line.style.strokeDasharray = b.glow.style.strokeDasharray = '1'; b.line.style.strokeDashoffset = b.glow.style.strokeDashoffset = 1 - p;
      b.anchor.style.setProperty('--beam-light', p);
    });
    drawHero();
  }
  function request() { if (!raf && !document.hidden) raf = requestAnimationFrame(render); }
  const resize = () => { dirty = true; request(); };
  function respond(e) {
    if (reduced.matches || !geometry) return;
    const { v } = geometry;
    pointer = { x: Math.max(-1, Math.min(1, (e.clientX - v.x) / v.w * 2 - 1)), y: Math.max(-1, Math.min(1, (e.clientY + scrollY - v.y) / v.h * 2 - 1)) };
    request();
  }
  const release = () => { pointer = { x: 0, y: 0 }; request(); };
  visual.addEventListener('pointermove', respond, { passive: true });
  visual.addEventListener('pointerdown', respond, { passive: true });
  ['pointerleave', 'pointerup', 'pointercancel'].forEach(event => visual.addEventListener(event, release));
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else resize(); });
  reduced.addEventListener('change', release);
  new ResizeObserver(resize).observe(main);
  document.fonts.ready.then(resize);
  request();
})();
