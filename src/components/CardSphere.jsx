/**
 * Cue Foundations · Interactive Card Sphere
 * ────────────────────────────────────────────
 * A draggable, flickable sphere of flat SVG/HTML cards that coasts to a stop with one hero card centered, no photos or gradients.
 *
 * Sized from u = min(width, 0.8·height).
 * Font: Inter 500/600/700 (loaded unless loadFont={false}).
 * The animation writes styles straight to DOM nodes in one requestAnimationFrame loop — no re-renders.
 */
import { useEffect, useRef } from 'react'

/* ---------- palette (flat colours from the reference) ---------- */
const LIME = '#d5fe4f'
const INK = '#0d0d0d'
const CARD = '#1d1d1d'
const PAPER = '#f2f2f0'
const GREY = '#d9d9d6'

/* ---------- maths ---------- */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const lerp = (a, b, t) => a + (b - a) * t
const bez = (x1, y1, x2, y2) => (x) => {
  let t = x
  for (let i = 0; i < 6; i++) {
    const cx = 3 * x1 * t * (1 - t) ** 2 + 3 * x2 * t * t * (1 - t) + t ** 3 - x
    const d = 3 * x1 * (1 - t) ** 2 + 6 * (x2 - x1) * t * (1 - t) + 3 * (1 - x2) * t * t
    if (Math.abs(d) < 1e-6) break
    t = clamp(t - cx / d)
  }
  return 3 * y1 * t * (1 - t) ** 2 + 3 * y2 * t * t * (1 - t) + t ** 3
}
const SETTLE = bez(0.25, 0.75, 0.2, 1) // fast start, long glide
const V = (x, y, z) => ({ x, y, z })
const norm = (a) => {
  const n = Math.hypot(a.x, a.y, a.z) || 1
  return V(a.x / n, a.y / n, a.z / n)
}
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z
const cross = (a, b) => V(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x)
const qmul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
]
const qaxis = (axis, ang) => {
  const s = Math.sin(ang / 2)
  const a = norm(axis)
  return [Math.cos(ang / 2), a.x * s, a.y * s, a.z * s]
}
const qnorm = (q) => {
  const n = Math.hypot(q[0], q[1], q[2], q[3])
  return [q[0] / n, q[1] / n, q[2] / n, q[3] / n]
}
const qrot = (q, v) => {
  const [w, x, y, z] = q
  const ix = w * v.x + y * v.z - z * v.y
  const iy = w * v.y + z * v.x - x * v.z
  const iz = w * v.z + x * v.y - y * v.x
  const iw = -x * v.x - y * v.y - z * v.z
  return V(
    ix * w + iw * -x + iy * -z - iz * -y,
    iy * w + iw * -y + iz * -x - ix * -z,
    iz * w + iw * -z + ix * -y - iy * -x
  )
}
const qslerp = (a, b, t) => {
  let c = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
  if (c < 0) {
    b = [-b[0], -b[1], -b[2], -b[3]]
    c = -c
  }
  if (c > 0.9995) {
    return qnorm([lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)])
  }
  const th = Math.acos(c)
  const s = Math.sin(th)
  const ka = Math.sin((1 - t) * th) / s
  const kb = Math.sin(t * th) / s
  return [a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb, a[3] * ka + b[3] * kb]
}
const qbetween = (from, to) => {
  const c = clamp(dot(from, to), -1, 1)
  if (c > 0.99999) return [1, 0, 0, 0]
  return qaxis(c < -0.99999 ? V(0, 1, 0) : cross(from, to), Math.acos(c))
}
const fib = (n, i, off = 0) => {
  const y = 1 - (2 * (i + 0.5)) / n
  const r = Math.sqrt(1 - y * y)
  const t = Math.PI * (3 - Math.sqrt(5)) * i + off
  return V(Math.cos(t) * r, y, Math.sin(t) * r)
}

/* ---------- artwork (each card is authored at its own base size; text in base px) ---------- */
const ICONS = {
  x: 'M30 30 L48 48 M70 30 L52 48 M30 70 L48 52 M70 70 L52 52 M48 48 H52 M48 52 H52 M48 48 V52 M52 48 V52',
  ring: 'M50 22 A28 28 0 1 1 49.9 22',
  flower: 'M50 20 A10 10 0 1 1 49.9 20 M50 40 V82 M50 56 L38 46 M50 56 L62 46 M50 70 L40 62 M50 70 L60 62',
  layers: 'M50 24 L80 40 L50 56 L20 40 Z M20 52 L50 68 L80 52 M20 64 L50 80 L80 64',
  basket: 'M22 42 H78 L70 78 H30 Z M36 42 L44 24 M64 42 L56 24 M36 56 V66 M50 56 V66 M64 56 V66',
  person: 'M50 22 A12 12 0 1 1 49.9 22 M26 80 C26 58 74 58 74 80',
  search: 'M44 26 A18 18 0 1 1 43.9 26 M57 57 L76 76',
}

const SHAPES = {
  circle: '<circle cx="50" cy="50" r="30"/>',
  arch: '<path d="M22 80V48a28 28 0 0 1 56 0v32z"/>',
  quarter: '<path d="M22 78V22a56 56 0 0 1 56 56z"/>',
  halves: '<path d="M20 50a15 15 0 0 1 30 0zM50 50a15 15 0 0 0 30 0z"/>',
  plus: '<path d="M42 20h16v22h22v16H58v22H42V58H20V42h22z"/>',
  stack: '<rect x="22" y="22" width="56" height="14" rx="7"/><rect x="22" y="43" width="40" height="14" rx="7"/><rect x="22" y="64" width="50" height="14" rx="7"/>',
}

const iconSvg = (k, size) =>
  `<svg viewBox="0 0 100 100" width="${size}" height="${size}"><path d="${ICONS[k]}" fill="none" stroke="#f2f2f2" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0.01 7"/></svg>`

const dotCluster = (w, h, col, seedN) => {
  let s = seedN * 9301 + 49297
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  let out = ''
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 4; x++) {
      const v = r()
      if (v < 0.22) continue
      out += `<circle cx="${16 + x * 23}" cy="${14 + y * 24}" r="${2.5 + v * 8.5}"/>`
    }
  }
  return `<svg viewBox="0 0 100 124" width="${w * 0.82}" height="${h * 0.82}"><g fill="${col}">${out}</g></svg>`
}

/* ---------- Featured Projects from Snapshots Directory ---------- */
const SNAPSHOT_PROJECTS = [
  {
    id: 'banking',
    title: 'Apex — Core Banking',
    img: '/Snapshots/banking.png',
    route: '/projects/banking',
    heroIndex: 0,
    w: 520,
    h: 295,
    rz: 0,
    p: V(0, 0, 1),
  },
  {
    id: 'medlink',
    title: 'MedLink — Clinical Aid',
    img: '/Snapshots/medlink.png',
    route: '/projects/medlink',
    heroIndex: 1,
    w: 520,
    h: 295,
    rz: 0,
    p: V(Math.sin((2 * Math.PI) / 5), 0, Math.cos((2 * Math.PI) / 5)),
  },
  {
    id: 'rfid',
    title: 'RFID Library Auditing',
    img: '/Snapshots/rfid.png',
    route: '/projects/rfid',
    heroIndex: 2,
    w: 520,
    h: 295,
    rz: 0,
    p: V(Math.sin((4 * Math.PI) / 5), 0, Math.cos((4 * Math.PI) / 5)),
  },
  {
    id: 'archive',
    title: 'Archive & Ledger',
    img: '/Snapshots/archive.png',
    route: '/projects/archive-ledger',
    heroIndex: 3,
    w: 520,
    h: 295,
    rz: 0,
    p: V(Math.sin((6 * Math.PI) / 5), 0, Math.cos((6 * Math.PI) / 5)),
  },
  {
    id: 'feasto',
    title: 'Feasto Smart Delivery',
    img: '/Snapshots/feasto.png',
    route: '/projects/feasto',
    heroIndex: 4,
    w: 520,
    h: 295,
    rz: 0,
    p: V(Math.sin((8 * Math.PI) / 5), 0, Math.cos((8 * Math.PI) / 5)),
  },
]

const HEROES = SNAPSHOT_PROJECTS

const SATELLITE_IMAGES = [
  '/Snapshots/banking.png',
  '/Snapshots/medlink.png',
  '/Snapshots/rfid.png',
  '/Snapshots/archive.png',
  '/Snapshots/feasto.png',
]

const ART = {
  project: (w, h, o) => `
    <div style="position:relative;width:100%;height:100%;overflow:hidden;border-radius:inherit;background:#09090b;">
      <img src="${o.img}" alt="${o.title}" loading="eager" style="width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;" />
      <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 40%);display:flex;align-items:flex-end;justify-content:center;padding-bottom:${w * 0.05}px;pointer-events:none;box-sizing:border-box;">
        <button class="csph-case-btn" data-route="${o.route}" style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:${w * 0.03}px;font-weight:600;letter-spacing:0.03em;background:rgba(9,9,11,0.85);backdrop-filter:blur(8px);color:#ffffff;border:1px solid rgba(255,255,255,0.3);padding:${w * 0.02}px ${w * 0.05}px;border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 8px 24px rgba(0,0,0,0.6);pointer-events:auto;transition:transform 0.2s ease;">
          <span>View Case Study</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  `,
  satellite: (w, h, o) => `
    <div style="position:relative;width:100%;height:100%;overflow:hidden;border-radius:inherit;background:#18181b;border:1px solid rgba(255,255,255,0.12);">
      <img src="${o.img}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;opacity:0.65;" />
    </div>
  `,
}

const P = 2
const NS = 24

/** builds the project field every time (seeded) */
function buildCards() {
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  const heroes = HEROES.map((o) => ({ ...o, type: 'project', hero: true }))
  const small = []
  for (let i = 0; i < NS; i++) {
    const p = fib(NS, i, 0.37)
    p.x += (rnd() - 0.5) * 0.08
    p.y += (rnd() - 0.5) * 0.08
    p.z += (rnd() - 0.5) * 0.08
    const q = norm(p)
    if (heroes.some((h) => dot(h.p, q) > 0.8)) continue
    const img = SATELLITE_IMAGES[i % SATELLITE_IMAGES.length]
    const w = 170
    const h = 96
    const o = {
      type: 'satellite',
      img,
      w,
      h,
      p: q,
      rz: (rnd() - 0.5) * 8,
    }
    small.push(o)
  }
  return [...heroes, ...small]
}

const CSS = `
.csph{position:relative;width:100%;height:100%;min-height:320px;overflow:hidden;background:#09090b;contain:strict;user-select:none;-webkit-user-select:none;outline:none;touch-action:none;cursor:grab;transition:background-color 0.2s}
.csph.dark{background:#09090b}
.csph.grabbing{cursor:grabbing}
.csph-c{position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform,opacity;overflow:hidden;backface-visibility:hidden;box-sizing:border-box;box-shadow:0 8px 32px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.12)}
@media (prefers-reduced-motion:reduce){.csph-c{will-change:auto}}
`

export default function CardSphere({
  theme = 'light',
  allowThemeToggle = true,
  onThemeChange,
  onSettle,
  onSelectProject,
  enableGyro = true,
  onGyroActive,
  loadFont = true,
  className = '',
  style = {},
}) {
  const rootRef = useRef(null)
  const cb = useRef({ onThemeChange, onSettle, onSelectProject, allowThemeToggle, onGyroActive })
  cb.current = { onThemeChange, onSettle, onSelectProject, allowThemeToggle, onGyroActive }

  useEffect(() => {
    rootRef.current?.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ALL = buildCards()
    const heroes = ALL.filter((o) => o.hero)

    for (const o of ALL) {
      const e = document.createElement('div')
      e.className = 'csph-c csph-' + o.type
      e.style.width = o.w + 'px'
      e.style.height = o.h + 'px'
      e.style.borderRadius = Math.max(4, o.w * 0.03) + 'px'
      if (o.bg) e.style.background = o.bg
      e.innerHTML = ART[o.type](o.w, o.h, o)
      e._o = o
      root.appendChild(e)
      o.el = e
      o.hv = 1
    }

    let W = 0, H = 0, u = 1, F = 1, Ax = 1, Ay = 1
    const size = () => {
      const r = root.getBoundingClientRect()
      W = r.width
      H = r.height
      u = Math.min(W, H * 0.8) / 720
      F = 502 * u
      Ax = Math.max(1, (W / 2) / (F * 0.577) * 0.97)
      Ay = Math.max(1, (H / 2) / (F * 0.577) * 0.97)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(root)

    const FRONT = V(0, 0, 1)
    let currentHeroIndex = 0
    let rot = qbetween(heroes[0].p, FRONT)
    let wv = V(0, 0, 0)
    let drag = null
    let snap = null
    let hover = null
    let lastInput = 0
    let settled = true

    const startSnap = (target) => {
      let best = target
      if (!best) {
        // Find which of the 3 hero cards is closest to the front orientation
        let bz = -2
        for (const h of heroes) {
          const z = qrot(rot, h.p).z
          if (z > bz) {
            bz = z
            best = h
          }
        }
      }
      best = best || heroes[currentHeroIndex] || heroes[0]
      currentHeroIndex = best.heroIndex ?? 0

      const to = qnorm(qmul(qbetween(qrot(rot, best.p), FRONT), rot))
      const ang = 2 * Math.acos(clamp(Math.abs(rot[0] * to[0] + rot[1] * to[1] + rot[2] * to[2] + rot[3] * to[3])))
      snap = {
        from: rot,
        to,
        t0: performance.now(),
        ms: 460 + ang * 240,
        hero: currentHeroIndex,
      }
      settled = false
    }

    const render = (dt) => {
      const cx = W / 2
      const cy = H / 2
      if (!drag && !snap) {
        const sp = Math.hypot(wv.x, wv.y, wv.z)
        if (sp > 0.02) {
          rot = qnorm(qmul(qaxis(wv, sp * dt), rot))
          const k = Math.pow(0.88, dt * 30)
          wv = V(wv.x * k, wv.y * k, wv.z * k)
        }
        if (!settled && sp < 1.6 && performance.now() - lastInput > 60) {
          startSnap()
        }
      }
      if (snap) {
        const t = clamp((performance.now() - snap.t0) / snap.ms)
        rot = qslerp(snap.from, snap.to, SETTLE(t))
        if (t >= 1) {
          const h = snap.hero
          snap = null
          wv = V(0, 0, 0)
          settled = true
          currentHeroIndex = h
          cb.current.onSettle?.(h)
        }
      }
      for (const o of ALL) {
        const e = o.el
        if (!e) continue
        const q = qrot(rot, o.p)
        const d = P - q.z
        const s = 1 / d
        const sx = cx + q.x * F * s * Ax
        const sy = cy - q.y * F * s * Ay
        const k = clamp((q.z - 0.2) / 0.55)
        const hf = o.hero ? lerp(0.55, 1, k * k * (3 - 2 * k)) : 0.5
        const sc = s * u * hf
        const ry = Math.atan2(q.x, Math.max(0.2, q.z)) * 57.3 * 0.35
        const rx = Math.atan2(q.y, Math.max(0.2, q.z)) * 57.3 * 0.35
        o.hv = lerp(o.hv ?? 1, o === hover ? 1.04 : 1, 1 - Math.pow(0.001, dt))
        const ew = o.w * sc * o.hv
        const eh = o.h * sc * o.hv
        if (sx + ew < -40 || sx - ew > W + 40 || sy + eh < -40 || sy - eh > H + 40) {
          if (e.style.display !== 'none') e.style.display = 'none'
          continue
        }
        if (e.style.display === 'none') e.style.display = ''
        e.style.transform = `translate(${sx}px,${sy}px) scale(${sc * o.hv}) perspective(${o.w * 2.6}px) rotateX(${rx}deg) rotateY(${ry}deg) rotate(${o.rz}deg) translate(${-o.w / 2}px,${-o.h / 2}px)`
        e.style.zIndex = String(Math.round((3 - d) * 1000))
        e.style.opacity = String(o.hero ? clamp((q.z + 0.9) / 0.3) : clamp((q.z + 0.8) / 0.35))
      }
    }

    const samples = []
    const turn = (dx, dy) => {
      const ang = Math.hypot(dx / Ax, dy / Ay) / (F * 0.5)
      if (ang > 0) rot = qnorm(qmul(qaxis(V(dy / Ay, dx / Ax, 0), ang), rot))
    }
    const flick = (vx, vy) => {
      const k = 1 / (F * 0.5)
      wv = V((vy / Ay) * k, (vx / Ax) * k, 0)
    }
    const cardAt = (t) => t?.closest?.('.csph-c')?._o ?? null
    const toggle = () => {
      if (!cb.current.allowThemeToggle) return
      const dark = root.classList.toggle('dark')
      cb.current.onThemeChange?.(dark ? 'dark' : 'light')
    }

    const onClick = (e) => {
      const btn = e.target.closest?.('.csph-case-btn')
      if (btn) {
        e.stopPropagation()
        e.preventDefault()
        const route = btn.getAttribute('data-route') || '/projects'
        cb.current.onSelectProject?.(route)
        return
      }
    }

    const onDown = (e) => {
      // Trigger iOS device orientation permission prompt on first touch if required
      if (
        enableGyro &&
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        DeviceOrientationEvent.requestPermission().then((res) => {
          if (res === 'granted') {
            window.removeEventListener('deviceorientation', onDeviceOrientation)
            window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true })
          }
        }).catch(() => {})
      }

      root.setPointerCapture(e.pointerId)
      drag = { x: e.clientX, y: e.clientY, moved: 0 }
      snap = null
      wv = V(0, 0, 0)
      settled = false
      samples.length = 0
      root.classList.add('grabbing')
    }
    const onMove = (e) => {
      if (!drag) {
        hover = cardAt(e.target)
        return
      }
      const dx = e.clientX - drag.x
      const dy = e.clientY - drag.y
      drag.x = e.clientX
      drag.y = e.clientY
      drag.moved += Math.abs(dx) + Math.abs(dy)
      turn(dx, dy)
      const now = performance.now()
      samples.push([now, dx, dy])
      while (samples.length && now - samples[0][0] > 90) samples.shift()
    }
    const onUp = (e) => {
      if (!drag) return
      root.classList.remove('grabbing')
      const moved = drag.moved
      drag = null
      lastInput = performance.now()
      if (moved < 6) {
        const btn = e.target.closest?.('.csph-case-btn')
        if (btn) {
          const route = btn.getAttribute('data-route') || '/projects'
          cb.current.onSelectProject?.(route)
          return
        }
        const o = cardAt(e.target)
        if (o && o.hero) {
          const q = qrot(rot, o.p)
          if (q.z > 0.65 && o.route) {
            cb.current.onSelectProject?.(o.route)
            return
          }
        }
        startSnap(o && o.hero ? o : null)
        return
      }
      const span = samples.length > 1 ? Math.max(0.016, (samples[samples.length - 1][0] - samples[0][0]) / 1000) : 0.016
      flick(samples.reduce((a, s) => a + s[1], 0) / span, samples.reduce((a, s) => a + s[2], 0) / span)
    }
    const onLeave = () => {
      if (!drag) hover = null
    }
    const onWheel = (e) => {
      e.preventDefault()
      snap = null
      settled = false
      const dx = -(e.shiftKey ? e.deltaY : e.deltaX)
      const dy = e.shiftKey ? 0 : -e.deltaY
      turn(dx * 0.6, dy * 0.6)
      flick(dx * 9, dy * 9)
      lastInput = performance.now() + 90
    }
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const next = (currentHeroIndex + 1) % heroes.length
        currentHeroIndex = next
        startSnap(heroes[next])
        lastInput = performance.now()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = (currentHeroIndex + heroes.length - 1) % heroes.length
        currentHeroIndex = prev
        startSnap(heroes[prev])
        lastInput = performance.now()
      }
      if (e.key === 't' || e.key === 'T') toggle()
    }

    // Gyroscope / Device Motion Integration for Mobile with Focused Anchoring
    let lastOri = { gamma: null, beta: null, t: 0 }
    let gyroActive = false
    let lastWaveTime = 0

    const onDeviceOrientation = (e) => {
      if (e.gamma == null || e.beta == null) return
      if (!gyroActive) {
        gyroActive = true
        cb.current.onGyroActive?.(true)
      }
      const now = performance.now()

      // If user is actively touching/dragging, align baseline and yield control
      if (drag) {
        lastOri.gamma = e.gamma
        lastOri.beta = e.beta
        lastOri.t = now
        return
      }

      if (lastOri.gamma === null) {
        lastOri.gamma = e.gamma
        lastOri.beta = e.beta
        lastOri.t = now
        return
      }

      const dt = Math.max(0.008, Math.min(0.1, (now - lastOri.t) / 1000))
      const dGamma = e.gamma - lastOri.gamma
      const dBeta = e.beta - lastOri.beta

      lastOri.gamma = e.gamma
      lastOri.beta = e.beta
      lastOri.t = now

      // Discard orientation wraps/jumps (e.g. crossing ±180)
      if (Math.abs(dGamma) > 40 || Math.abs(dBeta) > 40) return

      const angSpeed = Math.hypot(dGamma, dBeta) / dt

      // INTENTIONAL PHONE WAVE / FLICK TO SWITCH PROJECT CARDS:
      // A deliberate wrist flick or phone wave smoothly switches focus to the next/prev project card
      if (angSpeed > 50 && now - lastWaveTime > 700) {
        lastWaveTime = now
        const dir = dGamma > 0 ? 1 : -1
        const nextIndex = (currentHeroIndex + (dir > 0 ? 1 : heroes.length - 1)) % heroes.length
        currentHeroIndex = nextIndex
        startSnap(heroes[nextIndex])
        return
      }

      // SMOOTH PARALLAX ON CURRENT PROJECT CARD ONLY:
      // When gently tilting the phone, apply a smooth 3D holographic tilt
      // anchored firmly onto the current active project card without drifting away!
      if (!snap) {
        const dx = dGamma * 2.2
        const dy = dBeta * 2.2
        turn(dx, dy)
      }
    }

    if (enableGyro && typeof window !== 'undefined') {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true })
    }

    root.addEventListener('click', onClick)
    root.addEventListener('pointerdown', onDown)
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerup', onUp)
    root.addEventListener('pointercancel', onUp)
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('keydown', onKey)
    root.addEventListener('dblclick', toggle)

    let raf = 0
    let last = performance.now()
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!document.hidden) render(dt)
    }
    render(0)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (enableGyro && typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', onDeviceOrientation)
      }
      root.removeEventListener('click', onClick)
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onUp)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('keydown', onKey)
      root.removeEventListener('dblclick', toggle)
      ALL.forEach((o) => o.el?.remove())
    }
  }, [])

  return (
    <>
      {loadFont && (
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap"
        />
      )}
      <style>{CSS}</style>
      <div
        ref={rootRef}
        className={['csph', theme === 'dark' ? 'dark' : '', className].filter(Boolean).join(' ')}
        style={style}
        tabIndex={0}
        role="application"
        aria-label="Cue cards. Drag, scroll or use the arrow keys to turn; double-click or press T to switch light and dark."
      />
    </>
  )
}
