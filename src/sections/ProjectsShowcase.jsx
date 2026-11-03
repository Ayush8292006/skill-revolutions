import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import { projectsData } from '../data/projects';
import { GalleryEngine } from '../three/GalleryEngine';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsShowcase() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const barRef = useRef(null);
  const [active, setActive] = useState(0);
  const [fallback, setFallback] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let engine;
    try {
      engine = new GalleryEngine(canvasRef.current, projectsData, {
        onActive: (i) => setActive(Math.max(0, Math.min(projectsData.length - 1, i))),
        onClick: (i) => navigate(`/courses/${projectsData[i].slug}`),
      });
    } catch (e) {
      setFallback(true);
      return undefined;
    }
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${window.innerHeight * projectsData.length * 0.75}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        engine.setProgress(self.progress);
        if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    const io = new IntersectionObserver(([en]) => engine.setActive(en.isIntersecting));
    io.observe(canvasRef.current);
    const onResize = () => engine.resize();
    window.addEventListener('resize', onResize);
    return () => {
      st.kill();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      engine.dispose();
    };
  }, [navigate]);

  const p = projectsData[active];

  if (fallback) {
    return (
      <section className="py-24 border-t border-line">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((pr) => (
            <Link key={pr.slug} to={`/courses/${pr.slug}`} className="block rounded-2xl overflow-hidden border border-line">
              <img src={pr.image} alt={pr.name} className="w-full aspect-square object-cover" loading="lazy" />
              <div className="p-4 font-headline font-bold">{pr.name}</div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} data-no-reveal className="relative h-[100svh] w-full overflow-hidden bg-bg border-t border-line" id="courses">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(201,176,122,0.18),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* top gradient + heading */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg via-bg/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg via-bg/80 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-8 flex flex-col justify-between pointer-events-none">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel number="08" label="Courses we provide" />
            <h2 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-[0.95]">
              Programs built
              <br />
              <span className="text-stroke">for real careers.</span>
            </h2>
          </div>
          <div className="hidden md:block pointer-events-auto">
            <Button to="/courses" variant="outline" size="md" icon="right">
              All courses
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div key={p.slug} className="fade-up">
            <div className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              {p.id} / {String(projectsData.length).padStart(2, '0')} · {p.category}
            </div>
            <h3 className="mt-2 font-headline font-extrabold text-4xl sm:text-6xl tracking-[-0.03em]">{p.name}</h3>
            <div className="mt-2 font-mono text-xs text-muted tracking-wider uppercase">
              {p.location} · {p.area}
            </div>
          </div>
          <Link
            to={`/courses/${p.slug}`}
            className="pointer-events-auto group inline-flex items-center gap-3 self-start sm:self-auto rounded-full border border-text/20 bg-white/60 pl-5 pr-1.5 py-1.5 font-mono text-xs uppercase tracking-[0.16em] hover:border-accent transition-colors"
          >
            View course
            <span className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="mt-6 h-px w-full bg-line overflow-hidden">
          <div ref={barRef} className="h-full bg-accent origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  );
}
