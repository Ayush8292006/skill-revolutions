import * as THREE from 'three';

// Procedural canvas textures — no external downloads needed for the 3D world.

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
}

function rand(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function makeBrickTexture() {
  const [c, g] = canvas(512, 256);
  const r = rand(7);
  g.fillStyle = '#5a4a42';
  g.fillRect(0, 0, 512, 256);
  const bw = 64;
  const bh = 21;
  for (let row = 0; row < 256 / bh + 1; row++) {
    const off = row % 2 ? bw / 2 : 0;
    for (let col = -1; col < 512 / bw + 1; col++) {
      const hue = 12 + r() * 10;
      const light = 26 + r() * 14;
      g.fillStyle = `hsl(${hue}, ${45 + r() * 20}%, ${light}%)`;
      g.fillRect(col * bw + off + 2, row * bh + 2, bw - 4, bh - 4);
      // subtle grain
      for (let k = 0; k < 6; k++) {
        g.fillStyle = `rgba(0,0,0,${r() * 0.18})`;
        g.fillRect(col * bw + off + 2 + r() * (bw - 8), row * bh + 2 + r() * (bh - 6), 4 + r() * 8, 2);
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

export function makeNoiseTexture(base = '#e9e8e3', amount = 0.06, seed = 3, size = 256) {
  const [c, g] = canvas(size, size);
  const r = rand(seed);
  g.fillStyle = base;
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < size * size * 0.35; i++) {
    const v = r() > 0.5 ? 255 : 0;
    g.fillStyle = `rgba(${v},${v},${v},${r() * amount})`;
    g.fillRect(r() * size, r() * size, 1 + r() * 2, 1 + r() * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function makeGrassTexture() {
  const [c, g] = canvas(512, 512);
  const r = rand(11);
  g.fillStyle = '#3f6b2c';
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 26000; i++) {
    const l = 22 + r() * 24;
    g.fillStyle = `hsla(${88 + r() * 22}, ${40 + r() * 25}%, ${l}%, ${0.35 + r() * 0.5})`;
    g.fillRect(r() * 512, r() * 512, 1, 2 + r() * 4);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(10, 10);
  t.anisotropy = 4;
  return t;
}

export function makePaverTexture() {
  const [c, g] = canvas(256, 256);
  const r = rand(19);
  g.fillStyle = '#2b2e33';
  g.fillRect(0, 0, 256, 256);
  const s = 32;
  for (let y = 0; y < 256; y += s) {
    for (let x = 0; x < 256; x += s) {
      const l = 32 + r() * 10;
      g.fillStyle = `hsl(220, 6%, ${l}%)`;
      g.fillRect(x + 1.5, y + 1.5, s - 3, s - 3);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function makeWoodTexture() {
  const [c, g] = canvas(128, 256);
  const r = rand(23);
  g.fillStyle = '#5b321c';
  g.fillRect(0, 0, 128, 256);
  for (let i = 0; i < 90; i++) {
    g.strokeStyle = `rgba(${30 + r() * 40},${15 + r() * 15},5,${0.25 + r() * 0.35})`;
    g.lineWidth = 0.5 + r() * 1.5;
    const x = r() * 128;
    g.beginPath();
    g.moveTo(x, 0);
    g.bezierCurveTo(x + r() * 6 - 3, 80, x + r() * 6 - 3, 170, x + r() * 4 - 2, 256);
    g.stroke();
  }
  // door panels
  g.strokeStyle = 'rgba(0,0,0,0.45)';
  g.lineWidth = 3;
  for (let i = 0; i < 3; i++) g.strokeRect(14, 14 + i * 80, 100, 66);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Truss / lattice pattern for the tower crane (used with alphaTest)
export function makeLatticeTexture(horizontal = false) {
  const W = horizontal ? 512 : 128;
  const H = horizontal ? 128 : 512;
  const [c, g] = canvas(W, H);
  g.clearRect(0, 0, W, H);
  g.strokeStyle = '#ffffff';
  g.lineCap = 'square';
  const bars = 10;
  if (horizontal) {
    g.lineWidth = 14;
    g.beginPath();
    g.moveTo(0, 7); g.lineTo(W, 7);
    g.moveTo(0, H - 7); g.lineTo(W, H - 7);
    g.stroke();
    g.lineWidth = 7;
    const step = W / bars;
    for (let i = 0; i < bars; i++) {
      g.beginPath();
      g.moveTo(i * step, H - 7);
      g.lineTo(i * step + step / 2, 7);
      g.lineTo(i * step + step, H - 7);
      g.stroke();
    }
  } else {
    g.lineWidth = 14;
    g.beginPath();
    g.moveTo(7, 0); g.lineTo(7, H);
    g.moveTo(W - 7, 0); g.lineTo(W - 7, H);
    g.stroke();
    g.lineWidth = 7;
    const step = H / bars;
    for (let i = 0; i < bars; i++) {
      g.beginPath();
      g.moveTo(7, i * step);
      g.lineTo(W - 7, i * step + step);
      g.moveTo(W - 7, i * step);
      g.lineTo(7, i * step + step);
      g.moveTo(7, i * step);
      g.lineTo(W - 7, i * step);
      g.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}
