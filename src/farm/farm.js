/* The elPagès farm, portfolio edition. The goose, the chick and the rubber duck from Víctor's apps live in the
   Apps section: they leave the wrong tracks (bare human feet, dog paws, dinosaur prints) and speak like the animal
   whose tracks they leave. Mouse: they follow the pointer while it is over the section; leave it still there and the
   goose steals the cursor until it moves. Touch: they run to where you tap; left alone, the goose borrows an app icon
   until the next tap. Reduce motion: they stand still. `parade()` sends the three across the screen once.
   Loaded on demand (dynamic import), so none of this weighs on the first paint. */
import ART from "./art.js";

const GOLD = "#FFC000";
const P_LIFE = 2.2;
const P_FADE = 0.9;

function path(ops) {
  const p = new Path2D();
  for (let i = 0; i < ops.length; ) {
    const o = ops[i++];
    if (o === 0) { p.moveTo(ops[i], ops[i + 1]); i += 2; }
    else if (o === 1) { p.lineTo(ops[i], ops[i + 1]); i += 2; }
    else if (o === 2) { p.bezierCurveTo(ops[i], ops[i + 1], ops[i + 2], ops[i + 3], ops[i + 4], ops[i + 5]); i += 6; }
    else p.closePath();
  }
  return p;
}
let art = null;
function loadArt() {
  if (art) return art;
  art = {};
  for (const k in ART.art) art[k] = ART.art[k].map((s) => ({ c: s[0], rule: s[1] ? "evenodd" : "nonzero", p: path(s[2]) }));
  return art;
}
function drawArt(c, id, color) {
  for (const s of art[id]) { c.fillStyle = s.c || color; c.fill(s.p, s.rule); }
}
const CURSOR = () => new Path2D("M0 0L0 17L4.6 12.6L7.6 19.4L10.4 18.2L7.5 11.6L13 11.6Z");

function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, s = x;
    for (let i = 0; i < 22; i++) { s = (lo + hi) / 2; if (((ax * s + bx) * s + cx) * s < x) lo = s; else hi = s; }
    return ((ay * s + by) * s + cy) * s;
  };
}
const easeOut = bezier(0.23, 1, 0.32, 1), easeInOut = bezier(0.77, 0, 0.175, 1);
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const seg = (t, t0, d) => clamp01((t - t0) / d);
const smooth = (s) => s * s * (3 - 2 * s);
const rnd = (a, b) => a + Math.random() * (b - a);
const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const SPECIES = [
  { id: "goose", tint: "#FFE699", shade: "#E3C470", stride: 34, duty: 0.6, lift: 6, bob: 1.6, waddle: 4.5,
    pivot: [2.4, -21], hipNear: [-2.4, -20.6], hipFar: [7.2, -21.8], groundNear: 5, groundFar: -5, legW: 4.8, ankleH: 9.6,
    printNear: "humanN", printFar: "humanF", rowNear: 8, rowFar: -8, printDx: 4, splay: 4, shadow: [-2, 31, 3.6], top: 92, say: "Hello!" },
  { id: "chick", tint: "#FFF2CC", shade: "#E2D3A8", stride: 26, duty: 0.55, lift: 4.5, bob: 1.1, waddle: 4,
    pivot: [-1, -16.2], hipNear: [-3.6, -15.8], hipFar: [1.65, -16.6], groundNear: 2.5, groundFar: -2.5, legW: 2.64, ankleH: 3.96,
    printNear: "paw", printFar: "paw", rowNear: 6, rowFar: -6, printDx: 3, splay: 0, shadow: [-1, 20, 2.8], top: 60, say: "Woof!" },
  { id: "duck", tint: "#FFD966", hop: 40, hopH: 6, rock: 4, printNear: "dinoN", printFar: "dinoF", rowNear: 9, rowFar: -9,
    splay: 6, shadow: [0, 29, 3.4], top: 64, say: "ROAR!" },
];

function footPos(s, far, b) {
  const ph = far ? 0.5 : 0, hx = far ? s.hipFar[0] : s.hipNear[0];
  const uu = b / s.stride + ph, k = Math.floor(uu), p = uu - k;
  const plant = hx + (k + s.duty / 2 - ph) * s.stride;
  let x = plant, y = far ? s.groundFar : s.groundNear, swing = 0;
  if (p >= s.duty) { swing = (p - s.duty) / (1 - s.duty); x = plant + smooth(swing) * s.stride; y -= s.lift * Math.sin(Math.PI * swing); }
  return { x, y, swing };
}
function shadow(c, cx, rx, ry) {
  c.fillStyle = "rgba(0,0,0,0.2)";
  c.beginPath(); c.ellipse(cx, 0.8, rx, ry, 0, 0, Math.PI * 2); c.fill();
}
function poseBiped(c, s, b, standing) {
  const cyc = b / s.stride;
  const bob = standing ? 0 : -s.bob * (0.5 + 0.5 * Math.cos(4 * Math.PI * (cyc - s.duty / 2)));
  const ar = (standing ? 0 : s.waddle * Math.sin(2 * Math.PI * (cyc - s.duty / 2))) * Math.PI / 180;
  const cs = Math.cos(ar), sn = Math.sin(ar), px = s.pivot[0], py = s.pivot[1];
  shadow(c, s.shadow[0], s.shadow[1], s.shadow[2]);
  const leg = (far) => {
    const hip = far ? s.hipFar : s.hipNear, dx = hip[0] - px, dy = hip[1] - py;
    let fx, fy, sw = 0;
    if (standing) { fx = hip[0] + (far ? -3 : 3); fy = far ? s.groundFar : s.groundNear; }
    else { const f = footPos(s, far, b); fx = f.x - b; fy = f.y; sw = f.swing; }
    const col = far ? s.shade : s.tint;
    c.strokeStyle = col; c.lineWidth = s.legW; c.lineCap = "round";
    c.beginPath(); c.moveTo(px + dx * cs - dy * sn, py + dx * sn + dy * cs + bob); c.lineTo(fx, fy - s.ankleH); c.stroke();
    c.save(); c.translate(fx, fy);
    if (sw > 0) { c.translate(0, -s.ankleH); c.rotate(14 * Math.sin(Math.PI * sw) * Math.PI / 180); c.translate(0, s.ankleH); }
    drawArt(c, "f-" + s.id, col);
    c.restore();
  };
  leg(true);
  c.save(); c.translate(0, bob); c.translate(px, py); c.rotate(ar); c.translate(-px, -py); drawArt(c, "b-" + s.id, s.tint); c.restore();
  leg(false);
}
function poseDuck(c, s, b, standing) {
  const h = b / s.hop, k = Math.floor(h), f = h - k;
  const q = !standing && f < 0.16 ? 1 - f / 0.16 : 0;
  shadow(c, s.shadow[0], s.shadow[1] * (standing ? 1 : 1 - 0.18 * Math.sin(Math.PI * f)), s.shadow[2]);
  c.save();
  c.translate(0, standing ? 0 : -s.hopH * Math.sin(Math.PI * f));
  c.rotate((standing ? 0 : s.rock * Math.sin(Math.PI * f) * (k % 2 ? 1 : -1)) * Math.PI / 180);
  c.scale(1 + 0.06 * q, 1 - 0.09 * q);
  drawArt(c, "b-duck", s.tint);
  c.restore();
}
function drawPrint(c, p, now, U) {
  const age = (now - p.t) / 1000;
  const al = easeOut(seg(age, 0, 0.12)) * (1 - seg(age, P_LIFE, P_FADE)) * 0.85;
  if (al <= 0.003) return;
  const grow = 1 + 0.3 * (1 - easeOut(seg(age, 0, 0.15)));
  c.save(); c.globalAlpha = al; c.translate(p.x, p.y); c.rotate(p.ang); c.scale(U * grow, U * grow);
  drawArt(c, "p-" + p.id, p.tint); c.restore();
}
function bubble(c, x, y, text, alpha) {
  c.save();
  c.globalAlpha = alpha;
  c.font = '600 14px "Geist Variable", system-ui, sans-serif';
  const w = c.measureText(text).width + 20, h = 28, bx = x - w / 2, by = y - h;
  c.fillStyle = "#FFF8E1";
  c.beginPath();
  if (c.roundRect) c.roundRect(bx, by, w, h, 14); else c.rect(bx, by, w, h);
  c.moveTo(x - 6, by + h - 1); c.lineTo(x, by + h + 8); c.lineTo(x + 6, by + h - 1);
  c.fill();
  c.fillStyle = "#123A33"; c.textBaseline = "middle"; c.fillText(text, bx + 10, by + h / 2 + 1);
  c.restore();
}
function overlay(z) {
  const cv = document.createElement("canvas");
  cv.setAttribute("aria-hidden", "true");
  cv.style.cssText = `position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:${z}`;
  document.body.appendChild(cv);
  return cv;
}

/** The animals live in `section` (coordinates relative to its top-left corner). Returns a stop function. */
export function startFarm(section) {
  loadArt();
  const cursorPath = CURSOR();
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = reduceMotion();
  const U = fine ? 0.8 : 0.62;
  const cv = overlay(30), c = cv.getContext("2d");
  let dpr = 1, vw = 0, vh = 0, box = section.getBoundingClientRect();
  const resize = () => {
    dpr = Math.min(2.5, devicePixelRatio || 1); vw = innerWidth; vh = innerHeight;
    cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr);
  };
  resize();

  const animals = SPECIES.map((s, i) => ({ s, x: -120 - i * 90, y: 170, vx: 0, vy: 0, sp: 0, face: 1, ang: 0, b: 0,
    k: { near: null, far: null }, hopK: null, jumpUntil: 0, say: "", sayFrom: 0, sayUntil: 0 }));
  const goose = animals[0];
  const prints = [], flying = [];
  const ptr = { x: 0, y: 0, inside: false, last: performance.now() };
  let mode = "enter", goal = { x: 0, y: 0 }, goalUntil = 0, lastActivity = performance.now();
  let holding = null, thing = null, jit = 0, visible = true, raf = 0;
  const W = () => box.width, H = () => box.height;
  // they walk below the heading, the lede and the filters, over the app grid
  const headEl = section.querySelector(".filters") || section.querySelector(".section-head");
  const minY = () => Math.min(H() - 60, headEl ? headEl.getBoundingClientRect().bottom - box.top + 56 : 150);
  const roam = () => ({ x: rnd(60, W() - 60), y: rnd(minY(), H() - 50) });
  const jumpY = (a, now) => (a.jumpUntil > now ? -24 * U * Math.sin(Math.PI * (1 - (a.jumpUntil - now) / 420)) : 0);
  const beak = (a, now) => ({ x: a.x + a.face * U * 46.8, y: a.y - U * 76 + jumpY(a, now) });
  const say = (a, text, now, ms = 1500) => { a.say = text; a.sayFrom = now; a.sayUntil = now + ms; };
  const startle = (now) => animals.forEach((a, i) => { a.jumpUntil = now + 420 + i * 60; });

  function addPrint(a, far, now, along) {
    const s = a.s, row = (far ? s.rowFar : s.rowNear) * U, ax = along * U, ca = Math.cos(a.ang), sa = Math.sin(a.ang);
    jit = (jit + 3) % 7;
    prints.push({ id: far ? s.printFar : s.printNear, tint: s.tint, t: now, x: a.x + ca * ax - sa * row, y: a.y + sa * ax + ca * row,
      ang: a.ang + Math.PI / 2 + ((far ? -s.splay : s.splay) + jit - 3) * Math.PI / 180 });
    if (prints.length > 160) prints.shift();
  }
  function plant(a, now) {
    const s = a.s;
    if (s.hop) {
      const k = Math.floor(a.b / s.hop);
      if (a.hopK !== null && k !== a.hopK && a.sp > 12) addPrint(a, k % 2 === 0, now, 2);
      a.hopK = k;
      return;
    }
    for (const far of [false, true]) {
      const key = far ? "far" : "near", k = Math.floor(a.b / s.stride + (far ? 0.5 : 0));
      if (a.k[key] !== null && k !== a.k[key] && a.sp > 12) addPrint(a, far, now, (far ? s.hipFar[0] : s.hipNear[0]) + s.duty * s.stride / 2 + s.printDx);
      a.k[key] = k;
    }
  }
  function step(a, tx, ty, vmax, dt) {
    tx = Math.max(30, Math.min(W() - 30, tx)); ty = Math.max(minY(), Math.min(H() - 30, ty)); // never leave the section
    const dx = tx - a.x, dy = ty - a.y, d = Math.hypot(dx, dy);
    const want = d > 5 ? vmax * (d > 500 ? Math.min(3, d / 320) : 1) * Math.min(1, d / 70) : 0;
    const ux = d ? dx / d : 0, uy = d ? dy / d : 0, k = Math.min(1, dt * 7);
    a.vx += (ux * want - a.vx) * k; a.vy += (uy * want - a.vy) * k;
    a.x += a.vx * dt; a.y += a.vy * dt;
    a.sp = Math.hypot(a.vx, a.vy);
    if (Math.abs(a.vx) > 10) a.face = a.vx < 0 ? -1 : 1;
    if (a.sp > 10) a.ang = Math.atan2(a.vy, a.vx);
    a.b += (a.sp * dt) / U;
    return d;
  }
  function target(i, now) {
    if (i > 0) { const f = animals[i - 1]; return { x: f.x - f.face * U * 82, y: f.y + 8 }; }
    const a = animals[0];
    if (mode === "follow") return { x: ptr.x + 34, y: ptr.y + 86 };
    if (mode === "stealCursor") return { x: ptr.x - a.face * U * 46.8, y: ptr.y + U * 76 };
    if (mode === "stealThing") return { x: thing.x - a.face * U * 46.8, y: thing.y + U * 76 };
    return goal;
  }
  function iconSpot(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2, w: r.width };
  }
  function pickIcon() {
    const icons = [...section.querySelectorAll("img.app-icon")].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 20 && r.top > 70 && r.top < vh - r.height * 0.6 && r.left > 0 && r.right < vw;
    });
    if (!icons.length) return null;
    const el = icons[Math.floor(Math.random() * icons.length)];
    return { el, ...iconSpot(el) };
  }
  function grab(now) {
    if (mode === "stealCursor") {
      holding = "cursor"; document.documentElement.classList.add("farm-stole");
      say(goose, "Mine!", now); mode = "flee";
    } else {
      holding = thing; thing.el.style.opacity = "0.12";
      say(goose, "Free app!", now, 1800); mode = "flee";
    }
    goal = roam(); goalUntil = now + 2200;
  }
  function giveBack(now) {
    if (!holding) return;
    const b = beak(goose, now);
    if (holding === "cursor") {
      document.documentElement.classList.remove("farm-stole");
      flying.push({ kind: "cursor", x: b.x, y: b.y, t: now });
      say(goose, "Oops.", now);
    } else {
      const home = iconSpot(holding.el);
      flying.push({ kind: "icon", el: holding.el, x0: b.x, y0: b.y, x1: home.x, y1: home.y, w1: home.w, t: now });
      say(goose, "Fine, take it.", now);
    }
    holding = null; startle(now);
    mode = fine && ptr.inside ? "follow" : "wander"; goal = roam(); goalUntil = now + 1500;
  }

  function update(now, dt) {
    if (mode === "enter") {
      goal = { x: Math.min(W() * 0.6, 420), y: minY() + 30 };
      if (Math.hypot(goal.x - goose.x, goal.y - goose.y) < 16) { mode = "wander"; goalUntil = now + rnd(1500, 3000); }
    }
    if (mode === "follow" && !ptr.inside) mode = "wander";
    if (mode === "wander" && fine && ptr.inside) mode = "follow";
    if (fine && mode === "follow" && now - ptr.last > 9000 && !document.hidden) mode = "stealCursor";
    if (!fine && (mode === "wander" || mode === "tap") && !holding && now - lastActivity > 9000) {
      thing = pickIcon();
      if (thing) mode = "stealThing"; else lastActivity = now;
    }
    if (mode === "tap" && now > goalUntil) { mode = "wander"; goalUntil = now + rnd(2500, 4500); }
    if ((mode === "wander" || mode === "flee") && now > goalUntil) { goal = roam(); goalUntil = now + (mode === "flee" ? rnd(1300, 2300) : rnd(2500, 5000)); }
    if (mode === "stealThing") Object.assign(thing, iconSpot(thing.el));
    const vmax = mode === "flee" ? 240 : mode.startsWith("steal") ? 120 : 155;
    animals.forEach((a, i) => {
      const t = target(i, now);
      const d = step(a, t.x, t.y, i === 0 ? vmax : Math.max(vmax, 165), dt);
      if (i === 0 && d < 9 && mode.startsWith("steal")) grab(now);
      plant(a, now);
    });
  }

  function draw(now) {
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, vw, vh);
    c.save();
    c.beginPath(); c.rect(box.left, box.top, box.width, box.height); c.clip(); // they never leave the section
    c.translate(box.left, box.top);
    for (let i = prints.length - 1; i >= 0; i--) {
      if ((now - prints[i].t) / 1000 > P_LIFE + P_FADE) { prints.splice(i, 1); continue; }
      drawPrint(c, prints[i], now, U);
    }
    [...animals].sort((a, b) => a.y - b.y).forEach((a) => {
      c.save(); c.translate(a.x, a.y + jumpY(a, now)); c.scale(a.face * U, U);
      const standing = a.sp < 12 || reduce;
      if (a.s.hop) poseDuck(c, a.s, a.b, standing); else poseBiped(c, a.s, a.b, standing);
      c.restore();
    });
    const b = beak(goose, now);
    if (holding === "cursor") {
      c.save(); c.translate(b.x - 1, b.y - 2); c.fillStyle = "#fff"; c.strokeStyle = "#000"; c.lineWidth = 1.2; c.fill(cursorPath); c.stroke(cursorPath); c.restore();
    } else if (holding) {
      drawIcon(holding.el, b.x + goose.face * 14, b.y + 6, 34);
    }
    for (let i = flying.length - 1; i >= 0; i--) {
      const f = flying[i], age = (now - f.t) / 1000;
      if (f.kind === "cursor") {
        if (age > 0.9) { flying.splice(i, 1); continue; }
        c.save(); c.globalAlpha = 1 - seg(age, 0.3, 0.6); c.translate(f.x, f.y - 120 * age + 900 * age * age);
        c.fillStyle = "#fff"; c.strokeStyle = "#000"; c.lineWidth = 1.2; c.fill(cursorPath); c.stroke(cursorPath); c.restore();
        continue;
      }
      const e = easeInOut(seg(age, 0, 0.6));
      drawIcon(f.el, f.x0 + (f.x1 - f.x0) * e, f.y0 + (f.y1 - f.y0) * e - Math.sin(Math.PI * e) * 90, 34 + (f.w1 - 34) * e);
      if (age >= 0.6) { f.el.style.opacity = ""; flying.splice(i, 1); }
    }
    animals.forEach((a) => {
      if (now > a.sayUntil) return;
      const al = Math.min(1, (now - a.sayFrom) / 140) * Math.min(1, (a.sayUntil - now) / 260);
      bubble(c, a.x, a.y - a.s.top * U - 14 + jumpY(a, now), a.say, al);
    });
    c.restore();
  }
  function drawIcon(el, x, y, w) {
    c.save(); c.beginPath();
    if (c.roundRect) c.roundRect(x - w / 2, y - w / 2, w, w, w * 0.22); else c.rect(x - w / 2, y - w / 2, w, w);
    c.clip();
    try { c.drawImage(el, x - w / 2, y - w / 2, w, w); } catch { /* not loaded yet */ }
    c.restore();
  }

  // ---------- events ----------
  const inBox = (cx, cy) => cx >= box.left && cx <= box.right && cy >= box.top && cy <= box.bottom;
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const now = performance.now();
    ptr.inside = inBox(e.clientX, e.clientY);
    ptr.x = e.clientX - box.left; ptr.y = e.clientY - box.top; ptr.last = now;
    if (mode === "stealCursor") mode = "follow";
    if (holding === "cursor") giveBack(now);
  };
  const onDown = (e) => {
    const now = performance.now();
    lastActivity = now;
    const x = e.clientX - box.left, y = e.clientY - box.top;
    const hit = animals.find((a) => Math.hypot(x - a.x, y - (a.y - a.s.top * U * 0.45)) < a.s.top * U * 0.6 + 12);
    if (hit) { say(hit, hit.s.say, now); if (!reduce) hit.jumpUntil = now + 420; }
    if (reduce) return;
    if (holding) { giveBack(now); return; }
    if (e.pointerType !== "mouse" && !hit && inBox(e.clientX, e.clientY) && !e.target.closest("a,button,input,select,textarea,label,[role=button],[role=tab]")) {
      mode = "tap"; goal = { x: x - 30, y: y + 40 }; goalUntil = now + 4000;
    }
  };
  const onScroll = () => { lastActivity = performance.now(); };
  addEventListener("pointermove", onMove, { passive: true });
  addEventListener("pointerdown", onDown, { passive: true });
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", resize);
  const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { rootMargin: "120px" });
  io.observe(section);

  if (reduce) { // they stand still above the grid
    animals.forEach((a, i) => { a.x = Math.min(W() * 0.7, 460) - i * 95; a.y = minY(); });
  } else {
    animals.forEach((a) => { a.y = minY() + 30; }); // they walk in at grid level, never across the heading
  }
  let last = performance.now();
  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    box = section.getBoundingClientRect();
    if (!visible) { c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height); return; }
    if (!reduce) update(now, dt);
    draw(now);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    removeEventListener("pointermove", onMove);
    removeEventListener("pointerdown", onDown);
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", resize);
    document.documentElement.classList.remove("farm-stole");
    if (holding && holding !== "cursor") holding.el.style.opacity = "";
    cv.remove();
  };
}

let parading = false;
/** The three waddle once across the bottom of the screen, greeting in the wrong voice. */
export function parade() {
  if (parading || reduceMotion()) return;
  parading = true;
  loadArt();
  const cv = overlay(95), c = cv.getContext("2d"), dpr = Math.min(2.5, devicePixelRatio || 1);
  const vw = innerWidth, vh = innerHeight, U = vw < 600 ? 0.62 : 0.8, speed = vw < 600 ? 120 : 170, gap = 0.75;
  cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr);
  const x0 = -70, gy = vh - 30, cross = (vw - x0 + 90) / speed, prints = [], last = {}, t0 = performance.now();
  const frame = (now) => {
    const t = (now - t0) / 1000;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, vw, vh);
    SPECIES.forEach((s, j) => {
      const tj = j * gap, x = x0 + speed * (t - tj);
      if (t < tj || t - tj > cross) return;
      const b = (x - x0) / U;
      if (s.hop) {
        const k = Math.floor(b / s.hop);
        if (last[j] !== undefined && k !== last[j]) prints.push({ id: k % 2 ? s.printNear : s.printFar, tint: s.tint, t: now, x: x + 2 * U, y: gy + (k % 2 ? s.rowNear : s.rowFar) * U, ang: (90 + (k % 2 ? s.splay : -s.splay)) * Math.PI / 180 });
        last[j] = k;
      } else {
        [false, true].forEach((far) => {
          const key = j + (far ? "f" : "n"), kk = Math.floor(b / s.stride + (far ? 0.5 : 0));
          if (last[key] !== undefined && kk !== last[key]) {
            const along = (far ? s.hipFar[0] : s.hipNear[0]) + s.duty * s.stride / 2 + s.printDx;
            prints.push({ id: far ? s.printFar : s.printNear, tint: s.tint, t: now, x: x + along * U, y: gy + (far ? s.rowFar : s.rowNear) * U, ang: (90 + (far ? -s.splay : s.splay)) * Math.PI / 180 });
          }
          last[key] = kk;
        });
      }
    });
    prints.forEach((p) => drawPrint(c, p, now, U));
    SPECIES.forEach((s, j) => {
      const tj = j * gap, x = x0 + speed * (t - tj);
      if (t < tj || t - tj > cross) return;
      c.save(); c.translate(x, gy); c.scale(U, U);
      if (s.hop) poseDuck(c, s, (x - x0) / U, false); else poseBiped(c, s, (x - x0) / U, false);
      c.restore();
      const at = tj + 0.9;
      if (t > at && t < at + 1.4) bubble(c, x, gy - s.top * U - 14, s.say, Math.min(1, (t - at) / 0.15) * Math.min(1, (at + 1.4 - t) / 0.25));
    });
    if (t < 2 * gap + cross + P_LIFE + P_FADE) requestAnimationFrame(frame);
    else { cv.remove(); parading = false; }
  };
  requestAnimationFrame(frame);
}
