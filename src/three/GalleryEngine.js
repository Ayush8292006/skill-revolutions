import * as THREE from 'three';

/* Curved 3D project gallery: real project renders mapped onto cylinder
   panels that surround the camera. Scroll rotates the ring, the panel in
   front pops into full colour while the others stay muted and bend with
   scroll velocity. */

const VERT = /* glsl */ `
  uniform float uBend;
  varying vec2 vUv;
  void main(){
    vUv = uv;
    vec3 p = position;
    p.y += sin(uv.x * 3.14159) * uBend;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }`;

const FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uActive;
  uniform float uHover;
  uniform float uAspect;
  uniform float uImgAspect;
  varying vec2 vUv;
  void main(){
    // cover-fit + mirror (we look at the inside of the cylinder)
    vec2 uv = vec2(1.0 - vUv.x, vUv.y);
    float r = uAspect / uImgAspect;
    if (r > 1.0) { uv.y = (uv.y - 0.5) / r + 0.5; } else { uv.x = (uv.x - 0.5) * r + 0.5; }
    float z = 1.0 - 0.06 * uActive - 0.04 * uHover;
    uv = (uv - 0.5) * z + 0.5;
    vec3 c = texture2D(uMap, uv).rgb;
    float g = dot(c, vec3(0.299, 0.587, 0.114));
    vec3 muted = mix(vec3(g), c, 0.3) * 0.72 + vec3(0.2, 0.18, 0.15);
    vec3 col = mix(muted, c, uActive);
    // edge vignette
    vec2 e = smoothstep(0.0, 0.08, vUv) * smoothstep(0.0, 0.08, 1.0 - vUv);
    col *= mix(0.6, 1.0, e.x * e.y);
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }`;

export class GalleryEngine {
  constructor(canvas, items, { onActive, onClick } = {}) {
    this.canvas = canvas;
    this.items = items;
    this.onActive = onActive;
    this.onClick = onClick;
    this.progress = 0;
    this.current = 0;
    this.velocity = 0;
    this.activeIndex = -1;
    this.hover = -1;
    this.pointer = new THREE.Vector2(9, 9);
    this.pointerS = new THREE.Vector2();
    this.active = true;

    const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.setClearColor(0x000000, 0);
    this.renderer = r;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    this.camera.position.set(0, 0, 0);

    this.R = 10;
    this.thetaLen = 0.4;
    this.step = 0.52;
    this.ring = new THREE.Group();
    this.scene.add(this.ring);

    const loader = new THREE.TextureLoader();
    const panelH = 3.0;
    this.panels = items.map((it, i) => {
      const geo = new THREE.CylinderGeometry(this.R, this.R, panelH, 48, 12, true, Math.PI - this.thetaLen / 2, this.thetaLen);
      const uniforms = {
        uMap: { value: null },
        uActive: { value: 0 },
        uHover: { value: 0 },
        uBend: { value: 0 },
        uAspect: { value: (this.R * this.thetaLen) / panelH },
        uImgAspect: { value: 1 },
      };
      const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, side: THREE.BackSide });
      loader.load(it.image, (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        uniforms.uMap.value = t;
        uniforms.uImgAspect.value = t.image.width / t.image.height;
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.y = -i * this.step;
      mesh.userData.index = i;
      this.ring.add(mesh);

      // thin frame line under each panel
      const lineGeo = new THREE.CylinderGeometry(this.R - 0.02, this.R - 0.02, 0.025, 48, 1, true, Math.PI - this.thetaLen / 2, this.thetaLen);
      const line = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: '#d62a33', side: THREE.BackSide, transparent: true, opacity: 0 }));
      line.position.y = -panelH / 2 - 0.25;
      line.rotation.y = mesh.rotation.y;
      this.ring.add(line);
      return { mesh, uniforms, line };
    });

    this.raycaster = new THREE.Raycaster();
    this._onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      this.pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    };
    this._onLeave = () => this.pointer.set(9, 9);
    this._onClickH = () => {
      if (this.hover >= 0 && this.onClick) this.onClick(this.hover);
    };
    canvas.addEventListener('pointermove', this._onMove);
    canvas.addEventListener('pointerleave', this._onLeave);
    canvas.addEventListener('click', this._onClickH);

    this.clock = new THREE.Clock();
    this.resize();
    this._loop = this._loop.bind(this);
    this.raf = requestAnimationFrame(this._loop);
  }

  setProgress(p) {
    this.progress = p;
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
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w / h < 1 ? 64 : 40;
    this.camera.updateProjectionMatrix();
  }

  _loop() {
    if (!this.active || this.disposed) return;
    this.raf = requestAnimationFrame(this._loop);
    const dt = Math.min(0.05, this.clock.getDelta());
    const target = this.progress * (this.items.length - 1);
    const prev = this.current;
    this.current += (target - this.current) * Math.min(1, dt * 6);
    this.velocity += ((this.current - prev) / Math.max(dt, 0.001) - this.velocity) * Math.min(1, dt * 8);

    this.ring.rotation.y = this.current * this.step;
    this.pointerS.lerp(this.pointer.x > 5 ? new THREE.Vector2() : this.pointer, Math.min(1, dt * 3));
    this.camera.rotation.set(this.pointerS.y * 0.04, -this.pointerS.x * 0.06, 0);

    // hover detection
    this.hover = -1;
    if (this.pointer.x < 5) {
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const hit = this.raycaster.intersectObjects(this.panels.map((p) => p.mesh))[0];
      if (hit) this.hover = hit.object.userData.index;
    }
    this.canvas.style.cursor = this.hover >= 0 ? 'pointer' : '';

    const idx = Math.round(this.current);
    if (idx !== this.activeIndex) {
      this.activeIndex = idx;
      this.onActive && this.onActive(idx);
    }
    const bend = THREE.MathUtils.clamp(this.velocity * 0.18, -0.45, 0.45);
    this.panels.forEach((p, i) => {
      const d = Math.abs(i - this.current);
      const a = THREE.MathUtils.clamp(1 - d * 1.4, 0, 1);
      p.uniforms.uActive.value += (a - p.uniforms.uActive.value) * Math.min(1, dt * 8);
      p.uniforms.uHover.value += ((this.hover === i ? 1 : 0) - p.uniforms.uHover.value) * Math.min(1, dt * 8);
      p.uniforms.uBend.value = bend;
      p.line.material.opacity = p.uniforms.uActive.value;
    });
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener('pointermove', this._onMove);
    this.canvas.removeEventListener('pointerleave', this._onLeave);
    this.canvas.removeEventListener('click', this._onClickH);
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (o.material.uniforms?.uMap?.value) o.material.uniforms.uMap.value.dispose();
        o.material.dispose();
      }
    });
    this.renderer.dispose();
  }
}
