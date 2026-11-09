/* Aperture: scroll is the clock. No timers, libraries, or perpetual animation. */
(() => {
  'use strict';
  const ns = 'http://www.w3.org/2000/svg';
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const make = (tag, attrs, parent) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    parent?.append(node);
    return node;
  };
  const svg = (parent, box, cls) => make('svg', { viewBox: box, class: cls, 'aria-hidden': 'true', focusable: 'false', preserveAspectRatio: 'none' }, parent);
  const path = (parent, cls) => make('path', { class: cls, fill: 'none', 'vector-effect': 'non-scaling-stroke' }, parent);
  const scenes = [];
  const stage = document.querySelector('.optics-stage');
  let pointer = { x: 0, y: 0 };
  if (stage) {
    const art = svg(stage, '0 0 600 510', 'aperture-art');
    const wash = path(art, 'ray-wash');
    const rays = Array.from({ length: 9 }, (_, i) => path(art, i % 2 ? 'ray ray-warm' : 'ray'));
    const lenses = [180, 360].map((x) => make('ellipse', { cx: x, cy: 110, rx: 25, ry: 98, class: 'lens-plane', 'vector-effect': 'non-scaling-stroke' }, art));
    const axes = [180, 360].map((x) => make('path', { d: `M${x} 5V218`, class: 'lens-axis' }, art));
    const focus = make('circle', { r: 5, class: 'focus-point' }, art);
    scenes.push({ el: stage.closest('.hero-visual') || stage, draw(p) {
      const compact = innerWidth <= 760;
      const focalX = 490 - p * 60 + pointer.x * 24;
      const focalY = (compact ? 38 : 88) + pointer.y * (compact ? 18 : 26);
      const lensX = 180 + p * 45;
      lenses.forEach(lens => { lens.setAttribute('cy', compact ? 70 : 110); lens.setAttribute('ry', compact ? 60 : 98); });
      lenses[0].setAttribute('cx', lensX);
      lenses[0].setAttribute('rx', 25 - p * 12);
      lenses[1].setAttribute('cx', 360 - p * 25);
      axes[0].setAttribute('d', `M${lensX} 5V${compact ? 140 : 218}`);
      axes[1].setAttribute('d', `M${360 - p * 25} 5V${compact ? 140 : 218}`);
      rays.forEach((ray, i) => {
        const y = 20 + i * (compact ? 15 : 21);
        const exit = focalY + (i - 4) * (19 - p * 9);
        ray.setAttribute('d', `M-20 ${y} L${lensX} ${y + pointer.y * 10} L${focalX} ${focalY} L620 ${exit}`);
      });
      const lower = compact ? 140 : 188;
      wash.setAttribute('d', `M-20 20 L${lensX} 20 L${focalX} ${focalY} L${lensX} ${lower} L-20 ${lower}Z`);
      focus.setAttribute('cx', focalX); focus.setAttribute('cy', focalY);
    }});
  }
  ['subjects', 'tutors', 'lessons', 'reviews', 'contact'].forEach((id, index) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.classList.add('has-optical-score');
    const score = svg(section, '0 0 1000 110', 'optical-score');
    const rays = Array.from({ length: 7 }, (_, i) => path(score, i % 2 ? 'ray ray-warm' : 'ray'));
    const plane = make('ellipse', { cx: 500, cy: 55, rx: 15, ry: 45, class: 'lens-plane' }, score);
    const point = make('circle', { r: 4, class: 'focus-point' }, score);
    scenes.push({ el: score, draw(p) {
      const progress = id === 'contact' ? clamp(p / .7) : p;
      const t = progress * progress * (3 - 2 * progress);
      const focusX = id === 'contact' ? 500 : 280 + t * 430;
      plane.setAttribute('cx', focusX);
      plane.setAttribute('rx', 12 + (1 - t) * 14);
      rays.forEach((ray, i) => {
        const entry = 55 + (i - 3) * 13;
        let exit;
        if (id === 'subjects') exit = 55 + (i - 3) * (4 + t * 11);
        else if (id === 'contact') exit = 55 + (i - 3) * (1 - t) * 13;
        else exit = 55 + (i - 3) * (14 - t * 11);
        ray.setAttribute('d', `M0 ${entry} L${focusX} 55 L1000 ${exit}`);
      });
      point.setAttribute('cx', focusX); point.setAttribute('cy', 55);
    }});
  });
  // A single margin rail connects the optical chapters without crossing copy.
  const rail = document.createElement('div');
  rail.className = 'optical-rail'; rail.setAttribute('aria-hidden', 'true');
  rail.innerHTML = '<span></span>';
  document.body.append(rail);
  const steps = [...document.querySelectorAll('.lesson-steps li')];
  const junctions = [];
  ['.subject-list', '.lesson-steps'].forEach(selector => {
    const parent = document.querySelector(selector);
    if (!parent) return;
    parent.classList.add('optical-junction');
    const art = svg(parent, '0 0 1000 300', 'junction-art');
    const anchors = [...parent.querySelectorAll(selector === '.subject-list' ? '.subject-symbol' : '.step-number')];
    const lines = anchors.map((anchor, i) => {
      const track = path(art, 'junction-track');
      const active = path(art, i % 2 ? 'junction-line junction-warm' : 'junction-line');
      active.setAttribute('pathLength', '1');
      return { track, active };
    });
    junctions.push({ parent, art, anchors, lines });
  });
  let queued = 0;
  function render() {
    queued = 0;
    if (document.hidden) return;
    const h = innerHeight;
    // Read every geometry value before writing to avoid layout thrashing.
    const rects = scenes.map(({ el }) => el.getBoundingClientRect());
    const stepRects = steps.map(el => el.getBoundingClientRect());
    const junctionRects = junctions.map(j => ({ r: j.parent.getBoundingClientRect(), anchors: j.anchors.map(el => el.getBoundingClientRect()) }));
    const total = document.documentElement.scrollHeight - h;
    scenes.forEach((scene, i) => {
      const r = rects[i];
      if (r.bottom < -60 || r.top > h + 60) return;
      scene.draw(media.matches ? 0.55 : clamp((h - r.top) / (h + r.height)));
    });
    rail.style.setProperty('--journey', media.matches ? '.55' : clamp(scrollY / Math.max(1, total)));
    steps.forEach((el, i) => {
      if (stepRects[i].bottom >= 0 && stepRects[i].top <= h) el.style.setProperty('--step-light', media.matches ? '.65' : clamp((h * .85 - stepRects[i].top) / (h * .5)));
    });
    junctions.forEach((j, i) => {
      const { r, anchors } = junctionRects[i];
      if (r.bottom < -60 || r.top > h + 60) return;
      const box = `0 0 ${r.width} ${r.height}`;
      if (j.box !== box) { j.art.setAttribute('viewBox', box); j.box = box; }
      const narrow = innerWidth <= 760;
      const sourceX = narrow ? -10 : r.width * .5;
      anchors.forEach((a, n) => {
        const x = a.left - r.left + a.width * .5;
        const y = a.top - r.top;
        const d = narrow
          ? `M${sourceX} -12 L${sourceX} ${y - 12} Q${sourceX} ${y - 5} ${sourceX + 8} ${y - 5} L${x} ${y - 5} V${y}`
          : `M${sourceX} -34 C${sourceX} -16 ${x} -30 ${x} ${y - 5} V${y}`;
        if (j.lines[n].d !== d) {
          j.lines[n].track.setAttribute('d', d);
          j.lines[n].active.setAttribute('d', d);
          j.lines[n].d = d;
        }
        const progress = media.matches ? 1 : clamp((h * .94 - a.top) / (h * .6));
        j.lines[n].active.style.strokeDashoffset = 1 - progress;
      });
    });
  }
  function request() { if (!queued && !document.hidden) queued = requestAnimationFrame(render); }
  const visual = stage?.closest('.hero-visual');
  const respond = e => {
    if (media.matches) return;
    const r = visual.getBoundingClientRect();
    pointer = { x: clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1), y: clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1) };
    request();
  };
  visual?.addEventListener('pointermove', respond, { passive: true });
  visual?.addEventListener('pointerdown', respond, { passive: true });
  const release = () => { pointer = { x: 0, y: 0 }; request(); };
  visual?.addEventListener('pointerleave', release);
  visual?.addEventListener('pointerup', release);
  visual?.addEventListener('pointercancel', release);
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(queued); queued = 0; } else request();
  });
  media.addEventListener('change', release);
  new ResizeObserver(request).observe(document.body);
  // Initialise offscreen scenes as well, so reduced motion and deep links are complete.
  scenes.forEach(scene => scene.draw(.55));
  document.fonts?.ready.then(request);
  request();
})();
