/* Wave Study: two continuous signals become samples, then find a quiet phase. */
(() => {
  'use strict';
  const ns = 'http://www.w3.org/2000/svg';
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const smooth = n => n * n * (3 - 2 * n);
  const make = (tag, attrs, parent) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    parent?.append(node);
    return node;
  };
  const svg = (parent, box, cls) => make('svg', { viewBox: box, class: cls, 'aria-hidden': 'true', focusable: 'false', preserveAspectRatio: 'none' }, parent);
  const line = (parent, cls) => make('path', { class: cls, fill: 'none', 'vector-effect': 'non-scaling-stroke' }, parent);
  const scenes = [];
  const stage = document.querySelector('.wave-stage');
  let pointer = { x: 500, y: 0, strength: 0 };
  function wave(x, phase, amplitude, frequency = 1.5) {
    return Math.sin(x / 1000 * Math.PI * 2 * frequency + phase) * amplitude;
  }
  function curve(fn, step = 12) {
    let d = '';
    for (let x = -24; x <= 1032; x += step) d += `${x === -24 ? 'M' : 'L'}${x.toFixed(1)} ${fn(x).toFixed(2)} `;
    return d;
  }
  if (stage) {
    const art = svg(stage, '0 0 1000 340', 'wave-art');
    const ribbonA = line(art, 'wave-ribbon ribbon-blue');
    const ribbonB = line(art, 'wave-ribbon ribbon-rose');
    const threads = Array.from({ length: 8 }, (_, i) => line(art, i % 2 ? 'wave-thread thread-rose' : 'wave-thread'));
    scenes.push({ el: stage.closest('.hero-visual') || stage, draw(p) {
      const phase = p * Math.PI * 2.4;
      const distort = x => pointer.strength * pointer.y * Math.exp(-Math.pow((x - pointer.x) / 170, 2));
      const baseA = x => 170 + wave(x, phase, 90, 1.05) + distort(x);
      const baseB = x => 170 + wave(x, -phase * .8 + 2, 100, 1.05) + distort(x) * .7;
      ribbonA.setAttribute('d', curve(baseA)); ribbonB.setAttribute('d', curve(baseB));
      threads.forEach((thread, i) => thread.setAttribute('d', curve(x => (i % 2 ? baseB(x) : baseA(x)) + (i - 3.5) * 11)));
    }});
  }
  ['subjects', 'tutors', 'lessons', 'reviews', 'contact'].forEach((id, index) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.classList.add('has-wave-score');
    const art = svg(section, '0 0 1000 110', 'wave-score');
    const signals = [line(art, 'score-line'), line(art, 'score-line score-rose')];
    if (id === 'contact') {
      const rings = Array.from({ length: 8 }, (_, i) => make('ellipse', { class: i % 2 ? 'interference-ring ring-rose' : 'interference-ring', cy: 55, 'vector-effect': 'non-scaling-stroke' }, art));
      scenes.push({ el: art, draw(p) {
        const t = smooth(clamp(p / .7));
        rings.forEach((ring, i) => {
          const bank = i % 2 ? 1 : -1;
          ring.setAttribute('cx', 500 + bank * (210 - t * 190));
          ring.setAttribute('rx', 50 + Math.floor(i / 2) * 54 + t * 30);
          ring.setAttribute('ry', 12 + Math.floor(i / 2) * 9 - t * 5);
        });
        signals.forEach((signal, i) => signal.setAttribute('d', curve(x => 55 + wave(x, i * Math.PI + t * 4, 22 * (1 - t), 2))));
      }});
    } else {
      const samples = Array.from({ length: 44 }, (_, i) => make('rect', { width: 4, height: 4, rx: 2, class: i % 2 ? 'signal-sample sample-rose' : 'signal-sample' }, art));
      scenes.push({ el: art, draw(p) {
        const t = smooth(clamp((p - .1) / .7));
        const sampling = id === 'subjects' || id === 'lessons';
        const order = sampling ? t : 1 - t;
        const phase = p * 5 + index * .6;
        signals.forEach((signal, i) => {
          signal.setAttribute('d', curve(x => 55 + wave(x, phase + i * Math.PI, 31 * (1 - order * .6), 2)));
          signal.style.opacity = (1 - order * .85).toFixed(3);
        });
        samples.forEach((sample, i) => {
          const bank = i % 2;
          const x = 25 + Math.floor(i / 2) * 45;
          const analogue = 55 + wave(x, phase + bank * Math.PI, 31, 2);
          const digital = 36 + bank * 36;
          const height = 4 + order * (8 + (Math.floor(i / 2) % 4) * 3);
          sample.setAttribute('x', x);
          sample.setAttribute('y', analogue * (1 - order) + digital * order - height / 2);
          sample.setAttribute('height', height);
          sample.style.opacity = (.2 + order * .6).toFixed(3);
        });
      }});
    }
  });
  const steps = [...document.querySelectorAll('.lesson-steps li')];
  // A sampled line beside the lesson sequence is decorative, not a time chart.
  steps.forEach(step => {
    const signal = document.createElement('span');
    signal.className = 'step-signal'; signal.setAttribute('aria-hidden', 'true');
    signal.innerHTML = '<i></i><i></i><i></i><i></i><i></i><i></i><i></i>';
    step.append(signal);
  });
  let queued = 0;
  function render() {
    queued = 0;
    if (document.hidden) return;
    const h = innerHeight;
    const rects = scenes.map(({ el }) => el.getBoundingClientRect());
    const stepRects = steps.map(el => el.getBoundingClientRect());
    scenes.forEach((scene, i) => {
      const r = rects[i];
      if (r.bottom < -60 || r.top > h + 60) return;
      scene.draw(media.matches ? .58 : clamp((h - r.top) / (h + r.height)));
    });
    steps.forEach((step, i) => {
      if (stepRects[i].bottom >= 0 && stepRects[i].top <= h) step.style.setProperty('--step-phase', media.matches ? '.65' : clamp((h * .9 - stepRects[i].top) / (h * .7)));
    });
  }
  function request() { if (!queued && !document.hidden) queued = requestAnimationFrame(render); }
  const visual = stage?.closest('.hero-visual');
  const respond = e => {
    if (media.matches) return;
    const r = visual.getBoundingClientRect();
    pointer = { x: clamp((e.clientX - r.left) / r.width) * 1000, y: clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1) * 65, strength: 1 };
    request();
  };
  visual?.addEventListener('pointermove', respond, { passive: true });
  visual?.addEventListener('pointerdown', respond, { passive: true });
  const release = () => { pointer.strength = 0; request(); };
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
  scenes.forEach(scene => scene.draw(.58));
  document.fonts?.ready.then(request);
  request();
})();
