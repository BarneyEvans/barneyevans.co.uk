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
  const headHalo = make('circle', { r: '16', class: 'beam-head-halo' }, art);
  const head = make('circle', { r: '6', class: 'beam-head' }, art);
  const contactLight = make('radialGradient', { id: 'contact-light' }, defs);
  [['0%', '#edbc8f', '.8'], ['45%', '#edc6a6', '.45'], ['100%', '#edc6a6', '0']].forEach(([offset, color, opacity]) => make('stop', { offset, 'stop-color': color, 'stop-opacity': opacity }, contactLight));
  const halo = make('ellipse', { rx: '62', ry: '38', class: 'beam-halo' }, art);
  const contactLens = make('ellipse', { rx: '14', ry: '36', class: 'contact-lens' }, art);
  const settled = make('circle', { r: '7', class: 'beam-settled' }, art);
  const branches = [...document.querySelectorAll('.subject-symbol, .meeting-photo, .step-number')].map(anchor => ({
    anchor, track: path('beam-track beam-branch'), glow: path('beam-glow beam-branch'), line: path('beam-line beam-branch'), y: 0
  }));
  const closing = Array.from({length: 7}, (_, i) => ({track: path('beam-track closing-ray'), glow: path('beam-glow closing-ray'), line: path(`beam-line closing-ray${i % 2 ? ' closing-warm' : ''}`)}));
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
    const end = { x: innerWidth - wrap.x - 58, y: contact.y - base.y + 48 };
    art.setAttribute('viewBox', `0 0 ${innerWidth} ${base.h}`);
    art.style.height = `${base.h}px`;
    const subjects = [...document.querySelectorAll('.subject-symbol')].map(rect);
    const steps = [...document.querySelectorAll('.step-number')].map(rect);
    branches.forEach(b => {
      const a = rect(b.anchor), isStep = b.anchor.classList.contains('step-number');
      const isPerson = b.anchor.classList.contains('meeting-photo');
      const x = a.x + a.w / 2, y = a.y - base.y + a.h / 2;
      let d;
      if (isPerson) {
        // A soft ray folds around each small portrait within its heading's spare space.
        const left = a.x - 5, right = a.x + a.w + 5, top = a.y - base.y - 6;
        d = `M${left - 28} ${top - 10} C${left - 2} ${top - 10} ${x - 28} ${top - 10} ${x} ${top} C${right} ${top} ${right} ${top + 24} ${right} ${y} C${right} ${y + a.h / 2 + 9} ${left} ${y + a.h / 2 + 9} ${left} ${y} C${left} ${top + 24} ${left} ${top} ${x} ${top}`;
      } else if (narrow) {
        const group = isStep ? steps : subjects;
        const origin = group[0].y - base.y + group[0].h / 2 - 48;
        // Rays spread and reconverge through the reserved gutter, never around the page.
        const edge = Math.max(7, wrap.x - 13), tip = a.x - 4;
        d = `M${edge + 12} ${origin} C${edge - 8} ${origin + 46} ${edge - 5} ${y - 40} ${edge + 5} ${y - 22} C${edge + 15} ${y - 3} ${tip - 14} ${y} ${tip} ${y}`;
      } else {
        const group = isStep ? steps : subjects;
        const first = group[0], originX = first.x + first.w / 2;
        const originY = first.y - base.y - 22;
        d = `M${originX} ${originY} C${originX + (x-originX)*.35} ${originY - 14} ${x} ${originY - 14} ${x} ${a.y - base.y - 4}`;
      }
      b.track.setAttribute('d', d); b.glow.setAttribute('d', d); b.line.setAttribute('d', d);
      b.line.setAttribute('pathLength', '1'); b.glow.setAttribute('pathLength', '1');
      b.y = a.y; b.length = b.line.getTotalLength();
    });
    // The opening's seven rays return at full breadth in the existing empty
    // contact band, refract through a lens, then gather before the email routes.
    const startX = narrow ? wrap.x : wrap.x + wrap.w * .22;
    const lensX = startX + (end.x - startX) * .52;
    const exitX = innerWidth - wrap.x;
    closing.forEach((b, i) => {
      const offset = (i - 3) * 10;
      const y = end.y + offset;
      const d = `M${startX} ${y} C${startX + (lensX - startX) * .5} ${y} ${lensX - 22} ${y} ${lensX} ${y} Q${end.x - 28} ${end.y + offset * .18} ${end.x} ${end.y} L${exitX} ${end.y - offset * .6}`;
      for (const node of [b.track, b.glow, b.line]) node.setAttribute('d', d);
      b.line.setAttribute('pathLength', '1'); b.glow.setAttribute('pathLength', '1');
    });
    halo.setAttribute('cx', end.x); halo.setAttribute('cy', end.y);
    settled.setAttribute('cx', end.x); settled.setAttribute('cy', end.y);
    contactLens.setAttribute('cx', lensX); contactLens.setAttribute('cy', end.y);
    geometry = { base, v, end };
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
    const { base, end } = geometry;
    let active = null;
    branches.forEach(b => {
      const p = reduced.matches ? 1 : clamp((scrollY + innerHeight * .84 - b.y) / (innerHeight * .42));
      b.line.style.strokeDasharray = b.glow.style.strokeDasharray = '1';
      b.line.style.strokeDashoffset = b.glow.style.strokeDashoffset = 1 - p;
      b.anchor.style.setProperty('--beam-light', p);
      if (p > 0 && p < 1 && b.y > scrollY && b.y < scrollY + innerHeight) active = { b, p };
    });
    if (active) {
      const point = active.b.line.getPointAtLength(active.b.length * active.p);
      for (const node of [head, headHalo]) { node.setAttribute('cx', point.x); node.setAttribute('cy', point.y); }
    }
    head.style.opacity = headHalo.style.opacity = !reduced.matches && active ? '1' : '0';
    const arrival = reduced.matches ? 1 : clamp((scrollY + innerHeight * 1.08 - (end.y + base.y)) / (innerHeight * .3));
    closing.forEach(b => {
      b.line.style.strokeDasharray = b.glow.style.strokeDasharray = '1';
      b.line.style.strokeDashoffset = b.glow.style.strokeDashoffset = 1 - arrival;
    });
    halo.style.opacity = contactLens.style.opacity = settled.style.opacity = .3 + arrival * .7;
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
