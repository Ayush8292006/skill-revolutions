import { siteConfig } from '../data/site';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// CSS-3D preloader: floor slabs stack up as the site loads
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => onComplete && onComplete(), 700);
          }, 250);
          return 100;
        }
        return Math.min(100, prev + Math.max(1, Math.floor((100 - prev) * 0.1)));
      });
    }, 45);
    return () => clearInterval(interval);
  }, [onComplete]);

  const floors = 5;
  const built = Math.ceil((progress / 100) * floors);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-[99999] bg-bg flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          <div className="bp-floor opacity-60" />

          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm">
            {/* isometric 3D stack */}
            <div className="relative h-44 w-44 mb-10" style={{ perspective: '900px' }}>
              <div
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d', transform: 'rotateX(58deg) rotateZ(-42deg)' }}
              >
                {Array.from({ length: floors }).map((_, i) => {
                  const on = i < built;
                  return (
                    <div
                      key={i}
                      className="absolute inset-6 rounded-[3px] transition-all duration-500 ease-out"
                      style={{
                        transform: `translateZ(${on ? i * 18 : i * 18 + 60}px)`,
                        opacity: on ? 1 : 0,
                        background: i === floors - 1 ? 'rgba(214,42,51,0.85)' : 'rgba(238,241,247,0.08)',
                        border: `1px solid ${i === floors - 1 ? '#ff6a70' : 'rgba(110,125,255,0.7)'}`,
                        boxShadow: on ? '0 0 30px rgba(110,125,255,0.25)' : 'none',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl px-4 py-2 mb-6 shadow-[0_10px_40px_-10px_rgba(110,125,255,0.5)]">
              <img src={siteConfig.logo} alt="Skill Revolution" className="h-12 w-auto object-contain" />
            </div>

            <div className="font-headline font-extrabold text-6xl tracking-tight text-text tabular-nums">
              {String(progress).padStart(3, '0')}
              <span className="text-accent text-2xl align-top ml-1">%</span>
            </div>

            <div className="w-full h-px bg-line relative overflow-hidden mt-5 mb-3">
              <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between w-full font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
              <span>Opening the books</span>
              <span>Hyderabad</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
