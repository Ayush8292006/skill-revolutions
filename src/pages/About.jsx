import { useEffect, useRef } from 'react';
import SectionLabel from '../components/SectionLabel';
import Button from '../components/Button';
import Tilt from '../components/Tilt';
import RollingCounter from '../components/RollingCounter';
import LogoMarquee from '../sections/LogoMarquee';
import WhyPillarpride from '../sections/WhyPillarpride';
import { useReveal3D } from '../hooks/useReveal3D';
import { siteConfig, ABOUT } from '../data/site';
import { Target, Eye, Flag } from 'lucide-react';

const PILLAR_ICONS = [Target, Eye, Flag];

export default function About() {
  const ref = useRef(null);
  useReveal3D(ref);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main ref={ref} className="pt-28 sm:pt-36 bg-bg text-text">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <SectionLabel number="01" label="ABOUT SKILL REVOLUTION" />
        <h1 className="font-headline font-extrabold text-4xl sm:text-6xl lg:text-7xl text-text tracking-tighter leading-[1.02] max-w-4xl">
          Shaping careers <br />
          <span className="text-accent">for 10+ years.</span>
        </h1>
        <p className="mt-6 text-muted text-lg sm:text-xl max-w-3xl leading-relaxed">{ABOUT.lead}</p>
      </section>

      {/* Who we are */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <Tilt max={7} className="group overflow-hidden rounded-3xl border border-line bg-surface">
              <div className="absolute top-3 left-3 z-20 font-mono text-[9px] uppercase tracking-widest text-accent bg-bg/80 px-2 py-0.5 border border-line">
                WHO WE ARE
              </div>
              <img
                src={siteConfig.images.about}
                alt="Students collaborating at Skill Revolution"
                loading="lazy"
                className="w-full h-[420px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Tilt>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] leading-[1.05]">
              Practical training. <br />
              <span className="text-accent">Real outcomes.</span>
            </h2>
            {ABOUT.who.map((p, i) => (
              <p key={i} data-reveal className={i === 0 ? 'text-text/85 text-base sm:text-lg leading-relaxed' : 'text-muted text-sm sm:text-base leading-relaxed'}>
                {p}
              </p>
            ))}
            <div className="pt-4 flex flex-wrap gap-4">
              <Button to="/courses" variant="primary" size="md" icon="diagonal">Explore Courses</Button>
              <Button to="/contact" variant="outline" size="md" icon="right">Book Free Counselling</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-20">
          {ABOUT.stats.map((st) => (
            <div key={st.id} data-reveal className="p-6 sm:p-7 bg-surface/60 border border-line rounded-xl">
              <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-4">{st.label}</div>
              <RollingCounter value={st.value} suffix={st.suffix} className="font-headline font-extrabold text-3xl sm:text-5xl text-text" />
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision / Goal */}
      <section className="py-24 sm:py-32 bg-surface/40 border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel number="02" label="WHAT DRIVES US" />
          <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] leading-[1.06] mb-14">
            Mission, vision <span className="text-accent">and goal.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Tilt key={p.t} max={8} data-reveal className="p-7 sm:p-8 rounded-3xl border border-line bg-bg hover:border-accent transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span className="p-2 rounded-xl text-accent bg-accent/10"><Icon className="w-5 h-5" /></span>
                  </div>
                  <h3 className="mt-6 font-headline font-extrabold text-2xl text-text">{p.t}</h3>
                  <p className="mt-3 text-muted leading-relaxed">{p.d}</p>
                </Tilt>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-24 sm:py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel number="03" label="OUR CORE VALUES" />
          <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-text tracking-[-0.03em] leading-[1.06] mb-14">
            What we <span className="text-accent">stand for.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ABOUT.values.map((v, i) => (
              <div key={v.t} data-reveal className="p-6 rounded-xl border border-line bg-surface/50 hover:border-accent/50 transition-colors">
                <div className="font-mono text-xs text-accent tracking-widest">{String(i + 1).padStart(2, '0')}</div>
                <div className="mt-2 font-headline font-extrabold text-xl text-text">{v.t}</div>
                <p className="mt-2 text-muted text-sm leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyPillarpride />
      <LogoMarquee />
    </main>
  );
}
