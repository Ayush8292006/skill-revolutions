import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { makeNoiseTexture } from './textures.js';

/* ------------------------------------------------------------------ */
/*  Skill Revolution — scroll-driven 3D study scene                    */
/*  progress 0 → 1 : blueprint → desk, chair & study wall →            */
/*  course books fly in → laptop opens on a live project →             */
/*  lamp on, certificate & graduation cap → offer letter, golden hour. */
/*  Same public API as the original PillarPride BuildEngine.           */
/* ------------------------------------------------------------------ */

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const backOut = (t) => {
  const c1 = 1.5;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const lerp = THREE.MathUtils.lerp;

const NAVY = '#1e2b48';
const RED = '#d62a33';
const DESK_Y = 3.0; // desk top surface height
const DESK_W = 7.0;
const DESK_D = 3.2;

const T = {
  blueprint: [0.0, 0.1],
  desk: [0.08, 0.2],
  chair: [0.15, 0.24],
  wall: [0.12, 0.26],
  books: [0.25, 0.45],
  laptop: [0.42, 0.52],
  screen: [0.5, 0.62],
  lamp: [0.58, 0.66],
  cert: [0.64, 0.76],
  cap: [0.74, 0.84],
  letter: [0.84, 0.95],
  lights: [0.62, 0.72],
};

// camera keyframes [position, target], evenly spaced over progress
const CAM_KEYS = [
  [[1.5, 26, 9], [0, 0, 0]],
  [[13, 13, 15], [0, 1.6, 0]],
  [[11, 8.5, 10], [-1.2, 3.6, -0.4]],
  [[1.5, 7.2, 10.5], [0.4, 3.8, 0]],
  [[-9, 7.5, 9.5], [1.2, 4.0, -0.3]],
  [[-4, 8.5, 14], [0.4, 3.9, 0]],
  [[9.5, 7, 14], [0, 3.8, -0.4]],
];

export const TAG_DEFS = [
  { id: 'plan', pos: [3.8, 0.2, 2.6], from: 0.02, to: 0.12, label: 'STUDY PLAN · STEP 01', sub: 'FREE COUNSELLING & ENROLMENT' },
  { id: 'foundation', pos: [-3.2, DESK_Y + 0.1, 1.4], from: 0.13, to: 0.26, label: 'FOUNDATION · BEGINNER TO ADVANCED', sub: 'ONLINE · CLASSROOM · WEEKEND BATCHES' },
  { id: 'books', pos: [-2.4, DESK_Y + 2.1, -0.9], from: 0.28, to: 0.46, label: '8 PROGRAMS · IT · HEALTHCARE · ENGINEERING', sub: 'AZURE · DEVOPS · CYBER · MEDICAL CODING' },
  { id: 'laptop', pos: [0.85, DESK_Y + 1.75, -0.8], from: 0.48, to: 0.63, label: 'LIVE PROJECTS · REAL-TIME LABS', sub: 'DATA FACTORY · KUBERNETES · SOC · RCM' },
  { id: 'cert', pos: [2.85, DESK_Y + 1.9, 0.55], from: 0.66, to: 0.83, label: 'CERTIFICATION · DP-203 · CPC · SECURITY+', sub: 'PROJECT-BASED ASSESSMENTS' },
  { id: 'placed', pos: [-1.5, DESK_Y + 3.35, 1.7], from: 0.87, to: 1.01, label: 'PLACEMENT · 1200+ STUDENTS', sub: 'AVERAGE PACKAGE 6 LPA' },
];

const COURSE_SPINES = [
  ['AZURE DATA ENGINEERING', '#1e2b48', '#efe4cc'],
  ['DEVOPS MULTI-CLOUD', '#2d5560', '#eef0e6'],
  ['CYBER SECURITY', '#2a2a2e', '#ece6da'],
  ['MEDICAL BILLING', '#2e4b3c', '#efe7d2'],
  ['MEDICAL CODING', '#cdb68c', '#1e2b48'],
  ['ELECTRICAL ENGG.', '#a8762a', '#fbf3e2'],
  ['DIGITAL MARKETING', '#b8262f', '#fbefe2'],
  ['SPOKEN ENGLISH', '#6b2433', '#f2e3cf'],
];

// light oak: warm base with soft grain lines
function makeOakTexture(base = '#d8b98e', grain = 'rgba(120,80,40,', planks = 0) {
  const [c, x] = canvas(1024, 512);
  x.fillStyle = base;
  x.fillRect(0, 0, 1024, 512);
  let s = 11;
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < 140; i++) {
    const y = r() * 512;
    x.strokeStyle = `${grain}${(0.04 + r() * 0.08).toFixed(3)})`;
    x.lineWidth = 0.6 + r() * 1.8;
    x.beginPath();
    x.moveTo(0, y);
    for (let k = 0; k <= 1024; k += 48) x.lineTo(k, y + Math.sin(k / (70 + r() * 50) + i) * (1.5 + r() * 3));
    x.stroke();
  }
  if (planks) {
    for (let i = 1; i < planks; i++) {
      const y = (512 / planks) * i;
      x.fillStyle = 'rgba(70,45,20,0.28)';
      x.fillRect(0, y - 1, 1024, 2);
      const off = (i * 397) % 1024;
      x.fillRect(off, y - 512 / planks, 2, 512 / planks);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
}
const FONT = 'Archivo, "Arial Narrow", Arial, sans-serif';
const MONO = '"JetBrains Mono", Menlo, monospace';

export class StudyEngine {
  constructor(canvasEl, opts = {}) {
    this.canvas = canvasEl;
    this.mobile = !!opts.mobile;
    this.mode = opts.mode || 'build';
    this.offsetX = opts.offsetX ?? 0;
    this.tagEls = opts.tagEls || null;
    this.target = this.mode === 'showcase' ? 1 : opts.initial ?? 0;
    this.p = this.target;
    this.pointer = new THREE.Vector2();
    this.pointerS = new THREE.Vector2();
    this.anims = [];
    this.disposables = [];
    this.redraws = [];
    this.time = 0;
    this.active = true;
    this.clock = new THREE.Clock();

    this._initRenderer();
    this._initScene();
    this._buildGround();
    this._buildBlueprint();
    this._buildWall();
    this._buildDesk();
    this._buildBooks();
    this._buildLaptop();
    this._buildLamp();
    this._buildCertificate();
    this._buildCap();
    this._buildLetter();
    this._buildAtmosphere();
    this._tags = TAG_DEFS.map((t) => ({ ...t, v: new THREE.Vector3(...t.pos) }));

    // canvas textures use web fonts — redraw once they are ready
    if (document.fonts && document.fonts.ready) {
      Promise.all([
        document.fonts.load(`800 80px Archivo`),
        document.fonts.load(`600 24px "JetBrains Mono"`),
      ])
        .catch(() => {})
        .then(() => this.redraws.forEach((fn) => fn()));
    }

    this.resize();
    this._loop = this._loop.bind(this);
    this.raf = requestAnimationFrame(this._loop);
  }

  /* ----------------------------- setup ----------------------------- */

  _initRenderer() {
    const r = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.mobile ? 1.5 : 1.75));
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.0;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer = r;
  }

  _initScene() {
    const scene = new THREE.Scene();
    this.scene = scene;
    this.bgCol = new THREE.Color('#f3ebdc');
    scene.background = this.bgCol.clone();
    scene.fog = new THREE.Fog(this.bgCol.clone(), 55, 150);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    this.disposables.push(envTex, pmrem);

    this.camera = new THREE.PerspectiveCamera(34, 1, 0.8, 220);
    this.camPos = new THREE.Vector3(...CAM_KEYS[0][0]);
    this.camTarget = new THREE.Vector3(...CAM_KEYS[0][1]);
    this.camera.position.copy(this.camPos);

    this.hemi = new THREE.HemisphereLight('#fff6e6', '#bfae92', 0.62);
    scene.add(this.hemi);

    const sun = new THREE.DirectionalLight('#fff3e2', 1.6);
    sun.position.set(9, 16, 10);
    sun.castShadow = true;
    const sm = this.mobile ? 1024 : 2048;
    sun.shadow.mapSize.set(sm, sm);
    Object.assign(sun.shadow.camera, { near: 1, far: 60, left: -12, right: 12, top: 12, bottom: -12 });
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.05;
    scene.add(sun);
    scene.add(sun.target);
    this.sun = sun;

    this.lampLight = new THREE.PointLight('#ffc98a', 0, 9, 1.6);
    scene.add(this.lampLight);

    if (!this.mobile) {
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(scene, this.camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.15, 0.5, 1.25);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    }

    const woodMap = makeOakTexture();
    const floorMap = makeOakTexture('#c9a77c', 'rgba(90,60,30,', 8);
    floorMap.repeat.set(2, 2);
    this.disposables.push(floorMap);
    const plasterMap = makeNoiseTexture('#f1ece2', 0.04, 5);
    plasterMap.repeat.set(4, 3);
    this.disposables.push(woodMap, plasterMap);
    this.mat = {
      wood: new THREE.MeshStandardMaterial({ map: woodMap, roughness: 0.55, envMapIntensity: 0.6 }),
      woodDark: new THREE.MeshStandardMaterial({ map: woodMap, color: '#b08a62', roughness: 0.6 }),
      floor: new THREE.MeshStandardMaterial({ map: floorMap, roughness: 0.7, envMapIntensity: 0.5 }),
      metal: new THREE.MeshStandardMaterial({ color: '#2b2e36', roughness: 0.35, metalness: 0.7 }),
      navy: new THREE.MeshStandardMaterial({ color: NAVY, roughness: 0.55 }),
      red: new THREE.MeshStandardMaterial({ color: RED, roughness: 0.5 }),
      white: new THREE.MeshStandardMaterial({ color: '#fbfaf6', roughness: 0.6 }),
      paper: new THREE.MeshStandardMaterial({ color: '#f6f0e3', roughness: 0.9 }),
      plaster: new THREE.MeshStandardMaterial({ map: plasterMap, roughness: 0.92, envMapIntensity: 0.5 }),
      fabric: new THREE.MeshStandardMaterial({ color: '#c9b89a', roughness: 1 }),
      aluminium: new THREE.MeshStandardMaterial({ color: '#c8cbd0', roughness: 0.28, metalness: 0.85 }),
    };
  }

  _box(w, h, d, mat, { base = false, shadow = true } = {}) {
    const g = new THREE.BoxGeometry(w, h, d);
    if (base) g.translate(0, h / 2, 0);
    const m = new THREE.Mesh(g, mat);
    m.castShadow = shadow;
    m.receiveShadow = true;
    return m;
  }

  _canvasTex(w, h, draw) {
    const [c, x] = canvas(w, h);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    const paint = () => {
      draw(x, w, h);
      tex.needsUpdate = true;
    };
    paint();
    this.redraws.push(paint);
    this.disposables.push(tex);
    return tex;
  }

  /* ----------------------------- ground ---------------------------- */

  _buildGround() {
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshStandardMaterial({ color: '#efe6d6', roughness: 0.95 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.3;
    ground.receiveShadow = true;
    this.groundMat = ground.material;
    this.scene.add(ground);

    // study-room floor: warm wooden platform that slides up
    const floor = this._box(16, 0.25, 11, this.mat.floor, { base: true });
    floor.position.set(0, -0.25, -0.5);
    this.scene.add(floor);
    const rugMat = this.mat.fabric.clone();
    rugMat.polygonOffset = true;
    rugMat.polygonOffsetFactor = -2;
    rugMat.polygonOffsetUnits = -2;
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(9, 6), rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.04, 0.9);
    rug.receiveShadow = true;
    this.scene.add(rug);

    const gridU = { uColor: { value: new THREE.Color(NAVY) }, uStrength: { value: 1 }, uTime: { value: 0 } };
    const grid = new THREE.Mesh(
      new THREE.PlaneGeometry(160, 160),
      new THREE.ShaderMaterial({
        uniforms: gridU,
        transparent: true,
        depthWrite: false,
        vertexShader: /* glsl */ `
          varying vec3 vW;
          void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor; uniform float uStrength; uniform float uTime; varying vec3 vW;
          float gridLine(vec2 p, float scale, float w){ vec2 c = p / scale; vec2 g = abs(fract(c - 0.5) - 0.5) / fwidth(c); return 1.0 - min(min(g.x, g.y) / w, 1.0); }
          void main(){
            float d = length(vW.xz);
            float fade = 1.0 - smoothstep(8.0, 55.0, d);
            float minor = gridLine(vW.xz, 0.5, 1.0) * 0.14;
            float major = gridLine(vW.xz, 2.5, 1.2) * 0.42;
            float pulse = smoothstep(0.0, 1.2, 1.2 - abs(d - mod(uTime * 6.0, 60.0))) * 0.3;
            float a = (minor + major) * fade * uStrength + pulse * fade * uStrength * major * 2.0;
            gl_FragColor = vec4(uColor, clamp(a * 0.85, 0.0, 1.0));
          }`,
      })
    );
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = 0.08;
    grid.renderOrder = 1;
    this.gridU = gridU;
    this.scene.add(grid);

    this.anims.push((p) => {
      const t = easeOut(seg(p, 0.08, 0.16));
      floor.visible = t > 0.001;
      floor.scale.set(Math.max(0.001, t), 1, Math.max(0.001, t));
      const rt = easeOut(seg(p, 0.14, 0.2));
      rug.visible = rt > 0.001;
      rug.scale.set(Math.max(0.001, rt), Math.max(0.001, rt), 1);
    });
  }

  /* --------------------------- blueprint --------------------------- */

  _buildBlueprint() {
    const pts = [];
    const rect = (x0, z0, x1, z1) => pts.push(x0, 0, z0, x1, 0, z0, x1, 0, z0, x1, 0, z1, x1, 0, z1, x0, 0, z1, x0, 0, z1, x0, 0, z0);
    const line = (x0, z0, x1, z1) => pts.push(x0, 0, z0, x1, 0, z1);
    rect(-8, -6, 8, 5); // room
    rect(-DESK_W / 2, -DESK_D / 2, DESK_W / 2, DESK_D / 2); // desk
    rect(-0.9, 1.9, 0.9, 3.5); // chair
    rect(-3.3, -1.45, -0.45, -0.45); // books
    rect(-0.2, -1.1, 1.9, 0.4); // laptop
    rect(2.1, -1.4, 3.4, -0.5); // lamp
    rect(1.9, 0.1, 3.7, 1.0); // certificate
    // dimension lines
    line(-DESK_W / 2, 2.6, DESK_W / 2, 2.6);
    line(-DESK_W / 2, 2.3, -DESK_W / 2, 2.9);
    line(DESK_W / 2, 2.3, DESK_W / 2, 2.9);
    line(-5, -DESK_D / 2, -5, DESK_D / 2);
    line(-5.3, -DESK_D / 2, -4.7, -DESK_D / 2);
    line(-5.3, DESK_D / 2, -4.7, DESK_D / 2);
    // window on the back wall
    line(-6, -5.6, -1, -5.6);
    line(1, -5.6, 6, -5.6);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const mat = new THREE.LineBasicMaterial({ color: NAVY, transparent: true, opacity: 1, depthWrite: false });
    const lines = new THREE.LineSegments(g, mat);
    lines.position.y = 0.1;
    lines.renderOrder = 2;
    this.scene.add(lines);
    const total = pts.length / 3;
    this.anims.push((p) => {
      const draw = easeInOut(seg(p, -0.04, 0.09));
      g.setDrawRange(0, Math.floor((total * draw) / 2) * 2);
      mat.opacity = lerp(0.9, 0.0, seg(p, 0.14, 0.24));
      lines.visible = mat.opacity > 0.01 && draw > 0;
    });
  }

  /* ------------------------- study wall ---------------------------- */

  _buildWall() {
    const root = new THREE.Group();
    root.position.set(0, 0, -5.4);
    this.scene.add(root);
    const H = 9;
    const parts = [];
    const add = (m) => {
      root.add(m);
      parts.push(m);
      return m;
    };
    // wall with a window opening (x -4..4, y 3.6..8)
    add(this._box(16, 3.6, 0.4, this.mat.plaster, { base: true })).position.set(0, 0, 0);
    const l = add(this._box(4, H - 3.6, 0.4, this.mat.plaster, { base: true }));
    l.position.set(-6, 3.6, 0);
    const r = add(this._box(4, H - 3.6, 0.4, this.mat.plaster, { base: true }));
    r.position.set(6, 3.6, 0);
    const top = add(this._box(8, 1.0, 0.4, this.mat.plaster, { base: true }));
    top.position.set(0, 8, 0);
    // window frame + sky glass
    const skyTex = this._canvasTex(256, 256, (x, w, h) => {
      const g = x.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#9fbfe2');
      g.addColorStop(1, '#f4e9d8');
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);
    });
    this.windowMat = new THREE.MeshBasicMaterial({ map: skyTex, color: '#ffffff', fog: false });
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(8, 4.4), this.windowMat);
    glass.position.set(0, 5.8, -0.05);
    add(glass);
    [[0, 3.6, 8.2, 0.14], [0, 8.0, 8.2, 0.14]].forEach(([x, y, w, hh]) => {
      const m = add(this._box(w, hh, 0.5, this.mat.white, { base: true }));
      m.position.set(x, y - hh / 2, 0.05);
    });
    [-4, 0, 4].forEach((x) => {
      const m = add(this._box(0.14, 4.4, 0.5, this.mat.white, { base: true }));
      m.position.set(x, 3.6, 0.05);
    });
    // wall shelf with a few books and a small plant
    const shelf = add(this._box(4.2, 0.14, 0.9, this.mat.wood, { base: true }));
    shelf.position.set(-5.6, 6.0, 0.6);
    const shelfBooks = [];
    for (let i = 0; i < 7; i++) {
      const [, col] = COURSE_SPINES[i % COURSE_SPINES.length];
      const h = 0.8 + ((i * 37) % 5) * 0.08;
      const b = this._box(0.26, h, 0.65, new THREE.MeshStandardMaterial({ color: col, roughness: 0.6 }), { base: true });
      b.position.set(-7.2 + i * 0.3, 6.14, 0.6);
      if (i === 6) b.rotation.z = -0.25;
      add(b);
      shelfBooks.push(b);
    }
    const pot = add(this._box(0.5, 0.5, 0.5, this.mat.red, { base: true }));
    pot.position.set(-4.0, 6.14, 0.6);
    const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0), new THREE.MeshStandardMaterial({ color: '#4d7a33', roughness: 0.9, flatShading: true }));
    leaf.position.set(-4.0, 6.95, 0.6);
    leaf.castShadow = true;
    add(leaf);
    // pin-board with a study timetable
    const boardTex = this._canvasTex(512, 384, (x, w, h) => {
      x.fillStyle = '#c9a574';
      x.fillRect(0, 0, w, h);
      x.fillStyle = '#fbfaf6';
      x.fillRect(30, 30, 260, 180);
      x.fillRect(310, 50, 170, 130);
      x.fillRect(60, 235, 200, 120);
      x.fillStyle = NAVY;
      x.font = `700 26px ${MONO}`;
      x.fillText('WEEK 06', 50, 72);
      x.font = `500 18px ${MONO}`;
      ['MON  ADF pipeline', 'WED  Mock interview', 'FRI  DP-203 test', 'SAT  Resume review'].forEach((t, i) => x.fillText(t, 50, 110 + i * 26));
      x.fillStyle = RED;
      x.font = `800 30px ${FONT}`;
      x.fillText('GOAL:', 330, 100);
      x.fillStyle = NAVY;
      x.font = `700 24px ${FONT}`;
      x.fillText('GET PLACED', 330, 140);
      x.fillStyle = RED;
      [[160, 34], [395, 54], [160, 240]].forEach(([px, py]) => {
        x.beginPath();
        x.arc(px, py, 9, 0, Math.PI * 2);
        x.fill();
      });
    });
    const board = add(this._box(3.4, 2.5, 0.08, [this.mat.woodDark, this.mat.woodDark, this.mat.woodDark, this.mat.woodDark, new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.9 }), this.mat.woodDark], { base: true }));
    board.position.set(5.6, 5.2, 0.25);

    parts.forEach((m) => (m.visible = false));
    this.anims.push((p) => {
      const t = easeOut(seg(p, T.wall[0], T.wall[1]));
      root.visible = t > 0.001;
      root.scale.set(1, Math.max(0.001, t), 1);
      parts.forEach((m) => (m.visible = t > 0.001));
      const st = backOut(seg(p, T.wall[1] - 0.02, T.wall[1] + 0.05));
      shelfBooks.forEach((b) => b.scale.set(1, Math.max(0.001, st), 1));
      leaf.scale.setScalar(Math.max(0.001, st));
    });
  }

  /* ----------------------------- desk ------------------------------ */

  _buildDesk() {
    const root = new THREE.Group();
    this.scene.add(root);
    const top = this._box(DESK_W, 0.18, DESK_D, this.mat.wood, { base: true });
    top.position.y = DESK_Y - 0.18;
    root.add(top);
    const legs = [];
    [[-DESK_W / 2 + 0.25, -DESK_D / 2 + 0.25], [DESK_W / 2 - 0.25, -DESK_D / 2 + 0.25], [-DESK_W / 2 + 0.25, DESK_D / 2 - 0.25], [DESK_W / 2 - 0.25, DESK_D / 2 - 0.25]].forEach(([x, z]) => {
      const m = this._box(0.16, DESK_Y - 0.18, 0.16, this.mat.metal, { base: true });
      m.position.set(x, 0, z);
      root.add(m);
      legs.push(m);
    });
    const drawer = this._box(1.6, 1.9, DESK_D - 0.4, this.mat.woodDark, { base: true });
    drawer.position.set(DESK_W / 2 - 1.1, DESK_Y - 0.18 - 1.9, 0);
    root.add(drawer);
    const handles = [0.45, 1.3].map((y) => {
      const h = this._box(0.6, 0.06, 0.06, this.mat.aluminium, { shadow: false });
      h.position.set(DESK_W / 2 - 1.1, DESK_Y - 0.18 - y, DESK_D / 2 - 0.17);
      root.add(h);
      return h;
    });

    // chair
    const chair = new THREE.Group();
    chair.position.set(0, 0, 2.7);
    const seat = this._box(1.6, 0.16, 1.5, this.mat.navy, { base: true });
    seat.position.y = 1.75;
    chair.add(seat);
    const back = this._box(1.6, 1.8, 0.16, this.mat.navy, { base: true });
    back.position.set(0, 1.9, 0.68);
    back.rotation.x = 0.08;
    chair.add(back);
    const post = this._box(0.14, 1.6, 0.14, this.mat.metal, { base: true });
    post.position.y = 0.18;
    chair.add(post);
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2;
      const arm = this._box(0.9, 0.08, 0.1, this.mat.metal, { base: true });
      arm.position.set(Math.cos(a) * 0.42, 0.12, Math.sin(a) * 0.42);
      arm.rotation.y = -a;
      chair.add(arm);
    }
    root.add(chair);

    // notebook, pen and mug on the desk
    const nbTex = this._canvasTex(256, 192, (x, w, h) => {
      x.fillStyle = '#fbfaf6';
      x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(30,43,72,.25)';
      for (let y = 26; y < h; y += 18) {
        x.beginPath();
        x.moveTo(14, y);
        x.lineTo(w - 14, y);
        x.stroke();
      }
      x.fillStyle = NAVY;
      x.font = `600 16px ${MONO}`;
      x.fillText('SELECT * FROM jobs', 20, 42);
      x.fillText('WHERE skill = "you"', 20, 60);
      x.fillStyle = RED;
      x.fillText('✓ placed', 20, 96);
    });
    const notebook = this._box(1.3, 0.06, 0.95, [this.mat.red, this.mat.red, new THREE.MeshStandardMaterial({ map: nbTex, roughness: 0.9 }), this.mat.red, this.mat.red, this.mat.red], { base: true });
    notebook.position.set(-1.3, DESK_Y, 0.95);
    notebook.rotation.y = 0.18;
    root.add(notebook);
    const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.9, 10), this.mat.navy);
    pen.rotation.z = Math.PI / 2;
    pen.rotation.y = 0.6;
    pen.position.set(-0.35, DESK_Y + 0.04, 0.95);
    pen.castShadow = true;
    root.add(pen);
    const mug = new THREE.Group();
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.23, 0.55, 20), this.mat.white);
    cup.position.y = 0.275;
    cup.castShadow = true;
    mug.add(cup);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.04, 8, 16), this.mat.white);
    handle.position.set(0.28, 0.3, 0);
    mug.add(handle);
    const logoBand = new THREE.Mesh(new THREE.CylinderGeometry(0.262, 0.245, 0.12, 20), this.mat.red);
    logoBand.position.y = 0.32;
    mug.add(logoBand);
    mug.position.set(-2.7, DESK_Y, 0.95);
    root.add(mug);

    const small = [notebook, pen, mug];
    this.anims.push((p) => {
      const lt = easeOut(seg(p, T.desk[0], T.desk[0] + 0.06));
      legs.forEach((m) => {
        m.scale.y = Math.max(0.001, lt);
        m.visible = lt > 0;
      });
      const tt = easeOut(seg(p, T.desk[0] + 0.04, T.desk[1]));
      top.visible = tt > 0;
      top.position.y = lerp(DESK_Y + 3.5, DESK_Y - 0.18, tt);
      const dt = easeOut(seg(p, T.desk[0] + 0.06, T.desk[1]));
      drawer.visible = dt > 0;
      drawer.scale.y = Math.max(0.001, dt);
      handles.forEach((h) => (h.visible = dt > 0.9));
      const ct = easeOut(seg(p, T.chair[0], T.chair[1]));
      chair.visible = ct > 0;
      chair.position.z = lerp(6.5, 2.7, ct);
      chair.rotation.y = lerp(-1.2, 0, ct);
      small.forEach((m, i) => {
        const s = backOut(seg(p, T.books[0] - 0.02 + i * 0.01, T.books[0] + 0.03 + i * 0.01));
        m.visible = s > 0.001;
        m.scale.setScalar(Math.max(0.001, s));
      });
    });
  }

  /* ----------------------------- books ----------------------------- */

  _buildBooks() {
    const pageMat = new THREE.MeshStandardMaterial({ color: '#f3ead6', roughness: 0.95 });
    const bookends = [];
    const be = (x) => {
      const g = new THREE.Group();
      const a = this._box(0.08, 1.4, 0.9, this.mat.metal, { base: true });
      const b = this._box(0.6, 0.05, 0.9, this.mat.metal, { base: true });
      b.position.x = x < 0 ? 0.3 : -0.3;
      g.add(a, b);
      g.position.set(x, DESK_Y, -0.95);
      this.scene.add(g);
      bookends.push(g);
    };
    be(-3.3);
    be(-0.42);

    this.books = [];
    let x0 = -3.18;
    COURSE_SPINES.forEach(([title, bg, ink], i) => {
      const t = 0.26 + ((i * 53) % 7) * 0.02;
      const h = 1.55 + ((i * 31) % 5) * 0.09;
      const d = 1.05;
      const spine = this._canvasTex(96, 512, (x, w, hh) => {
        x.fillStyle = bg;
        x.fillRect(0, 0, w, hh);
        const g = x.createLinearGradient(0, 0, w, 0);
        g.addColorStop(0, 'rgba(0,0,0,.28)');
        g.addColorStop(0.5, 'rgba(255,255,255,.1)');
        g.addColorStop(1, 'rgba(0,0,0,.3)');
        x.fillStyle = g;
        x.fillRect(0, 0, w, hh);
        x.fillStyle = ink;
        x.fillRect(10, 34, w - 20, 3);
        x.fillRect(10, hh - 40, w - 20, 3);
        x.font = `600 16px ${MONO}`;
        x.textAlign = 'center';
        x.fillText(String(i + 1).padStart(2, '0'), w / 2, 64);
        x.save();
        x.translate(w / 2, hh / 2 + 10);
        x.rotate(Math.PI / 2);
        let fs = 40;
        x.font = `800 ${fs}px ${FONT}`;
        while (x.measureText(title).width > hh - 150 && fs > 18) {
          fs -= 2;
          x.font = `800 ${fs}px ${FONT}`;
        }
        x.textBaseline = 'middle';
        x.fillText(title, 0, 0);
        x.restore();
      });
      const cover = new THREE.MeshStandardMaterial({ color: bg, roughness: 0.65 });
      const spineMat = new THREE.MeshStandardMaterial({ map: spine, roughness: 0.6 });
      // faces: +x, -x, +y(top pages), -y, +z (spine, faces camera), -z (fore-edge)
      const m = new THREE.Mesh(new THREE.BoxGeometry(t, h, d), [cover, cover, pageMat, pageMat, spineMat, pageMat]);
      m.castShadow = true;
      m.receiveShadow = true;
      const rest = new THREE.Vector3(x0 + t / 2, DESK_Y + h / 2, -0.95);
      x0 += t + 0.02;
      m.position.copy(rest);
      m.visible = false;
      this.scene.add(m);
      this.books.push({ m, rest, i });
    });
    this.lastBookX = x0;

    // a lying stack under the lamp
    const stack = [];
    [['#1e2b48', 0.22], ['#cdb68c', 0.18], ['#d62a33', 0.2]].forEach(([c, hh], k) => {
      const b = this._box(1.3 - k * 0.08, hh, 0.95 - k * 0.05, [new THREE.MeshStandardMaterial({ color: c, roughness: 0.6 }), pageMat, new THREE.MeshStandardMaterial({ color: c, roughness: 0.6 }), pageMat, pageMat, pageMat], { base: true });
      b.position.set(2.75, DESK_Y + stack.reduce((s, o) => s + o.h, 0), -0.95);
      b.rotation.y = (k - 1) * 0.12;
      b.visible = false;
      this.scene.add(b);
      stack.push({ b, h: hh });
    });

    const n = this.books.length;
    this.anims.push((p) => {
      const bt = backOut(seg(p, T.books[0] - 0.01, T.books[0] + 0.03));
      bookends.forEach((g) => {
        g.visible = bt > 0.001;
        g.scale.set(1, Math.max(0.001, bt), 1);
      });
      this.books.forEach(({ m, rest, i }) => {
        const s = T.books[0] + (i / n) * (T.books[1] - T.books[0]) * 0.8;
        const u = easeInOut(seg(p, s, s + 0.05));
        m.visible = u > 0;
        // arc in from above-front
        m.position.set(rest.x + (1 - u) * 1.5, rest.y + Math.sin(u * Math.PI) * 1.2 + (1 - u) * 4, rest.z + (1 - u) * 3);
        m.rotation.set((1 - u) * -1.2, (1 - u) * 0.8, (1 - u) * 0.5);
      });
      stack.forEach(({ b }, k) => {
        const t = easeOut(seg(p, T.books[1] - 0.04 + k * 0.012, T.books[1] + k * 0.012));
        b.visible = t > 0;
        b.position.y = DESK_Y + stack.slice(0, k).reduce((s, o) => s + o.h, 0) + (1 - t) * 2.5;
      });
    });
    this.lampBaseY = DESK_Y + 0.6;
  }

  /* ----------------------------- laptop ---------------------------- */

  _buildLaptop() {
    const root = new THREE.Group();
    root.position.set(0.85, DESK_Y, -0.35);
    this.scene.add(root);
    const W = 2.1;
    const D = 1.55;
    const base = this._box(W, 0.08, D, this.mat.aluminium, { base: true });
    root.add(base);
    const keys = this._box(W - 0.3, 0.012, D * 0.45, this.mat.metal, { base: true, shadow: false });
    keys.position.set(0, 0.08, -0.1);
    root.add(keys);
    const pad = this._box(0.7, 0.012, 0.42, new THREE.MeshStandardMaterial({ color: '#b4b8be', roughness: 0.4, metalness: 0.6 }), { base: true, shadow: false });
    pad.position.set(0, 0.08, 0.48);
    root.add(pad);

    const screenTex = this._canvasTex(768, 480, (x, w, h) => {
      x.fillStyle = '#0f1424';
      x.fillRect(0, 0, w, h);
      x.fillStyle = '#1b2238';
      x.fillRect(0, 0, w, 40);
      ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
        x.fillStyle = c;
        x.beginPath();
        x.arc(24 + i * 22, 20, 7, 0, Math.PI * 2);
        x.fill();
      });
      x.fillStyle = '#9aa6c8';
      x.font = `500 18px ${MONO}`;
      x.fillText('skill-revolution / live-project / adf_pipeline.py', 110, 26);
      const lines = [
        ['#7aa2ff', 'from azure.datafactory import Pipeline'],
        ['#9aa6c8', ''],
        ['#e8565d', 'pipeline = Pipeline("sales_etl")'],
        ['#cfd6ea', 'pipeline.copy(src="blob://raw", dst="lake://curated")'],
        ['#cfd6ea', 'pipeline.transform(databricks="clean_orders")'],
        ['#cfd6ea', 'pipeline.load(synapse="analytics.orders")'],
        ['#9aa6c8', ''],
        ['#28c840', '✓ run succeeded · 1.2M rows · 38s'],
      ];
      x.font = `500 21px ${MONO}`;
      lines.forEach(([c, t], i) => {
        x.fillStyle = '#4d5675';
        x.fillText(String(i + 1).padStart(2, ' '), 20, 88 + i * 34);
        x.fillStyle = c;
        x.fillText(t, 64, 88 + i * 34);
      });
      x.fillStyle = '#d62a33';
      x.fillRect(0, h - 44, w, 44);
      x.fillStyle = '#ffffff';
      x.font = `800 22px ${FONT}`;
      x.fillText('SKILL REVOLUTION · LIVE INDUSTRY PROJECT', 20, h - 15);
    });
    this.screenMat = new THREE.MeshStandardMaterial({ map: screenTex, emissive: '#ffffff', emissiveMap: screenTex, emissiveIntensity: 0, roughness: 0.3 });
    const lid = new THREE.Group();
    lid.position.set(0, 0.08, -D / 2);
    root.add(lid);
    const shell = this._box(W, D * 0.95, 0.06, this.mat.aluminium, { base: true });
    shell.position.z = -0.03;
    lid.add(shell);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.16, D * 0.95 - 0.16), this.screenMat);
    screen.position.set(0, (D * 0.95) / 2, 0.002);
    lid.add(screen);
    // the lid is modelled standing up; closed = rotated flat onto the base
    root.visible = false;
    this.laptop = { root, lid };
    this.anims.push((p) => {
      const t = easeOut(seg(p, T.laptop[0], T.laptop[0] + 0.04));
      root.visible = t > 0.001;
      root.position.y = DESK_Y + (1 - t) * 2.5;
      root.rotation.y = (1 - t) * 0.9;
      const o = easeInOut(seg(p, T.laptop[0] + 0.03, T.laptop[1]));
      lid.rotation.x = lerp(Math.PI / 2, -0.22, o);
      const glow = seg(p, T.screen[0], T.screen[0] + 0.04);
      this.screenMat.emissiveIntensity = glow * 0.9;
      this.screenMat.color.setScalar(lerp(0.25, 1, glow));
    });
  }

  /* ------------------------------ lamp ----------------------------- */

  _buildLamp() {
    const root = new THREE.Group();
    root.position.set(2.75, DESK_Y + 0.6, -1.0);
    this.scene.add(root);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.45, 0.12, 24), this.mat.navy);
    base.position.y = 0.06;
    base.castShadow = true;
    root.add(base);
    const arm1 = new THREE.Group();
    arm1.position.y = 0.12;
    root.add(arm1);
    const a1 = this._box(0.08, 1.7, 0.08, this.mat.navy, { base: true });
    arm1.add(a1);
    const arm2 = new THREE.Group();
    arm2.position.y = 1.7;
    arm1.add(arm2);
    const a2 = this._box(0.08, 1.4, 0.08, this.mat.navy, { base: true });
    arm2.add(a2);
    const head = new THREE.Group();
    head.position.y = 1.4;
    arm2.add(head);
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.6, 24, 1, true), new THREE.MeshStandardMaterial({ color: RED, roughness: 0.5, side: THREE.DoubleSide }));
    shade.rotation.x = Math.PI;
    shade.position.y = -0.1;
    shade.castShadow = true;
    head.add(shade);
    this.bulbMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#fff1d6') });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 8), this.bulbMat);
    bulb.position.y = -0.3;
    head.add(bulb);
    root.visible = false;
    this.lamp = { root, arm1, arm2, head, bulb };
    const tmp = new THREE.Vector3();
    this.anims.push((p) => {
      const t = easeOut(seg(p, T.lamp[0], T.lamp[1]));
      root.visible = t > 0.001;
      root.scale.setScalar(Math.max(0.001, backOut(seg(p, T.lamp[0], T.lamp[0] + 0.03))));
      arm1.rotation.z = lerp(1.35, 0.35, t);
      arm2.rotation.z = lerp(-2.6, -1.35, t);
      head.rotation.z = lerp(1.2, 0.5, t);
      const on = seg(p, T.lights[0] + 0.02, T.lights[1]);
      this.bulbMat.color.setRGB(1, 0.94, 0.84).multiplyScalar(0.6 + on * 3.2);
      bulb.getWorldPosition(tmp);
      this.lampLight.position.copy(tmp);
      this.lampLight.intensity = on * 9;
    });
  }

  /* -------------------------- certificate -------------------------- */

  _buildCertificate() {
    const W = 2.1;
    const H = W * 0.71;
    const tex = this._canvasTex(1024, 727, (x, w, h) => {
      const g = x.createRadialGradient(w / 2, h / 2, 60, w / 2, h / 2, w * 0.7);
      g.addColorStop(0, '#fffaf0');
      g.addColorStop(1, '#f2e8d4');
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);
      x.strokeStyle = NAVY;
      x.lineWidth = 8;
      x.strokeRect(30, 30, w - 60, h - 60);
      x.lineWidth = 2;
      x.strokeStyle = '#b79a5e';
      x.strokeRect(52, 52, w - 104, h - 104);
      x.textAlign = 'center';
      x.fillStyle = RED;
      [[0, 16], [18, 26], [36, 36]].forEach(([dx, hh]) => x.fillRect(w / 2 - 26 + dx, 140 - hh, 14, hh));
      x.fillStyle = NAVY;
      x.font = `700 20px ${MONO}`;
      x.fillText('S K I L L   R E V O L U T I O N', w / 2, 176);
      x.font = `800 96px ${FONT}`;
      x.fillText('CERTIFICATE', w / 2, 284);
      x.fillStyle = RED;
      x.font = `700 24px ${MONO}`;
      x.fillText('O F   C O M P L E T I O N', w / 2, 326);
      x.fillStyle = '#5b5446';
      x.font = `500 24px ${FONT}`;
      x.fillText('awarded after training, projects & assessments', w / 2, 400);
      x.fillStyle = NAVY;
      x.font = `800 46px ${FONT}`;
      x.fillText('Job-Ready Professional', w / 2, 466);
      x.fillStyle = '#b79a5e';
      x.fillRect(w / 2 - 230, 488, 460, 2);
      const sx = w / 2;
      const sy = 600;
      x.fillStyle = '#b8262f';
      x.beginPath();
      for (let k = 0; k < 40; k++) {
        const a = (k / 40) * Math.PI * 2;
        const rr = k % 2 ? 58 : 64;
        x.lineTo(sx + Math.cos(a) * rr, sy + Math.sin(a) * rr);
      }
      x.closePath();
      x.fill();
      x.fillStyle = '#fbefe2';
      x.font = `800 38px ${FONT}`;
      x.textBaseline = 'middle';
      x.fillText('SR', sx, sy);
      x.textBaseline = 'alphabetic';
    });
    const frame = new THREE.MeshStandardMaterial({ color: '#1d1f26', roughness: 0.45, metalness: 0.3 });
    const g = new THREE.Group();
    const back = this._box(W + 0.16, H + 0.16, 0.06, frame, { base: true });
    g.add(back);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85 }));
    face.position.set(0, (H + 0.16) / 2, 0.035);
    g.add(face);
    const stand = this._box(0.08, 0.9, 0.5, frame, { base: true });
    stand.position.set(0, 0, -0.25);
    stand.rotation.x = 0.35;
    g.add(stand);
    const pivot = new THREE.Group();
    pivot.position.set(2.85, DESK_Y, 0.55);
    pivot.add(g);
    pivot.visible = false;
    this.scene.add(pivot);
    this.anims.push((p) => {
      const t = easeOut(seg(p, T.cert[0], T.cert[1]));
      pivot.visible = t > 0.001;
      g.position.y = (1 - t) * 3.2;
      pivot.rotation.set(lerp(-1.2, -0.12, t), lerp(0.9, -0.5, t), 0);
    });
  }

  /* ------------------------ graduation cap ------------------------- */

  _buildCap() {
    const g = new THREE.Group();
    const board = this._box(1.25, 0.06, 1.25, this.mat.navy, { base: true });
    board.position.y = 0.42;
    board.rotation.y = Math.PI / 4;
    g.add(board);
    const skull = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.42, 24), this.mat.navy);
    skull.position.y = 0.21;
    skull.castShadow = true;
    g.add(skull);
    const button = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 12), this.mat.red);
    button.position.y = 0.5;
    g.add(button);
    const cord = this._box(0.03, 0.03, 0.62, this.mat.red, { shadow: false });
    cord.position.set(0, 0.49, 0.31);
    g.add(cord);
    const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.09, 0.42, 10), this.mat.red);
    tassel.position.set(0, 0.28, 0.62);
    g.add(tassel);
    const pivot = new THREE.Group();
    pivot.add(g);
    pivot.visible = false;
    this.scene.add(pivot);
    this.anims.push((p, time) => {
      const t = seg(p, T.cap[0], T.cap[1]);
      const e = easeOut(t);
      pivot.visible = t > 0.001;
      pivot.position.set(lerp(0.2, 0.85, e), lerp(DESK_Y + 5, DESK_Y, e) + Math.sin(t * Math.PI) * 0.7, lerp(2.4, 1.0, e));
      pivot.rotation.set(lerp(0.9, 0, e), lerp(-2.5, 0.35, e), lerp(0.6, 0, e));
      tassel.rotation.x = Math.sin(time * 2.2) * 0.08;
    });
  }

  /* -------------------------- offer letter ------------------------- */

  _buildLetter() {
    const tex = this._canvasTex(600, 800, (x, w, h) => {
      x.fillStyle = '#ffffff';
      x.fillRect(0, 0, w, h);
      x.fillStyle = RED;
      x.fillRect(0, 0, w, 14);
      x.fillStyle = NAVY;
      x.font = `800 46px ${FONT}`;
      x.fillText('OFFER OF', 50, 120);
      x.fillText('EMPLOYMENT', 50, 172);
      x.fillStyle = RED;
      x.font = `700 20px ${MONO}`;
      x.fillText('CONGRATULATIONS!', 50, 222);
      x.fillStyle = 'rgba(30,43,72,.22)';
      for (let i = 0; i < 9; i++) x.fillRect(50, 270 + i * 34, i % 3 === 2 ? 320 : 500, 12);
      x.fillStyle = NAVY;
      x.font = `700 26px ${FONT}`;
      x.fillText('Position: Data Engineer', 50, 620);
      x.fillStyle = '#5b5446';
      x.font = `500 20px ${MONO}`;
      x.fillText('Trained & placed by', 50, 690);
      x.fillStyle = RED;
      x.font = `800 26px ${FONT}`;
      x.fillText('SKILL REVOLUTION', 50, 728);
    });
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 1.8), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, side: THREE.DoubleSide }));
    paper.castShadow = true;
    const pivot = new THREE.Group();
    pivot.add(paper);
    pivot.visible = false;
    this.scene.add(pivot);
    this.anims.push((p, time) => {
      const t = easeInOut(seg(p, T.letter[0], T.letter[1]));
      pivot.visible = t > 0.001;
      pivot.position.set(lerp(-1.3, -1.5, t), DESK_Y + lerp(0.05, 2.3, t) + Math.sin(time * 1.4) * 0.06 * t, lerp(0.95, 1.7, t));
      pivot.rotation.set(lerp(-Math.PI / 2, -0.12, t), lerp(0.18, 0.55, t), lerp(0.1, -0.04, t) + Math.sin(time * 0.9) * 0.02 * t);
    });
  }

  /* --------------------------- atmosphere -------------------------- */

  _buildAtmosphere() {
    const n = this.mobile ? 120 : 260;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.dust = new THREE.Points(g, new THREE.PointsMaterial({ color: '#c9a574', size: 0.04, transparent: true, opacity: 0.4, depthWrite: false }));
    this.scene.add(this.dust);

    const paper = new THREE.Color('#f3ebdc');
    const day = new THREE.Color('#ece7de');
    const dusk = new THREE.Color('#efd9c2');
    const sunDay = new THREE.Color('#fff3e2');
    const sunDusk = new THREE.Color('#ffb877');
    const winDay = new THREE.Color('#ffffff');
    const winDusk = new THREE.Color('#ffc796');
    const c = new THREE.Color();
    this.anims.push((p, time) => {
      const t1 = easeInOut(seg(p, 0.12, 0.35));
      const t2 = easeInOut(seg(p, 0.7, 0.96));
      c.copy(paper).lerp(day, t1).lerp(dusk, t2);
      this.scene.background.copy(c);
      this.scene.fog.color.copy(c);
      this.groundMat.color.copy(c).multiplyScalar(0.97);
      this.sun.color.copy(sunDay).lerp(sunDusk, t2);
      this.sun.intensity = lerp(1.5, 1.9, t1) - t2 * 0.3;
      const elev = lerp(1.0, 0.45, t2);
      const az = lerp(0.7, -0.4, t2);
      this.sun.position.set(Math.sin(az) * 22 * Math.cos(elev), Math.sin(elev) * 22, Math.cos(az) * 22 * Math.cos(elev));
      this.hemi.intensity = lerp(0.62, 0.55, t2);
      this.windowMat.color.copy(winDay).lerp(winDusk, t2);
      this.gridU.uStrength.value = lerp(1, 0.0, seg(p, 0.1, 0.3));
      this.gridU.uTime.value = time;
      this.dust.rotation.y = time * 0.015;
      this.dust.material.opacity = 0.25 + t2 * 0.25;
      this.renderer.toneMappingExposure = 1.0 + t2 * 0.04;
      if (this.bloom) this.bloom.strength = 0.12 + seg(p, T.lights[0], T.lights[1]) * 0.18;
    });
  }

  /* --------------------------- runtime ----------------------------- */

  setProgress(p) {
    this.target = clamp01(p);
  }

  setPointer(x, y) {
    this.pointer.set(x, y);
  }

  setActive(v) {
    if (v === this.active) return;
    this.active = v;
    if (v) {
      this.clock.getDelta();
      this.raf = requestAnimationFrame(this._loop);
    }
  }

  resize() {
    const w = this.canvas.clientWidth || this.canvas.parentElement?.clientWidth || 1;
    const h = this.canvas.clientHeight || this.canvas.parentElement?.clientHeight || 1;
    this.width = w;
    this.height = h;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w / h < 1 ? 48 : 34;
    this.camera.updateProjectionMatrix();
    if (this.composer) {
      this.composer.setPixelRatio(this.renderer.getPixelRatio());
      this.composer.setSize(w, h);
    }
  }

  _updateCamera(dt) {
    const p = this.p;
    const desiredPos = new THREE.Vector3();
    const desiredTarget = new THREE.Vector3();
    if (this.mode === 'showcase') {
      const a = this.time * 0.12 + 0.4;
      desiredPos.set(Math.sin(a) * 15, 8 + Math.sin(this.time * 0.2) * 0.8, Math.cos(a) * 15);
      desiredTarget.set(0, 3.6, -0.5);
    } else {
      const n = CAM_KEYS.length - 1;
      const f = p * n;
      const i = Math.min(n - 1, Math.floor(f));
      const t = easeInOut(f - i);
      desiredPos.fromArray(CAM_KEYS[i][0]).lerp(new THREE.Vector3().fromArray(CAM_KEYS[i + 1][0]), t);
      desiredTarget.fromArray(CAM_KEYS[i][1]).lerp(new THREE.Vector3().fromArray(CAM_KEYS[i + 1][1]), t);
      desiredPos.sub(desiredTarget).multiplyScalar(1.08).add(desiredTarget);
    }
    if (this.camera.aspect < 1) {
      desiredPos.sub(desiredTarget).multiplyScalar(1.45).add(desiredTarget);
      if (this.mode !== 'showcase') desiredTarget.y -= 1.6;
    }
    if (this.offsetX && this.camera.aspect > 1.1) {
      const fwd = desiredTarget.clone().sub(desiredPos);
      const dist = fwd.length();
      fwd.normalize();
      const right = new THREE.Vector3(-fwd.z, 0, fwd.x).normalize();
      desiredTarget.addScaledVector(right, -dist * this.offsetX);
    }
    this.pointerS.lerp(this.pointer, Math.min(1, dt * 3));
    desiredPos.x += this.pointerS.x * 0.9;
    desiredPos.y += this.pointerS.y * 0.5;
    const k = Math.min(1, dt * 4);
    this.camPos.lerp(desiredPos, k);
    this.camTarget.lerp(desiredTarget, k);
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camTarget);
  }

  _updateTags() {
    if (!this.tagEls) return;
    const v = new THREE.Vector3();
    const p = this.p;
    this._tags.forEach((t) => {
      const el = this.tagEls[t.id];
      if (!el) return;
      const fade = Math.min(seg(p, t.from, t.from + 0.03), 1 - seg(p, t.to - 0.03, t.to));
      v.copy(t.v).project(this.camera);
      if (fade <= 0.001 || v.z > 1) {
        el.style.opacity = '0';
        return;
      }
      const x = (v.x * 0.5 + 0.5) * this.width;
      const y = (-v.y * 0.5 + 0.5) * this.height;
      el.style.opacity = String(fade);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    });
  }

  renderOnce() {
    this.anims.forEach((fn) => fn(this.p, this.time));
    this._updateCamera(1);
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }

  _loop() {
    if (!this.active || this.disposed) return;
    this.raf = requestAnimationFrame(this._loop);
    const dt = Math.min(0.05, this.clock.getDelta());
    this.time += dt;
    this.p += (this.target - this.p) * Math.min(1, dt * 5);
    if (Math.abs(this.target - this.p) < 0.0002) this.p = this.target;
    this.anims.forEach((fn) => fn(this.p, this.time));
    this._updateCamera(dt);
    this._updateTags();
    if (this.composer) this.composer.render(dt);
    else this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    });
    this.disposables.forEach((d) => d.dispose && d.dispose());
    if (this.composer) this.composer.dispose?.();
    this.renderer.dispose();
  }
}
