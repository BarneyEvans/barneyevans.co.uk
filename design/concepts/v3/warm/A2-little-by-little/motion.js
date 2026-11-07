/* Good Thread / Little by Little. Native scroll; one scheduled frame per input,
   no timer or ambient loop. Each folder carries this small standalone engine. */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const sketch = document.body.dataset.concept === 'a2';
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const ease = n => n * n * (3 - 2 * n);
  const round = n => Math.round(n * 10) / 10;
  const node = (tag, attrs, parent) => {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    parent.append(el);
    return el;
  };
  const scenes = [...document.querySelectorAll('.scene')].map(svg => {
    const host = svg.parentElement;
    const group = node('g', { class: 'motion-drawing' }, svg);
    return {
      svg, host, group, visible: false, progress: -1,
      track: node('path', { class: 'motion-track' }, group),
      fibre: node('path', { class: 'motion-fibre' }, group),
      line: node('path', { class: 'motion-line', pathLength: 1 }, group),
      bead: node('circle', { class: 'motion-bead', r: sketch ? 4 : 5 }, group),
      rings: [], anchors: [], samples: []
    };
  });
  if (!scenes.length) return;
  let pending = 0;
  let ready = false;
  let dirty = true;
  let playing = null;
  let travel = 0;
  const hero = scenes.find(s => s.host.classList.contains('hero-art'));
  const button = document.querySelector('.touch-art');

  function local(el, host, x = .5, y = .5) {
    const a = el.getBoundingClientRect(), b = host.getBoundingClientRect();
    return { x: a.left - b.left + a.width * x, y: a.top - b.top + a.height * y };
  }
  function join(points, loosen = 0, bottom = Infinity) {
    // Shared anchor points make the loose and ordered drawings the same line.
    const safeY = y => round(Math.min(bottom, Math.max(8, y)));
    let d = `M ${round(points[0].x)} ${safeY(points[0].y)}`;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i];
      const vertical = Math.abs(b.y - a.y) > Math.abs(b.x - a.x);
      const bend = (i % 2 ? 1 : -1) * loosen;
      const dx = b.x - a.x, dy = b.y - a.y;
      d += vertical
        ? ` C ${round(a.x + bend)} ${safeY(a.y + dy * .55)} ${round(b.x - bend)} ${safeY(b.y - dy * .55)} ${round(b.x)} ${safeY(b.y)}`
        : ` C ${round(a.x + dx * .55)} ${safeY(a.y + bend)} ${round(b.x - dx * .55)} ${safeY(b.y - bend)} ${round(b.x)} ${safeY(b.y)}`;
    }
    return d;
  }
  function sample(points, loosen, bottom = Infinity) {
    const result = [points[0]];
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i], dx = b.x - a.x, dy = b.y - a.y;
      const vertical = Math.abs(dy) > Math.abs(dx);
      const bend = (i % 2 ? 1 : -1) * loosen;
      const c = vertical ? { x: a.x + bend, y: a.y + dy * .55 } : { x: a.x + dx * .55, y: a.y + bend };
      const d = vertical ? { x: b.x - bend, y: b.y - dy * .55 } : { x: b.x - dx * .55, y: b.y - bend };
      c.y = clamp(c.y, 8, bottom); d.y = clamp(d.y, 8, bottom);
      for (let j = 1; j <= 20; j++) {
        const t = j / 20, u = 1 - t;
        result.push({ x: u*u*u*a.x + 3*u*u*t*c.x + 3*u*t*t*d.x + t*t*t*b.x,
          y: u*u*u*a.y + 3*u*u*t*c.y + 3*u*t*t*d.y + t*t*t*b.y });
      }
    }
    let distance = 0;
    result.forEach((p, i) => {
      if (i) distance += Math.hypot(p.x - result[i - 1].x, p.y - result[i - 1].y);
      p.distance = distance;
    });
    result.forEach(p => { p.distance /= distance || 1; });
    return result;
  }
  function measure(s) {
    const w = s.host.clientWidth, h = s.host.clientHeight;
    s.svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    s.w = w; s.h = h;
    s.top = s.host.getBoundingClientRect().top + scrollY;
    const small = w < 650;
    const id = s.host.id;
    if (s === hero) {
      const photos = [...s.host.querySelectorAll('.photo-wrap')];
      if (photos.length < 2) return;
      const a = local(photos[0], s.host, .5, .88);
      const b = local(photos[1], s.host, .5, .12);
      const tail = Math.min(h - 28, Math.max(a.y, b.y) + 85);
      // The portrait captions are a protected reading zone, even at the
      // loosest point of the sketch. Clipping also covers the brief pluck.
      if (!s.clip) {
        const defs = node('defs', {}, s.svg);
        const clip = node('clipPath', { id: 'hero-ink-zone', clipPathUnits: 'userSpaceOnUse' }, defs);
        s.clip = node('rect', { x: 0, y: 0 }, clip);
        s.group.setAttribute('clip-path', 'url(#hero-ink-zone)');
      }
      const captions = [...s.host.querySelectorAll('figcaption')];
      const safeBottom = Math.min(...captions.map(el => local(el, s.host, 0, 0).y)) - 11;
      s.heroBottom = safeBottom - 24;
      s.clip.setAttribute('width', w);
      s.clip.setAttribute('height', safeBottom);
      s.anchors = [
        { x: 24, y: h * .22 }, { x: a.x - 70, y: a.y - 10 },
        { x: a.x + 35, y: a.y + 26 }, { x: w * .48, y: h * .46 },
        { x: b.x - 35, y: b.y - 22 }, { x: b.x + 70, y: b.y + 10 },
        { x: w - 24, y: tail }, { x: w * .55, y: tail + 10 }
      ];
      s.bend = small ? 44 : 82;
      if (sketch) {
        const left = local(photos[0], s.host, .82, .58);
        const right = local(photos[1], s.host, .18, .5);
        const cx = (left.x + right.x) / 2;
        const cy = Math.min(s.heroBottom - 30, (left.y + right.y) / 2);
        s.anchors = [left, { x: cx - 35, y: cy + 18 }, { x: cx + 25, y: cy - 28 },
          { x: cx - 15, y: cy - 12 }, { x: cx + 30, y: cy + 15 }, right];
        s.bend = small ? 25 : 42;
      }
      s.anchors = s.anchors.map(p => ({ x: p.x, y: Math.min(p.y, s.heroBottom) }));
    } else if (id === 'subjects') {
      const subjects = [...s.host.querySelectorAll('.subject')];
      const rows = small || sketch;
      s.anchors = subjects.map(el => {
        const p = local(el, s.host, .5, 0);
        return rows ? { x: Math.max(12, local(el, s.host, 0, 0).x - 16), y: p.y + 44 }
          : { x: p.x, y: p.y - 21 };
      });
      const first = s.anchors[0], last = s.anchors.at(-1);
      if (first && last) {
        s.anchors.unshift({ x: first.x - (rows ? 0 : 70), y: first.y - (rows ? 70 : 8) });
        s.anchors.push({ x: last.x + (rows ? 0 : 65), y: last.y + (rows ? 90 : 8) });
      }
      s.bend = rows ? 13 : 48;
    } else if (id === 'lessons') {
      s.anchors = [...s.host.querySelectorAll('.step-num')].map(el => local(el, s.host));
      const a = s.anchors[0], b = s.anchors.at(-1);
      if (a && b) {
        s.anchors.unshift({ x: a.x, y: a.y - 32 });
        s.anchors.push({ x: b.x, y: b.y + 40 });
      }
      s.bend = 18;
    } else if (id === 'tutors') {
      const imgs = [...s.host.querySelectorAll('.tutor-heading img')];
      s.anchors = imgs.map(el => local(el, s.host, .5, .5));
      if (s.anchors.length === 2) {
        const [a, b] = s.anchors;
        // A bridge runs along the open margin above each introduction.
        s.anchors = small
          ? [{ x: 12, y: a.y - 65 }, { x: 12, y: a.y + 45 }, { x: 12, y: b.y - 65 }, { x: 12, y: b.y + 45 }]
          : [{ x: a.x - 45, y: a.y - 45 }, { x: a.x, y: a.y - 65 },
            { x: b.x - 45, y: b.y - 65 }, { x: b.x + 20, y: b.y - 45 }];
      }
      s.bend = small ? 12 : 36;
    } else {
      const heading = s.host.querySelector('h2');
      const p = local(heading, s.host, 0, 1);
      const span = Math.min(w - p.x - 24, heading.clientWidth, id === 'contact' ? 310 : 250);
      if (id === 'contact') p.x = (w - span) / 2;
      const y = p.y + (id === 'contact' ? 18 : 14);
      s.anchors = id === 'contact' && !sketch ? [
        { x: p.x, y }, { x: p.x + span * .36, y: y + 8 },
        { x: p.x + span * .65, y: y - 18 }, { x: p.x + span * .46, y: y + 24 },
        { x: p.x + span * .39, y: y - 16 }, { x: p.x + span * .7, y: y + 12 },
        { x: p.x + span, y: y + 2 }
      ] : [{ x: p.x, y }, { x: p.x + span * .5, y: y + 6 }, { x: p.x + span, y: y - 2 }];
      s.bend = id === 'contact' && !sketch ? 24 : 10;
    }
    if (s.anchors.length < 2) return;
    s.progress = -1;
    s.fixedPath = join(s.anchors, s.bend, s.heroBottom);
    s.track.setAttribute('d', s.fixedPath);
    s.line.setAttribute('d', s.fixedPath);
    s.fibre.setAttribute('d', s.fixedPath);
    // Analytic cubic samples avoid hundreds of synchronous SVG geometry calls.
    if (!sketch) s.samples = sample(s.anchors, s.bend, s.heroBottom);
    s.rings.forEach(r => r.remove());
    s.rings = s.anchors.slice(1, -1).filter((_, i) => id !== 'contact' && (id !== 'tutors' || i < 2)).map(p =>
      node('circle', { class: 'motion-ring', cx: p.x, cy: p.y, r: sketch ? 3 : 4 }, s.group));
  }
  function draw(s, p) {
    if (!s.anchors.length) return;
    if (Math.abs(s.progress - p) < .0003) return;
    s.progress = p;
    const complete = media.matches;
    if (sketch) {
      // A loose crayon curve settles into the same measured anchors. The
      // drawing morphs rather than revealing the content it accompanies.
      const settle = complete ? 1 : ease(clamp((p - .14) / .72));
      const chaos = (1 - settle) * (s === hero ? 95 : Math.min(s.w * .1, 65));
      const gutter = (s.host.id === 'subjects' && (s.w < 650 || sketch)) || (s.host.id === 'tutors' && s.w < 650);
      const narrow = gutter || s.host.id === 'lessons';
      const drift = narrow ? Math.min(chaos, gutter ? 6 : 12) : chaos;
      const pts = s.anchors.map((a, i) => ({
        x: clamp(a.x + Math.sin(i * 2.4) * drift, 8, s.w - 8),
        y: clamp(a.y + Math.cos(i * 2.7) * drift * .55, 8, s.h - 8)
      }));
      const d = join(pts, s.bend + drift, s.heroBottom);
      s.line.setAttribute('d', d);
      s.fibre.setAttribute('d', d);
      s.line.style.strokeDasharray = 'none';
      s.line.style.strokeDashoffset = '0';
      s.bead.style.display = 'none';
      s.rings.forEach((r, i) => {
        const point = pts[i + 1];
        if (point) { r.setAttribute('cx', point.x); r.setAttribute('cy', point.y); }
      });
    } else {
      const amount = complete ? 1 : clamp(.08 + p * .92);
      s.line.style.strokeDasharray = '1';
      s.line.style.strokeDashoffset = String(1 - amount);
      s.fibre.style.strokeDashoffset = String(-p * 18);
      let i = 0;
      while (i < s.samples.length - 2 && s.samples[i + 1].distance < amount) i++;
      const a = s.samples[i], b = s.samples[i + 1];
      if (a && b) {
        const fraction = (amount - a.distance) / (b.distance - a.distance || 1);
        s.bead.setAttribute('cx', a.x + (b.x - a.x) * fraction);
        s.bead.setAttribute('cy', a.y + (b.y - a.y) * fraction);
      }
    }
    if (s.host.id === 'lessons') {
      const active = Math.min(3, Math.floor(p * 4));
      s.host.querySelectorAll('.lesson-steps li').forEach((li, i) => li.classList.toggle('motion-current', !complete && i === active));
    }
  }
  function stopPlay() {
    playing = null;
    if (hero) hero.group.removeAttribute('transform');
  }
  function frame(now) {
    pending = 0;
    if (document.hidden) { stopPlay(); return; }
    if (dirty) {
      scenes.forEach(measure);
      dirty = false;
    }
    travel = scrollY;
    const vh = innerHeight;
    scenes.forEach(s => {
      if (!s.visible && !media.matches) return;
      // Whole-page chapters share one continuous scroll timeline.
      const p = media.matches ? 1 : clamp((travel + vh * .87 - s.top) / (s.h + vh * .38));
      draw(s, p);
    });
    if (playing && hero) {
      if (!hero.visible || media.matches) { stopPlay(); return; }
      const t = (now - playing.start) / 1250;
      if (t >= 1) { stopPlay(); return; }
      const spring = Math.sin(t * Math.PI * 7) * Math.pow(1 - t, 2);
      const dx = spring * playing.x * (sketch ? 16 : 7);
      const dy = spring * playing.y * (sketch ? 10 : 16);
      hero.group.setAttribute('transform', `translate(${round(dx)} ${round(dy)})`);
      schedule();
    }
  }
  function schedule() {
    if (ready && !pending && !document.hidden) pending = requestAnimationFrame(frame);
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const s = scenes.find(scene => scene.host === entry.target);
      s.visible = entry.isIntersecting;
      if (!s.visible && s === hero) stopPlay();
    });
    schedule();
  }, { rootMargin: '40px 0px' });
  scenes.forEach(s => observer.observe(s.host));
  const resize = new ResizeObserver(() => { dirty = true; schedule(); });
  scenes.forEach(s => resize.observe(s.host));
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => { dirty = true; schedule(); }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(pending); pending = 0; stopPlay();
    } else { dirty = true; schedule(); }
  });
  media.addEventListener('change', () => { stopPlay(); scenes.forEach(s => { s.progress = -1; }); schedule(); });
  document.fonts.ready.then(() => { ready = true; dirty = true; schedule(); });
  if (button && hero) {
    button.addEventListener('click', event => {
      if (media.matches) {
        // A still alternative gives the control feedback without movement.
        hero.svg.classList.toggle('alternate-ink');
        hero.line.style.stroke = hero.svg.classList.contains('alternate-ink') ? '#a56b36' : '';
        return;
      }
      const r = button.getBoundingClientRect();
      playing = {
        start: performance.now(),
        x: event.detail ? clamp((event.clientX - r.left) / r.width, .2, 1) : .65,
        y: event.detail ? clamp((event.clientY - r.top) / r.height, .4, 1) : .8
      };
      schedule();
    });
    button.addEventListener('pointermove', event => {
      if (!playing || event.pointerType === 'touch' || media.matches) return;
      const r = button.getBoundingClientRect();
      playing.x = clamp((event.clientX - r.left) / r.width, -.8, 1);
    }, { passive: true });
  }
  schedule();
})();
