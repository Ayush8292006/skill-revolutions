import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StudyEngine, TAG_DEFS } from '../three/StudyEngine';
import Button from '../components/Button';
import { useIsMobile } from '../hooks/useIsMobile';
import { siteConfig } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  { n: '01', label: 'Enroll', from: 0, to: 0.12 },
  { n: '02', label: 'Foundation', from: 0.12, to: 0.25 },
  { n: '03', label: 'Learn', from: 0.25, to: 0.45 },
  { n: '04', label: 'Live projects', from: 0.45, to: 0.62 },
  { n: '05', label: 'Certification', from: 0.62, to: 0.84 },
  { n: '06', label: 'Placement', from: 0.84, to: 1 },
];

// [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]
const BEATS = [
  [-1, 0, 0.22, 0.3],
  [0.3, 0.38, 0.6, 0.68],
  [0.7, 0.8, 2, 3],
];

const clamp01 = (v) => Math.min(1, Math.max(0, v));

export default function Hero3D() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const tagRefs = useRef({});
  const beatRefs = useRef([]);
  const phaseRefs = useRef([]);
  const pctRef = useRef(null);
  const barRef = useRef(null);
  const hintRef = useRef(null);
  const isMobile = useIsMobile();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let engine;
    try {
      engine = new StudyEngine(canvasRef.current, {
        mobile: isMobile,
        tagEls: tagRefs.current,
        offsetX: 0.13,
        initial: reduced ? 1 : 0,
      });
    } catch (e) {
      console.warn('WebGL unavailable, using image fallback', e);
      setFallback(true);
      return undefined;
    }
    engineRef.current = engine;

    const update = (p) => {
      engine.setProgress(p);
      BEATS.forEach(([a, b, c, d], i) => {
        const el = beatRefs.current[i];
        if (!el) return;
        const fin = clamp01((p - a) / (b - a));
        const fout = 1 - clamp01((p - c) / (d - c));
        const o = Math.min(fin, fout);
        el.style.opacity = o.toFixed(3);
        const y = (1 - fin) * 40 - (1 - fout) * 40;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) rotateX(${((1 - o) * 18).toFixed(1)}deg)`;
        el.style.pointerEvents = o > 0.6 ? 'auto' : 'none';
      });
      PHASES.forEach((ph, i) => {
        const el = phaseRefs.current[i];
        if (!el) return;
        const t = clamp01((p - ph.from) / (ph.to - ph.from));
        el.dataset.state = p >= ph.to ? 'done' : p >= ph.from ? 'active' : 'todo';
        el.style.setProperty('--t', t.toFixed(3));
      });
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100)).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(3)})`;
      if (hintRef.current) hintRef.current.style.opacity = String(1 - clamp01(p / 0.06));
    };
    update(reduced ? 1 : 0);

    let st;
    if (!reduced) {
      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * (isMobile ? 3.2 : 4.6)}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress),
      });
    }

    const onMove = (e) => {
      engine.setPointer((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    const onResize = () => engine.resize();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    const io = new IntersectionObserver(([en]) => engine.setActive(en.isIntersecting), { threshold: 0 });
    io.observe(canvasRef.current);

    return () => {
      st && st.kill();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      engine.dispose();
      engineRef.current = null;
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} data-no-reveal className="relative w-full h-[100svh] overflow-hidden bg-bg" aria-label="Skill Revolution — 3D study story">
      {/* WebGL world */}
      {!fallback ? (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      ) : (
        <img src={siteConfig.images.students} alt="Students at Skill Revolution" className="absolute inset-0 w-full h-full object-cover opacity-80" />
      )}

      {/* 3D-anchored callouts */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        {TAG_DEFS.map((t) => (
          <div
            key={t.id}
            ref={(el) => (tagRefs.current[t.id] = el)}
            className="absolute left-0 top-0 opacity-0 will-change-transform"
          >
            <div className="relative -translate-x-1/2 -translate-y-full pb-10">
              <div className="glass-panel px-3 py-2 whitespace-nowrap">
                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] text-text">{t.label}</div>
                <div className="font-mono text-[9px] tracking-[0.16em] text-muted mt-0.5">{t.sub}</div>
              </div>
              <span className="absolute left-1/2 bottom-1 h-9 w-px bg-gradient-to-b from-text/60 to-accent" />
              <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_14px_rgba(214,42,51,0.6)]" />
            </div>
          </div>
        ))}
      </div>

      {/* legibility gradients */}
      <div className="absolute inset-0 z-[11] pointer-events-none bg-[radial-gradient(120%_90%_at_0%_100%,rgba(251,248,242,0.92)_0%,rgba(251,248,242,0.55)_38%,transparent_65%)]" />
      <div className="absolute inset-x-0 top-0 h-40 z-[11] pointer-events-none bg-gradient-to-b from-bg/80 to-transparent" />

      {/* Overlay UI */}
      <div className="relative z-20 h-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-8 flex flex-col">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
          <span className="w-8 h-px bg-accent" />
          Hyderabad · IT · Healthcare · Engineering · Digital
        </div>

        <div className="relative flex-1 [perspective:1200px]">
          {/* Beat 1 */}
          <div ref={(el) => (beatRefs.current[0] = el)} className="absolute left-0 bottom-[14%] max-w-3xl origin-bottom">
            <h1 className="font-headline font-extrabold text-[clamp(3rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.045em] text-text">
              Building
              <br />
              <span className="text-stroke">careers.</span>
            </h1>
            <p className="mt-6 max-w-md text-base sm:text-lg text-text/70 leading-relaxed">
              Every career begins at a study desk. Scroll to build yours — book by book, project by project.
            </p>
          </div>

          {/* Beat 2 */}
          <div ref={(el) => (beatRefs.current[1] = el)} className="absolute left-0 bottom-[14%] max-w-3xl origin-bottom opacity-0">
            <h2 className="font-headline font-extrabold text-[clamp(2.6rem,7vw,6.8rem)] leading-[0.9] tracking-[-0.04em] text-text">
              From the first <span className="text-accent">class</span>
              <br />
              to the final offer…
            </h2>
            <p className="mt-6 max-w-md text-base sm:text-lg text-text/70 leading-relaxed">
              Expert trainers, real-time projects, certification guidance and mock interviews at every step.
            </p>
          </div>

          {/* Beat 3 */}
          <div ref={(el) => (beatRefs.current[2] = el)} className="absolute left-0 bottom-[10%] max-w-4xl origin-bottom opacity-0">
            <h2 className="font-headline font-extrabold text-[clamp(2.3rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.045em] text-text">
              AI cannot beat
              <br />
              <span className="text-gradient-brand">Skill Revolution.</span>
            </h2>
            <p className="mt-6 max-w-md text-base sm:text-lg text-text/80 leading-relaxed">
              Empowering careers through industry-focused training. 2000+ trained · 1200+ placed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" variant="primary" icon="diagonal">
                Book Free Counselling
              </Button>
              <Button to="/courses" size="lg" variant="outline" icon="right">
                View Courses
              </Button>
            </div>
          </div>

          {/* Build HUD */}
          <aside className="hidden lg:flex absolute right-0 top-4 flex-col items-end gap-6">
            <div className="glass-panel p-4 w-60">
              <div className="flex items-baseline justify-between font-mono text-[10px] tracking-[0.2em] text-muted">
                <span>CAREER SEQUENCE</span>
                <span className="text-text">
                  <span ref={pctRef}>000</span>%
                </span>
              </div>
              <ol className="mt-4 space-y-3">
                {PHASES.map((ph, i) => (
                  <li key={ph.n} ref={(el) => (phaseRefs.current[i] = el)} data-state="todo" className="hud-phase">
                    <span className="font-mono text-[10px] w-6">{ph.n}</span>
                    <span className="flex-1 text-[13px] font-medium">{ph.label}</span>
                    <span className="hud-bar" />
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* vertical progress rail */}
          <div className="absolute right-0 bottom-[12%] h-40 w-px bg-line hidden md:block">
            <div ref={barRef} className="absolute inset-0 bg-accent origin-top" style={{ transform: 'scaleY(0)' }} />
          </div>
        </div>

        <div className="flex items-end justify-between font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
          <div ref={hintRef} className="flex items-center gap-3">
            <span className="relative w-5 h-8 rounded-full border border-text/30 flex justify-center pt-1.5">
              <span className="w-1 h-1.5 rounded-full bg-accent animate-scroll-dot" />
            </span>
            Scroll to build your career
          </div>
          <div className="hidden sm:block text-right">
            Ramakrishna Nivas · SR Nagar
            <br />
            <span className="text-text/60">Hyderabad, Telangana</span>
          </div>
        </div>
      </div>
    </section>
  );
}
