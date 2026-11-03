import { useEffect, useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import { siteConfig } from '../data/site';
import { StudyEngine } from '../three/StudyEngine';
import { useIsMobile } from '../hooks/useIsMobile';

export default function FinalCTA() {
  const canvasRef = useRef(null);
  const isMobile = useIsMobile();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let engine;
    try {
      engine = new StudyEngine(canvasRef.current, { mode: 'showcase', mobile: true, offsetX: 0.16 });
    } catch (e) {
      setFallback(true);
      return undefined;
    }
    const io = new IntersectionObserver(([en]) => engine.setActive(en.isIntersecting));
    io.observe(canvasRef.current);
    engine.setActive(false);
    const onMove = (e) => engine.setPointer((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    const onResize = () => engine.resize();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      engine.dispose();
    };
  }, [isMobile]);

  return (
    <section className="relative min-h-[100svh] bg-bg border-t border-line overflow-hidden flex items-center">
      <div className="absolute inset-0">
        {!fallback ? (
          <canvas ref={canvasRef} className="w-full h-full block" />
        ) : (
          <img src={siteConfig.images.students} alt="" className="w-full h-full object-cover opacity-40" />
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(251,248,242,0.95)_0%,rgba(251,248,242,0.75)_40%,rgba(251,248,242,0.1)_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-28">
        <SectionLabel number="12" label="Start your journey" />
        <h2 className="font-headline font-extrabold text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.045em] max-w-4xl">
          Your dream career
          <br />
          <span className="text-gradient-brand">starts today.</span>
        </h2>
        <p data-reveal className="mt-8 text-text/70 text-base sm:text-xl max-w-lg leading-relaxed">
          From your first class to your first offer letter — one team that trains, certifies and places you.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
          <Button to="/contact" size="lg" variant="primary" icon="diagonal">
            Enroll Now
          </Button>
          <a
            href={`tel:${siteConfig.contact.phonePrimary}`}
            className="inline-flex items-center gap-3 pl-2 pr-6 py-2 rounded-full border border-text/20 bg-white/60 hover:border-text/50 font-mono text-xs sm:text-[13px] uppercase tracking-[0.14em] transition-colors"
          >
            <span className="w-10 h-10 rounded-full bg-text text-bg flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </span>
            {siteConfig.contact.phonePrimary}
          </a>
        </div>
      </div>
    </section>
  );
}
